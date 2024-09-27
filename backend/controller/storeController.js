const Store = require('../models/Store');

// add store
module.exports.addStore = async (req, res) => {
  try {
    const newStore = new Store(req.body);
    await newStore.save();
    res.send({
      message: 'Thêm cửa hàng thành công!',
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}
// add all store
module.exports.addAllStore = async (req, res) => {
  try {
    await Store.deleteMany();
    const result = await Store.insertMany(req.body);
    res.json({
      message: 'Thêm cửa hàng thành công!',
      result,
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}
// get all store
module.exports.getShowingStore = async (req, res) => {
  try {
    const result = await Store.find({ status: 'Show' });
    res.json({
      success: true,
      stores: result,
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}