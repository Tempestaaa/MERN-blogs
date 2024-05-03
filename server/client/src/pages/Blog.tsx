import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blogTypes } from "../types/blog.type";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";

const Blog = () => {
  const { blogSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [blog, setBlog] = useState<blogTypes>({});

  useEffect(() => {
    try {
      const fetchBlog = async () => {
        setLoading(true);
        const res = await fetch(`/api/blog/getblogs?slug=${blogSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setBlog(data.blogs[0]);
          setError(false);
          setLoading(false);
        }
      };
      fetchBlog();
    } catch (error: any) {
      setError(true);
      setLoading(false);
    }
  }, [blogSlug]);

  return (
    <main className="p-3 flex flex-col items-start max-w-6xl mx-auto min-h-svh">
      {loading && (
        <div className="grid place-items-center min-h-svh">
          <Spinner size="xl" />
        </div>
      )}
      <h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl">
        {blog?.title}
      </h1>
      <Link
        to={`/search?category=${blog?.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {blog?.category}
        </Button>
      </Link>

      <img
        src={blog?.image}
        alt={blog?.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>
          {blog?.createdAt && new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <span className="italic">
          {blog?.content && (String(blog.content).length / 1000).toFixed(0)}{" "}
          mins read
        </span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full blog-content"
        dangerouslySetInnerHTML={{ __html: blog?.content as TrustedHTML }}
      ></div>

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
    </main>
  );
};

export default Blog;
