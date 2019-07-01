import React from 'react';
import Index from "../ModalComponent";
import LoaderView from "./view";

class LoaderComponent extends React.Component {
    render() {
        return (
            <Index
                component={<div className={'loader-container'}>
                    <LoaderView/>
                </div>}
            />
        )
    }
}

export default LoaderComponent;
