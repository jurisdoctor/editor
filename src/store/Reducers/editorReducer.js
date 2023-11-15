import {
  UPDATE_ACTIVE_LAYOUT,
  UPDATE_DRAGGED_IMAGE,
  UPDATE_IMAGES,
  UPDATE_LAYOUTS,
  UPDATE_PRESETS,
  UPDATE_SELECTED_PRESET,
} from "../Actions/actionTypes";

import { generateId } from "../../utils/generateId";

const initialState = {
  activeLayout: [],
  draggedImage: [],
  images: [
    { id: 1, url: "fb.png" },
    { id: 2, url: "ig.webp" },
    { id: 3, url: "x.png" },
  ],
  layouts: [
    {
      id: generateId(),
      layout: {
        orientation: "normal",
        images: [],
        layout: null,
      },
      active: false,
    },
  ],
  presets: [],
  selectedPreset: null,
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LAYOUTS:
      return { ...state, layouts: action.payload.layouts };
    case UPDATE_ACTIVE_LAYOUT:
      return { ...state, activeLayout: action.payload.activeLayout };
    case UPDATE_DRAGGED_IMAGE:
      return { ...state, draggedImage: action.payload.draggedImage };
    case UPDATE_IMAGES:
      return { ...state, images: action.payload.images };
    case UPDATE_PRESETS:
      return { ...state, presets: action.payload.presets };
    case UPDATE_SELECTED_PRESET:
      return { ...state, selectedPreset: action.payload.selectedPreset };

    default:
      return state;
  }
};

export default editorReducer;
