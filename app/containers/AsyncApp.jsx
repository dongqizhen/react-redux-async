import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/actions';

class AsyncApp extends React.Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
	}

	handleChange(nextSubreddit) {
		this.props.dispatch(selectSubreddit(nextSubreddit));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const { dispatch, selectedSubreddit } = this.props;

		dispatch(invalidateSubreddit(selectedSubreddit));
		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	}

	componentWillReceiveProps(nextProps) {
		console.log(11, nextProps);
		if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
			const { dispatch, selectedSubreddit } = nextProps;
			dispatch(fetchPostsIfNeeded(selectedSubreddit));
		}
	}

	componentDidMount() {
		const { dispatch, selectedSubreddit } = this.props;

		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	}

	render() {
		const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;

		return (
			<div>
				<Picker value={selectedSubreddit} onChange={this.handleChange} options={[ 'reactjs', 'fronted' ]} />
				<p>
					{lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}. </span>}
					{!isFetching && (
						<a href="#" onClick={this.handleRefreshClick}>
							Refresh
						</a>
					)}
				</p>
				{isFetching && posts.length === 0 && <h2>loading...</h2>}
				{!isFetching && posts.length === 0 && <h2>Empty.</h2>}
				{posts.length > 0 && (
					<div style={{ opacity: isFetching ? 0.5 : 1 }}>
						<Posts posts={posts} />
					</div>
				)}
			</div>
		);
	}
}

AsyncApp.propTypes = {
	selectedSubreddit: PropTypes.string.isRequired,
	posts: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number.isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const { selectedSubreddit, postsBySubreddit } = state;
	const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {
		isFetching: true,
		lastUpdated: new Date().getTime(),
		items: []
	};

	return {
		selectedSubreddit,
		posts,
		isFetching,
		lastUpdated
	};
};

export default connect(mapStateToProps)(AsyncApp);
