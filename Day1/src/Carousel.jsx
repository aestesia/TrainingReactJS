/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  static defaultProps = {
    image: ["http://pets-image.dev-apis.com/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal thumbnail" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={photo}
              className={index == active ? "active" : ""}
              src={photo}
              alt={`animal-${index}`}
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
