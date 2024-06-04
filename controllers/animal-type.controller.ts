import { Request, Response } from "express";
import AnimalType from "../models/animal-type.model";

export const createAnimalType = async (req: Request, res: Response) => {
  try {
    const animalType = await AnimalType.create(req.body);
    res.status(201).json(animalType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAnimalTypes = async (req: Request, res: Response) => {
  try {
    const animalTypes = await AnimalType.find();
    res.status(200).json(animalTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAnimalTypeById = async (req: Request, res: Response) => {
  try {
    const animalType = await AnimalType.findById(req.params.id);
    if (!animalType) {
      return res.status(404).json({ error: "AnimalType not found" });
    }
    res.status(200).json(animalType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAnimalType = async (req: Request, res: Response) => {
  try {
    const animalType = await AnimalType.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!animalType) {
      return res.status(404).json({ error: "AnimalType not found" });
    }
    res.status(200).json(animalType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAnimalType = async (req: Request, res: Response) => {
  try {
    const animalType = await AnimalType.findByIdAndDelete(req.params.id);
    if (!animalType) {
      return res.status(404).json({ error: "AnimalType not found" });
    }
    res.status(200).json({ message: "AnimalType deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
