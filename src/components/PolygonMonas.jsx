import React from 'react'
import { Polygon } from 'react-leaflet'

const polygon = {
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

const latlng = polygon.features[0].geometry.coordinates

console.log(latlng)

const purpleOptions = { color: 'purple' }

export default function PolygonMonas() {
	return (
		<Polygon pathOptions={purpleOptions} positions={latlng}/>
	)
}
