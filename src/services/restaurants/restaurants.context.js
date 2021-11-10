import React, { useState, createContext, useEffect, useMemo, useContext } from "react";

import { restaurantsRequest, restaurantsTransform } from "./restaurants.service";
import { LocationContext } from "../location/location.context";


export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {

    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { location } = useContext(LocationContext);

    const resolveResponse = (loc) => {
        setIsLoading(true);
        setRestaurants([]);
        setTimeout(() => {
            restaurantsRequest(loc).then(restaurantsTransform).then((result) => {
                setIsLoading(false);
                setRestaurants(result);
            }).catch(e => {
                setIsLoading(false);
                setError(e);
            })
        }, 2000)
    }

    useEffect(() => {
        if (location) {
          const locationString = `${location.lat},${location.lng}`;
          resolveResponse(locationString);
        }
      }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};