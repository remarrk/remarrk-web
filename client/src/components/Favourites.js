import React from 'react';
import axios from "axios";

function Favourites(props) {
  const getFavourites = (userId) => {
    axios.get(`http://localhost:3001/get-favourites?userId=${userId}`)
      .then((res) => {
        console.log(res);
        let favourite = res.data;
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      {
        getFavourites(props.userId)
      }
    </div>
  );
}

export default Favourites;