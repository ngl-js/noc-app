import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";

interface Attachment {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export class EmailService {
  constructor() {}

  private transporter = nodemailer.createTransport({
    service: envs.MAIL_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInfo = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });
      console.log(sentInfo);
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendSysLogs(to: string | string[]) {
    const subject = "Systems logs";
    const htmlBody = `
        <h3>Logs system - NOC</h3>
        <p>Test</p>
        <p>View attached files</p>
    `;
    const attachments: Attachment[] = [
      { filename: "logs-all.logs", path: "./logs/logs-all.log" },
      { filename: "logs-medium.logs", path: "./logs/logs-medium.log" },
      { filename: "logs-high.logs", path: "./logs/logs-high.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
} // Fin clase
