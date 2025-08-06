import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
//import Pet from "./Pet";
import useBreedList from "./useBreedList";
import Results from "./result";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
import { Animal } from "./APIResponsesTypes";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [animal, setAnimal] = useState("" as Animal);
  const [requestParams, setRequestParams] = useState({
    location: "",
    breed: "",
    animal: "",
  });
  
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);

  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault(); //prevent reload and doesn't use the submit which provided by the form instead use the submit which created below
          
          const formData = new FormData(e.currentTarget);
          const object = {
            animal: formData.get("animal")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };

          setRequestParams(object);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
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
      
      {/* add as to select for animal */}
      <select
        id="animal"
        name="animal"
        onChange={(e) => {
          setAnimal(e.target.value as Animal);
        }}
        onBlur={(e) => {
          setAnimal(e.target.value as Animal);
        }}
      >
        […]
      </select>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
