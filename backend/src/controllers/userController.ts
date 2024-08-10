import { Context } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from "hono/jwt";
import bcrypt from 'bcryptjs'
import { signinInput, signupInput } from "@saradhipardha/medium-common";


export const signup = async (c: Context) => {
        const body = await c.req.json();
    const { success } = signupInput.safeParse(body)
    if(!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try {

                    const existingUser = await prisma.user.findFirst({
                        where:{email: body.email}
                    })

                    if(existingUser) {
                        c.status(403)
                        return c.json({
                            message:"user already existss"
                        })
                }
                // return res.status(411).json({})

                    const hashedPassword = await bcrypt.hash(body.password,10);
                     const user = await prisma.user.create({
                        data:{
                            name: body.name,
                            email: body.email,
                            password:hashedPassword,
                        }
                    })
                  
                    const jwt = await sign({
                        id:user.id
                    }, c.env.JWT_SECRET)

                    return c.json({message:"signup sucess",token:jwt})

                        } catch (err) {
                            c.status(500)
                            return c.text("Internal server error")
                                        
                        }

}

export const signin = async (c: Context) => {
    const body = await c.req.json()

    const { success }  = signinInput.safeParse(body);
        if(!success) {
            c.status(411)
            c.json({
                message:"Inputs not correct"
            })
        }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                }
        })
        if (!user) {
            c.status(403);
            return c.json({
              message: "Incorrect credentials"
            });
          }

        const isValidPass = await bcrypt.compare(body.password, user.password)
        if(!isValidPass) {
            c.status(403)
            return c.json({
                message:"Incorrect PAssword"
            })
        }

        const jwt = await sign({
            id:user.id
        }, c.env.JWT_SECRET)
        
        return c.json({
            message:"Signed in successfully",
            jwt
        })
    } catch (err)  {
        console.log(err)
        c.status(411)
        return c.text("Invalid")
        
    }    

}

