import React from "react";

const GithubView = props => {
	const { commits, handleGet, handleClear } = props;

	return (
		<div>
			<h1>Github</h1>
			<button onClick={handleGet}>Get Commits</button>
			<button onClick={handleClear}>Clear Commits</button>
			<div>
				{commits.map(c => {
					return (
						<div>
							<ul>
								<li>Author: {c.payload.commits[0].author.name}</li>
								<li>Commit Message: {c.payload.commits[0].message}</li>
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default GithubView;
