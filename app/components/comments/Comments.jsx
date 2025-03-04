import { Avatar, Button } from "@nextui-org/react";
import { Reply, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import CommentBox from "./CommentBox";

const commentFooterActions = [
  {
    id: 1,
    label: "Like",
    icon: <ThumbsUp size={18} />,
  },
  {
    id: 2,
    label: "Dislike",
    icon: <ThumbsDown size={18} />,
  },
];

const allComments = [
  {
    id: 1,
    image: "/assets/images/user-4.png",
    name: "Titan Zamora",
    comment:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis.",
    likes: 15,
    commentDate: "23/9/2024",
  },
  {
    id: 2,
    image: "/assets/images/user-10.png",
    name: "Damira Roman",
    comment:
      "Ut enim ad minima veniam nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum reprehen derit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    likes: 23,
    commentDate: "23/9/2024",
    reply: [
      {
        id: 21,
        image: "/assets/images/user-3.png",
        name: "Elijah Delaney",
        comment:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
        likes: 5,
        commentDate: "23/9/2024",
      },
    ],
  },
  {
    id: 3,
    image: "/assets/images/user-5.png",
    name: "Harold Pham",
    comment:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    likes: 54,
    commentDate: "22/9/2024",
  },
  {
    id: 4,
    image: "/assets/images/user-12.png",
    name: "Mina Machain",
    comment:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.",
    likes: 31,
    commentDate: "20/9/2024",
  },
];

const Comments = () => {
  const [comments, setComment] = useState(allComments);

  const handleDelete = (id) => {
    const updatedComments = comments.map((item) => {
      if (item.reply) {
        const updatedReplies = item.reply.filter((reply) => reply.id !== id);

        return { ...item, reply: updatedReplies };
      }
      return item;
    });

    setComment(updatedComments);
  };

  return (
    <div className="flex flex-col 2sm:gap-5 gap-3">
      {comments.map((item) => (
        <SingleComment comment={item} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

const SingleComment = ({ comment, handleDelete }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);

  return (
    <div key={comment.id} class="comment-item border-b border-gray-400">
      <div class=" 2sm:mb-[20px] mb-[12px]">
        <div class="flex items-center mb-[10px]">
          <Link
            href="#"
            class="2sm:w-[30px] 2sm:h-[30px] w-[28px] h-[28px] rounded-full overflow-hidden me-2"
          >
            <Avatar src={comment.image} className="w-[30px] h-[30px]" />
          </Link>
          <div class="2sm:flex block items-center">
            <p class="sm:text-base text-sm font-medium text-gray-900 hover:text-gray-800">
              <Link href="/author-profile" class="flex">
                {comment.name}
              </Link>
            </p>
            <p class="date relative sm:text-base 2sm:text-sm text-xs text-gray-800 2sm:ps-4">
              {moment(comment.commentDate, "DDMMYYYY").fromNow()}
            </p>
          </div>
        </div>
        <p class="2sm:text-base text-sm text-gray-800">{comment.comment}</p>
        <div class="flex justify-between items-center mt-[10px]">
          <div class="flex items-center gap-[15px]">
            <p class="flex 2sm:text-base text-sm text-gray-900">
              {comment.likes} Likes
            </p>
            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              class="reply-now flex items-center gap-1 px-0 2sm:text-base text-sm text-gray-900 bg-transparent"
            >
              <Reply size={20} />
              Reply
            </button>
          </div>
          <ul class="post-action flex">
            {commentFooterActions.map((action) => (
              <li class="sm:me-3 me-2">
                <Link href="/">
                  <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    className="h-[34px] w-[34px] min-w-[34px] bg-gray-500 text-gray-800 hover:text-white hover:!bg-black"
                    aria-label={action.label}
                  >
                    {action.icon}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {comment.reply &&
        comment.reply.map((item) => (
          <CommentReply comment={item} handleDelete={handleDelete} />
        ))}
      <div
        className={`transition-height duration-500 ${
          showCommentBox ? "mb-5 h-[127px]" : "h-0 invisible"
        }`}
      >
        <CommentBox />
      </div>
    </div>
  );
};

const CommentReply = ({ comment, handleDelete }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);

  return (
    <div class="comment-item 2sm:mb-[20px] mb-[12px] 2sm:ms-[20px] ms-[12px] 2sm:ps-[25px] ps-[15px] border-s border-gray-400">
      <div>
        <div class="flex items-center mb-[10px]">
          <Link
            href="#"
            class="2sm:w-[30px] 2sm:h-[30px] w-[28px] h-[28px] rounded-full overflow-hidden me-2"
          >
            <Avatar src={comment.image} className="w-[30px] h-[30px]" />
          </Link>
          <div class="2sm:flex block items-center">
            <p class="sm:text-base text-sm font-medium text-gray-900 hover:text-gray-800">
              <Link href="/author-profile" class="flex">
                {comment.name}
              </Link>
            </p>
            <p class="date relative sm:text-base 2sm:text-sm text-xs text-gray-800 2sm:ps-4">
              {moment(comment.commentDate, "DDMMYYYY").fromNow()}
            </p>
          </div>
        </div>
        <p class="2sm:text-base text-sm text-gray-800">{comment.comment}</p>
        <div class="flex justify-between items-center mt-[10px]">
          <div class="flex items-center gap-[15px]">
            <p class="flex 2sm:text-base text-sm text-gray-900">
              {comment.likes} Likes
            </p>
            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              class="reply-now flex items-center gap-1 px-0 2sm:text-base text-sm text-gray-900 bg-transparent"
            >
              <Reply size={20} />
              Reply
            </button>
            <button
              onClick={() => handleDelete(comment.id)}
              class="reply-now flex items-center gap-1 px-0 2sm:text-base text-sm text-[#FF0000] bg-transparent"
            >
              <Trash2 size={20} />
              Delete
            </button>
          </div>
          <ul class="post-action flex">
            {commentFooterActions.map((action) => (
              <li class="sm:me-3 me-2">
                <Link href="/">
                  <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    className="h-[34px] w-[34px] min-w-[34px] bg-gray-500 text-gray-800 hover:text-white hover:!bg-black"
                    aria-label={action.label}
                  >
                    {action.icon}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`transition-height duration-500 ${
          showCommentBox ? "2sm:my-5 my-3 h-[127px]" : "h-0 invisible"
        }`}
      >
        <CommentBox />
      </div>
    </div>
  );
};

export default Comments;
