import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    error: null,
    message: "",
    catdata: [],
    currentCategory: null,
}

export const addCategory = createAsyncThunk("addCategory", async (addcat) => {
    const url = "http://localhost:3000/api/auth/addCategory"
    const result = await axios.post(url, addcat)
    return result.data;
})

export const getCategory = createAsyncThunk("getCategory", async () => {
    const res = await axios.get("http://localhost:3000/api/auth/getCategory")
    const result = await res.data;
    return result;

})

export const editCategory = createAsyncThunk("editCategory", async (catid) => {
    const res = await axios.get("http://localhost:3000/api/auth/editCategory/" + catid);
    return res.data;

})

export const updateCategory = createAsyncThunk("updateCategory", async ({ id, categoryName }) => {
    const res = await axios.post(`http://localhost:3000/api/auth/updateCategory/${id}`, { categoryName });
    return res.data;
})

export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
    const res = await axios.get(`http://localhost:3000/api/auth/deleteCategory/${id}`);
    return { id, message: res.data.msg };

})

const categoryslice = createSlice({
    name: "category",
    initialState,

    reducers: {},
    extraReducers: (builder) => {

        builder
            // addCategory
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;

            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "add catgory error in slice backend error";
            })

            // getcategory
            .addCase(getCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("fetch cat :", action.payload)
                state.catdata = action.payload.data;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //editcategory
            .addCase(editCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCategory = action.payload.data; // backend se jo category mili
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching category";
            })

            //  updateCategory
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;

                // Agar updated data mila hai to hi update karo
                const updated = action.payload.data;
                if (updated) {
                    const index = state.catdata.findIndex(cat => cat._id === updated._id);
                    if (index !== -1) {
                        state.catdata[index] = updated;
                    }
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //deletecategory
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                // catdata array me se delete karna
                state.catdata = state.catdata.filter(cat => cat._id !== action.payload.id);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error deleting category";
            });




    }
})

export default categoryslice.reducer;
