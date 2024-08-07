import { Hono } from "hono";
import { signin, signup } from "../controllers/userController";

const router = new Hono ()

router.post("/signup",signup)
router.post("/signin",signin)

export { router as userRouter}

