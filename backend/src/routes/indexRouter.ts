import { Hono } from "hono";
import { userRouter } from "./userRouter";
import { blogRouter } from "./blogRouter";

const router = new Hono()

router.route("/user",userRouter)
router.route("/blog", blogRouter)

export {
    router as mainRouter
}