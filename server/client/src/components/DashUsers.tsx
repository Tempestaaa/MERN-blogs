import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { userTypes } from "../types/user.types";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashUsers = () => {
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [users, setUsers] = useState<userTypes[]>([]);
  const [userIdToDelete, setUserIdToDelete] = useState<string | undefined>("");

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        if (!res.ok) console.log(data.message);
        else {
          setUsers(data.users);
          if (data.users.length < 9) setShowMore(false);
        }
      };

      currentUser.isAdmin && fetchUsers();
    } catch (error) {}
  }, []);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/blog/getusers?&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) console.log(data.message);
      else
        setUsers((prev) => {
          return prev.filter((user) => user._id !== userIdToDelete);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 overflow-x-auto scrollbar table-auto md:mx-auto  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>
                <span>Controllers</span>
              </Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body key={user._id} className=" divide-y">
                <Table.Row>
                  <Table.Cell>
                    {user.createdAt &&
                      new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <Button
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
        <p>There's no users yet!</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-8 mt-8">
              <Button color="failure" onClick={handleDeleteUser}>
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

export default DashUsers;
