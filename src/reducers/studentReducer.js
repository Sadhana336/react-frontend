export const initialState = {

  name: "",
  age: "",
  department: ""

};

export function studentReducer(state, action) {

  switch (action.type) {

    case "SET_NAME":

      return {

        ...state,
        name: action.payload

      };

    case "SET_AGE":

      return {

        ...state,
        age: action.payload

      };

    case "SET_DEPARTMENT":

      return {

        ...state,
        department: action.payload

      };

    case "RESET":

      return initialState;

    default:

      return state;

  }

}
