import React from "react";
import Navbar from "./navbar"; 
import userData from "./example.json";

function App() {
  return (
    //This is where the sign in page will be
    //Once the user signs in, he will be sent to the home page
  <>
    <Navbar data={userData}/>
  </>
  );
}

export default App;
