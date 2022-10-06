import React, { useState, useRef, useEffect } from 'react'
import { GeoJSON, LayersControl } from 'react-leaflet'
import axios from 'axios'
import * as L from 'leaflet'
import 'leaflet-path-drag';
import markerClusterGroup from 'leaflet.markercluster'

export default function LiquiditySell() {
	const [features, setFeatures] = useState([])

	const axiosData = () => {
		const url = 'http://localhost:4000/liquidity-sell/api'
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
			console.log("Api Liquidity-Sell")
			layer.clearLayers().addData(features)
		}
	}, [features])

	const markers = L.markerClusterGroup()

	const pointToLayer = (feature, latlng) => {
		return markers.addLayer(L.marker(latlng, {draggable: true}))
	}

	const handleFeature = (layer) => {
		let popupContent =
			"<pre>" +
			JSON.stringify(layer.feature.properties, null, " ").replace(/[\{\}"]/g, "") +
				"</pre>"

			layer.bindPopup(popupContent)
	}



	const eventHandlers = {
		mousemove(e) {
			console.log(e.latlng)
		}

	}

	return (
		<LayersControl.Overlay name="Liquidity Sell">
			<GeoJSON
				data={features}
				ref={geoJsonLayerRef}
				eventHandlers={eventHandlers}
				onEachFeature={(feature, layer) => handleFeature(layer)}
				pointToLayer={pointToLayer}
				style={() => ({
					color: '#4a83ec',
					weight: 0.5,
					fillColor: "#1a1d",
					fillOpacity: 0.7,
					opacity: 0.5,
					radius: 8,
          })}
			/>
		</LayersControl.Overlay>
	)
}
