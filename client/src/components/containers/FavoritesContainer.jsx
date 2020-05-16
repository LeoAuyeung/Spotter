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
		console.log(this.props.loggedInUser.id);
		await this.props.getFavorites(this.props.loggedInUser.id);

		this.setState({
			favorites: this.props.favorites,
		});
	};

	render() {
		let list;
		if (this.state.favorites !== undefined) {
			const filteredFavorites = this.state.favorites.filter(
				(user, index, self) =>
					self.findIndex((u) => u[0].id === user[0].id) === index
			);

			list = this.state.favorites.map((f) => (
				// <Link to={`/profile/${f[0].id}`}></Link>
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
		loggedInUser: state.user.loggedInUser,
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
