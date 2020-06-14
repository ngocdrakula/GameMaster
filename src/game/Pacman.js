import React from 'react'

import listVersion from './pacman/list';

export default class Pacman extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    selectVersion = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const {version} = this.props;
        const {userSelected} = this.state;
        const versionSelected = listVersion.find(ver => ver.name === (version || userSelected));
        const lastVersion = listVersion.slice(-1)[0];
        const VersionComponent = (versionSelected || lastVersion).component;
        return (
            <React.Fragment>
                {versionSelected ?
                    <VersionComponent />
                :
                    <div className="">
                        <span >Vui lòng chọn version: </span>
                        <select name="userSelected" defaultChecked={lastVersion.name} onChange={this.selectVersion}>
                            <option value="">Chọn version</option>
                            {listVersion.reverse().map((ver, index) => {
                                return(
                                    <option key={ver.name} value={ver.name} >
                                        {ver.name} {index === 0 ? "(Mới nhất)" : ""}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                }
            </React.Fragment>
        )
    }
}