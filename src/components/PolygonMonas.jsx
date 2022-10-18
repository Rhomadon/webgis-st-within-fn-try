import React, { useState, useRef, useEffect } from 'react'
import { GeoJSON, LayersControl } from 'react-leaflet'
import axios from 'axios'

export default function PolygonMonas() {
	const [features, setFeatures] = useState([])

	const axiosData = () => {
		const url = 'http://localhost:5000/polygon-monas'
		axios.get(url).then(res => {
			setFeatures(res.data.features[0])
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
			console.log("Api Polygon Monas")
			layer.clearLayers().addData(features)
		}
	}, [features])

	return (
		<LayersControl.Overlay name="Polygon Monas">
			<GeoJSON data={features} ref={geoJsonLayerRef} />
		</LayersControl.Overlay>
	)
}