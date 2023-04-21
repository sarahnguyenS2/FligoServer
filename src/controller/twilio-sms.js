const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
  process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

const sendOtpSms = async (req, res, next) => {
  const { countryCode, phoneNumber } = req.body;
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode || "84"}${phoneNumber}`,
        channel: "sms",
      });
    res
      .status(200)
      .send(`OTP send successfully!: ${JSON.stringify(otpResponse)}`);
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong!");
  }
};

const verifyOtpSms = async (req, res, next) => {
  const { countryCode, phoneNumber, otp } = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode || "84"}${phoneNumber}`,
        code: otp,
      });
    res
      .status(200)
      .send(`OTP verified successfully!: ${JSON.stringify(verifiedResponse)}`);
  } catch (error) {
    res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong!");
  }
};

exports.sendOtpSms = sendOtpSms;
exports.verifyOtpSms = verifyOtpSms;
