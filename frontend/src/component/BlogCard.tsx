import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b m-auto border-slate-200 pb-4 p-5 w-screen max-w-screen-lg cursor-pointer">
        <div className="flex m-auto items-center">
          <div className="flex flex-col justify-center">
            <Avatar authorName={authorName} />
          </div>
          <div className="font-extralight pl-2 text-sm">{authorName}</div>
          <div className="text-xs">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-400 text-xs font-thin-500 pt-2">
          {Math.ceil(content.length / 100) + " minute(s) read"}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1  w-1 rounded-full bg-gray-600 ml-2"></div>;
}

export function Avatar({ authorName }: { authorName: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
        {authorName[0]}
      </span>
    </div>
  );
}
