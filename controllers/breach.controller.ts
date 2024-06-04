import { Request, Response } from "express";
import Breach from "../models/breach.model";

export const createBreach = async (req: Request, res: Response) => {
  try {
    const breach = await Breach.create(req.body);
    res.status(201).json(breach);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBreaches = async (req: Request, res: Response) => {
  try {
    const breaches = await Breach.find();
    res.status(200).json(breaches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBreachById = async (req: Request, res: Response) => {
  try {
    const breach = await Breach.findById(req.params.id);
    if (!breach) {
      return res.status(404).json({ error: "Breach not found" });
    }
    res.status(200).json(breach);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBreach = async (req: Request, res: Response) => {
  try {
    const breach = await Breach.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!breach) {
      return res.status(404).json({ error: "Breach not found" });
    }
    res.status(200).json(breach);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBreach = async (req: Request, res: Response) => {
  try {
    const breach = await Breach.findByIdAndDelete(req.params.id);
    if (!breach) {
      return res.status(404).json({ error: "Breach not found" });
    }
    res.status(200).json({ message: "Breach deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
