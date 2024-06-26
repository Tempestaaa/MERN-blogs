import { Link } from "react-router-dom";
import { blogTypes } from "../types/blog.type";

type Props = {
  blog: blogTypes;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <div className="group relative w-full border h-[400px] overflow-hidden rounded-lg sm:w-[300px] hover:border-2 transition-all">
      <Link to={`/blog/${blog.slug}`}>
        <img
          src={blog.image}
          alt="blog cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>

      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{blog.title}</p>
        <span className="italic text-sm">{blog.category}</span>
        <Link
          to={`/blog/${blog.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
