import React from "react";
import {connect} from "react-redux";

class ComplaintTable extends React.Component {

    render() {
        return (
            <div>
                <table></table>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        complaints: state.complaints
    }
};

const ComplaintTableConnect = connect(mapStateToProps)(ComplaintTable);

export default ComplaintTableConnect;