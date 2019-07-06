import React from 'react';

class UploadComponent extends React.Component {

    render() {
        const UploaderLabel = this.props.uploaderLabel;
        return (
            <div className="box">
                <input
                    type={'file'}
                    name={'images'}
                    id={this.props.id}
                    className={"inputfile inputfile-4"}
                    onChange={this.props.addImage}
                    data-multiple-caption="{count} files selected"
                    multiple={this.props.multiple}
                    accept="image/x-png,image/jpeg"
                />

                    <UploaderLabel/>
            </div>
        )
    }

}

export default UploadComponent;