import { CRITICAL, MAJOR, MEDIUM, LOW, CRITICAL_DELETE, MAJOR_DELETE, MEDIUM_DELETE, LOW_DELETE, SET_ALL} from "./action";

const initState = {
  critical: [],
  major: [],
  medium: [],
  low: []
}

export const bagReducer = (state = initState, action) => {
  switch (action.type) {
    case CRITICAL:
      return {
        ...state,
        critical: [...state.critical, action.payload],
      };
    case MAJOR:
      return {
        ...state,
        major: [...state.major, action.payload],
      };
    case MEDIUM:
      return {
        ...state,
        medium: [...state.medium, action.payload],
      };
    case LOW:
      return {
        ...state,
        low: [...state.low, action.payload],
      };

    case CRITICAL_DELETE:
      return {
        ...state,
        critical: state.critical.filter((e, i) => {
          return i != action.payload
        }) ,
      };
    case MAJOR_DELETE:
      return {
        ...state,
        major: state.major.filter((e, i) => {
          return i != action.payload;
        }),
      };
    case MEDIUM_DELETE:
      return {
        ...state,
        medium: state.medium.filter((e, i) => {
          return i != action.payload;
        }),
      };
    case LOW_DELETE:
      return {
        ...state,
        low: state.low.filter((e, i) => {
          return i != action.payload;
        }),
      };
    case SET_ALL: 
      return {
        critical: action.payload[0] || [],
        major: action.payload[1] || [],
        medium: action.payload[2] || [],
        low: action.payload[3] || [],
      };
    default:
      return state;
  }
};