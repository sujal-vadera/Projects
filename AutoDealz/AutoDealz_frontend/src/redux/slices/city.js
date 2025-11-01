import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";




const initialState = {
    loading: false,
    error: null,
    message: "",
    citydata: [],
    currentcity: null

}


export const addcity = createAsyncThunk("addcity", async (addcity) => {
    const url = "http://localhost:3000/api/auth/addCity";
    const result = await axios.post(url, addcity)
    return result.data
})

export const getcity = createAsyncThunk("getcity", async () => {
    const res = await axios.get("http://localhost:3000/api/auth/getCity");
    const result = await res.data;
    return result;
})

export const editCity = createAsyncThunk("editCity", async (id) => {
    const res = await axios.get(`http://localhost:3000/api/auth/editCity/`+ id);
    return res.data;

})

export const updateCity = createAsyncThunk("updateCity", async ({id , cityName}) => {
    const res = await axios.post(`http://localhost:3000/api/auth/updateCity/${id}`, { cityName })
    return res.data;
})

export const deleteCity = createAsyncThunk("deleteCity" , async(id)=>{
    const res = await axios.get(`http://localhost:3000/api/auth/deleteCity/${id}`)
    return { id, message: res.data.msg };
  
})



const citySlice = createSlice({
    name: "city",
    initialState,

    reducers: {},
    extraReducers: (builder) => {

        //addcity
        builder.addCase(addcity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(addcity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message
            })
            .addCase(addcity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "add city error in slice backend error"
            })

            // getcity
            .addCase(getcity.pending, (state) => {
                state.loading = true;
            })
            .addCase(getcity.fulfilled, (state, action) => {
                state.loading = false;
                // state.error = null;
                state.citydata = action.payload.data;
            })
            .addCase(getcity.rejected, (state, action) => {
                state.loading = false;
                state.error = state.error.message;
            })

            //editcity
            .addCase(editCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCity.fulfilled, (state, action) => {
                state.loading = false;
                state.currentcity = action.payload.data; // backend se jo category mili
                

            })
            .addCase(editCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching category";
            })

            //  updateCity
            .addCase(updateCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCity.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;

                // Agar updated data mila hai to hi update karo
                const updated = action.payload.data;
                if (updated) {
                    const index = state.citydata.findIndex(city => city._id === updated._id);
                    if (index !== -1) {
                        state.citydata[index] = updated;
                        console.log(state.citydata)
                    }
                }
            })
            .addCase(updateCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            //deletecity
            .addCase(deleteCity.pending, (state) => {
                            state.loading = true;
                            state.error = null;
                        })
                        .addCase(deleteCity.fulfilled, (state, action) => {
                            state.loading = false;
                            state.message = action.payload.message;
                            // catdata array me se delete karna
                            state.citydata = state.citydata.filter(city => city._id !== action.payload.id);
                        })
                        .addCase(deleteCity.rejected, (state, action) => {
                            state.loading = false;
                            state.error = action.error.message || "Error deleting city";
                        });











    }

})

export default citySlice.reducer;
