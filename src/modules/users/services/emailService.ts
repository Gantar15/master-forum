import { sendMessage } from "../infra/mail/models/sendMessage";

export interface IEmailService {
  send(sendData: sendMessage): Promise<void>;
  generateCode(): string;
}
