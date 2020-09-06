import * as types from "../constants/CategoryTypes";

export const addCategory = (content) => ({
  type: types.ADD_CATEGORY,
  content,
});

export const editCategory = (id) => ({
  type: types.EDIT_CATEGORY,
  id,
});

export const updateCategory = (id, newContent) => ({
  type: types.UPDATE_CATEGORY,
  id,
  newContent,
});

export const deleteCategory = (id) => ({
  type: types.DELETE_CATEGORY,
  id,
});

export const updateCheck = (id) => ({
  type: types.VIEW_CHECKBOX,
  id,
});
