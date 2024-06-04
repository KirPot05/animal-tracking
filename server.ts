import express, { urlencoded, json } from "express";
import morgan from "morgan";
import cors from "cors";
import { NODE_ENV } from "./config";
import {
  animalRoutes,
  animalTypeRoutes,
  authRoutes,
  groupRoutes,
  locationRoutes,
} from "./routes";

export function startServer() {
  const app = express();

  app.use(cors());
  app.use(urlencoded({ extended: true }));
  app.use(json());

  if (NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use("/v1/auth", authRoutes);
  app.use("/v1/animals", animalRoutes);
  app.use("/v1/groups", groupRoutes);
  app.use("/v1/animal-types", animalTypeRoutes);
  app.use("/v1/locations", locationRoutes);

  app.get("/", (req, res) => {
    res.send("Hello from System!");
  });

  app.get("/healthcheck", (req, res) => {
    return res.status(200).json({ message: "Server is working fine" });
  });

  app.all("*", (req, res) => {
    res.status(404).send("Nothing found here");
  });

  return app;
}
