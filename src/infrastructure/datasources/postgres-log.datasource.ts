import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";

const prisma = new PrismaClient();

const severetyEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const _level = severetyEnum[log.level];
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: _level,
      },
    });
    console.log(`Postgres Log created: ${newLog.id}`);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const _level = severetyEnum[severityLevel];
    const logs = await prisma.logModel.findMany({
      where: {
        level: _level,
      },
    });

    return logs.map(LogEntity.fromObj);
  }
}
