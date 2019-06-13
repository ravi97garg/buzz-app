import React from 'react';
import ComplaintsForm from './complaintForm';
import ComplaintsTable from './complaintTable';

export default class ComplaintsComponent extends React.Component {
    render(){
        return (
            <div className={'buzz'}>
                <ComplaintsForm/>
                <ComplaintsTable/>
            </div>
        )
    }
}