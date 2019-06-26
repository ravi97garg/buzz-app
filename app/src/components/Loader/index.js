import React from 'react';
import Modal from "../modal";

class LoaderComponent extends React.Component{
    render() {
        return (
            <Modal
                component={<h1>Loading</h1>}
            />
        )
    }
}

export default LoaderComponent;
