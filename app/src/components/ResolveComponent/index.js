import React from "react";
import {connect} from "react-redux";
import ResolveTabComponent from "./resolveTab";
import TabScreenComponent from "./tabScreen";
import {getInitComplaintsAction, updateStatusAction} from "../../actions/resolve.action";

class ResolveComponent extends React.Component {

    state = {
        pages: ['Home', 'News'],
        currentPage: 'Home'
    };

    constructor(props){
        super(props);
        console.log(this.props.user.role);
    }

    componentDidMount() {
        if (this.props.user.role && this.props.user.role !== 'Admin') {
            console.log('here', this.props.user.role);
            this.props.history.push('/pageNotFound');
        }
    }

    componentDidUpdate() {
        if (this.props.user.role && this.props.user.role !== 'Admin') {
            console.log('here', this.props.user.role);
            this.props.history.push('/pageNotFound');
        }
    }

    openPage = (page) => {
        this.setState({
            currentPage: page
        })
    };

    render() {
        const {
            getInitComplaintsAction
        } = this.props;
        return (
            <div className={'buzz'}>
                <ResolveTabComponent page={this.state.currentPage} openPage={this.openPage}/>
                <TabScreenComponent page={this.state.currentPage}
                                    getInitComplaintsAction={getInitComplaintsAction}
                                    resolve={this.props.resolve}
                                    user={this.props.user}
                                    updateStatus={this.props.updateStatusAction}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        resolve: state.resolve,
        user: state.user
    }
};

const mapDispatchToProps = {
    getInitComplaintsAction,
    updateStatusAction

};

const ResolveComponentConnect = connect(mapStateToProps, mapDispatchToProps)(ResolveComponent);

export default ResolveComponentConnect;