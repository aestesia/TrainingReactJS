import Pet from "./Pet";

const Results = ({ pets = [] }) => {
  return (
    <div>
      {!pets.length ? (
        <h1>no pet found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              name={pet.name}
              breed={pet.breed}
              key={pet.id}
              images={pet.images}
              city={pet.city}
              state={pet.state}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
