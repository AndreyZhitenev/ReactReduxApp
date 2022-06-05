import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getContributors, getCurrentRepo } from '../actions/repos'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFetching } from '../../reducers/reposReducer'

import './card.less'

const Card = props => {
	const dispatch = useDispatch()
	const { username, reponame } = useParams()
	const [repo, setRepo] = useState({ owner: {} })
	const [contributors, setContributors] = useState([])
	const isFetching = useSelector(state => state.repos.isFetching)

	useEffect(() => {
		getCurrentRepo(username, reponame, setRepo)
		getContributors(username, reponame, setContributors)
	}, [])

	return (
		<div>
			<button onClick={() => props.history.goBack()} className='back-btn'>
				BACK
			</button>

			{isFetching === false ? (
				<div className='card'>
					<img src={repo.owner.avatar_url} alt='' />
					<div className='name'>{repo.name}</div>
					<div className='stars'>{repo.stargazers_count}</div>
					<ul>
						{contributors.map((c, index) => (
							<li>
								{index + 1}. {c.login}
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className='fetching'></div>
			)}
		</div>
	)
}

export default Card
