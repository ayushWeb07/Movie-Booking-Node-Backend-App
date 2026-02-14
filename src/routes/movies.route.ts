import { Router } from "express";
import * as movies from "../controllers/movies.controller.ts";

const router = Router();

// POST /
router.post("/", movies.create);

// GET /
router.get("/", movies.getAll);

// GET /:id
router.get("/:id", movies.getOne);

// PUT /:id
router.put("/:id", movies.update);

// DELETE /:id
router.delete("/:id", movies.remove);

export default router;
