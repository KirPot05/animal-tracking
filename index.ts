import { PORT } from "./config";
import animalModel from "./models/animal.model";
import breachModel from "./models/breach.model";
import locationModel from "./models/location.model";
import { startServer } from "./server";
import { connectDB } from "./utils/db";

async function main() {
  try {
    const server = startServer();

    await connectDB();

    server.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error(error);
    process.exit(1);
  }
}

main();

async function helper() {
  const groups = ["665f5f13647db67cf8147669", "665fbb062faf5a8bec551d19"];

  let animals = await animalModel.find();
  for (let i = 0; i < 11; i++) {
    await animalModel.findByIdAndUpdate(animals[i].id, {
      groupId: i < 6 ? groups[0] : groups[1],
    });
  }
}

// helper();

async function util() {
  await locationModel.deleteMany({});
  await breachModel.deleteMany({});

  const groups = ["665f5f13647db67cf8147669", "665fbb062faf5a8bec551d19"];

  const coords = [
    {
      id: "a1",
      lat: 15.88456,
      lng: 75.7015931,
    },
    {
      id: "a2",
      lat: 15.88452,
      lng: 75.7015912,
    },
    {
      id: "a3",
      lat: 15.88453,
      lng: 75.7015912,
    },
    {
      id: "a4",
      lat: 15.88452,
      lng: 75.7015913,
    },
    {
      id: "a5",
      lat: 15.88452,
      lng: 75.7015911,
    },

    {
      id: "a6",
      lat: 15.89453,
      lng: 75.7815911,
    },
    {
      id: "a7",
      lat: 16.88452,
      lng: 76.7015911,
    },
    {
      id: "a8",
      lat: 16.88456,
      lng: 76.7015911,
    },
    {
      id: "a9",
      lat: 16.884532,
      lng: 76.7015911,
    },
    {
      id: "a11",
      lat: 16.884531,
      lng: 76.7015911,
    },
    {
      id: "a10",
      lat: 16.896667,
      lng: 76.8015912,
    },
  ];

  let animals = await animalModel.find({ groupId: groups[0] });

  for (let i = 0; i < 6; i++) {
    await locationModel.create({
      animalId: animals[i].id,
      lat: coords[i].lat,
      lng: coords[i].lng,
    });
  }

  animals = await animalModel.find({ groupId: groups[1] });
  for (let i = 0; i < 5; i++) {
    await locationModel.create({
      animalId: animals[i].id,
      lat: coords[5 + i].lat,
      lng: coords[5 + i].lng,
    });
  }
}

// util();
