import React, { useState, useRef, useEffect } from 'react'
import { GeoJSON, LayersControl } from 'react-leaflet'
import axios from 'axios'
import * as L from 'leaflet'
import 'leaflet-path-drag';
import markerClusterGroup from 'leaflet.markercluster'

export default function PropertySell() {
	const [features, setFeatures] = useState([])
	const geojson = features

	const axiosData = () => {
		const url = 'http://localhost:4000/property-sell/api'
		axios.get(url).then(res => {
			setFeatures(res.data)
		}).catch(err => {
			console.log(err.message)
		})
	}

	const geoJsonLayerRef = useRef(null)
	const isMountRef = useRef(true)

	useEffect(() => {
		if (isMountRef.current) {
			axiosData()
			isMountRef.current = false
		}
	}, [])

	useEffect(() => {
		const layer = geoJsonLayerRef.current
		if (layer) {
			console.log("Api Property-Sell")
			layer.clearLayers().addData(features)
		}
	}, [features])

	const markers = L.markerClusterGroup()

	const pointToLayer = (feature, latlng) => {
		return markers.addLayer(L.marker(latlng, {draggable: true}))
	}

	const eventHandlers = {
		mouseup: (e) => {

			let count = geojson.features.length - 1
			let lat = e.layer._latlng.lat
			let lng = e.layer._latlng.lng
			let coordinates = geojson.features

			for (let a = 0; a <= count; a++) {
				let Lat = coordinates[a].geometry.coordinates[1]
				let Lng = coordinates[a].geometry.coordinates[0]

				if (lat === Lat && lng === Lng) {

					let popupContent =
						"<pre>" +
						JSON.stringify(geojson.features[a].properties, null, " ").replace(/[\{\}"]/g, "") +
						"</pre>"

					e.layer.bindPopup(popupContent)

				}
			}
		}
	}

	return (
		<LayersControl.Overlay name="Property Sell">
			<GeoJSON
				data={features}
				ref={geoJsonLayerRef}
				eventHandlers={eventHandlers}
				pointToLayer={pointToLayer}
			/>
		</LayersControl.Overlay>
	)
}
