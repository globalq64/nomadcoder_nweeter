import React from "react";
import { useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router"; //useHistory, push 사용불가

import { auth } from "../fbase";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
