const sendMail = (username, otp) => {
  return `
    <div style="max-width: 400px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border: 1px solid #ddd;">
      <h2 style="text-align: center; font-family: sans-serif;">Your verification OTP</h2>
      <p style="font-family: sans-serif;">Hello ${username},</p>
      <p style="font-family: sans-serif;">Your OTP for verification is <strong>${otp}</strong>. It will expire in 10 minutes.</p>
      <p style="font-family: sans-serif;">Thank you for using our service.</p>
    </div>
  `;
};

module.exports = sendMail;
