import React, {useEffect, useState} from 'react';
import axios from "axios";

function Favourites(props) {
  const [favourites, setFavourites] = useState(null);

  const getFavourites = (userId) => {
    axios.get(`http://localhost:3001/get-favourites?userId=${userId}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        return null;
      })
  }

  useEffect(() => {
    getFavourites(props.userId)
  })

  return (
    <div>
      {
        getFavourites(props.userId).map(favourite => console.log(favourite.message))
        //favourites.map(favourite => <div>{favourite.message}</div>)
      }
    </div>
  );
}

export default Favourites;