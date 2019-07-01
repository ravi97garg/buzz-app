import React from 'react';

class ResolveTabComponent extends React.Component {

    componentDidMount() {
        if(this.props.page === 'Home'){
            console.log('Home called from resolveTab');
        } else if(this.props.page === 'News'){
            console.log('News called from resolveTab');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.page === 'Home'){
            console.log('Home called from resolveTab update');
        } else if(this.props.page === 'News'){
            console.log('News called from resolveTab update');
        }
    }

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