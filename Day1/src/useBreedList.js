//import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

//const localCache = {}; // storage for saving kind of race from animal

// custom hooks -> get breedlist instead of an animal. cat = british shorthair, havenese, etc
export default function useBreedList(animal){
    // const [breedList, setBreedList] = useState([]); // save breedList value
    // const [status, setStatus] = useState("not yet used"); // save status value

    // useEffect(() => {
    //     if (!animal){
    //         setBreedList([]);
    //     }else if(localCache[animal]){
    //         setBreedList(localCache[animal]);
    //     }else{
    //         requestBreedList();
    //     }

    //     async function requestBreedList(){
    //         setBreedList([]);
    //         setStatus("loading ...")
    //         const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
    //         const json = await res.json(); // transform response from server into JSON

    //         localCache[animal] = json.breeds || []
    //         setBreedList(localCache[animal])
    //         setStatus("loaded")
    //     }
    // }, [animal]);

    const results = useQuery(["breeds", animal], fetchBreedList);

    //return [breedList, status]
    return [results?.data?.breeds ?? [], results.status];
}