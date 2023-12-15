import { Router } from "express";

import { getShopping } from '../controllers/get/getShopping.js'
import { postInsectShopping } from '../controllers/post/postInsectShopping.js'
import { postConcept } from '../controllers/post/postConcept.js'
import { postType } from '../controllers/post/postType.js'

const router = Router();



router.get("/", (req, res) => {
  return res.json("router");
});

router.get("/shopping", getShopping)

router.post("/shopping", postInsectShopping)
router.post("/concept", postConcept)
router.post("/type", postType)



export default router;