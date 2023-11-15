import { generateId } from "./generateId";

export const generateLayout = () => ({
  id: generateId(),
  layout: {
    orientation: "normal",
    images: [],
    layout: null,
  },
  active: false,
});
