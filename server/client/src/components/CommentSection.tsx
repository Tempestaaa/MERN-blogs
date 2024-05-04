import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { commentTypes } from "../types/comment.type";

type Props = {
  blogId: string | undefined;
};

const CommentSection = ({ blogId }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<commentTypes[]>([]);
  const [commentError, setCommentError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommentError("");

    try {
      if (comment.length > 200) return;
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          blogId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError("");
        setComments([data, ...comments]);
      }
    } catch (error: any) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getblogcomments/${blogId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getComments();
  }, [blogId]);

  const handleLikes = async (commentId: string) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/likecomment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((item) =>
            item._id === commentId
              ? {
                  ...item,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : item
          )
        );
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment: commentTypes, editedContent: string) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser.username ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Sign in as:</p>
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="h-5 aspect-square object-cover rounded-full"
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          <p>You must be signed in to comment</p>
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}

      {currentUser.username && (
        <>
          <form
            onSubmit={handleSubmit}
            className=" border border-teal-500 rounded-md p-3"
          >
            <Textarea
              placeholder="Add a comment..."
              rows={3}
              maxLength={200}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="flex justify-between items-center mt-5">
              <p className="text-gray-500 text-sm">
                {200 - comment.length} charaters remaining
              </p>
              <Button type="submit" outline gradientDuoTone="purpleToBlue">
                Submit
              </Button>
            </div>
          </form>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
          {comments.length === 0 ? (
            <p className="text-sm my-5">No comments yet! </p>
          ) : (
            <>
              <div className="text-sm my-5 flex items-center gap-1">
                <p>Comments</p>
                <div className="border border-gray-400 py-1 px-2 rounded-sm">
                  <p>{comments.length}</p>
                </div>
              </div>

              {comments.map((item) => (
                <Comment
                  key={item._id}
                  comment={item}
                  onLike={handleLikes}
                  onEdit={handleEdit}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CommentSection;
