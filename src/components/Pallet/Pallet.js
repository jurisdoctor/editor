import { useDispatch, useSelector } from 'react-redux';
import { updateDraggedImage } from '../../store/Actions/editorAction';
import { generateId } from '../../utils/generateId';
import './styles.css';


export const Pallet = () => {
  const { images } = useSelector(state => state.editor);
  const dispatch = useDispatch();

  return (
    <div className='palette'>
      {
        images.map(image => (
          <div 
            className="images"
            key={generateId()}
          >
            <img 
              onDrag={(e) => {
                e.preventDefault();
                dispatch(updateDraggedImage(image));
              }}
              draggable 
              src={`/images/${image.url}`} 
              alt="" 
            />
          </div>
        ))
      }
    </div>
  )
};