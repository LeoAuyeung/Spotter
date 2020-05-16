import React, { Component } from "react";

import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getConnectionsThunk } from "../../actions";

class ConnectionsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			connections: undefined,
		};
	}

	componentDidMount = async () => {
		await this.props.getConnections();

		this.setState({
			connections: this.props.connections,
		});

		console.log(this.state.connections);
	};

	render() {
		let list;
		if (this.state.connections !== undefined) {
			const filteredConnections = this.state.connections
				.filter(
					(user, index, self) =>
						self.findIndex((u) => u[0].id === user[0].id) === index
				)
				.map((u) => u[0]);

			list = filteredConnections.map((u) => (
				<li>
					<Link to={`/profile/${u.id}`}>
						{u.first} {u.last}
					</Link>
				</li>
			));
		}

		return (
			<div>
				<h1>Connections</h1>
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
		connections: state.user.connections,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getConnections: () => dispatch(getConnectionsThunk()),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(ConnectionsContainer);
