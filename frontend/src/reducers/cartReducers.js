import * as actionTypes from "../actions/actionTypes";

export const cartReducer = (state = { cart: [] }, action) => {
	switch (action.type) {
		case actionTypes.CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find(
				(x) => x.product === item.product
			);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, item] };
			}

		case actionTypes.CART_REMOVE_ITEM:
			return {
				loading: false,
				cartItems: state.cartItems.filter(
					(x) => x.product !== action.payload
				),
			};

		default:
			return state;
	}
};
