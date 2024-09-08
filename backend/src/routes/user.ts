import {Hono} from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {signupInput, signinInput} from '@100xdevs/medium-common'

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string
    };
  }>();;

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} =  signupInput.safeParse(body)
    if(!success) {
      return c.json({status: 411, message: 'Invalid inputs!'})
    }
    try {
      const newUser = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      });
  
      const token = await sign({id: newUser.id}, c.env.JWT_SECRET)
  
      return c.json({status: 201, message: 'Signed up!', token})
  
    } catch (e) {
      c.status(411)
      return c.text('Invalid ')
    }
  });
  
  userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} =  signinInput.safeParse(body)
    if(!success) {
      return c.json({status: 411, message: 'Invalid inputs!'})
    }
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    })
    if(!user) {
      return c.json({
        status: '401',
        message: 'Incorrect Creds'
      })
    }
  
    const token =  await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({
      status: '200',
      token
    })
  
  });
  