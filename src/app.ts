// import { envs } from "./config/plugins/envs.plugins";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  Server.start();
}
