import { useEffect, useState } from "react";
import { commentTypes } from "../types/comment.type";
import { userTypes } from "../types/user.types";
import moment from "moment";

type Props = {
  comment: commentTypes;
};

const Comment = ({ comment }: Props) => {
  const [user, setUser] = useState<userTypes>({
    email: "",
    password: "",
    profilePicture: "",
    username: "",
  });

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
      </div>
    </div>
  );
};

export default Comment;
