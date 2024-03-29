import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, addUpdateSetting } from "./hooks.js";

const genreList = ["fantastic", "love story"];
const releaseYearRegexp = /^\d{4}$/;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
      enum: genreList,
      required: true,
    },
    releaseYear: {
      type: String,
      match: releaseYearRegexp,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

movieSchema.post("save", handleSaveError);

movieSchema.pre("findOneAndUpdate", addUpdateSetting);

movieSchema.post("findOneAndUpdate", handleSaveError);

export const movieAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title" is a required field`,
  }),
  director: Joi.string().required(),
  favorite: Joi.boolean(),
  genre: Joi.string()
    .valid(...genreList)
    .required(),
  releaseYear: Joi.string().pattern(releaseYearRegexp).required(),
});

export const movieUpdateSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),
  favorite: Joi.boolean(),
  genre: Joi.string().valid(...genreList),
  releaseYear: Joi.string().pattern(releaseYearRegexp),
});

export const movieUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Movie = model("movie", movieSchema);
// category => categories
// mouse => mice

export default Movie;
