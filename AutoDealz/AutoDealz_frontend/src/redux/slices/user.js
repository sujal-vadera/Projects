// step 1  initial setup of slice 

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    loading: false,   // API call chal rahi hai ya nahi
    data: null,       // Backend se response save karne ke liye
    error: null,      // Agar API fail ho jaye to error store karne ke liye
    msg: null,
    statuscode: 0  // Success message store karne ke liye


}


// step 2  create thunk for registration & login

export const createUser = createAsyncThunk("createUser", async (userdata , { rejectWithValue }) => {

    try {
        // backend api call for register
        const res = await axios.post("http://localhost:3000/api/auth/register", userdata );
        // console.log(res.data)
        return {
            data: res.data, // backend se data aayega vo backend se slice me aayega
            statuscode: res.status,       // HTTP status code (201, 400, etc.)
            msg: res.data.msg || res.data.message || null,
            user: res.data.user || null,

        }

    } catch (error) {
        console.log("register error :", error.response?.data?.message)

         return rejectWithValue(
             error.response?.data?.message || "Registration failed"
        );
    }
})

export const userLogin = createAsyncThunk("userLogin", async (userdata, { rejectWithValue }) => {

    try {
        const res = await axios.post("http://localhost:3000/api/auth/login", userdata);
        console.log("Login API Response:", res.data);
        if (!res.data.success) {
            return rejectWithValue(res.data.message)
        }


        return {
            data: res.data,
            statuscode: res.status,
            msg: res.data.message || null,
            user: res.data.user || null,
            token: res.data.token || null,
        }

    } catch (error) {
        console.error("Login click Error:", error);
        return rejectWithValue(error.response?.data?.message || "Server error");
    }
});


// step 3 create slice 

const userSlice = createSlice({
    name: "user", // slice name
    initialState,

    reducers: {},
    extraReducers: (builder) => {

        // regiseter time create user thunk
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
                state.msg = action.payload.msg;
                state.statuscode = action.payload.statuscode;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "register error";
            })


            // login time create thunk

            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.msg = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
                state.msg = action.payload.msg;
                state.user = action.payload.user;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "login failed";
            })
    }
})


export default userSlice.reducer;
