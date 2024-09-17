import { BlogCard } from "../component/BlogCard";
import { Appbar } from "../component/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../component/BlogSkeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <>
        <Appbar />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="Sept 14, 2024"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
