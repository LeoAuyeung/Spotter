import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
	width: "100%",
	height: "100%",
};

const MapPageView = (props) => {
	const { lat, long, displayMarkers } = props;

	return (
		<Map
			google={props.google}
			zoom={16}
			style={mapStyles}
			initialCenter={{
				lat: lat,
				lng: long,
			}}
		>
			{displayMarkers(lat, long)}
		</Map>
	);
};

export default GoogleApiWrapper({
	apiKey: "AIzaSyAzSUhwAJNBV1NvOsU7BCtwZZFNhXRyzZs",
})(MapPageView);
