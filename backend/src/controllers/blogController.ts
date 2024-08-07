import { Context } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'






export const createBlog = async (c :Context )=>{ 
    const body = await  c.req.json()
    const authorId = c.get("userId")

    const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        try {
           const blog = await prisma.blog.create({
            data: {
                title:body.title,
                content: body.content,
                authorId:Number (authorId)
            }
           }) 
           return c.json({
            id: blog.id
           })
        } catch (err) {
            
        }
    
        
    }



export const updateBlog = async (c :Context )=>{ 
    const userId = await c.get('userId');
     const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
   const body =  await c.req.json()
   const updated = await prisma.blog.update({
    where: {
        id: body.id,
        authorId: userId
    },
    data: {
        title:body.title,
        content:body.content
    }
   })
   return c.json({
    message:"blog updated successfully",
    updated
   })
    
    }

export const getBlog =async  (c :Context )=>{ 
    const id = await  c.req.param("id")
     const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try {
            const blog = await prisma.blog.findFirst({
                where: {
                    id:Number(id)
                }
            })
            return c.json({
                blog
            })
        } catch (err) {
                c.status(411);
                return c.json({
                    message:"Error while fetching blog post"
                })
        }
     }

export const getAllBlog =async (c :Context )=>{ 
     const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const blogs = await prisma.blog.findMany()

        return c.json({
            blogs
        })
     }