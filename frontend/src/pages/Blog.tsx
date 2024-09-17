import React from "react";
import { useBlog } from "../hooks";
import { SingleBlog } from "../component/SingleBlog";
import { useParams } from "react-router-dom";
import { Spinner } from "../component/Spinner";

export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog(id || "");

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <SingleBlog blog={blog} />
    </div>
  );
};
