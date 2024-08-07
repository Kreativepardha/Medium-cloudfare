import { Hono } from "hono";
import { createBlog, getAllBlog, getBlog, updateBlog } from "../controllers/blogController";
import { verify } from "hono/jwt";

const router = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables: {
      userId: string;
    }
  }>()
  

router.use("/*", async(c, next) => {
    const authHeader = c.req.header("authorization") || "" ;
    const user = await verify(authHeader, c.env.JWT_SECRET)
    if(user) {
        //@ts-ignore
        c.set("userId", user.id)
      await next()
    } else{
        c.status(403);
        return c.json({
            message:" You are not logged in"
        })
    }
})


router.post("/",createBlog)
router.get("/:id",getBlog)
router.get("/",getAllBlog)
router.put("/",updateBlog)


export {
    router as blogRouter 
}