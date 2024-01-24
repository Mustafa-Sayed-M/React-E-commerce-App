import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

const fetchData = async (api_link) => {
    try {
        const res = await fetch(api_link);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(`Failed Get Data From ${api_link}`);
    }
}

export const fetchProducts = createAsyncThunk('productsSlice/fetchProducts', async (api_link_by_category) => {
    const api_link = api_link_by_category || `${api.base_url}${api.endpoints.get_products}`;
    return fetchData(api_link);
});

export const fetchProductDetails = createAsyncThunk('productsSlice/fetchProductDetails', async (product_id) => {
    const api_link = `${api.base_url}${api.endpoints.get_single_product}${product_id}`;
    return fetchData(api_link);
});

export const fetchProductSimilar = createAsyncThunk('productsSlice/fetchProductSimilar', async (category) => {
    const api_link = `${api.base_url}${api.endpoints.get_products_by_category}${category}`;
    return fetchData(api_link);
});


const initialState = {
    products: [],
    loading: false,
    error: null,
    productDetails: {
        product: {
            id: 0,
            description: '',
            image: '',
            price: 0,
            category: '',
            rating: { rate: 0 },
            title: '',
        },
        similar: {
            products: [],
            loading: false,
            error: null,
        },
        loading: true,
        error: null,
    },
};

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    extraReducers: (builder) => {
        // Fetch Products:
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Fetch Product Details:
        builder.addCase(fetchProductDetails.pending, (state) => {
            state.productDetails.loading = true;
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.productDetails.loading = false;
            state.productDetails.product = action.payload;
        }).addCase(fetchProductDetails.rejected, (state, action) => {
            state.productDetails.loading = false;
            state.productDetails.error = action.error.message;
        });

        // Fetch Product Similar:
        builder.addCase(fetchProductSimilar.pending, (state) => {
            state.productDetails.similar.loading = true;
        }).addCase(fetchProductSimilar.fulfilled, (state, action) => {
            state.productDetails.similar.loading = false;
            state.productDetails.similar.products = action.payload;
        }).addCase(fetchProductSimilar.rejected, (state, action) => {
            state.productDetails.similar.loading = false;
            state.productDetails.similar.error = action.error.message;
        });
    }
})

export default productsSlice.reducer;