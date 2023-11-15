import "./styles.scss";

import {
  updateActiveLayout,
  updateDraggedImage,
  updateImages,
  updateLayouts,
} from "../../store/Actions/editorAction";
import { useDispatch, useSelector } from "react-redux";

import { generateId } from "../../utils/generateId";

export const Layout = () => {
  const dispatch = useDispatch();
  const { activeLayout, draggedImage, images, layouts } = useSelector(
    (state) => state.editor
  );

  // upon dropping an image, ensure that it is removed from other layouts
  const clearedLayouts = () => {
    const newLayouts = layouts.map((arg) => ({
      ...arg,
      layout: {
        ...arg.layout,
        images: arg.layout.images.filter(
          (image) => image.id !== draggedImage.id
        ),
      },
    }));
    return newLayouts;
  };

  const generateLayout = (id, layout, orientation) => {
    return (
      <div
        className={`layout-cell-${orientation}`}
        id={layout.id}
        key={layout.id}
        onClick={(e) => handleLayoutCellClick(layout)}
        onDrop={(e) => onImageDrop(e)}
        onDragOver={(e) => onImageDragOver(e)}
      >
        {layout.layout.images.map((image) => (
          <img
            draggable
            key={image.id}
            onDrag={(e) => {
              e.preventDefault();
              dispatch(updateDraggedImage(image));
            }}
            src={`/images/${image.url}`}
            alt=""
          />
        ))}
      </div>
    );
  };

  const handleLayoutCellClick = (layout) => {
    if (activeLayout.id === layout.id) {
      dispatch(updateActiveLayout([]));
    } else {
      dispatch(updateActiveLayout(layout));
    }
  };

  const handleSplitLayout = (layout, orientation) => {
    const handleId = !layout.layout.layout;
    const newLayouts =
      orientation === "normal"
        ? generateLayout(handleId && generateId(), layout, orientation)
        : layout.layout.layout.map((item) =>
            generateLayout(item.id, layout, orientation)
          );
    return (
      <div className="layout-cell" id={layout.id}>
        <div
          className={
            orientation === "normal" ? "layout-cell-full" : "layout-cell-split"
          }
          id={generateId()}
        >
          {newLayouts}
        </div>
      </div>
    );
  };

  const onImageDragOver = (e) => {
    e.preventDefault();
  };

  // update redux state to reflect where image is dropped
  const onImageDrop = (e) => {
    // find index of target layout to place image in state
    const layoutIndex = layouts.findIndex(
      (item) => item.id === parseInt(e.target.id)
    );
    const newLayouts = [...clearedLayouts()];
    newLayouts[layoutIndex].layout.images = [
      ...newLayouts[layoutIndex].layout.images,
      draggedImage,
    ];
    dispatch(updateLayouts(newLayouts));
    dispatch(
      updateImages(images.filter((image) => image.id !== draggedImage.id))
    );
    dispatch(updateDraggedImage(null));
  };

  return (
    <div className="layout">
      {layouts.map((layout) =>
        handleSplitLayout(layout, layout.layout.orientation)
      )}
    </div>
  );
};
