import React, { Component } from "react";
import { connect } from "react-redux";

import { GithubView } from "../views";

import { getCommitsThunk, clearCommits } from "../../actions";

class GithubContainer extends Component {
	handleGet = async e => {
		e.preventDefault();
		await this.props.getCommits();
	};

	handleClear = e => {
		e.preventDefault();
		this.props.clearCommits();
	};

	render() {
		return (
			<GithubView
				commits={this.props.commits}
				handleGet={this.handleGet}
				handleClear={this.handleClear}
			/>
		);
	}
}

const mapStateToProps = state => ({
	commits: state.git.commits
});

const mapDispatchToProps = dispatch => ({
	getCommits: () => dispatch(getCommitsThunk()),
	clearCommits: () => dispatch(clearCommits())
});

export default connect(mapStateToProps, mapDispatchToProps)(GithubContainer);
