const nodemailer = require('nodemailer');

/**
 * Sends an email notification to the administrator when a new message is received.
 * @param {Object} messageData 
 */
const sendEmailNotification = async (messageData) => {
    // 1. Create a transporter using environment variables
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587/other ports
        auth: {
            user: process.env.SMTP_USER, // e.g. srikanthc061@gmail.com
            pass: process.env.SMTP_PASS  // SMTP password or App Password
        }
    });

    // 2. Set up high-quality HTML email template
    const mailOptions = {
        from: `"${messageData.name}" <${process.env.SMTP_USER || 'no-reply@srikanthc.dev'}>`,
        to: process.env.ADMIN_EMAIL || 'srikanthc061@gmail.com', // destination email
        replyTo: messageData.email,
        subject: `📬 Portfolio Contact: ${messageData.subject}`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 30px; color: #111; max-width: 600px; border: 1px solid #eaeaea; border-radius: 16px; margin: 0 auto; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="display: inline-block; padding: 12px 24px; background: #000; color: #c4ff6b; border-radius: 12px; font-weight: bold; font-size: 18px; letter-spacing: 1px;">
                        SRI_ PORTFOLIO
                    </div>
                </div>
                <h2 style="font-size: 22px; font-weight: 700; color: #000; margin-top: 0; text-align: center;">New Contact Inquiry Received</h2>
                <p style="font-size: 16px; color: #555; line-height: 1.5; text-align: center; margin-bottom: 30px;">
                    A visitor just submitted a new message through the contact form on your portfolio website.
                </p>
                
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #f0f0f0;">
                    <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: #999; letter-spacing: 0.05em;">Sender Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 6px 0; font-weight: 600; width: 100px; color: #555;">Name:</td>
                            <td style="padding: 6px 0; color: #111;">${messageData.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; font-weight: 600; color: #555;">Email:</td>
                            <td style="padding: 6px 0; color: #111;"><a href="mailto:${messageData.email}" style="color: #6366f1; text-decoration: none;">${messageData.email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; font-weight: 600; color: #555;">Category:</td>
                            <td style="padding: 6px 0; color: #111;"><span style="background: #eef2ff; color: #4f46e5; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">${messageData.subject}</span></td>
                        </tr>
                    </table>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: #999; letter-spacing: 0.05em;">Message Body</h3>
                    <blockquote style="margin: 0; background-color: #000; color: #fff; padding: 20px; border-radius: 12px; font-style: normal; font-size: 15px; line-height: 1.6; border-left: 5px solid #c4ff6b; white-space: pre-wrap;">${messageData.message}</blockquote>
                </div>
                
                <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 30px 0 20px 0;" />
                <p style="font-size: 11px; color: #999; text-align: center; margin: 0;">
                    This notification was automatically sent via your Portfolio Backend Server on Render. 🚀
                </p>
            </div>
        `
    };

    // 3. Send the email if credentials are set
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
            await transporter.sendMail(mailOptions);
            console.log('✅ Email notification sent to admin!');
        } catch (error) {
            console.error('❌ Nodemailer Error sending message email:', error);
        }
    } else {
        console.warn('⚠️ SMTP_USER or SMTP_PASS environment variables are missing in your .env file.');
        console.warn('💡 The contact message has been successfully saved to MongoDB, but email notification was skipped.');
        console.warn('👉 To receive email notifications, add SMTP_USER and SMTP_PASS to your backend\'s .env file!');
    }
};

module.exports = { sendEmailNotification };
