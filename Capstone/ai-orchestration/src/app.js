import express from "express";
import morgan from "morgan";

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, World!",
    status: "success",
  });
}   );

export default app;