import nodemailer from 'nodemailer';
import EnvConstant from '../constants/envConstants.js';
import type { ISendEmailOptions } from '@/types/emailTypes.js';

class EmailUtils {
  private transporter;

  constructor() {
    const smtpPort = Number(EnvConstant.SMTP_PORT);

    this.transporter = nodemailer.createTransport({
      host: EnvConstant.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: EnvConstant.SMTP_USER,
        pass: EnvConstant.SMTP_PASS,
      },
    });
  }

  async sendEmail({
    to,
    subject,
    text,
    html,
  }: ISendEmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: `"Knot App" <${EnvConstant.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully: ${info.messageId}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Email sending failed', { cause: error });
    }
  }
}

export default new EmailUtils();
