import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TableCell from "./TableCell";

class TableRowComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.dataRow
        }
    }



    render(){
        return (
            <tr>
                {this.props.columns.map((cell) => {
                    return (
                        <TableCell cellData={cell} value={this.state[cell.dataKey] || cell.value}/>
                    )
                })}
            </tr>
        )
    }

}

TableRowComponent.propTypes = {
    dataRow: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired
};

TableRowComponent.defaultProps = {
};

export default TableRowComponent;