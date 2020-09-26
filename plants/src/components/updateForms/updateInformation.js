import React, { useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/index";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledTitle = styled.div`
  h1 {
    font-family: "Raleway", sans-serif;
    font-size: 2.5rem;
    margin: 3%;
    color: #a0d6b4;
  }
`;

const StyledPage = styled.div`
  background: radial-gradient(
    circle,
    rgba(160, 214, 180, 1) 9%,
    rgba(255, 255, 255, 1) 100%
  );

  height: 100vh;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-decoration: none;
  p {
    color: #c6d7dd;
    margin-top: 2%;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;
  }
  .link {
    text-decoration: none;
    color: blue;
    &:hover {
      color: black;
    }
  }
  .errors {
    font-size: 1.5rem;
    font-family: "Quicksand", sans-serif;
  }
`;
const StyledForm = styled.div`
  width: 30%;
  padding: 2%;
  border-radius: 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  form {
    width: 100%;
  }
  button {
    color: white;
    padding: 10px 10px;
    border-radius: 4px;
    border: 2px solid white;
    background: transparent;

    font-family: "Quicksand", sans-serif;
    cursor: pointer;
    margin-top: 2%;
  }

  p {
    color: #a0d6b4;
  }
`;

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 62.5%;
  width: 100%;
  h2 {
    text-align: center;
    font-size: 1.7rem;
    font-family: "Quicksand", sans-serif;
  }
  label {
    width: 95%;
    text-align: center;
    margin: 0% 2% 0% 2%;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }
  input {
    width: 100%;
    padding: 1rem 1rem;
    margin: 3%;
    background: transparent;
    border-radius: 0.5rem;
    box-sizing: border-box;

    outline: 0;
    border: none;
    border-bottom: 2px solid white;
  }

  input:focus {
    border-color: #49796b;
    background: transparent;
  }
`;
// const initialProfile = {
//   password: "",
//   phoneNumber: "",
// };

const UpdateProfile = (props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  // const { id } = props.match.params;
  const [profileUpdate, setProfileUpdate] = useState({
    password: "",
    phoneNumber: "",
  });

  const handleChanges = (e) => {
    setProfileUpdate({
      ...profileUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileUpdate));
    localStorage.setItem("phoneNumber", profileUpdate.phoneNumber);
    push("/profile");
  };

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
      <StyledTitle>
        <h1>Update your Information</h1>
      </StyledTitle>
      <div className="ui horizontal divider" style={{ margin: "2%" }}>
        Enter New Information
      </div>
      <StyledPage>
        <FormContainer>
          <StyledForm>
            <form onSubmit={handleUpdate}>
              <StyledFormInput>
                <input
                  id="password"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={profileUpdate.password}
                  onChange={handleChanges}
                />

                <input
                  id="phoneNumber"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  type="phoneNumebr"
                  value={profileUpdate.phoneNumber}
                  onChange={handleChanges}
                />
              </StyledFormInput>
              <button type="update">Update Profile</button>
            </form>
          </StyledForm>
        </FormContainer>
      </StyledPage>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profileUpdate: state.profileUpdate,
    error: state.error,
  };
};

export default connect(mapStateToProps, { updateProfile })(UpdateProfile);
