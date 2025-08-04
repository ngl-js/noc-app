import { CheckService } from "./domain/use-cases/checks/check-service";
import { CronService } from "./presentation/cron/cron-service";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  Server.start();
  const url = "https://google.com";
  CronService.createJob("*/5 * * * * *", () => {
    new CheckService(
      () => console.log(`${url} is ok`),
      (error) => console.log(error),
    ).execute(url);
  });
}
