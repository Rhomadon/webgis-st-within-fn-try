import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function PtsWithinPly() {
	const [within, setWithin] = useState([])
	const [point, setPoint] = useState([])
	const [polygon, setPolygon] = useState([])
	let outside = point - within

	useEffect(() => {
		try {
			let url = 'http://localhost:5000/ptswithinply'
			axios.get(url).then(res => {
				setWithin(res.data.rowCount)
			}).catch(err => {
				console.log(err.message)
			})
		} catch (err) {
			console.log(err.message)
		}
	}, [])

	useEffect(() => {
		try {
			let url = 'http://localhost:5000/points-test'
			axios.get(url).then(res => {
				setPoint(res.data.features.length)
			}).catch(err => {
				console.log(err.message)
			})
		} catch (err) {
			console.log(err.message)
		}
	}, [])

	useEffect(() => {
		try {
			let url = 'http://localhost:5000/polygon-monas'
			axios.get(url).then(res => {
				setPolygon(res.data.features.length)
			}).catch(err => {
				console.log(err.message)
			})
		} catch (err) {
			console.log(err.message)
		}
	}, [])

	return (
		<nav className="level">
			<div className="level-item has-text-centered">
				<div>
					<p className="heading">Point</p>
					<p className="title">{point}</p>
				</div>
			</div>
			<div className="level-item has-text-centered">
				<div>
					<p className="heading">Polygon</p>
					<p className="title">{polygon}</p>
				</div>
			</div>
			<div className="level-item has-text-centered">
				<div>
					<p className="heading">Point Within Polygon</p>
					<p className="title">{within}</p>
				</div>
			</div>
			<div className="level-item has-text-centered">
				<div>
					<p className="heading">Point Outside Polygon</p>
					<p className="title">{outside}</p>
				</div>
			</div>
		</nav>
	)
}
