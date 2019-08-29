import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { playTrack, checkSignIn } from '../../actions'
import Spinner from 'react-spinkit'
import './index.css'

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            songId: this.props.match.params.songId
        }
    }
    componentWillMount(){
        this.props.checkSignIn();
        this.props.playTrack(this.state.songId);

    }
    render(){
        const { player } = this.props;

        if (player.type === "COMPLETE_SONG"){
            return(
                <div className="Player">
                    <div className="card">
                        <div className="card-content Player-container">
                            <div className="Player-left">
                                <img alt="" src={ player.payload.album.images[0].url }/>
                            </div>
                            <div className="Player-right">
                                <audio controls>
                                    <source src={ player.payload.preview_url }/>
                                </audio>
                                <h3>{ player.payload.name }</h3>
                                <h4><b>Artista: </b>{ player.payload.artists[0].name }</h4>
                                <h4><b>Album: </b>{ player.payload.album.name }</h4>
                                <h4><b>Fecha: </b>{ player.payload.album.release_date }</h4>
                                <h4><b>Popularidad: </b>{ player.payload.popularity+"/100"  }</h4>

  
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (<div className="Player"><Spinner name="double-bounce"/></div>);

    }
}

function mapStateToProps(state){
    return {
        routes: state.routes,
        player: state.player
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        checkSignIn,
        playTrack
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)