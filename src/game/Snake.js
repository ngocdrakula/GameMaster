import React from 'react'

import listVersion from './snake/list';

export default class Snake extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {version} = this.props;
        const versionSelected = (listVersion.find(ver => ver.name === version) || listVersion.slice(-1)[0]);
        const VersionComponent = versionSelected.component

        return (
            <React.Fragment>
            <div className="">
               Bạn đang chơi game <b>Snake</b> version <b>{versionSelected.name}</b>
            </div>
                <VersionComponent />
            </React.Fragment>
        )
    }
}