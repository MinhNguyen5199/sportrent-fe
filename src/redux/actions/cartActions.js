import { ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART_LENGTH } from '../../redux/constants/cartConstant';

export const addToCart = product => async dispatch => {
	const cart = localStorage.getItem('cart')
	  ? JSON.parse(localStorage.getItem('cart'))
	  : [];
  
	const duplicateIndex = cart.findIndex(item => item.product.id === product.id);
  
	if (duplicateIndex === -1) {
	  const productToAdd = {
		product: product,
		quantity: product.quantity,
		amount: product.price * product.quantity * product.numberOfDays,
		onSalePrice: product.price,
		id: product.id,
	  };
  
	  cart.push(productToAdd);
	} else {
	  const updatedProduct = {
		...cart[duplicateIndex],
		quantity: cart[duplicateIndex].quantity + product.quantity,
		amount: cart[duplicateIndex].amount + product.price * product.quantity * product.numberOfDays,
	  };
	  cart[duplicateIndex] = updatedProduct;
	}
  
	localStorage.setItem('cart', JSON.stringify(cart));
  
	// Calculate new cartLength and set it immediately
	const newCartLength = cart.length;
	dispatch({
	  type: ADD_TO_CART,
	  payload: cart,
	});
	dispatch({
	  type: UPDATE_CART_LENGTH,
	  payload: newCartLength,
	});
  };
  

  export const deleteFromCart = product => async dispatch => {
	const cart = localStorage.getItem('cart')
	  ? JSON.parse(localStorage.getItem('cart'))
	  : [];
  
	const updatedCart = cart.filter(item => item.product.id !== product.product.id);
	localStorage.setItem('cart', JSON.stringify(updatedCart));
  
	// Calculate new cartLength and set it immediately
	const newCartLength = updatedCart.length;
	dispatch({
	  type: DELETE_FROM_CART,
	  payload: updatedCart,
	});
	dispatch({
	  type: UPDATE_CART_LENGTH,
	  payload: newCartLength,
	});
  };
  


  export const updateCartLength = cartLength => {
	return {
	  type: UPDATE_CART_LENGTH,
	  payload: cartLength,
	};
  };