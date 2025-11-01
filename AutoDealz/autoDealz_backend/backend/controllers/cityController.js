const express = require("express")
const router = express.Router()
const citySchema = require("../models/City")

const addCity = async (req, res) => {
    try {
        // console.log("body",req.body)

        const { cityName } = req.body
        if (!cityName) {
            res.status(400).json({ message: "city name is required" });
        }

        const cityObj = new citySchema({ cityName: req.body.cityName })
        const result = await cityObj.save();
        res.status(200).json({ message: " city successfully added", data: result })
        // console.log(result)
    } catch (error) {
        res.status(500).json({ message: "error in adding city", data: error })
    }
}


const getCity = async (req, res) => {
    try {
        const getcityData = await citySchema.find();
        if (getcityData) {
            res.status(200).json({ message: " successfull fetch data", data: getcityData })
        }
        // console.log(getcatData)

    } catch (error) {
        res.status(500).json({ message: "error in geting city", data: error })
    }
}


const editCity = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("ID from params:", req.params.id)
        const result = await citySchema.findById(id);
        console.log("Result:", result);
        // console.log(catid)
        if (result) {
            res.status(200).json({ message: "city fetched successfully", data: result });
        } else {
            res.status(404).json({ message: "city not found" });
        }

    } catch (error) {
        // console.log("Edit category error:", error.message);
        res.status(500).json({ message: "Error fetching category", data: error });
    }

}

const updateCity = async (req, res) => {
    try {
        const id = req.params.id;
        const { cityName } = req.body

        if (!cityName) {
            return res.status(400).json({ message: "city name is reqired" });
        }

        const updatecity = await citySchema.findByIdAndUpdate(id, { cityName });
        if (!updatecity) {
            return res.status(404).json({ message: "city not found" });
        }

        res.status(200).json({ message: "city updated successfully", data: updatecity });
    } catch (error) {
        res.status(500).json({ message: "Error updating city", error });
    }

};

const deleteCity = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedcity = await citySchema.findByIdAndDelete(id)
        if (!deletedcity) {
            return res.status(404).json({ message: "city not found" });
        }

        res.status(200).json({ message: "city deleted successfully", data: deletedcity });
    } catch (error) {
        res.status(500).json({ message: "Error deleting city", error });
    }
};







module.exports = { addCity, getCity, editCity, updateCity, deleteCity }
