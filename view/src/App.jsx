import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import "./App.css";
import { useState } from "react";
import { CurrentUserContext } from "./Contexts.js";

function App() {
  const userInfo = useLoaderData();
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <Header />
        <Outlet />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
