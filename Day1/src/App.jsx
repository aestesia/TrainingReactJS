//from internet/installation
// import React from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//from local
//import Pet from "./Pet";
import Details from "./Details";
import SearchParams from "./SearchParams";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// const App = () => {
//     return React.createElement(
//         "div",
//         {},
//         [React.createElement(
//             "h1",
//             {},
//             "Element created by react"
//         ),
//         React.createElement(Pet, {
//             name:"Buggs Bunny",
//             animal:"Rabbit",
//             breed:"White"
//         }),
//         React.createElement(Pet, {
//             name:"Peggy Pig",
//             animal:"Pig",
//             breed:"Boar Asian"
//         }),
//         React.createElement(Pet, {
//             name:"Luna",
//             animal:"Dog",
//             breed:"Havanese"
//         })]
//     );
// };

const App = () => {
  const AdoptedPet = useState(null);
  return (
    <div>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={AdoptedPet}>
          <QueryClientProvider client={queryClient}>
            <header>
              <Link>Element created by react</Link>
            </header>
            <Routes>
              <Route path="/" element={<SearchParams />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root"); //<div id="root"></div>
const root = createRoot(container); //ReactDOM.createRoot(div id="root" location)
//root.render(React.createElement(App)); //render component App
//root.render(React.createElement(<App />)); //render component App
root.render(<App />);
