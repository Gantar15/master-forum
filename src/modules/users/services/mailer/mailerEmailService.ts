import { IEmailService } from "../emailService";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Transporter } from "nodemailer";
import crypto from "crypto";
import { sendMessage } from "../../infra/mail/models/sendMessage";

export class MailerEmailService implements IEmailService {
  constructor(
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>
  ) {}
  async send(sendData: sendMessage) {
    await this.transporter.sendMail(sendData);
  }
  generateCode() {
    const buffer = crypto.randomBytes(16);
    const code = buffer.toString("hex");
    return code;
  }
}
