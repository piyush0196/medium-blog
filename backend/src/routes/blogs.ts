import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


blogRouter.use("*", async (c, next) => {
  const jwtToken = c.req.header("authorization") || "";
  try {
    const user = await verify(jwtToken, c.env.JWT_SECRET);
    if (!user) {
      return c.json({
        status: 401,
        message: "User is not logged in.!",
      });
    }
    c.set("userId", String(user.id));
    await next();
  } catch (error) {
      return c.json({ error:"User is not logged in.!" }, 401)
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");


  const {success} =  createBlogInput.safeParse(body)
  if(!success) {
    return c.json({ error: 'Invalid inputs!' }, 411)

  }

  try {
    const blog = await prisma.posts.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({
      status: 201,
      id: blog.id,
      message: "Blog created sucessfully!",
    });
  } catch (e) {
    return c.json({ message: e });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} =  updateBlogInput .safeParse(body)
  if(!success) {
    return c.json({ error: 'Invalid inputs!' }, 411)
  }
  const blog = await prisma.posts.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    status: 201,
    id: blog.id,
    message: "Blog updated sucessfully!",
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const allBlogs = await prisma.posts.findMany({
      select: {
        id: true,
        content: true,
        title: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    return c.json({ allBlogs });
  } catch (error) {
    return c.json({ error: "Internal server error"  }, 500)
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.posts.findFirst({
      where: {
        id,
      },
      select:{
        id: true,
        title:true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    if (!blog) {
      return c.json({ error: "Blog does not exists!" }, 404)
    }
    return c.json({ blog });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500)
  }
});
