import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <button className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
