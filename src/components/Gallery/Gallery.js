import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import s from './Gallery.scss';
import axios from 'axios';
import Image from '../Image';

class Gallery extends React.Component {
  static propTypes = {
    t: PropTypes.func,
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    this.getImages(this.props.tag);
  }

  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`;
    const baseUrl = `https://api.flickr.com/`;
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          // console.log(res.photos.photo);
          this.setState({images: res.photos.photo});
        }
      });
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  render() {
    const {t} = this.props;

    return (
      <div className={s.root}>
        {this.state.images.map(dto => {
          return <Image key={'image-' + dto.id} dto={dto}/>;
        })}
      </div>
    );
  }
}

export default translate(null, {wait: true})(Gallery);
