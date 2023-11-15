import { useDispatch, useSelector } from "react-redux";
import { updateSelectedPreset } from "../../store/Actions/editorAction";
import "./styles.scss";

export const Presets = () => {
  const dispatch = useDispatch();
  const { presets } = useSelector(state => state.editor);

  const handlePresetSelect = (e) => {
    dispatch(updateSelectedPreset(e.target.value));
  };

  return (
    <div className="presets">
      <label htmlFor="Presets">Presets: </label>
      <select
        name="presets"
        id="Presets"
        onChange={handlePresetSelect}
        defaultValue=""
        className="preset-select"
      > 
        <option value="" disabled>----</option>
        {presets.map((preset, index) => 
          <option 
            className="preset-select-option"
            key={preset.id}
            value={preset.id}>{`Layout ${index +1}`}
          </option>
        )}
      </select>
    </div>
  )
};