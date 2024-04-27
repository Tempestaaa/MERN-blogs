import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const imageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState<
    number | null
  >(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) uploadImage();
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    if (imageFile) {
      const fileName = new Date().getTime() + imageFile?.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadingProgress(+progress.toFixed(0));
        },
        () => {
          setImageFileUploadError("Could not upload file more than 2MB");
          setImageFileUploadingProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageFileUrl(downloadUrl);
          });
        }
      );
    }
  };

  return (
    <div className="mt-10 space-y-8">
      <h1 className="text-center font-bold text-4xl uppercase">Profile</h1>
      <form className="max-w-[640px] mx-auto px-4">
        <input
          type="file"
          accept="image/*"
          ref={imageRef}
          onChange={handleImageFile}
          className="hidden"
        />
        <div
          className="grid place-items-center rounded-full w-32 aspect-square mx-auto border-4 border-gray-500 cursor-pointer relative overflow-hidden"
          onClick={() => imageRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt={`user ${currentUser.username}'s avatar`}
            className={`rounded-full max-w-full max-h-full object-cover ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-50"
            }`}
          />
        </div>

        {imageFileUploadError && (
          <Alert color="failure" className="mt-8">
            {imageFileUploadError}
          </Alert>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <Label>Username</Label>
            <TextInput type="text" defaultValue={currentUser.username} />
          </div>
          <div>
            <Label>Email</Label>
            <TextInput type="text" defaultValue={currentUser.email} />
          </div>
          <div>
            <Label>Password</Label>
            <TextInput type="text" placeholder="*******" />
          </div>
          <Button pill gradientDuoTone="purpleToBlue" outline>
            Update
          </Button>
          <div className="flex items-center justify-between text-red-500 text-sm">
            <p className="cursor-pointer">Delete user</p>
            <p className="cursor-pointer">Sign out</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
