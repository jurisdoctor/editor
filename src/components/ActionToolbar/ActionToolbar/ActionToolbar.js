import "./styles.css";

import {
  updateActiveLayout,
  updateImages,
  updateLayouts,
  updatePresets,
} from "../../../store/Actions/editorAction";
import { useDispatch, useSelector } from "react-redux";

import { Presets } from "../../Presets/Presets";
import { generateId } from "../../../utils/generateId";
import { generateLayout } from "../../../utils/generateLayout";

export const ActionToolbar = () => {
  const dispatch = useDispatch();
  const { activeLayout, images, layouts, presets, selectedPreset } =
    useSelector((state) => state.editor);
  const disableDeleteButton = activeLayout?.length === 0;

  const handleAddButton = (e) => {
    dispatch(updateLayouts([...layouts, generateLayout()]));
  };

  const handleDeleteButton = (e) => {
    // add reset to "default state"
    const { images: cellImages } = layouts.filter(
      (layout) => layout.id === activeLayout.id
    )[0].layout;
    const newLayouts = layouts.filter(
      (layout) => layout.id !== activeLayout.id
    );
    dispatch(updateImages([...images, ...cellImages]));
    dispatch(updateLayouts(newLayouts));
    dispatch(updateActiveLayout([]));
  };

  const handleVerticalSplitButton = (e) => {
    // function("vertical");
    const newLayouts = JSON.parse(JSON.stringify(layouts)).map((layout) => {
      if (activeLayout.id === layout.id) {
        layout.layout.orientation = "vertical";
        layout.layout.layout = [generateLayout(), generateLayout()];
      }
      return layout;
    });
    dispatch(updateLayouts(newLayouts));
  };

  const handleHorizontalSplitButton = (e) => {
    // function("horizontal");
    const newLayouts = JSON.parse(JSON.stringify(layouts)).map((layout) => {
      if (activeLayout.id === layout.id) {
        layout.layout.orientation = "horizontal";
        layout.layout.layout = [generateLayout(), generateLayout()];
      }
      return layout;
    });
    dispatch(updateLayouts(newLayouts));
  };

  const handleSaveButton = (e) => {
    dispatch(
      updatePresets([
        ...presets,
        {
          id: generateId(),
          layouts,
        },
      ])
    );
  };

  const handleLoadButton = (e) => {
    if (presets.length === 0) return;
    const { layouts } = presets.find(
      (preset) => preset.id === parseInt(selectedPreset)
    );

    // retrieve array of images from presets
    const presetImages = layouts.map((layout) => layout.layout.images).flat();
    // remove those images from the provided list
    const filteredImages = images.filter((image) =>
      presetImages.every((presetImage) => presetImage.id !== image.id)
    );
    dispatch(updateImages(filteredImages));
    dispatch(updateLayouts(layouts));
  };

  return (
    <div className="toolbar">
      <button onClick={handleAddButton}>Add</button>
      <button onClick={handleDeleteButton} disabled={disableDeleteButton}>
        Delete
      </button>
      <button onClick={handleSaveButton}>Save</button>
      <button onClick={handleLoadButton} disabled={!selectedPreset}>
        Load
      </button>
      <Presets />
      <button onClick={handleVerticalSplitButton}>
        <img src="images/vertical.png" alt="" className="split-button" />
      </button>
      <button onClick={handleHorizontalSplitButton}>
        <img src="images/horizontal.png" alt="" className="split-button" />
      </button>
    </div>
  );
};
