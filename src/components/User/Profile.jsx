import React, { PropTypes, Component }    from 'react';
import { connect }                        from 'react-redux';
import {
	FormGroup,
	ControlLabel,
	FormControl
}																					from 'react-bootstrap';

const propTypes = {
	email: PropTypes.string,
	name: PropTypes.string,
	birthday: PropTypes.number
};

const defaultProps = {
	email: '',
	name: '',
	birthday: 0
};

class Profile extends Component {
	render() {
		return (
			<div>
				<h1>Profile</h1>
				<form action="/">
					<FormGroup>
						<ControlLabel>Email</ControlLabel>
						<FormControl
							type="text"
							value={this.props.user.email}
							placeholder="Enter email"
						/>
						<FormControl.Feedback />
					</FormGroup>

					<FormGroup>
						<ControlLabel>Name</ControlLabel>
						<FormControl
							type="text"
							value={this.props.user.name}
							placeholder="Enter name"
						/>
						<FormControl.Feedback />
					</FormGroup>

					<FormGroup>
						<ControlLabel>Birthday</ControlLabel>
						<FormControl
							type="text"
							value={this.props.user.birthday}
							placeholder="Enter birthday"
						/>
						<FormControl.Feedback />
					</FormGroup>
				</form>
				
			</div>
		);
	}
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

function mapStateToProps(state) {
	const user = state.user;
	return {
		user
	};
};

export default connect(mapStateToProps)(Profile);
