import React, { useEffect, useState } from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow
} from '@vis.gl/react-google-maps'
import { CircularProgress } from '@mui/material';

function ProfileMap({ address }) {
  const [openInfo, setOpenInfo] = useState(false);
  const [displayMap, setDisplayMap] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplayMap(true) // loading indicator to show dummy loading for map
    }, 500)
  }, [])

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <div className='profile-map'>
        {
          displayMap ?
            <div style={{ height: "300px", width: "100%" }}>
              <Map zoom={9} center={address.coordinates} mapId={process.env.REACT_APP_MAP_ID}>
                <AdvancedMarker position={address.coordinates} onClick={() => setOpenInfo(true)} />
                {
                  openInfo &&
                  <InfoWindow position={address.coordinates} onCloseClick={() => setOpenInfo(false)}>
                    <p>Hi, I'm in {address.city}, {address.state}</p>
                  </InfoWindow>
                }
              </Map>
            </div> :
            <CircularProgress />
        }
      </div>
    </APIProvider>
  )
}

export default ProfileMap;
