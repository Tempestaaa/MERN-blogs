import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreatePost = () => {
  const [file, setFile] = useState<File>();
  const [imageUploadProgess, setImageUploadProgess] = useState<number | null>(
    null
  );
  const [imageUploadError, setImageUploadError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleUploadImage = async () => {
    try {
      if (!file) return setImageUploadError("Please select an image");

      setImageUploadError("");
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgess(+progress.toFixed(0));
        },
        () => {
          setImageUploadError("Image upload failed");
          setImageUploadProgess(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgess(null);
            setImageUploadError("");
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error: any) {
      setImageUploadError("Image upload failed");
      setImageUploadProgess(null);
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-svh">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between flex-col md:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategoriezed">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">Reactjs</option>
            <option value="nextjs">nextjs</option>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-4 border-4 border-teal-400 border-dotted p-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
          />
          <Button
            type="button"
            outline
            gradientDuoTone="purpleToBlue"
            size="sm"
            onClick={handleUploadImage}
          >
            {imageUploadProgess ? (
              <div className="w-10 h-10">
                <CircularProgressbar
                  value={imageUploadProgess}
                  text={`${imageUploadProgess || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
