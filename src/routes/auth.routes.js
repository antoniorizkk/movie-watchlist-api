import express from "express"
import authControllers from "../controllers/auth.controllers.js"
const router = express();

router.post("/register", authControllers.register );

export default router;