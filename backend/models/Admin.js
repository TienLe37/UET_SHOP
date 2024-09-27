const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    password: {
      type: String,
      required: false,
      default: bcrypt.hashSync("12345678"),
    },
    joiningDate: {
      type: Date,
      required: false,
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
  },
  {
    timestamps: true, 
  }
);

// generateConfirmationToken
adminSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.confirmationToken = token;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
