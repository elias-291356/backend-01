import express from "express";

import moviesController from "../../controllers/movies-controller.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import {
  movieAddSchema,
  movieUpdateSchema,
  movieUpdateFavoriteSchema,
} from "../../models/Movie.js";

import { validateBody } from "../../decorators/index.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesController.getAll);

moviesRouter.get("/:id", moviesController.getById);

moviesRouter.post(
  "/",
  isEmptyBody,
  validateBody(movieAddSchema),
  moviesController.add
);

moviesRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(movieUpdateSchema),
  moviesController.updateById
);

moviesRouter.delete("/:id", isValidId, moviesController.deleteById);
moviesRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(movieUpdateFavoriteSchema),
  moviesController.updateById
);

export default moviesRouter;
