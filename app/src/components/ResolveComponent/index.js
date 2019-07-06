import React from "react";
import {connect} from "react-redux";
import ResolveTabComponent from "./ResolveTab";
import TabScreenComponent from "./tabScreen";
import {
    assignResolveService,
    changeStatus,
    getInitialComplaints,
    getMyDeptResolves,
    setResolveStatusDefaultAction
} from "../../services/resolve.service";

class ResolveComponent extends React.Component {

    state = {
        pages: ['Home', 'News'],
        currentPage: 'Home'
    };


    componentDidMount() {
        if (this.props.user.role && this.props.user.role !== 'Admin') {
            this.props.history.push('/pageNotFound');
        }
    }

    componentDidUpdate() {
        if (this.props.user.role && this.props.user.role !== 'Admin') {
            this.props.history.push('/pageNotFound');
        }
    }

    openPage = (page) => {
        this.setState({
            currentPage: page
        })
    };

    render() {
        return (
            <div className={'buzz'}>
                <ResolveTabComponent page={this.state.currentPage} openPage={this.openPage}/>
                <TabScreenComponent page={this.state.currentPage}
                                    getInitialComplaints={this.props.getInitialComplaints}
                                    resolve={this.props.resolve}
                                    user={this.props.user}
                                    getMyDeptResolves={this.props.getMyDeptResolves}
                                    changeStatus={this.props.changeStatus}
                                    setResolveStatusDefaultAction={this.props.setResolveStatusDefaultAction}
                                    assignResolveService={this.props.assignResolveService}
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
    getInitialComplaints,
    getMyDeptResolves,
    changeStatus,
    setResolveStatusDefaultAction,
    assignResolveService
};

const ResolveComponentConnect = connect(mapStateToProps, mapDispatchToProps)(ResolveComponent);

export default ResolveComponentConnect;