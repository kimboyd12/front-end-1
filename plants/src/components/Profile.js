import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <img
        src="https://raw.githubusercontent.com/Build-Week-PT-Water-My-Plants/marketing-page/layout-2nd-page-greg-roberts/images/team/Gabriellia%20Venegas-Johnson.png"
        alt="Gabriellia Venegas-Johnson"
      />
      <p id="info">Username: Gabby Venegas</p>
      <p id="info">Phone Number: 555-555-5555</p>
      <p>Favorite Plants: Cactus</p>
      <Link to="/plantlist">
        <button>View Your Plants</button>
      </Link>
      <Link to="/plants">
        <button>Add Plants</button>
      </Link>
      <Link to="/updateaccount">
        <button>Update Your Profile</button>
      </Link>
    </div>
  );
}
