import express from "express";
import helmet from "helmet";
import cors from "cors";
import scrapeRoutes from "./routes/scrapeRoutes";
import { CONFIG } from "./config/config";

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:4000",
  credentials: true,
}));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", scrapeRoutes);

app.listen(CONFIG.PORT, () => {
  console.log("Server running on port", CONFIG.PORT);
});
