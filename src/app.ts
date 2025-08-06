import { envs } from "./config/plugins/envs.plugins";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_USER,
  });
  // Server.start();
}
