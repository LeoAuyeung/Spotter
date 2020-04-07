import React, { Component } from "react";
import { Marker } from "google-maps-react";
import { geolocated } from "react-geolocated";

import { MapPageView } from "../views";

export class MapViewContainer extends Component {
	displayMarkers = (lat, long) => {
		return (
			<Marker
				key={1}
				id={1}
				position={{
					lat: lat,
					lng: long,
				}}
				onClick={() => console.log("You clicked me!")}
			/>
		);
	};

	render() {
		return !this.props.isGeolocationAvailable ? (
			<div>Your browser does not support Geolocation</div>
		) : !this.props.isGeolocationEnabled ? (
			<div>Geolocation is not enabled</div>
		) : this.props.coords ? (
			<MapPageView
				lat={this.props.coords.latitude}
				long={this.props.coords.longitude}
				displayMarkers={this.displayMarkers}
			/>
		) : (
			<div>Getting the location data&hellip; </div>
		);
	}
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
})(MapViewContainer);
