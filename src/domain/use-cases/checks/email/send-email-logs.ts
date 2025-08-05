import { EmailService } from "../../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../../entities/log.entity";
import { LogRepository } from "../../../repository/log.repository";

interface SendEmailLogUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogUseCase {
  constructor(
    private readonly email: EmailService,
    private readonly lr: LogRepository,
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.email.sendSysLogs(to);
      if (!sent) {
        throw new Error("Email log not sent");
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: "System logs sended",
        origin: __filename.split("\\").pop(),
      });

      this.lr.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: __filename.split("\\").pop(),
      });
      this.lr.saveLog(log);

      return false;
    }
  }
} // Fin clase
