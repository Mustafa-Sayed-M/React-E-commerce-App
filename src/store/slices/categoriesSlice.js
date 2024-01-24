import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchCategories = createAsyncThunk('categoriesSlice/fetchCategories', async () => {
    const api_link = `${api.base_url}${api.endpoints.get_categories}`;
    try {
        const res = await fetch(api_link);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(`Failed Get Data From ${api_link}`);
    }
})

const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState: {
        categories: [],
        loading: true,
        error: false,
        activeCategory: 'all'
    },
    reducers: {
        changeActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export const { changeActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;