import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../api/axiosWithAuth";
import { useHistory } from 'react-router-dom'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {

  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property


  const history = useHistory()

  const getColors = () => {
    axiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        console.log('getColors: res: ', res);
        setColorList(res.data)

      })
      .catch((err) => {
        if (err.response) {
          console.error(
            "getColors failed: response from server: ",
            err.response.data
          );
        } else {
          console.error("getColors failed: ", err);
        }
      });
  }

  useEffect(() => getColors(), [history.location.key])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
