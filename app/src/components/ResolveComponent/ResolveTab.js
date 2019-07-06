import React from 'react';

class ResolveTabComponent extends React.Component {

    render() {
        const {page} = this.props;
        return (
            <div className={'clearfix'}>
                <button className={page === 'Home' ? 'tablink resolveTabActive': 'tablink'} onClick={() => this.props.openPage('Home')}>All Complaints</button>
                <button className={page === 'News' ? 'tablink resolveTabActive': 'tablink'} onClick={() => this.props.openPage('News')}>My Department Complaints</button>
            </div>
        )
    }

}

export default ResolveTabComponent;