import { Request, Response } from "express";
import AnimalModel from "../models/animal.model";
import { z } from "zod";
import { Types } from "mongoose";

export const createAnimal = async (req: Request, res: Response) => {
  const animalBodySchema = z.object({
    name: z.string().min(3, "Enter a valid name with atleast six characters"),
    userId: z.string().refine((id) => Types.ObjectId.isValid(id)),
    animalTypeId: z.string().refine((id) => Types.ObjectId.isValid(id)),
    groupId: z.string().refine((id) => Types.ObjectId.isValid(id)),
  });

  let result = {};

  try {
    const animalBody = animalBodySchema.safeParse(req.body);
    if (!animalBody.success) {
      throw new Error(JSON.stringify(animalBody.error));
    }

    const animal = await AnimalModel.create(req.body);
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await AnimalModel.find();
    res.status(200).json(animals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAnimalById = async (req: Request, res: Response) => {
  try {
    const animal = await AnimalModel.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await AnimalModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await AnimalModel.findByIdAndDelete(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }
    res.status(200).json({ message: "Animal deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
