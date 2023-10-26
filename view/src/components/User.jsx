import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { CurrentUserContext } from "../Contexts";

function User() {
  const { currentUser } = useContext(CurrentUserContext);
  const data = useLoaderData();

  return (
    <>
      <h1>{currentUser?.username || "User"}</h1>
    </>
  );
}

export default User;
