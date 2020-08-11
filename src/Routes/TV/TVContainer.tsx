import React, { useState, useEffect } from 'react';
import TVPresenter from './TVPresenter';
import { tvAPI } from '../../api';

export type TvType = {
	id: string;
	name: string;
	vote_average: number;
	poster_path: string;
	first_air_date: string;
};

export interface TVInterface {
	topRated: Array<TvType>;
	popular: Array<TvType>;
	airingToday: Array<TvType>;
	error: string;
	loading: boolean;
}
export default function TVContainer() {
	const [ state, setState ] = useState({
		topRated: [],
		popular: [],
		airingToday: [],
		error: '',
		loading: true
	});
	const { topRated, popular, airingToday, error, loading } = state;

	useEffect(
		() => {
			async function get() {
				try {
					const { data: { results: topRated } } = await tvAPI.topRated();
					const { data: { results: popular } } = await tvAPI.popular();
					const { data: { results: airingToday } } = await tvAPI.airingToday();
					setState({ ...state, topRated, popular, airingToday, loading: false });
				} catch (e) {
					setState({
						...state,
						error: "Can't find TV information",
						loading: false
					});
				}
			}
			get();
		},
		[ state ]
	);

	console.log(state);
	return (
		<TVPresenter topRated={topRated} popular={popular} airingToday={airingToday} error={error} loading={loading} />
	);
}
