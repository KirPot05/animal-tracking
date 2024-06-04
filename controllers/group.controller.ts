import { Request, Response } from "express";
import Group from "../models/group.model";
import { CustomRequest } from "../types";
import animalModel from "../models/animal.model";
import { success_response } from "../utils/response";
import groupModel from "../models/group.model";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const addAnimalsToGroup = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const groupId = req.params.id;
    const animals = req.body.animals;

    if (groupId === undefined || groupId === null) {
      return res.status(400).json({ error: "Group ID is required" });
    }

    if (!Array.isArray(animals)) {
      return res.status(400).json({ error: "Group ID is required" });
    }

    const group = await Group.findOne({ _id: groupId, userId });
    if (group === null) {
      return res.status(404).json({ error: "Group not found" });
    }

    let addedAnimalCount = 0;
    for (const animalId of animals) {
      const animal = await animalModel.findByIdAndUpdate(
        animalId,
        { groupId },
        { new: true }
      );

      if (animal !== null) addedAnimalCount++;
    }

    let result = success_response(
      `Added ${addedAnimalCount} animals to the group ${group.name}`
    );
    return res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getGroupMembers = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const groupId = req.params.id;

    if (groupId === undefined) {
      return res.status(400).json({ error: "Invalid group ID" });
    }

    const group = await groupModel.findById(groupId);
    if (group === null) {
      return res.status(404).json({ error: "Group not found" });
    }

    const animals = await groupModel.find({ userId, groupId });
    const content = {
      group,
      animals,
    };

    const result = success_response(
      "Group members fetched successfully",
      content
    );

    return res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
