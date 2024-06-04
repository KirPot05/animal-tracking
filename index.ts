import { PORT } from "./config";
import { startServer } from "./server";
import { connectDB } from "./utils/db";

async function main() {
  try {
    const server = startServer();

    await connectDB();

    server.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
