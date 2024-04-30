import { Button, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
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
          <input type="file" accept="image/*" />
          <Button
            type="button"
            outline
            gradientDuoTone="purpleToBlue"
            size="sm"
          >
            Upload image
          </Button>
        </div>

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
