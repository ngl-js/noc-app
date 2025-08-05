import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly lr: LogRepository,
    private readonly onSuccess: SuccessCallback,
    private readonly onError: ErrorCallback,
  ) {}
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
      this.lr.saveLog(log);
      this.onSuccess && this.onSuccess();
      return true;
    } catch (error) {
      const errMsg = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errMsg,
        level: LogSeverityLevel.high,
        origin: this.serviceName(),
      });
      this.lr.saveLog(log);
      this.onError && this.onError(errMsg);
      return false;
    }
  }

  private serviceName = () => {
    return __filename.split("\\").pop();
  };
} // fin clase
