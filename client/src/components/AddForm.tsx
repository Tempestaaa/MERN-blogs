import { useState } from "react";
import { useCreateBlogMutation } from "../services/blogApi";
import { blogType } from "../types/blogType";

type Props = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: Omit<blogType, "_id"> = {
  title: "",
  author: "",
  content: "",
};

const AddForm = ({ setIsFormOpen }: Props) => {
  const [formData, setFormData] = useState<Omit<blogType, "_id">>(initialState);

  const [createBlog] = useCreateBlogMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBlog(formData);
    setFormData(initialState);
    setIsFormOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-full right-0 bg-secondary p-4 rounded-md space-y-2"
    >
      <div>
        <label className="text-sm" htmlFor="title">
          Title
        </label>
        <input
          required
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="bg-primary border py-1 px-2"
          id="title"
          type="text"
          placeholder="Enter your title..."
        />
      </div>
      <div>
        <label className="text-sm" htmlFor="author">
          Author
        </label>
        <input
          required
          value={formData.author}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, author: e.target.value }))
          }
          className="bg-primary border py-1 px-2"
          id="author"
          type="text"
          placeholder="Author name..."
        />
      </div>
      <div>
        <label className="text-sm" htmlFor="content">
          Content
        </label>
        <input
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          className="bg-primary border py-1 px-2"
          id="content"
          type="text"
          placeholder="Enter content..."
        />
      </div>
      <button
        type="submit"
        className="w-full text-center bg-blue-400 py-1 hover:text-primary hover:bg-sub"
      >
        Submit
      </button>
    </form>
  );
};

export default AddForm;
