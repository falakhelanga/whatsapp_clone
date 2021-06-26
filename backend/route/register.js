import express from "express";
import * as controllers from "../controllers/register.js";

const router = express.Router();

router.route("/").post(controllers.register);
router.route("/login").post(controllers.signIn);

export default router;
