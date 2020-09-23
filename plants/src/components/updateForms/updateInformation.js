import React, { useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";

const initialProfile = {
  password: "",
  phoneNumber: "",
};

const UpdatePlants = (props) => {
  const { id } = props.match.params;
  const [profileUpdate, setProfileUpdate] = useState(initialProfile);

  const handleChanges = (e) => {
    setProfileUpdate({
      ...profileUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(
        `https://water-my-plants-back-end1.herokuapp.com/users/${profileUpdate.id}`,
        profileUpdate
      )
      .then((response) => {
        props.setProfileUpdate(response.data);
        props.history.push(`profile`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Update your Information</h3>
      <form onSubmit={handleUpdate}>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={profileUpdate.password}
          onChange={handleChanges}
        />

        <label htmlFor="password">Phone Number:</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="phoneNumebr"
          value={profileUpdate.phoneNumber}
          onChange={handleChanges}
        />
        <button type="update">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdatePlants;
