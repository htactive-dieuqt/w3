import {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  VIEW_CHECKBOX,
} from "../constants/CategoryTypes";

let initialId = 0;

const categoryReducer = (state = [], action) => {
  initialId = initialId + 1;
  switch (action.type) {
    case ADD_CATEGORY:
      return [
        {
          id: initialId,
          content: action.content,
          complete: false,
        },
        ...state,
      ];

    case DELETE_CATEGORY:
      return state.filter((category) => category.id !== action.id);

    case EDIT_CATEGORY:
      return state.map((category) =>
        category.id === action.id
          ? {
              ...category,
              content: action.content,
            }
          : category
      );

    case UPDATE_CATEGORY:
      return state.map((category) => {
        if (category.id === action.id) {
          return {
            ...category,
            content: action.newContent,
            editing: !category.editing,
          };
        } else {
          return category;
        }
      });

    case VIEW_CHECKBOX:
      return state.map((category) => {
        if (category.id === action.id) {
          return {
            ...category,
            complete: !category.complete,
          };
        } else {
          return category;
        }
      });

    default:
      return state;
  }
};

export default categoryReducer;
