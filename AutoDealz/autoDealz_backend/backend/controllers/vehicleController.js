const express = require("express")
const vehicleSchema = require("../models/Vehicle")
const router = express.Router()


const addVehicle = async (req, res) => {
    try {
        const { vehicleName, model, price, category, city, description, sellerId, image } = req.body;

        const vehicleObj = new vehicleSchema({
            vehicleName, model, price, category, city, description, sellerId, image,
        })

        const result = await vehicleObj.save();
        // console.log("vehicle added", result);//

        res.status(200).json({ message: "Vehicle added successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: "Error adding vehicle", error });
    };



}

const getVehicle = async (req, res) => {
    try {
        const vehicles = await vehicleSchema
            .find()
            .populate("category")
            .populate("city")
            .populate("sellerId");

        res.status(200).json({ message: "All vehicles fetched", data: vehicles });
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        res.status(500).json({ message: "Error fetching vehicles", error });
    }

}

const editVehicle = async (req, res) => {

    try {
        const vehicleid = req.params.id;

        const vehicle = await vehicleSchema.findById(vehicleid);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json({ message: "Vehicle fetched", data: vehicle });
    } catch (error) {
        console.error("Error editing vehicle:", error);
        res.status(500).json({ message: "Error editing vehicle", error });
    }

}

const updateVehicle = async (req, res) => {
    try {
        const vehicleid = req.params.id;
        // console.log(" Update ", req.params.id);
        const updatedVehicle = await vehicleSchema.findByIdAndUpdate(vehicleid, req.body, { new: true })
        if (!updatedVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        // console.log("updated veh", updatedVehicle)

        res.status(200).json({ message: "Vehicle updated successfully", data: updatedVehicle });
    } catch (error) {
        console.error(" Error updating vehicle:", error);
        res.status(500).json({ message: "Error updating vehicle", error });
    }

}

const deleteVehicle = async (req, res) => {
    try {
        const vehicleid = req.params.id;

        const delVehicle = await vehicleSchema.findByIdAndDelete(vehicleid);
        if (!delVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.status(200).json({ message: "Vehicle deleted successfully", data: delVehicle });
    } catch (error) {
        console.error(" Error deleting vehicle:", error);
        res.status(500).json({ message: "Error deleting vehicle", error });
    }

}

module.exports = { addVehicle, getVehicle, editVehicle, updateVehicle, deleteVehicle }


