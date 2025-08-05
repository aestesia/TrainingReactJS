//import React from "react";
import { Link } from "react-router-dom";

// const Pet = (props) => {
//     return React.createElement("div", {}, [
//         React.createElement("h1", {}, props.name),
//         React.createElement("h2", {}, props.animal),
//         React.createElement("h2", {}, props.breed),
//     ]);
// };

const Pet = (props) => {
  const { name, animal, breed, city, state, images, id } = props; // deconstruct property

  let defaultImage = "http://pets-images.dev-apis.com/pets/none.jpg";
  // default image if doesn't have image

  if (images.length) {
    defaultImage = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={defaultImage} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal}-{breed} {city}, {state}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
