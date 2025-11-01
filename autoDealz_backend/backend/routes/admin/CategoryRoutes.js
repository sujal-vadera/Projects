const express = require("express");
const router = express.Router()
const { addCategory, getCategory, editCategory, updateCategory, deleteCategory } = require("../../controllers/categoryController");





router.post("/addCategory", addCategory)
router.get("/getCategory", getCategory)
router.get("/editCategory/:id", editCategory)
router.post("/updateCategory/:id", updateCategory)
router.get("/deleteCategory/:id", deleteCategory)



module.exports = router;