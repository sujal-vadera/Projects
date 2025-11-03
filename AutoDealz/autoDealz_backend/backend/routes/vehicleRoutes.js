const express = require("express");
const router = express.Router();
const { addVehicle, getVehicle, editVehicle, updateVehicle, deleteVehicle } = require("../../backend/controllers/vehicleController")

router.post("/addVehicle", addVehicle)
router.get("/getVehicle", getVehicle)
router.get("/editVehicle/:id", editVehicle)
router.post("/updateVehicle/:id", updateVehicle)
router.get("/deleteVehicle/:id", deleteVehicle)


module.exports = router;