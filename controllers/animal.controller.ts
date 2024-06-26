import { Request, Response } from "express";
import AnimalModel from "../models/animal.model";
import { z } from "zod";
import { Types } from "mongoose";
import { CustomRequest } from "../types";
import GroupModel from "../models/group.model";
import BreachModel from "../models/breach.model";

export const createAnimal = async (req: Request, res: Response) => {
  const animalBodySchema = z.object({
    name: z.string().min(3, "Enter a valid name with atleast six characters"),
    userId: z.string().refine((id) => Types.ObjectId.isValid(id)),
    animalTypeId: z.string().refine((id) => Types.ObjectId.isValid(id)),
    groupId: z
      .string()
      .refine((id) => Types.ObjectId.isValid(id))
      .optional(),
  });

  let result = {};

  try {
    const animalBody = animalBodySchema.safeParse(req.body);
    if (!animalBody.success) {
      throw new Error(JSON.stringify(animalBody.error));
    }

    const animal = await AnimalModel.create(req.body);
    res.status(201).json(animal);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await AnimalModel.find();
    res.status(200).json(animals);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserAnimals = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const animals = await AnimalModel.find({ userId });

    let animal: any;
    for (animal of animals) {
      if (!Types.ObjectId.isValid(animal.groupId)) continue;

      const group = await GroupModel.findById(animal.groupId);
      animal._doc.group = group;

      const breaches = await BreachModel.countDocuments({
        animalId: animal.id,
      });

      animal._doc.breaches = breaches;
    }

    res.status(200).json(animals);
  } catch (error: any) {
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
  } catch (error: any) {
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
  } catch (error: any) {
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
