import { Router, Request, Response } from "express";
import { requireUser } from "../middleware/auth.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { connectorsService } from "../../infrastructure/di/container.js";
import { ConnectorDto } from "../dtos/integrations.dto.js";
import { IdParamDto } from "../dtos/common.dto.js";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const data = await connectorsService.getAll(uid);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch connectors" });
  }
};

export const create = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const result = await connectorsService.create(uid, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create connector" });
  }
};

export const createBulk = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const items = Array.isArray(req.body) ? req.body : [];
    const result = await connectorsService.createBulk(uid, items);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create bulk connectors" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const uid = requireUser(req, res);
  if (!uid) return;
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await connectorsService.deleteById(uid, id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete connector" });
  }
};

const router = Router();
router.get("/", getAll);
router.post("/", validateBody(ConnectorDto), create);
router.post("/bulk", validateBody(z.array(ConnectorDto)), createBulk);
router.delete("/:id", validateParams(IdParamDto), deleteById);
export default router;

