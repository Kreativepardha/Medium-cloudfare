import { Context } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { createBlogInput, updateBlogInput } from "@saradhipardha/medium-common";






export const createBlog = async (c :Context )=>{ 
    const body = await  c.req.json()
    const authorId = c.get("userId")

    const { success} = createBlogInput.safeParse(body)
        if(!success) {
            c.status(411);
            return c.json({
                message:"Inputs not correct "
            })
        }
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
            message:"Blog create Successfully",
            id: blog.id
           })
        } catch (err) {
            c.status(500)
            c.json({
                message:"Internal server error"
            })
            
        }
    
        
    }



    export const updateBlog = async (c :Context )=>{ 
    const body =  await c.req.json()
    const userId = await c.get('userId');
    const {success } = updateBlogInput.safeParse(body)
        if(!success) {
            c.status(411)
            return c.json({
                message:"Inputs not correct"
            })

        }  
     const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
  try {
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
  } catch (err) {
    c.status(500)
    c.json({
        message:"Internal server error"
    })
  }
  
    
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
//sennding blog details with the author(user) deets too 
        const blogs = await prisma.blog.findMany({
            select: {
                content:true,
                title:true,
                id:true,
                author: {
                    select: {
                        name:true
                    }
                }
            }
        })

        return c.json({
            blogs
        })
     }