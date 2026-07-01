import { useSelector, useDispatch } from 'react-redux';
import {
  removePhoto,
  selectFilteredPhotos,
  toggleFavorite,
  editPhotoCaption,
} from '../photos.slice';
import './list.css';

export default function PhotosList() {
  const photos = useSelector(selectFilteredPhotos);
  const dispatch = useDispatch();

  function handleDeleteButtonClick(id) {
    dispatch(removePhoto(id));
  }

  function handleToggleFavorite(id) {
    dispatch(toggleFavorite(id));
  }

  function handleEditCaption(id, currentCaption) {
    const newCaption = window.prompt(
      'Enter a new caption:',
      currentCaption
    );

    if (newCaption && newCaption.trim() !== '') {
      dispatch(
        editPhotoCaption({
          id,
          newCaption: newCaption.trim(),
        })
      );
    }
  }

  const photosListItems = photos.map(
    ({ id, caption, imageUrl, isFavorite }) => (
      <li key={id}>
        <img alt={caption} src={imageUrl} />
        <div>
          <p>{caption}</p>

          <button
            data-testid={`${id}-favorite-button`}
            onClick={() => handleToggleFavorite(id)}
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>

          <button
            data-testid={`${caption}-button`}
            onClick={() => handleDeleteButtonClick(id)}
          >
            Delete
          </button>

          <button
            data-testid={`${id}-edit-button`}
            onClick={() => handleEditCaption(id, caption)}
          >
            Edit Caption
          </button>
        </div>
      </li>
    )
  );

  return photosListItems.length > 0 ? (
    <ul>{photosListItems}</ul>
  ) : (
    <h3>No doggies to display...</h3>
  );
}
