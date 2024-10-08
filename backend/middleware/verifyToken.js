const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { secret } = require("../config/secret");
/**
 * 1. check if token exists
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid next
 */

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if(!token){
      return res.status(401).json({
        status: "fail",
        error: "Vui lòng đăng nhập"
      });
    }

    const decoded = await promisify(jwt.verify)(token, secret.token_secret);

    // const user = User.findOne({ email: decoded.email })

    req.user = decoded;

    next();


  } catch (error) {
    console.log(error)
    res.status(403).json({
      status: "fail",
      error: "Token không hợp lệ"
    });
  }
};