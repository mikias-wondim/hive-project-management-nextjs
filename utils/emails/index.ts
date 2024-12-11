import { Resend } from 'resend';

const resend = new Resend('re_LmY4FPNd_M6zEBavBrMM6wraFzUrAUDme');

export const emails = {
  async sendWelcomeEmail(email: string) {
    return resend.emails.send({
      from: 'ProjeX <noreply@mrshadrack.com>',
      to: email,
      subject: 'Welcome to ProjeX',
      html: `
        <h1>Welcome to ProjeX!</h1>
        <p>Thank you for signing up. We're excited to have you on board.</p>
        <p>To get started, please verify your email by clicking the link in the confirmation email.</p>
      `,
    });
  },

  async sendPasswordResetEmail(email: string, resetLink: string) {
    return resend.emails.send({
      from: 'ProjeX <noreply@mrshadrack.com>',
      to: email,
      subject: 'Reset your password',
      html: `
        <h1>Reset Your Password</h1>
        <p>You requested to reset your password. Click the link below to set a new password:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    });
  },
};
