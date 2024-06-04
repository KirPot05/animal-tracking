import { Request, Response } from "express";
import Location from "../models/location.model";
import AnimalModel from "../models/animal.model";
import LocationModel from "../models/location.model";
import { CustomRequest } from "../types";
import GroupManagement from "../lib/group-management";
import { success_response } from "../utils/response";

export const createLocation = async (req: Request, res: Response) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserAnimalLocations = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const userId = req.userId!;
    // Find user's animals
    const animals = await AnimalModel.find({ userId });

    const animalLocations = [];
    // Find locations of these animals
    for (const animal of animals) {
      const animalId = animal.id;
      const locations = await LocationModel.find({ animalId }).sort({
        createdAt: -1,
      });
      const updatedLocations = locations.map((location) => ({
        id: animal.id,
        lat: location.lat,
        lng: location.lng,
        locationId: location.id,
      }));

      animalLocations.push(...updatedLocations);
    }

    // Perform away-algo on these animal locations
    const groupManagement = new GroupManagement();
    const [_, awayAnimalsWithDistances] =
      groupManagement.isAwayFromHerd(animalLocations);

    // Update the flag of the animal-location to used
    const animalLocationIds = animalLocations.map(
      (location) => location.locationId
    );
    const animalLocationUpdatePromises: any = [];

    animalLocationIds.forEach((locationId) => {
      const promise = LocationModel.findByIdAndUpdate(locationId, {
        isDisplayed: true,
      });

      animalLocationUpdatePromises.push(promise);
    });

    await Promise.all(animalLocationUpdatePromises);

    animalLocations.forEach((animalLocation) => {
      AnimalModel.findByIdAndUpdate(animalLocation.id, {
        loc_data: {
          lat: animalLocation.lat,
          lng: animalLocation.lng,
        },
      });
    });

    // Send away animals as well as other animals
    /*
      {
        animals: AnimalLocation[]
        awayAnimals: Animal[]
      }
    */

    let content = {
      animals: animalLocations.filter(
        (location) => !awayAnimalsWithDistances.includes(location.id)
      ),

      awayAnimals: awayAnimalsWithDistances,
    };

    let result = success_response("Fetching animals successful", content);

    return res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
