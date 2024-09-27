const express = require("express");
const {
  addStore,
  getShowingStore,
  addAllStore,
} = require("../controller/storeController");

const router = express.Router();

//add a brand
router.post("/add", addStore);
//add all brand
router.post("/add-all", addAllStore);
//get only showing brand
router.get("/show", getShowingStore);

module.exports = router;
