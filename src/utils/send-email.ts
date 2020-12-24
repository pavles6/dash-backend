import nodemailer from 'nodemailer'
import { EmailType } from '../types/EmailType'

export const sendEmail = async (
  email: string,
  code: string,
  type: EmailType
): Promise<any> => {
  let testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  } as any)

  let preset = {}

  if (type == EmailType.PasswordChangeRequest)
    preset = {
      from: '"Password change request | Dash" <noreply@dash.io>', // sender address
      to: email, // list of receivers
      subject: 'Confirm your email', // Subject line
      text: `Change password by submitting this code:${code}`, // plain text body
      html: `<p>Change password by using this code: <b>${code}</b></p>`, // html body
    }

  if (type == EmailType.AccountConfirmation)
    preset = {
      from: '"Email Confirmation | Dash" <noreply@dash.io>', // sender address
      to: email, // list of receivers
      subject: 'Activate your account', // Subject line
      text: `To activate your account use this code: ${code}`, // plain text body
      html: `<p>Activate your account by using this code: <b>${code}</b>.</p>`, // html body
    }

  try {
    const info = await transporter.sendMail(preset)

    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (error) {
    throw error
  }
}
