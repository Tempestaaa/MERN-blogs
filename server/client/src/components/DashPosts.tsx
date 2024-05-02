import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { Button, Modal, Table } from "flowbite-react";
import { blogTypes } from "../types/blog.type";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPosts = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [userBlogs, setUserBlogs] = useState<blogTypes[]>([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState<string | undefined>("");
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/blog/getblogs?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserBlogs(data.blogs);
          if (data.blogs.length < 9) setShowMore(false);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) fetchBlogs();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userBlogs.length;
    try {
      const res = await fetch(
        `/api/blog/getblogs?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserBlogs((prev) => [...prev, ...data.blogs]);
        if (data.blogs.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBlog = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/blog/deleteblog/${blogIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) console.log(data.message);
      else
        setUserBlogs((prev) => {
          return prev.filter((blog) => blog._id !== blogIdToDelete);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 overflow-x-auto scrollbar table-auto md:mx-auto  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userBlogs.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
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
                    <Link to={`/blog/${blog.slug}`} className="truncate">
                      {blog.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{blog.category}</Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <Button
                      onClick={() => {
                        setShowModal(true);
                        setBlogIdToDelete(blog._id);
                      }}
                      size="xs"
                      pill
                      color="failure"
                      className="px-1"
                    >
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
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no blogs yet</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="text-xl">
              Are you sure you want to delete this blog?
            </h3>
            <div className="flex justify-center gap-8 mt-8">
              <Button color="failure" onClick={handleDeleteBlog}>
                Yes I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPosts;
