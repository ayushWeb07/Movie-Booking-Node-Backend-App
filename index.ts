import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import { connectToMongoDB } from "./db.ts";
import moviesRoute from "./src/routes/movies.route.ts";

// app config
const app = express();
const port = process.env.PORT! ?? 8080;

// setup middlewares
app.use(express.json());

// home route
app.get("/api/v1", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the v1 of the Movies App API",
  });
});

// setup all the routes
app.use("/api/v1/movies", moviesRoute);

// spin up server
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);

  // connect app to DB
  connectToMongoDB(process.env.DB_CONNECTION_URL!)
    .then(() => {
      console.log(`Server connected to the DB...`);
    })
    .catch((err) => {
      console.log(`Server failed to connect to the DB.\n${err}`);
    });
});
