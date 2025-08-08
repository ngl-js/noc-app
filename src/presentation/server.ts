import { LogSeverityLevel } from "../domain/entities/log.entity";
// // Services
// import { CheckService } from "../domain/use-cases/checks/check-service";
// import { CheckServiceMulti } from "../domain/use-cases/checks/check-service-multi";
// import { CronService } from "./cron/cron-service";
// import { EmailService } from "./email/email.service";
// // Use Cases
// import { SendEmailLogs } from "../domain/use-cases/checks/email/send-email-logs";
// Datasources
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
// import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.dadasource";
// import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";

const logRepo = new LogRepositoryImpl(
  new FileSystemDatasource(),
  // new MongoLogDatasource(),
  // new PostgresLogDatasource(),
);
// const logRepoSys = new LogRepositoryImpl(new FileSystemDatasource());
// const logRepoMongo = new LogRepositoryImpl(new MongoLogDatasource());
// const logRepoPostgres = new LogRepositoryImpl(new PostgresLogDatasource());
// const mailServ = new EmailService();

export class Server {
  /**
   * Start app
   */
  public static async start() {
    console.log("Server started...");

    // // System Logs
    // new SendEmailLogs(mailServ, fileSystemLogDS).execute("agonzalez@vivo.mx");

    const logs = await logRepo.getLogs(LogSeverityLevel.high);
    console.log(logs);

    // // Check Google service job
    // const url = "https://goosasasagle.com";
    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckService(
    //     logRepo,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url);
    // });

    // // Check Google service job multi
    // const url = "https://goosasasagle.com";
    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckServiceMulti(
    //     [logRepoSys, logRepoMongo, logRepoPostgres],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url);
    // });
  }
} // fin clase
