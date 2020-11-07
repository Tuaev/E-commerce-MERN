import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i}>
        <i
          style={{ color }}
          className={
            i <= value && i + 0.5 < value
              ? 'fas fa-star'
              : i + 0.5 === value
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    );
  }

  return (
    <div>
      <div className="rating">
        {stars} {text}
      </div>
    </div>
  );
};

Rating.defaultProps = {
  color: 'gold',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
