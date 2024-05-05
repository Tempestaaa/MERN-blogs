import { useEffect, useState } from "react";
import { userTypes } from "../types/user.types";
import { commentTypes } from "../types/comment.type";
import { blogTypes } from "../types/blog.type";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import {
  HiAnnotation,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import DisplayCard from "./DisplayCard";
import { displayTypes } from "../types/display.type";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const DashboardComp = () => {
  const [users, setUsers] = useState<userTypes[]>([]);
  const [blogs, setBlogs] = useState<blogTypes[]>([]);
  const [comments, setComments] = useState<commentTypes[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthBlogs, setLastMonthBlogs] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog/getblogs?limit=5");
        const data = await res.json();
        if (res.ok) {
          setBlogs(data.blogs);
          setTotalBlogs(data.totalBlogs);
          setLastMonthBlogs(data.lastMonthBlogs);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchBlogs();
      fetchComments();
    }
  }, [currentUser]);

  const displayItems: displayTypes[] = [
    {
      label: "Users",
      total: totalUsers,
      icon: HiOutlineUserGroup,
      lastMonth: lastMonthUsers,
    },
    {
      label: "Blogs",
      total: totalBlogs,
      icon: HiDocumentText,
      lastMonth: lastMonthBlogs,
    },
    {
      label: "Comments",
      total: totalComments,
      icon: HiAnnotation,
      lastMonth: lastMonthComments,
    },
  ];

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        {displayItems.map((item, i) => (
          <DisplayCard key={i} item={item} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 p-3 mx-auto justify-center">
        {/* USERS */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=users">See all</Link>
            </Button>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark: border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 aspect-square rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        {/* BLOGS */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Blogs</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=blogs">See all</Link>
            </Button>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Blog image</Table.HeadCell>
              <Table.HeadCell>Blog title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {blogs &&
              blogs.map((blog) => (
                <Table.Body key={blog._id} className="divide-y">
                  <Table.Row className="bg-white dark: border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={blog.image}
                        alt="blog"
                        className="w-10 aspect-square rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{blog.title}</Table.Cell>
                    <Table.Cell className="w-5">{blog.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        {/* COMMENTS */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=comments">See all</Link>
            </Button>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark: border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
