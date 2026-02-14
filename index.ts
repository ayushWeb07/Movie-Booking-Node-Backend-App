import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import { connectToMongoDB } from "./db.ts";

// app config
const app = express();
const port = process.env.PORT! ?? 8080;

// setup middlewares
app.use(express.json());

// home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running!",
  });
});

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
