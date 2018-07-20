import React from 'react';
import PropTypes from 'prop-types';

class Posts extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<ul>
				{this.props.posts.map((post, i) => {
					return (
						<li key={i}>
							{post.title} <a href={post.url}>{post.url}</a>
						</li>
					);
				})}
			</ul>
		);
	}

	componentDidMount() {}
}

Posts.propTypes = {
	posts: PropTypes.array.isRequired
};

export default Posts;
