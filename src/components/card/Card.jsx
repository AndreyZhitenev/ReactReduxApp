import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getContributors, getCurrentRepo } from "../actions/repos";
import { useDispatch, useSelector } from "react-redux";
import { setIsFetching } from "../../reducers/reposReducer";

import "./card.less";

const Card = (props) => {
	const dispatch = useDispatch();
	const { username, reponame } = useParams();
	const [repo, setRepo] = useState({ owner: {} });
	const [contributors, setContributors] = useState([]);
	const isFetching = useSelector((state) => state.repos.isFetching);

	useEffect(() => {
		getCurrentRepo(username, reponame, setRepo);
		getContributors(username, reponame, setContributors);
	}, []);

	return (
		<div>
			<button onClick={() => props.history.goBack()} className="back-btn">
				Back
			</button>

			{isFetching === false ? (
				<div className="card">
					<div class="img-overlay">
						<img src={repo.owner.avatar_url} alt="" />
					</div>
					<div>
						<div className="card-header">
							<div className="name">{repo.name}</div>
							<div className="stars">
								⭐ <strong>{repo.stargazers_count}</strong>
							</div>
						</div>
						<ul>
							<h3>Contributors list:</h3>
							{contributors.map((c, index) => (
								<li>
									{index + 1}. {c.login}
								</li>
							))}
						</ul>
					</div>
				</div>
			) : (
				<div className="fetching"></div>
			)}
		</div>
	);
};

export default Card;
