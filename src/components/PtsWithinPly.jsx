import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

export default function PlsWithinPly() {
	const [features, setFeatures] = useState([])

	const axiosData = () => {
		const url = 'http://localhost:5000/ptswithinply'
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
			console.log("Api Points_Test")
			layer.clearLayers().addData(features)
		}
	}, [features])

	return (
		<div>
			{
				console.log(features.rows)
			}
		</div>
	)
}
