import React, {useState, useMemo, useEffect} from 'react';

import { GoogleMap, Marker } from '@react-google-maps/api';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";


import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
	//ComboboxOptionText,
} from "@reach/combobox";

import "@reach/combobox/styles.css";


export function Map( {errormsg, valueDirection }){
    const center = useMemo(()=>({lat:-33.4723925, lng:  -70.7946378}), [])
    const [selected, setSelected] = useState(null)
    const [directionValue, setDirectionValue] = useState(null)


    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    //     libraries: ["places"],
    //     })

    useEffect( () => {
        valueDirection(directionValue)
    }, [selected])


    

    return (
        <>
        <div className="places-container">
            <PlacesAutocomplete errormsg setSelected={setSelected}  direction={setDirectionValue}  />
        </div>
      

            <GoogleMap 
            zoom={selected ? 15 : 10} 
            center={selected ? selected : center} 
            mapContainerClassName="map-container">

            {selected && <Marker position={selected} /> }
            </GoogleMap>

       
        
        </>
        
    )
}

const PlacesAutocomplete = ({setSelected, errormsg, direction}) => {

    const {
        ready,
        value,
        setValue,
        suggestions: {
            status,
            data
        },
        clearSuggestions,
    } = usePlacesAutocomplete();


    const handleSelect = async (address)=> {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const {lat, lng} = await getLatLng(results[0]);
        setSelected({ lat, lng});
        direction(address)


       


    }

    return <>

    <Combobox onSelect={handleSelect}>
        <ComboboxInput required placeholder='Calle número, comuna, ciudad' aria-labelledby="inputmap" value={value} onChange={e => setValue(e.target.value)  } disabled={!ready} className='combobox-input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm mb-4' />
        {errormsg}
        <ComboboxPopover>
            <ComboboxList aria-labelledby="inputmap">
                {status === "OK" && 
                    data.map(({place_id, description}) => (
                        <ComboboxOption key={place_id} value={description} />
                    ))}
            </ComboboxList>

        </ComboboxPopover>
    </Combobox>

    
    </>

}