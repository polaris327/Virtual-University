import {
	REQUEST_COURSES,
	RECIEVE_COURSES,
	ERROR_COURSES,
	
	REQUEST_COURSE_OVERVIEW,
	RECEIVE_COURSE_OVERVIEW,
	ERROR_COURSE_OVERVIEW,
}                                           from '../../redux/actions/coursesActions';

const initialState = {
	list: [],
	loading: false,
	loaded: false,
	error: '',
	overviewContent: '',
};

export default function (state = initialState, action) {
	switch (action.type) {
		case REQUEST_COURSES:
			return Object.assign({}, state, {
				loading: true,
				loaded: false
			});

		case RECIEVE_COURSES:
			return Object.assign({}, state, {
				list: action.courses,
				error: '',
				loading: false,
				loaded: false
			});

		case ERROR_COURSES:
			return Object.assign({}, state, {
				error: action.error,
				loading: false,
				loaded: false
			});

		case REQUEST_COURSE_OVERVIEW:
			return {
				...state,
				loading: true,
			};
			break;
						
		case RECEIVE_COURSE_OVERVIEW:
			return {
				...state,
				loading: false,
				loaded: true,
				overviewContent: action.payload,
			};
			break;
				
		case ERROR_COURSE_OVERVIEW:
			return {
				...state,
				loading: false,
				loaded: true,
				error: action.payload,
			};
			break;

		default:
			return state;
	}
}
