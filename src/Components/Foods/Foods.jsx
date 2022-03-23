import "./Foods.css";
import React, { useState, useEffect } from "react";
import Food from "../Food";

export default function Foods(props) {
  const [restaurants, setRestaurants] = useState([]);

  // $= <10, $$ = 11-30, $$$ = 31-60, $$$$ = >61

  useEffect(() => {
    axios
      .get("/restaurants", {
        params: {
          latitude: 43.6532,
          longitude: 79.3832,
          price: $$,
        },
      })
      .then((res) => {
        setRestaurants(res.data.businesses);
      })
      .catch((err) => console.log(err, "this is a restaurant finder error"));
  }, []);

  return (
    <div className="Foods">
      {restaurants.map((item, idx) => {
        return <Food key={item + idx} restaurant={item} />;
      })}
    </div>
  );
}
