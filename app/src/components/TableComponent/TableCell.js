import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TableCell extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: props.value
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.props.handleChange && this.props.handleChange();
    };

    render() {
        const {
            type: cellType,
            optionList,
            onClickHandler
        } = this.props.cellData;
        const {
            value
        } = this.state;

        return (
            <td>
                {cellType === 'button' && <button onClick={onClickHandler}>{value}</button>}
                
                {cellType === 'dropdown' && <select value={value} onChange={this.handleChange} name={'value'}>
                    {optionList.map((option) => {
                        return <option value={option}>{option}</option>
                    })}
                </select>}
                
                {(cellType === 'normal' || !cellType) && <span>{value}</span>}
            </td>
        )
    }

}

TableCell.propTypes = {
    cellData: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired
};

TableCell.defaultProps = {

};

export default TableCell;