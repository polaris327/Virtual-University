import React, {
	PropTypes,
	Component
}
from 'react';
import {
	asyncConnect
}
from 'redux-connect';
import {
	Grid
}
from 'react-bootstrap';
import Carousel from './Carousel';

import {
	fetchCourses
}
from '../../redux/actions/coursesActions';
import {
	isBrowser,
	isLoaded
}
from '../../redux/utils/helpers';

const propTypes = {
	title: PropTypes.string,
	courses: PropTypes.object,
	dispatch: PropTypes.func
};

const defaultProps = {
	title: 'HVU - Hanshaw Virtual University',
	courses: {
		list: []
	},
	dispatch: () => {}
};

class Homepage extends Component {
	constructor(props) {
		super(props);	
	}
	
	componentDidMount() {
		this.props.dispatch(fetchCourses());
	}
	
	render() {
		const popular = this.props.courses.courses ? (<Carousel coursesList={this.props.courses.courses} title='Top 20 popular courses' />) : '';
		const recent = this.props.courses.courses ? (<Carousel coursesList={this.props.courses.courses} title='Top 20 popular courses' />) : '';
		const discounted = this.props.courses.courses ? (<Carousel coursesList={this.props.courses.courses} title='Top 20 popular courses' />) : '';
		
		return (
			<Grid fluid={false}>
				<h1>{this.props.title}</h1>
				
				{popular}
				
				<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum omnis quos repellendus? Aspernatur deserunt,
					esse quam rem sint soluta totam! Alias at dolores eveniet incidunt porro! Excepturi mollitia officia
					voluptates.
					<hr/>
					<br/>
				</div>
				
				{recent}

				<div>Ad, deleniti quis? Ab ea, magnam magni nemo nesciunt obcaecati officiis, quas repellendus saepe sint velit
					veniam. Cumque, deleniti dicta esse sequi sint veritatis! Assumenda at ipsam molestias quibusdam repellat?
					<hr/>
					<br/>
				</div>
				
				{discounted}

				<div>Atque aut dolores exercitationem facere iure, magnam minus modi nemo nesciunt quae quaerat, quia reiciendis
					saepe sapiente sit ullam voluptatem. A cumque neque officia porro quasi sequi sit, soluta voluptatem!
					<hr/>
					<br/>
				</div>
				
      </Grid>
		);
	}
}

Homepage.propTypes = propTypes;
Homepage.defaultProps = defaultProps;

const asyncPromises = [{
	key: 'courses',
	promise: ({
		store
	}) => {
		if (!isBrowser()) {
			const state = store.getState();

			if (!isLoaded(state, 'courses')) {
				return store.dispatch(fetchCourses());
			}
		}

		return null;
	}
}];

function mapStateToProps(state) {
	const courses = state.courses;
	
	return {
		// courses
	};
};

export default asyncConnect(asyncPromises, mapStateToProps)(Homepage);
