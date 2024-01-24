import { createSlice } from "@reduxjs/toolkit";

const cartsSlice = createSlice({
    name: 'cartsSlice',
    initialState: [],
    reducers: {
        addToCarts: (state, action) => {
            const isFindCart = state.find(cart => cart.id === action.payload.id);
            if (isFindCart) {
                isFindCart.count += 1;
            } else {
                const cloneOfCart = action.payload;
                state.push({ ...cloneOfCart, count: 1 })
            }
        },
        deleteOne: (state, action) => {
            const isFindCart = state.find(cart => cart.id === action.payload.id);
            if (isFindCart) {
                isFindCart.count -= 1;
                if (isFindCart.count === 0) {
                    const index = state.findIndex(cart => cart.id === action.payload.id);
                    if (index !== -1) {
                        state.splice(index, 1);
                    }
                }
            }
        },
        deleteFromCarts: (state, action) => {
            return state = state.filter(cart => cart.id !== action.payload.id);
        },
    }
})

export default cartsSlice.reducer;
export const { addToCarts, deleteOne, deleteFromCarts } = cartsSlice.actions;