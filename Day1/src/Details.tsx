import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Modal from "./Modal";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import ErrorBoundary from "./ErrorBoundary";
import AdoptedPetContext from "./AdoptedPetContext";
import { PetAPIResponse } from "./APIResponsesTypes";

const Details = () => {
  const { id } = useParams();
  if(!id)
    throw new Error("no Id included")
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-assignment
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  // http://localhost:xxxx/details/:id
  const results = useQuery<PetAPIResponse>(["details", id], fetchPet);
  

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">💫</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];

  if (!pet) 
    throw new Error("pet tidak ditemukan!");

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed}. ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}?</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you want to adopt this pet?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
