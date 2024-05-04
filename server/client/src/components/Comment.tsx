import { useEffect, useState } from "react";
import { commentTypes } from "../types/comment.type";
import { userTypes } from "../types/user.types";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";

type Props = {
  comment: commentTypes;
  onLike: (commentId: any) => Promise<void>;
};

const Comment = ({ comment, onLike }: Props) => {
  const [user, setUser] = useState<userTypes>({
    email: "",
    password: "",
    profilePicture: "",
    username: "",
  });
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) setUser(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 aspect-square rounded-full bg-gray-200"
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user.username ? `@${user.username}` : "Anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        <p className="text-gray-500 pb-2 truncate">{comment.content}</p>

        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser._id &&
              comment.likes &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes &&
              comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
