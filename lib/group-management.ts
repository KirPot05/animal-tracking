import * as nj from "numjs";

interface AnimalLocation {
  id: string;
  lat: number;
  lng: number;
}

class GroupManagement {
  static radians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  static haversine(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371000; // Radius of the Earth in meters
    const phi1 = GroupManagement.radians(lat1);
    const phi2 = GroupManagement.radians(lat2);
    const deltaPhi = GroupManagement.radians(lat2 - lat1);
    const deltaLambda = GroupManagement.radians(lon1 - lon2);

    const a =
      Math.sin(deltaPhi / 2) ** 2 +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Output distance in meters
    return distance;
  }

  isAwayFromHerd(animals: AnimalLocation[], thresholdFactor: number = 0.25) {
    // Calculate centroid of the herd
    const latitudes = animals.map((animal) => animal.lat);
    const longitudes = animals.map((animal) => animal.lng);

    const centroidLat = nj.array(latitudes).mean();
    const centroidLon = nj.array(longitudes).mean();

    // Calculate distances to centroid for each animal
    const distancesToCentroid = animals.map((animal) =>
      GroupManagement.haversine(
        centroidLat,
        centroidLon,
        animal.lat,
        animal.lng
      )
    );

    // Calculate mean and standard deviation of distances
    const distancesArray = nj.array(distancesToCentroid);
    const meanDistance = distancesArray.mean();
    const stdDistance = distancesArray.std();
    const threshold = meanDistance + stdDistance * thresholdFactor;

    // Determine animals away from the herd
    const awayAnimals: string[] = [];
    const awayAnimalsWithDistances: [string, number, number, number][] = [];

    animals.forEach((animal, index) => {
      if (distancesToCentroid[index] > threshold) {
        awayAnimals.push(animal.id);
        awayAnimalsWithDistances.push([
          animal.id,
          distancesToCentroid[index],
          animal.lat,
          animal.lng,
        ]);
      }
    });

    return [awayAnimals, awayAnimalsWithDistances];
  }
}

// herd management
// edge cases for herd management
// simulate live tracking
// Alert system

// Prediction system
/*
    Cases:
        1. If device is connected and out of herd
        2. If device is not sending data from a threshold time (modifiable)
*/

// Function to calculate the distance between two latitude/longitude points using the Haversine formula

// Function to convert degrees to radians

// Define the Animal interface

// Sample input data in JSON format
const jsonData = [
  { id: "animal1", lat: 34.052235, lon: -118.243683 },
  { id: "animal2", lat: 34.052245, lon: -118.243673 },
  { id: "animal3", lat: 34.052255, lon: -118.243663 },
  { id: "animal4", lat: 34.052265, lon: -118.243653 },
  { id: "animal5", lat: 34.052275, lon: -118.243643 },
  { id: "animal6", lat: 34.052285, lon: -118.243633 },
  { id: "animal7", lat: 34.052295, lon: -118.243623 },
  { id: "animal8", lat: 34.052305, lon: -118.243613 },
  { id: "animal9", lat: 34.052315, lon: -118.243603 },
  { id: "animal10", lat: 34.052325, lon: -118.243593 },
  { id: "animal11", lat: 34.052335, lon: -118.263583 },
  { id: "animal12", lat: 34.052345, lon: -118.243573 },
  { id: "animal13", lat: 34.052355, lon: -118.243563 },
  { id: "animal14", lat: 34.052365, lon: -118.243553 },
  { id: "animal15", lat: 34.065245, lon: -118.255473 },
  { id: "animal16", lat: 34.065245, lon: -118.255473 },
  { id: "animal17", lat: 34.065245, lon: -118.253683 },
  { id: "animal18", lat: 34.065245, lon: -118.253673 },
  { id: "animal19", lat: 34.065245, lon: -118.253683 },
  { id: "animal20", lat: 34.065245, lon: -118.253673 },
  { id: "animal21", lat: 34.065245, lon: -118.243483 },
  { id: "animal22", lat: 34.065245, lon: -118.253683 },
  { id: "animal23", lat: 34.065245, lon: -118.253673 },
  { id: "animal24", lat: 34.065245, lon: -118.253683 },
  { id: "animal25", lat: 34.065245, lon: -118.253673 },
];
export function moveHerd(
  startLocation: { lat: number; lng: number },
  finalCoords: { id: number; lat: number; lng: number }[],
  steps = 100
) {
  const startLocations = {
    group1: { lat: 15.0, lng: 75.0 },
    group2: { lat: 16.0, lng: 76.0 },
  };

  const coords = [
    { id: "a1", lat: 15.88456, lng: 75.7015931 },
    { id: "a2", lat: 15.88452, lng: 75.7015912 },
    { id: "a3", lat: 15.88453, lng: 75.7015912 },
    { id: "a4", lat: 15.88452, lng: 75.7015913 },
    { id: "a5", lat: 15.88452, lng: 75.7015911 },
    { id: "a6", lat: 15.89453, lng: 75.7815911 },
    { id: "a7", lat: 16.88452, lng: 76.7015911 },
    { id: "a8", lat: 16.88456, lng: 76.7015911 },
    { id: "a9", lat: 16.884532, lng: 76.7015911 },
    { id: "a11", lat: 16.884531, lng: 76.7015911 },
    { id: "a10", lat: 16.896667, lng: 76.8015912 },
  ];

  const movements = [];

  for (let i = 0; i <= steps; i++) {
    const stepFactor = i / steps;

    const herdMovements = finalCoords.map((coord) => ({
      id: coord.id,
      lat: startLocation.lat + stepFactor * (coord.lat - startLocation.lat),
      lng: startLocation.lng + stepFactor * (coord.lng - startLocation.lng),
    }));

    movements.push(herdMovements);
  }

  return movements;
}

export default GroupManagement;
