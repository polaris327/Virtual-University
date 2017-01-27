import {
  REQUEST_COURSE_MATERIAL,
  RECEIVE_COURSE_MATERIAL,
  ERROR_COURSE_MATERIAL
}                                           from '../actions/mediaActions';

const initialState = {
  materials: [],
  videos: [],
  error: null,
  loaded: false,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_COURSE_MATERIAL:
      return {
        ...state,
        loading: true
      };

    case RECEIVE_COURSE_MATERIAL:
      switch (action.mediaType) {
        case 'PDF':
          return {
            ...state,
            loading: false,
            loaded: true,
            materials: action.payload
          };

        case 'Video':
          return {
            ...state,
            loading: false,
            loaded: true,
            videos: action.payload
          };
      }

    default:
      return state;
  }
}
