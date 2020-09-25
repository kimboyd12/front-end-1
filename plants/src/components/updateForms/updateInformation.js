import React, { useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/index"

// const initialProfile = {
//   password: "",
//   phoneNumber: "",
// };

const UpdateProfile = (props) => {
  // const { id } = props.match.params;
  const [profileUpdate, setProfileUpdate] = useState({
    password: "",
    phoneNumber:"",
  });

  const handleChanges = (e) => {
    setProfileUpdate({
      ...profileUpdate,
      [e.target.name]: e.target.value,
    });
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    props.updateProfile(profileUpdate);
  }

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   axiosWithAuth()
  //     .put(
  //       `https://water-my-plants-back-end1.herokuapp.com/users/:id`,
  //       profileUpdate
  //     )
  //     .then((response) => {
  //       props.setProfileUpdate(response.data);
  //       props.history.push(`/plants`);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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

const mapStateToProps = state => {
  return {
      profileUpdate: state.profileUpdate,
      error: state.error
  }
}

export default connect(mapStateToProps, {updateProfile})(UpdateProfile);
