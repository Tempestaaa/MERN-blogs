import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import { blogTypes } from "../types/blog.type";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState<blogTypes[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blog/getblogs");
      const data = await res.json();
      if (res.ok) setBlogs(data.blogs);
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          omnis, non nostrum nesciunt minima iusto sed aspernatur a? Porro,
          maxime! Dolorem ex laboriosam ullam, aut quae quam quibusdam velit
          ducimus!
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all blogs
        </Link>
      </div>

      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-8 py-7">
        {blogs && blogs.length > 0 && (
          <div className="flex flex-col gap-4 mx-auto">
            <h2 className="text-2xl font-semibold text-center">Recent Blogs</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 text-center hover:underline"
            >
              View all blogs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
