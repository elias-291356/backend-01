import express from "express";

import moviesController from "../../controllers/movies-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesController.getAll);

moviesRouter.get("/:id", moviesController.getById);

moviesRouter.post("/", isEmptyBody, validateBody(), moviesController.add);

moviesRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(),
  moviesController.updateById
);

moviesRouter.delete("/:id", moviesController.deleteById);

export default moviesRouter;
