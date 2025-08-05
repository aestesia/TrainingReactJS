import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
//import Pet from "./Pet";
import useBreedList from "./useBreedList";
import Results from "./result";
import fetchSearch from "./fetchSearch";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  //const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("");
  // const [breed, setBreed] = useState("");
  // const [pets, setPets] = useState([]);
  const [requestParams, setRequestParams] = useState({
    location: "",
    breed: "",
    animal: "",
  });
  // useState return two variables in array, where var 1 is the value and var 2 is the function to update the value

  //const breeds = [];
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);

  const pets = results?.data?.pets ?? [];

  // useEffect(() => {
  //   requestPets();
  // }, []); // arg 1 -> callback function/method which want to use after web rendered for the first time; arg 2 (dependency) -> trigger
  // async function requestPets() {
  //   const res = await fetch(
  //     `https://pets-v2.dev-apis.com/pets?.animal=${animal}&location=${location}&breed=${breed}`
  //   ); // this fetch will return a promise (pending -> connecting to server,
  //   // fulfilled -> receive response from server, rejected -> failed to connect to server)

  //   const json = await res.json();

  //   setPets(json.pets);
  // }

  //console.log("event in input: ", location);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault(); //prevent reload and doesn't use the submit which provided by the form instead use the submit which created below
          // requestPets();

          const formData = new FormData(e.target);
          const object = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };

          setRequestParams(object);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            //value={location}
            name="location"
            placeholder="Location"
            //onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            //value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              //setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              //setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            name="breed"
            id="breed"
            //value={breed}
            //onChange={(e) => setBreed(e.target.value)}
            //onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {/* {pets.map((pet) => {
        return (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            key={pet.id}
          />
        );
      })} */}
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
