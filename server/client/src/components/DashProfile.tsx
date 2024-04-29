import { useDispatch, useSelector } from "react-redux";
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
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../services/user/user.slice";

const DashProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  // IMAGE
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const imageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState<
    number | null
  >(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  // FORMDATA
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState("");
  const [updateUserError, setUpdateUserError] = useState("");
  const dispatch = useDispatch();

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
    setImageFileUploading(true);
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
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageFileUrl(downloadUrl);
            setFormData({ ...formData, profilePicture: downloadUrl });
            setImageFileUploading(false);
          });
        }
      );
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUpdateUserError("");
    setUpdateUserSuccess("");

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess(`User's profile updated successfully`);
      }
    } catch (error: any) {
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <div className="mt-10 space-y-8">
      <h1 className="text-center font-bold text-4xl uppercase">Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-[640px] mx-auto px-4">
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
            <TextInput
              type="text"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label>Email</Label>
            <TextInput
              type="text"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label>Password</Label>
            <TextInput
              type="text"
              placeholder="*******"
              id="password"
              onChange={handleOnChange}
            />
          </div>
          <Button type="submit" pill gradientDuoTone="purpleToBlue" outline>
            Update
          </Button>
          <div className="flex items-center justify-between text-red-500 text-sm">
            <p className="cursor-pointer">Delete user</p>
            <p className="cursor-pointer">Sign out</p>
          </div>
        </div>

        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default DashProfile;
