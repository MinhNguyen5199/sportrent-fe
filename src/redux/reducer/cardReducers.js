import { ADD_TO_CART, DELETE_FROM_CART,UPDATE_CART_LENGTH } from '../constants/cartConstant';

let INITIAL_STATE = {
	cart: [],
	cartLength: 0,
};

if (localStorage.getItem('cart')) {
	INITIAL_STATE.cart = JSON.parse(localStorage.getItem('cart'));
	INITIAL_STATE.cartLength = INITIAL_STATE.cart.cartLength
} else {
	INITIAL_STATE.cart = [];
	INITIAL_STATE.cartLength =0;
}

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				cart: [...action.payload],
			};
		case DELETE_FROM_CART:
			return {
				cart: [...action.payload],
			};
			case UPDATE_CART_LENGTH:
				return {
				  ...state,
				  cartLength: action.payload,
				};
		default:
			return state;
	}
};

export default cartReducer;