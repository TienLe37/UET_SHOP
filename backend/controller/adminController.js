const bcrypt = require("bcryptjs");
const dayjs = require('dayjs');
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const jwt = require('jsonwebtoken');
const { tokenForVerify } = require("../config/auth");
const Admin = require("../models/Admin");
const { generateToken } = require("../utils/token");
const { sendEmail } = require("../config/email");
const { secret } = require("../config/secret");

// login admin
const loginAdmin = async (req, res,next) => {
  // console.log(req.body)
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    // console.log(admin)
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = generateToken(admin);
      res.status(200).json({
        token,
        _id: admin._id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        image: admin.image,
      });
    } else {
      res.status(401).send({
        message: "Email hoặc mật khẩu không chính xác!",
      });
    }
  } catch (err) {
    next(err)
  }
};
// forget password
const forgetPassword = async (req, res,next) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).send({
        message: "Không tìm thấy tài khoản với email này!",
      });
    } else {
      const token = tokenForVerify(admin);
      console.log(token);
      const body = {
        from: secret.email_user,
        to: `${email}`,
        subject: "Đặt lại mật khẩu",
        html: `<h2>Xin chào ${email}</h2>
        <p>Một yêu cầu được gửi để thay đổi mật khẩu tài khoản admin UETShop  </p>

        <p>Liên kết này tồn tại trong <strong> 10 phút</strong>.</p>

        <p style="margin-bottom:20px;">Nhấn vào liên kết bên dưới để đặt lại mật khẩu:</p>

        <a href=${secret.admin_url}/forgot-password/${token} style="background:#0989FF;color:white;border:1px solid #0989FF; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Đặt lại mật khẩu</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at shopecom.adm@gmail.com</p>
        <p style="margin-top: 35px;">Nếu người gửi yêu cầu không phải bạn vui lòng liên hệ shopecom.adm@gmail.com</p>

        <p style="margin-bottom:0px;">Trân trọng</p>
        `,
      };
      admin.confirmationToken = token;
      const date = new Date();
      date.setDate(date.getDate() + 1);
      admin.confirmationTokenExpires = date;
      await admin.save({ validateBeforeSave: false });
      const message = "Vui lòng kiểm tra email để đặt lại mật khẩu!";
      sendEmail(body, res, message);
    }
  } catch (error) {
    next(error)
  }
};
// confirm-forget-password
const resetPassword = async (req, res,next) => {
  try {
    const { token, password } = req.body;
    const admin = await Admin.findOne({ confirmationToken: token });

    if (!admin) {
      return res.status(403).json({
        status: "fail",
        message: "Token không hợp lệ!",
      });
    }
    const expired = new Date() > new Date(admin.confirmationTokenExpires);

    if (expired) {
      return res.status(401).json({
        status: "fail",
        message: "Token đã hết hạn! Vui lòng thử lại.",
      });
    } else {
      const newPassword = bcrypt.hashSync(password);
      await Admin.updateOne(
        { confirmationToken: token },
        { $set: { password: newPassword } }
      );

      admin.confirmationToken = undefined;
      admin.confirmationTokenExpires = undefined;

      await admin.save({ validateBeforeSave: false });

      res.status(200).json({
        message: "Đặt lại mật khẩu thành công!",
      });
    }
  } catch (error) {
    next(error)
  }
};

// change password
const changePassword = async (req,res,next) => {
  try {
    const {email,oldPass,newPass} = req.body || {};
    const admin = await Admin.findOne({ email: email });
    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
    if(!bcrypt.compareSync(oldPass, admin.password)){
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }
    else {
      const hashedPassword = bcrypt.hashSync(newPass);
      await Admin.updateOne({email:email},{password:hashedPassword})
      res.status(200).json({ message: "Đổi mật khẩu thành công!" });
    }
  } catch (error) {
    next(error)
  }
}
// update admin profile
const updateStaff = async (req, res,next) => {
  try {
    const admin = await Admin.findOne({ _id: req.params.id });
    if (admin) {
      admin.name = req.body.name;
      admin.email = req.body.email;
      admin.phone = req.body.phone;
      admin.joiningData = req.body.joiningDate;
      admin.image = req.body.image;
      admin.password =
      req.body.password !== undefined
        ? bcrypt.hashSync(req.body.password)
        : admin.password;
      const updatedAdmin = await admin.save();
      const token = generateToken(updatedAdmin);
      res.send({
        token,
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        image: updatedAdmin.image,
        phone: updatedAdmin.phone,
      });
    } else {
      res.status(404).send({
        message: "Tài khoản này không tồn tại!",
      });
    }
  } catch (err) {
    next(err)
  }
};

module.exports = {
  loginAdmin,
  forgetPassword,
  updateStaff,
  changePassword,
  resetPassword,
};
