import mongoose from "mongoose";
import z from "zod";

const createSchema = z.object({
  name: z.string().min(3).max(50),
  desc: z.string().min(20).max(5000),

  casts: z
    .array(
      z.object({
        orgName: z.string().min(3).max(50),
        profilePictureURL: z.string().min(3).max(500),
        inMovieName: z.string().min(3).max(50),
      }),
    )
    .min(1),

  director: z.string().min(3).max(50),

  languages: z.array(z.string().min(3).max(20)).min(1),

  thumbnailURL: z.string().min(3).max(500),
  trailerURL: z.string().min(3).max(500),

  releaseDate: z.coerce.date(),
});

const getOneSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {message: "Invalid mongo document id passed"}),
});

const removeSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {message: "Invalid mongo document id passed"}),
});

export { createSchema, getOneSchema, removeSchema };
