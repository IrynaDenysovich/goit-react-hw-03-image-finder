import PropTypes from 'prop-types';

export const Modal = ({ largeImageURL, setLargeImageUrl }) => {
  const onClick = event => {
    if (event.target === event.currentTarget) {
      setLargeImageUrl('');
    }
  };

  return (
    <div className="Overlay" onClick={onClick}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  setLargeImageUrl: PropTypes.func.isRequired,
};
