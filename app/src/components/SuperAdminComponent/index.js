import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SuperUser extends Component {

    componentDidMount() {

    }

    render(){
        return (
            <div>

            </div>
        )
    }

}

SuperUser.propTypes = {
    users: PropTypes.array.isRequired
};

SuperUser.defaultProps = {
};

export default SuperUser;