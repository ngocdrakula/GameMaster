import React, { version } from 'react';
import ErrorPage from './ErrorPage';
import Pacman from './Pacman';
import Snake from './Snake';


export default class GameList extends React.Component {
    render() {
        const {game, version} = this.props;
        return (
            <React.Fragment>
                { game === "pacman" ?
                    <Pacman version={version}/>
                : game === "snake" ?
                    <Snake version={version} />
                : !game ?
                    <Pacman />
                :
                    <ErrorPage />
                }
            </React.Fragment>
        )
    }
}
