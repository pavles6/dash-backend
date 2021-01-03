import nodemailer, { SendMailOptions } from 'nodemailer'

export const sendEmail = async (
  subject: string,
  to: string,
  text: string
): Promise<any> => {
  const { SMTP_USERNAME, SMTP_PASSWORD } = process.env

  const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  } as any)

  const data: SendMailOptions = {
    from: 'info.dash.app@gmail.com',
    to,
    text,
    subject,
  }

  try {
    const info = await mail.sendMail(data)

    console.log('Message sent: %s', info.response)
  } catch (error) {
    console.log(error)
    throw error
  }
}
