import React from 'react'

import GameList from '../game/GameList';

export default class Game extends React.Component {
    render() {
        const {game, version} = (this.props.match && this.props.match.params) || {};
        return (
            <React.Fragment>
                <GameList game={game} version={version}/>
            </React.Fragment>
        )
    }
}