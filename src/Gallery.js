import * as React from 'react';
import Masonry from 'react-masonry-component';
import Photo from './Photo';

const masonryOption = {
  transitionDuration: 0
}

class Gallery extends React.Component {
  render() {
    const showAll = this.props.showAll;
    const keyword = this.props.keyword;

    const childElements = this.props.elements.map(function(element) {
      return (
        <Photo data={element} showAll={showAll} keyword={keyword}/>
      );
    });

    return (
      <Masonry 
        className={'my-gallery-class'}
        elementType = {'div'}
        options={masonryOption}
        disableImageLoaded={false}
        updateOnEachImageLoad={false}
      >
        {childElements}
      </Masonry>
    );
  }
}

export default Gallery;