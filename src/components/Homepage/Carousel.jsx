import React, { PropTypes, Component }    from 'react';
import { connect }                          from 'react-redux';
import {
	Thumbnail,
	Button,
	Row,
	Col
} 																				from 'react-bootstrap';
import { Link }                           from 'react-router';
import Slider 														from 'react-slick';

import { fetchSubscribe }									from '../../redux/actions/coursesActions';

import './Carousel.css';

const propTypes = {
	title: PropTypes.string,
	coursesList: PropTypes.array,
	dispatch: PropTypes.func
};

const defaultProps = {
	title: '',
	coursesList: [],
	dispatch: () => {}
};

class Carousel extends Component {
	constructor(props) {
		super(props);
		
		this.handleSubscribe = this.handleSubscribe.bind(this);
	}
	
	handleSubscribe(course) {
		console.log('Subscribe: ', course);
		this.props.dispatch(fetchSubscribe(course));
	}
	
  render() {
		
    let courses = [];
    
    // TODO: Remove! This block only for demo
    courses = courses.concat(this.props.coursesList);
    courses = courses.concat(this.props.coursesList);
    courses = courses.concat(this.props.coursesList);
    courses = courses.concat(this.props.coursesList);
		
    var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			// slidesToShow: 3,
			// slidesToScroll: 1,
			autoPlay: true,
			responsive: [ 
				{ breakpoint: 768, settings: 'unslick', slidesToScroll: 1 },
				{ breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
				{ breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } }, 
				{ breakpoint: 100000000, settings: { slidesToShow: 4, slidesToScroll: 4 } } ]
    };
    
    return (
			<section >
				<h2>{this.props.title}</h2>
				<div className='slider-container'>
					<Slider {...settings}>
						{courses.map((course, i) => {
							return(
								<div key={i}>
									<Thumbnail src={course.courseImage.secure_url} alt="242x200">
										<h3>{course.name}</h3>
										<p>{course.description || 'No description yet'}</p>
										<Row>
											<Col xs={6}>
												<Link to={`/course/${course.name}`}>
													<Button bsStyle="primary" block>Details</Button>
												</Link>
											</Col>
											<Col xs={6}>
												<Button bsStyle="success" block onClick={() => {this.handleSubscribe(course.name)}}>Subscribe</Button>
											</Col>
										</Row>
									</Thumbnail>
								</div>
							)}
						)}
					</Slider>
				</div>
			</section>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

function mapStateToProps(state) {
	return { 
		
	};
}

export default connect(mapStateToProps)(Carousel);
