import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { Button, Table } from "flowbite-react";
import { blogTypes } from "../types/blog.type";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [userBlogs, setUserBlogs] = useState<blogTypes[]>([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/blog/getblogs?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) setUserBlogs(data.blogs);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) fetchBlogs();
  }, [currentUser._id]);

  return (
    <div className="p-3 overflow-x-auto scrollbar table-auto md:mx-auto  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userBlogs.length > 0 ? (
        <Table hoverable className="">
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>
              <span>Controllers</span>
            </Table.HeadCell>
          </Table.Head>
          {userBlogs.map((blog) => (
            <Table.Body key={blog._id} className=" divide-y">
              <Table.Row>
                <Table.Cell>
                  {new Date(blog?.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/blog/${blog.slug}`}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                </Table.Cell>
                <Table.Cell>{blog.category}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" pill color="failure" className="px-1">
                    Delete
                  </Button>
                  <Link to={`/update-blog/${blog._id}`}>
                    <Button size="xs" pill color="blue" className="px-1">
                      Edit
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      ) : (
        <p>You have no blogs yet</p>
      )}
    </div>
  );
};

export default DashPosts;
