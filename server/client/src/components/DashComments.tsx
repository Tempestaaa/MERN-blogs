import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { commentTypes } from "../types/comment.type";

const DashComments = () => {
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [comments, setComments] = useState<commentTypes[]>([]);
  const [commentIdToDelete, setCommentIdToDelete] = useState<
    string | undefined
  >("");

  console.log(comments);

  useEffect(() => {
    try {
      const fetchComments = async () => {
        const res = await fetch("/api/comment/getcomments");
        const data = await res.json();
        if (!res.ok) console.log(data.message);
        else {
          setComments(data.comments);
          if (data.comments.length < 9) setShowMore(false);
        }
      };

      currentUser.isAdmin && fetchComments();
    } catch (error) {}
  }, []);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/blog/getcomments?&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deletecomment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) console.log(data.message);
      else
        setComments((prev) => {
          return prev.filter((comment) => comment._id !== commentIdToDelete);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 overflow-x-auto scrollbar table-auto md:mx-auto  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>Blog id</Table.HeadCell>
              <Table.HeadCell>User id</Table.HeadCell>
              <Table.HeadCell>
                <span>Controllers</span>
              </Table.HeadCell>
            </Table.Head>
            {comments.map((item) => (
              <Table.Body key={item._id} className=" divide-y">
                <Table.Row>
                  <Table.Cell>
                    {item.createdAt &&
                      new Date(item.updatedAt as Date).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{item.content}</Table.Cell>
                  <Table.Cell>{item.numberOfLikes}</Table.Cell>
                  <Table.Cell>{item.blogId}</Table.Cell>
                  <Table.Cell>{item.userId}</Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <Button
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(item._id);
                      }}
                      size="xs"
                      pill
                      color="failure"
                      className="px-1"
                    >
                      Delete
                    </Button>
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
        <p>You have no comments yet!</p>
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
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-8 mt-8">
              <Button color="failure" onClick={handleDeleteComment}>
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

export default DashComments;
