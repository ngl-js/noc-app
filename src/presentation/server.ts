import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/checks/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogDS = new LogRepositoryImpl(new FileSystemDatasource());
const mailServ = new EmailService();

export class Server {
  /**
   * Start app
   */
  public static start() {
    console.log("Server started...");

    // // System Logs
    // new SendEmailLogs(mailServ, fileSystemLogDS).execute("agonzalez@vivo.mx");

    // // Check Google service job
    // const url = "https://google.com";
    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckService(
    //     fileSystemLogDS,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url);
    // });
  }
} // fin clase
