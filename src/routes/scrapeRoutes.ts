import { Router } from "express";
import { handleScrape, handleResult } from "../controllers/scrapeController";

const router = Router();

router.post("/scrape", handleScrape);
router.get("/result/:id", handleResult);

export default router;
