import React, { useEffect, useRef, useMemo} from "react";
import { useLoadScript } from '@react-google-maps/api';
import Map from './components/Map'



const libraries = ['places']

const App = ()=>{

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:'YOUR API KEY',
    libraries:libraries
  });

  if(!isLoaded) return <div>Loading ....</div>;
  return <Map />;
}

export default App