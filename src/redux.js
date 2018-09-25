// action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";

const INCREMENT_REQUEST = "INCREMENT_REQUEST";
const INCREMENT_SUCCESS = "INCREMENT_SUCCESS";
const INCREMENT_FAILURE = "INCREMENT_FAILURE";

// reducer with initial state
const initialState = {
	fetching: false,
	dog: null,
	error: null,
	counter: 0,
};

export function reducer(state = initialState, action) {
	switch (action.type) {

		case API_CALL_REQUEST:
			return { ...state, fetching: true, error: null };

		case API_CALL_SUCCESS:
			return { ...state, fetching: false, dog: action.dog };

		case API_CALL_FAILURE:
			return { ...state, fetching: false, dog: null, error: action.error };

		case INCREMENT_REQUEST:
			return { ...state, error: null };

		case INCREMENT_SUCCESS:
			return { ...state, counter: action.counter };

		case INCREMENT_FAILURE:
			return { ...state, error: action.error };




		default:
			return state;
	}
}
