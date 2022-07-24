import React from "react";
import "./repo.less";
import { NavLink } from "react-router-dom";

const Repo = (props) => {
	const repo = props.repo;
	return (
		<div className="repo">
			<div className="repo-header">
				<div className="repo-header-name">
					<NavLink to={`/card/${repo.owner.login}/${repo.name}`}>{repo.name}</NavLink>
				</div>
				<div className="repo-header-stars">
					⭐ <strong>{repo.stargazers_count}</strong>
				</div>
			</div>
			<div className="repo-last-commit">
				Last commit at:{" "}
				<strong>{repo.updated_at.replace(/-/g, "/").replace(/(-|T|Z)/g, " ")}</strong>
			</div>
			<a href={repo.html_url} class="repo-link">
				Link: {repo.html_url}
			</a>
		</div>
	);
};

export default Repo;
