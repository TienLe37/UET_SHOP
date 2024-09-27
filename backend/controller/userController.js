const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/token");
const { sendEmail } = require("../config/email");
const { tokenForVerify } = require("../utils/token");
const { secret } = require("../config/secret");

// sign up
module.exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ status: "fail", message: "Email đã tồn tại!" });
    } else {
      const saved_user = await User.create(req.body);

      const token = saved_user.generateConfirmationToken();
      await saved_user.save({ validateBeforeSave: false });

      const mailData = {
        from: secret.email_user,
        to: `${req.body.email}`,
        subject: "Kích hoạt tài khoản",
        subject: "Xác minh Email của bạn",
        html: `<h2>Xin chào ${req.body.name}</h2>
        <p>Vui lòng xác minh địa chỉ email của bạn để hoàn tất việc đăng ký và đăng nhập vào tài khoản <strong>UETShop</strong>.</p>
  
        <p>Liên kết này sẽ hết hạn trong <strong>15 phút</strong>.</p>
          
        <p style="margin-bottom:20px;">Nhấp vào liên kết bên dưới để kích hoạt tài khoản của bạn</p>
          
        <a href="${secret.shop_url}/email-verify/${token}" style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Xác minh Tài khoản</a>
        
        <p style="margin-top: 35px;">Nếu bạn không khởi tạo yêu cầu này, vui lòng liên hệ ngay với chúng tôi qua địa chỉ email 
        shopecom.adm@gmail.com</p>
          
        <p style="margin-bottom:0px;">Trân trọng cảm ơn.</p>
        <strong>Đội ngũ UETShop</strong>
        
           `,
      };
      const message = "Vui lòng kiểm tra email để xác minh!";
      sendEmail(mailData, res, message);
    }
  } catch (error) {
    console.log('sign up err', error);
    next(error)
  }
};

/**
 * 1. Check if Email and password are given 
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Vui lòng nhập thông tin đăng nhập đầy đủ",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "Thông tin đăng nhập không chính xác. Vui lòng thử lại!",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Thông tin đăng nhập không chính xác. Vui lòng thử lại!",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        error: "Tài khoản của bạn chưa kích hoạt.",
      });
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Đăng nhập thành công",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// get me
module.exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ email: req?.user?.email });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
// confirmEmail
module.exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(403).json({
        status: "fail",
        error: "Mã kích hoạt không hợp lệ.",
      });
    }

    const expired = new Date() > new Date(user.confirmationTokenExpires);

    if (expired) {
      return res.status(401).json({
        status: "fail",
        error: "Mã kích hoạt đã hết hạn",
      });
    }

    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;

    user.save({ validateBeforeSave: false });

    const accessToken = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Kích hoạt tài khoản thành công.",
      data: {
        user: others,
        token: accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// forgetPassword
module.exports.forgetPassword = async (req, res) => {
  try {
    const { verifyEmail } = req.body;
    const user = await User.findOne({ email: verifyEmail });
    if (!user) {
      return res.status(404).send({
        message: "Không tồn tại tài khoản với email này!",
      });
    } else {
      const token = tokenForVerify(user);
      const body = {
        from: secret.email_user,
        to: `${verifyEmail}`,
        subject: "Đặt lại mật khẩu",
        html: `<h2>Xin chào ${verifyEmail}</h2>
        <p>Một yêu cầu đã được nhận để thay đổi mật khẩu cho tài khoản của bạn trên <strong>UETShop</strong>.</p>

        <p>Liên kết này sẽ hết hạn trong <strong>15 phút</strong>.</p>
        
        <p style="margin-bottom:20px;">Nhấn vào liên kết sau để đặt lại mật khẩu</p>
        
        <a href=${secret.shop_url}/forget-password/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Đặt lại mật khẩu</a>
        
        <p style="margin-top: 35px;">Nếu bạn không phải là người gửi yêu cầu, vui lòng liên hệ ngay với chúng tôi tại 
        shopecom.adm@gmail.com</p>
        
        <p style="margin-bottom:0px;">Trân trọng cảm ơn.</p>
        <strong>Đội ngũ UETShop</strong>
        
        `,
      };
      user.confirmationToken = token;
      const date = new Date();
      date.setDate(date.getDate() + 1);
      user.confirmationTokenExpires = date;
      user.save({ validateBeforeSave: false });
      const message = "Please check your email to reset password Vui lòng kiểm tra email để đặt lại mật khẩu!";
      sendEmail(body, res, message);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// confirm-forget-password
module.exports.confirmForgetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(403).json({
        status: "fail",
        error: "Mã kích hoạt không hợp lệ.",
      });
    }

    const expired = new Date() > new Date(user.confirmationTokenExpires);

    if (expired) {
      return res.status(401).json({
        status: "fail",
        error: "Mã kích hoạt hết hạn.",
      });
    } else {
      const newPassword = bcrypt.hashSync(password);
      // console.log(newPassword)
      await User.updateOne(
        { confirmationToken: token },
        { $set: { password: newPassword } }
      );

      user.confirmationToken = undefined;
      user.confirmationTokenExpires = undefined;

      user.save({ validateBeforeSave: false });

      res.status(200).json({
        status: "success",
        message: "Đặt lại mật khẩu thành công!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// change password
module.exports.changePassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "Thông tin đăng nhập không chính xác." });
    }
    // Compare the current password with the one in the database
    const isMatch = bcrypt.compareSync(password, user.password);
    // If the current password is incorrect
    if (!isMatch) {
      return res.status(401).json({ message: "Thông tin đăng nhập không chính xác." });
    }
    const hashedPassword = bcrypt.hashSync(req.body.newPassword);
    await User.updateOne({ email: email }, { password: hashedPassword })

    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update a profile
module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.address = req.body.address;
      user.bio = req.body.bio;
      const updatedUser = await user.save();
      const token = generateToken(updatedUser);
      res.status(200).json({
        status: "success",
        message: "Cập nhật hồ sơ thành công.",
        data: {
          user: updatedUser,
          token,
        },
      });
    }
  } catch (err) {
    console.log(err)
    res.status(404).send({
      message: 'Địa chỉ email không chính xác.!',
    });
  }
};
