import type { Request, Response } from "express";
import { sendResponse } from "../utils/apiResponse.ts";
import {
  createSchema,
  getOneSchema,
  removeSchema,
} from "../utils/validations/movies.validation.ts";
import z from "zod";
import { Movie } from "../models/movie.model.ts";

// create movie
const create = async (req: Request, res: Response) => {
  try {
    // validation on body
    const validationOutput = await createSchema.safeParseAsync(req.body);

    if (!validationOutput.success) {
      return sendResponse(
        res,
        400,
        false,
        "Validation failed while creating movie",
        null,
        z.treeifyError(validationOutput.error),
      );
    }

    const {
      name,
      desc,
      casts,
      director,
      languages,
      thumbnailURL,
      trailerURL,
      releaseDate,
    } = validationOutput.data;

    // create the movie
    const newMovie = await Movie.create({
      name,
      desc,
      casts,
      director,
      languages,
      thumbnailURL,
      trailerURL,
      releaseDate,
    });

    if (!newMovie) {
      return sendResponse(res, 404, false, "Failed to add the movie");
    }

    return sendResponse(
      res,
      201,
      true,
      "The movie was successfully added",
      newMovie,
      null,
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Something went wrong while adding the movie",
      null,
      error,
    );
  }
};

// get all movie
const getAll = async (req: Request, res: Response) => {
  return sendResponse(res, 200, true, "Movies Get All controller works fine");
};

// get one movie
const getOne = async (req: Request, res: Response) => {
  try {
    // validation on params
    const validationOutput = await getOneSchema.safeParseAsync(req.params);

    if (!validationOutput.success) {
      return sendResponse(
        res,
        400,
        false,
        "Validation failed while getting a single movie",
        null,
        z.treeifyError(validationOutput.error),
      );
    }

    const { id } = validationOutput.data;

    // get the movie
    const movie = await Movie.findById(id);

    if (!movie) {
      return sendResponse(res, 404, false, "Such movie doesn't exist");
    }

    return sendResponse(
      res,
      200,
      true,
      "The movie was successfully fetched",
      movie,
      null,
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Something went wrong while fetching the movie",
      null,
      error,
    );
  }
};

// update movie
const update = async (req: Request, res: Response) => {
  return sendResponse(res, 200, true, "Movies Update controller works fine");
};

// remove movie
const remove = async (req: Request, res: Response) => {
  try {
    // validation on params
    const validationOutput = await removeSchema.safeParseAsync(req.params);

    if (!validationOutput.success) {
      return sendResponse(
        res,
        400,
        false,
        "Validation failed while removing the movie",
        null,
        z.treeifyError(validationOutput.error),
      );
    }

    const { id } = validationOutput.data;

    // delete the movie
    const removedMovie = await Movie.findByIdAndDelete(id);

    if (!removedMovie) {
      return sendResponse(res, 404, false, "Such movie doesn't exist");
    }

    return sendResponse(
      res,
      200,
      true,
      "The movie was successfully removed",
      removedMovie,
      null,
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Something went wrong while removing the movie",
      null,
      error,
    );
  }
};

export { create, getAll, getOne, update, remove };
