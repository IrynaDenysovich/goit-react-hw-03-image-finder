import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onSelect }) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => {
        onSelect(largeImageURL);
      }}
    >
      <img className="ImageGalleryItem-image" src={webformatURL} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
