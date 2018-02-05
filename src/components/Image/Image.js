import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import s from './Image.scss';

class Image extends React.Component {
  static propTypes = {
    t: PropTypes.func,
    dto: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200
    };
  }

  calcImageSize() {
    const targetSize = 200;
    const imagesPerRow = Math.round(window.innerWidth / targetSize);
    const realSize = (window.innerWidth / imagesPerRow);
    const size = Math.floor(realSize);
    this.setState({
      size,
      realSize,
      imagesPerRow
    });
  }

  componentDidMount() {
    this.calcImageSize();
    window.addEventListener('resize', this.calcImageSize);
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    const {t} = this.props;

    return (
      <div
        className={s.image}
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.realSize + 'px',
          height: this.state.realSize + 'px',
        }}
        >
        <div>
          Place your buttons here
        </div>
      </div>
    );
  }
}

export default translate(null, {wait: true})(Image);
