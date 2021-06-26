import express from "express";
import * as controllers from "../controllers/convos.js";

const router = express.Router();

router.post("/add", controllers.addConvo);
router.get("/get/:number", controllers.getConvo);
router.post("/addmessage", controllers.addMessage);

export default router;
