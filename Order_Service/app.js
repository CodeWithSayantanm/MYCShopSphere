import express from "express";
import Routes from "./routes/indexRoutes.js";
import dotenv from "dotenv";
import errorHandler from "./error/errorHandler.js";
const app = express();

const PORT = 3003;

app.use(express.json());
app.use("/api/orders", Routes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
