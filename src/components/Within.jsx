import React from 'react'
import { Marker, Popup } from 'react-leaflet'

export default function Within() {

	const center = [-6.233628818303135, 106.82149988475815]

	return (
		<Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
	)
}
