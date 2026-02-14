import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
      required: true,
    },

    casts: {
      type: [
        {
          orgName: {
            type: String,
            required: true,
          },
          profilePictureURL: {
            type: String,
            required: true,
          },
          inMovieName: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },

    director: {
      type: String,
      required: true,
    },
    
    languages: {
      type: [String],
      required: true,
    },

    thumbnailURL: {
      type: String,
      required: true,
    },

    trailerURL: {
      type: String,
      required: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    
  },
  { timestamps: true },
);

export const Movie = model("Movie", movieSchema);
