//from internet/installation
import React from "react";
import {createRoot} from "react-dom/client"

//from local
import Pet from "./Pet";

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
    return(
        <div>
            <h1>Element created by react</h1>
            <Pet name="Buggs Bunny" animal="Rabbit" breed="White"/>
            <Pet name="Peggy Pig" animal="Pig" breed="Boar Asian"/>
            <Pet name="Luna Bunny" animal="Dog" breed="Havanese"/>
        </div>
    );
};

const container = document.getElementById("root"); //<div id="root"></div>
const root = createRoot(container); //ReactDOM.createRoot(div id="root" location)
//root.render(React.createElement(App)); //render component App
root.render(React.createElement(<App />)); //render component App