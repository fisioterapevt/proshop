import * as actionTypes from "../actions/actionTypes";

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.USER_LOGIN_REQUEST:
			return { loading: true, products: [] };
		case actionTypes.USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case actionTypes.USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case actionTypes.USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
