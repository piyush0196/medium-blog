import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const SingleBlog = ({blog}: {blog: Blog}) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 pt-200 max-w-screen-2xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted on 2nd September 20204
            </div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4 text-slate-600">
            Author
            <div className="flex items-center gap-3">
              <div>
                {" "}
                <Avatar authorName={blog.author.name} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-1 text-slate-500">
                  Random catchphrase about the author ability to grab user's
                  attentiion.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
