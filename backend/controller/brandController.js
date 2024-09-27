const Brand = require('../models/Brand');
const brandService = require('../services/brand.service');

// add a brand 
exports.addBrand = async (req, res,next) => {
  try {
    const result = await brandService.addBrandService(req.body);
    res.status(201).json({
      status: "success",
      message: "Thêm thương hiệu thành công"
    });
  } catch (error) {
    next(error)
  }
}

// add all Brand
exports.addAllBrand = async (req,res,next) => {
  try {
    const result = await brandService.addAllBrandService(req.body);
    res.status(201).json({
      message:'Thêm thương hiệu thành công',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get active Brand
exports.getAllBrands = async (req,res,next) => {
  try {
    const result = await Brand.find({},{name:1,email:1,logo:1,website:1,location:1});
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get active Brand
exports.getActiveBrands = async (req,res,next) => {
  try {
    const result = await brandService.getBrandsService();
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}

// delete Brand
exports.deleteBrand = async (req,res,next) => {
  try {
    await brandService.deleteBrandsService(req.params.id);
    res.status(200).json({
      success:true,
      message:'Xóa thương hiệu thành công',
    })
  } catch (error) {
    next(error)
  }
}

// update category
exports.updateBrand = async (req,res,next) => {
  try {
    const result = await brandService.updateBrandService(req.params.id,req.body);
    res.status(200).json({
      status:true,
      message:'Cập nhật thương hiệu thành công',
      data:result,
    })
  } catch (error) {
    next(error)
  }
}

// get single category
exports.getSingleBrand = async (req,res,next) => {
  try {
    const result = await brandService.getSingleBrandService(req.params.id);
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}