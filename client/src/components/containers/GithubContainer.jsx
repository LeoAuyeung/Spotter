import React, { Component } from "react";
import { connect } from "react-redux";

import { GithubView } from "../views";

import { getCommitsThunk } from "../../actions";

class GithubContainer extends Component {
	handleButton = async () => {
		await this.props.getCommits();
	};

	render() {
		return (
			<GithubView
				commits={this.props.commits}
				handleButton={this.handleButton}
			/>
		);
	}
}

const mapStateToProps = state => ({
	commits: state.git.commits
});

const mapDispatchToProps = dispatch => ({
	getCommits: () => dispatch(getCommitsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(GithubContainer);
