import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { scrapeURL } from "../services/scrapeService";
import { saveTemp, getTemp } from "../services/tempStore";
import { z } from "zod";

const scrapeSchema = z.object({
  url: z.string().url(),
});

export async function handleScrape(req: Request, res: Response) {
  try {
    const parsed = scrapeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    const { url } = parsed.data;
    const html = await scrapeURL(url);

    const id = uuid();
    saveTemp(id, html);

    const fullUrl = `${req.protocol}://${req.get("host")}/result/${id}`;

    return res.json({
      success: true,
      tempLink: `/result/${id}`,
      fullUrl,
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export function handleResult(req: Request, res: Response) {
  const id = req.params.id;
  const data = getTemp(id);

  if (!data) {
    return res.status(404).send("Expired or not found");
  }

  res.setHeader("Content-Type", "text/html");
  return res.send(data);
}
