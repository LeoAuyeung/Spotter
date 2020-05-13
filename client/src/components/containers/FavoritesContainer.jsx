import React, { Component } from "react";

import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { getFavoritesThunk } from "../../actions";

class FavoritesComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: undefined,
		};
	}

	componentDidMount = async () => {
		await this.props.getFavorites(this.props.currentUser.profile.id);

		this.setState({
			favorites: this.props.favorites,
		});
	};

	render() {
		let list;
		if (this.state.favorites !== undefined) {
			list = this.state.favorites.map((f) => (
				<li style={{ fontSize: "20px" }}>User {f.userId_2}</li>
			));
		}

		return (
			<div>
				<h1>Favorites</h1>
				<div>
					<ul>{list}</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.user.currentUser,
		favorites: state.user.favorites,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getFavorites: (id) => dispatch(getFavoritesThunk(id)),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(FavoritesComponent);
