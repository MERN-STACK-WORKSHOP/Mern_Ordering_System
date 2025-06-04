const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: {
      type: Number,
      default: null,
    },
    otpExpiresIn: {
      type: Date,
      default: function () {
        return this.otp ? new Date(Date.now() + 10 * 60 * 1000) : null;
      },
    },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
