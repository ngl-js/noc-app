import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultiUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckServiceMulti implements CheckServiceMultiUseCase {
  constructor(
    private readonly lr: LogRepository[],
    private readonly onSuccess: SuccessCallback,
    private readonly onError: ErrorCallback,
  ) {}

  private callLogs(log: LogEntity) {
    this.lr.forEach((_lr) => {
      _lr.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        message: `Service ${url} is working`,
        level: LogSeverityLevel.low,
        origin: this.serviceName(),
      });
      this.callLogs(log);
    } catch (error) {
      const errMsg = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errMsg,
        level: LogSeverityLevel.high,
        origin: this.serviceName(),
      });
      this.callLogs(log);
      return false;
    }
  }

  private serviceName = () => {
    return __filename.split("\\").pop();
  };
} // fin clase
