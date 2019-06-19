import React from 'react';
import {changeStatus} from "../../services/resolve.service";

class ResolveRowComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ['Pending', 'In Progress', 'Completed', 'Closed']
        }
    };

    saveAction = (id) => {
        if(this.state[id]){
            changeStatus(id, this.state[id]).then((res) => {
                if(res.status){
                    this.props.updateStatus(id, this.state[id]);
                } else {
                    console.log(res.message);
                }
            })
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        const {
            _id,
            status,
            loggedBy,
            department
        } = this.props.resolves;
        const statusIndex = this.state.status.indexOf(status);

        return (
            <tr>
                <td>{_id}</td>
                <td>{loggedBy.name}</td>
                <td>
                {((this.props.resolves.department === this.props.currentUser.department) && (['Completed', 'Closed'].indexOf(status) === -1))
                    ?
                    <select name={_id} onChange={this.handleChange}>
                        {this.state.status.slice(statusIndex).map((item) => {
                            return <option value={item}>{item}</option>
                        })}
                    </select> : <span>{status}</span>
                }
                </td>
                <td>
                    {((department === this.props.currentUser.department) && (['Completed', 'Closed'].indexOf(status) === -1))
                        ?
                        <button onClick={() => this.saveAction(_id)}>Save</button> : null
                    }
                </td>
            </tr>
        );
    }
}

export default ResolveRowComponent;