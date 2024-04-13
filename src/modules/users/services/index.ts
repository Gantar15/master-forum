import { MailerEmailService } from "./mailer/mailerEmailService";
import { RedisAuthService } from "./redis/redisAuthService";
import { mailerConnection } from "./mailer/mailerConnection";
import { redisConnection } from "./redis/redisConnection";

const authService = new RedisAuthService(redisConnection);
const emailService = new MailerEmailService(mailerConnection);

export { authService, emailService };
