import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let getAllCategories = createAsyncThunk("get/categories", async () => {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
    return await response.json();
})

const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState: {
        categories: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state) => {
            console.log("Loading categories...");
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            console.log("Categories fetched successfully");
            state.categories = action.payload.data;
        })
        builder.addCase(getAllCategories.rejected, (state, action) => {
            console.error("Error fetching categories:", action.error.message);
        })
    }
})
// export const { } = categoriesSlice.actions;
export default categoriesSlice.reducer;