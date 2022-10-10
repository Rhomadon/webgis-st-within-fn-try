import React, { useState, useRef, useEffect } from 'react'
import { GeoJSON, LayersControl } from 'react-leaflet'
import axios from 'axios'
import * as L from 'leaflet'
import 'leaflet-path-drag';
import markerClusterGroup from 'leaflet.markercluster'

export default function LiquiditySell() {
	const [features, setFeatures] = useState([])
	const geojson = features

	const axiosData = () => {
		const url = 'http://localhost:5000/liquidity-sell/api'
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

	const popup = (e,a) => {
		let popupContent =
			"<pre>" +
			JSON.stringify(geojson.features[a].properties, null, " ").replace(/[\{\}"]/g, "") +
			"</pre>"
		e.layer.bindPopup(popupContent)
	}

	const ptsWithinPlgn = (e, lat, lng, Lat, Lng) => {
		if (lat === Lat && lng === Lng) {
			let query = 'SELECT a.id POINT_ID_WITHIN_POLYGONS FROM sample_points a, sample_polygons b WHERE ST_Within(b.geometry, a.geometry)'
			let text = `ST_AsText(ST_GeomFromGeoJSON(`+ geoPolygon +`)) As wkt`

		}
	}

	const geoPolygon = {
		"type": "FeatureCollection", "features": [
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[-6.171458331177864, 106.82324790577107],
						[-6.171582546806833, 106.8292918647082],
						[-6.173003260992031, 106.82910445512874],
						[-6.173465212895221, 106.82998437981179],
						[-6.177748243451104, 106.82988624915535],
						[-6.178477150029734, 106.83071826799736],
						[-6.178883978004937, 106.8304454646428],
						[-6.180096693894435, 106.83145894962195],
						[-6.1804779200411275, 106.82297806182642],
						[-6.171458331177864, 106.82324790577107]]
				},
				"properties": {
					"objectid": 1,
					"name": "Monumen Nasional",
					"type": "Polygon",
				}
			}
		]
	}

	const eventHandlers = {
		mouseup: (e) => {

			let count = geojson.features.length - 1
			let lat = e.layer._latlng.lat
			let lng = e.layer._latlng.lng

			for (let a = 0; a <= count; a++) {
				let coordinates = geojson.features[a].geometry.coordinates
				let Lat = coordinates[1]
				let Lng = coordinates[0]

				if (lat === Lat && lng === Lng) {
					popup(e,a)
					ptsWithinPlgn(e, lat, lng, Lat, Lng)
				}
			}
			console.log(e.latlng)
		}
	}

	return (
		<LayersControl.Overlay name="Liquidity Sell">
			<GeoJSON
				data={features}
				ref={geoJsonLayerRef}
				eventHandlers={eventHandlers}
				pointToLayer={pointToLayer}
			/>
		</LayersControl.Overlay>
	)
}
