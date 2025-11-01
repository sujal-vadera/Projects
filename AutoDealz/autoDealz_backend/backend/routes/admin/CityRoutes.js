const express = require("express");
const router = express.Router()
const { addCity, getCity, editCity, updateCity, deleteCity } = require("../../controllers/cityController")




router.post("/addCity", addCity)
router.get("/getCity", getCity)
router.get("/editCity/:id", editCity)
router.post("/updateCity/:id", updateCity)
router.get("/deleteCity/:id", deleteCity)



module.exports = router;