import { Pencil, Trash2 } from "lucide-react";
import { blogType } from "../../types/blogType";
import { Link } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useEditBlogMutation,
} from "../../services/blogApi";

type Props = {
  item: blogType;
};

const Blog = ({ item }: Props) => {
  const [editBlog] = useEditBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = () => {
    deleteBlog(item._id);
  };

  return (
    <div className="bg-secondary rounded-md overflow-hidden">
      <div className="flex items-center justify-end gap-2 gradient py-2 px-4">
        <button className="p-1 rounded-lg bg-yellow-400">
          <Pencil size={16} />
        </button>
        <button onClick={handleDelete} className="p-1 bg-error rounded-lg">
          <Trash2 size={16} />
        </button>
      </div>
      <div className="py-3 px-4">
        <Link
          to={`blogs/${item._id}`}
          className=" text-2xl font-bold uppercase line-clamp-1"
        >
          {item.title}
        </Link>
        <h2 className="line-clamp-1 text-lg">{item.author}</h2>
        <p className="line-clamp-3 text-sm italic">{item.title}</p>
      </div>
    </div>
  );
};

export default Blog;
