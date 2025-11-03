import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    error: null,
    message: "",
    vehicleData: [],
    currentVehicle :null,
}


export const addVehicle = createAsyncThunk("addVehicle", async (addVeh) => {

    const url = "http://localhost:3000/api/auth/addVehicle"
    const result = await axios.post(url, addVeh)
    return result.data;
})

export const getVehicle = createAsyncThunk("getVehicle", async () => {
    const result = await axios.get("http://localhost:3000/api/auth/addVehicle")
    return result.data;

})

export const editVehicle = createAsyncThunk("editVehicle", async (id) => {
    const res = await axios.get(`http://localhost:3000/api/auth/editVehicle/${id}`)
    return res.data;
})

export const updateVehicle = createAsyncThunk("updateVehicle", async ({ id, updatedData }) => {
    const res = await axios.post(`http://localhost:3000/api/auth/updateVehicle/${id}`, updatedData);
    return res.data;
});

export const deleteVehicle = createAsyncThunk("deleteVehicle", async (id) => {
  const res = await axios.get(`http://localhost:3000/api/auth/deleteVehicle/${id}`);
  return res.data;
});




const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,

    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(addVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(addVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "add vehicle error in slice backend error";
            })


            .addCase(getVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicleData = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(getVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching vehicles";
            })

            

            .addCase(editVehicle.pending, (state)=>{
                state.loading = true;
            })
            .addCase(editVehicle.fulfilled,(state,action)=>{
                state.loading = false;
                state.currentVehicle = action.payload.data
            })
            .addCase(editVehicle.rejected , (state,action)=>{
                state.loading = false;
                state.error = action.error.message
            })

    }
})

export default vehicleSlice.reducer;
