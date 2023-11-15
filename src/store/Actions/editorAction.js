import { UPDATE_ACTIVE_LAYOUT, UPDATE_DRAGGED_IMAGE, UPDATE_IMAGES, UPDATE_LAYOUTS, UPDATE_PRESETS, UPDATE_SELECTED_PRESET } from "./actionTypes";

export const updateLayouts = (data) => ({
  type: UPDATE_LAYOUTS,
  payload: {
    layouts: data,
  },
});

export const updateActiveLayout = (data) => ({
  type: UPDATE_ACTIVE_LAYOUT,
  payload: {
    activeLayout: data,
  },
});

export const updateDraggedImage = (data) => ({
  type: UPDATE_DRAGGED_IMAGE,
  payload: {
    draggedImage: data,
  },
});

export const updateImages = (data) => ({
  type: UPDATE_IMAGES,
  payload: {
    images: data,
  },
});

export const updatePresets = (data) => ({
  type: UPDATE_PRESETS,
  payload: {
    presets: data
  }
})

export const updateSelectedPreset = (data) => ({
  type: UPDATE_SELECTED_PRESET,
  payload: {
    selectedPreset: data
  }
})