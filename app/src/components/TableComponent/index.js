import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TableRowComponent from "./TableRow";

class TableComponent extends Component {

    render() {
        return (
            <div>
                {this.props.dataList.map((tableRowData) => {
                    return (
                        <TableRowComponent tableRowData={tableRowData}/>
                    )
                })}
            </div>
        )
    }

}

TableComponent.propTypes = {};

TableComponent.defaultProps = {};

export default TableComponent;