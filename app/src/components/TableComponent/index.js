import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TableRowComponent from "./TableRow";

class TableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns
        }
    }

    render() {

        const {
            columns
        } = this.props;

        return (
            <table>
                <thead>
                <tr>
                    {this.state.columns.map((header) => {
                        return <th>{header.title}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {this.props.dataList.map((dataRow) => {
                    return (
                        <TableRowComponent columns={columns} dataRow={dataRow}/>
                    )
                })}
                </tbody>
            </table>
        )
    }

}

TableComponent.propTypes = {};

TableComponent.defaultProps = {};

export default TableComponent;