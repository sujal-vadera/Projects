const express = require("express")
const router = express.Router()
const categorySchema = require("../models/Category")

const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body

        if (!categoryName) {
            res.status(400).json({ message: "Category name is required" });
        }

        const catObj = new categorySchema({ categoryName: req.body.categoryName })
        const result = await catObj.save();
        res.status(200).json({ message: " Category successfully added", data: result })
        // console.log(result)
    } catch (error) {
        res.status(500).json({ message: "error in adding category", data: error })
    }
}

const getCategory = async (req, res) => {
    try {
        const getcatData = await categorySchema.find();
        if (getcatData) {
            res.status(200).json({ message: " successfull fetch data", data: getcatData })
        }
        // console.log(getcatData)

    } catch (error) {
        res.status(500).json({ message: "error in geting category", data: error })
    }
}


const editCategory = async (req, res) => {
    try {
        const catid = req.params.id;
        // console.log("ID from params:", req.params.id)
        const result = await categorySchema.findById(catid);
        // console.log("Result:", result);
        // console.log(catid)
        if (result) {
            res.status(200).json({ message: "Category fetched successfully", data: result });
        } else {
            res.status(404).json({ message: "Category not found" });
        }

    } catch (error) {
        // console.log("Edit category error:", error.message);
        res.status(500).json({ message: "Error fetching category", data: error });
    }

}

const updateCategory = async (req, res) => {
    try {
        const catid = req.params.id;
        const { categoryName } = req.body

        if (!categoryName) {
            return res.status(400).json({ message: "catgory name is reqired" });
        }

        const updatecat = await categorySchema.findByIdAndUpdate(catid, { categoryName });
        if (!updatecat) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", data: updatecat });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error });
    }

};

const deleteCategory = async (req, res) => {
    try {
        const catid = req.params.id;

        const deletedcat = await categorySchema.findByIdAndDelete(catid)
        if (!deletedcat) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully", data: deletedcat });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
};








module.exports = { addCategory, getCategory, editCategory, updateCategory, deleteCategory }