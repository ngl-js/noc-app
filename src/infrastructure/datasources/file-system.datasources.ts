import fs from "node:fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      },
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logStr = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogsPath, logStr);
    if (newLog.level === LogSeverityLevel.low) return;
    if (newLog.level == LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logStr);
    } else {
      fs.appendFileSync(this.highLogsPath, logStr);
    }
  }

  private parseLogFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");

    const logs = content
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map(LogEntity.formJson);

    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.parseLogFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.parseLogFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.parseLogFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
} // Fin clase
