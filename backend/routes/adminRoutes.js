const router = require("express").Router();

const {
  loginAdmin,
  updateStaff,
  changePassword,
  forgetPassword,
  resetPassword,
} = require("../controller/adminController");
const verifyToken = require("../middleware/verifyToken");

//login a admin
router.post("/login", loginAdmin);

//change password
router.patch("/change-password", verifyToken, changePassword);

//forget-password
router.patch("/forgot-password", forgetPassword);

//forget-password
router.patch("/reset-password", resetPassword);

// update a staff
router.patch("/update/:id", verifyToken, updateStaff);

module.exports = router;
