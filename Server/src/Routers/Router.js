import { Router } from "express";

import * as get from "../controllers/get/index.js";
import * as put from "../controllers/put/index.js";
import * as post from "../controllers/post/index.js";

const router = Router();

router.get("/type", get.getType);
router.get("/tasks", get.getTasks);
router.get("/concept", get.getConcept);
router.get("/shopping", get.getShopping);

router.post("/type", post.postType);
router.post("/tasks", post.postTasks);
router.post("/concept", post.postConcept);
router.post("/shopping", post.postShopping);

router.put("/tasks/:taskId", put.putTasks);

export default router;
