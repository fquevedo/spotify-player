import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SongItem from './SongItem'
import Spinner from 'react-spinkit'
import { checkSignIn, search } from '../../actions'
import 'materialize-css/dist/css/materialize.min.css'
import './index.css'


class Index extends Component {
    constructor(){
        super();
        this.state = {
            song: ''
        }
        this.getResultsCard = this.getResultsCard.bind(this);
        this.getTokenPath = this.getTokenPath.bind(this);
    }
    componentWillMount(){
        this.props.checkSignIn();
    }
    getTokenPath(){
        let path = window.location.href;
        return path.substring(path.indexOf("#"), path.length);
    }
    getResultsCard(){
        const { songs } = this.props;
        if (songs.type === "IS_FETCHING"){
            return (<Spinner name="double-bounce"/>);
        }
        else {
            if (songs.length > 0){
                return (
                    <div className="card">
                        <div className="card-content">
                            {
                                songs.map((currentValue, index) => {
                                    return (
                                        <SongItem
                                            key={index}
                                            songId={currentValue.id}
                                            tokenPath={this.getTokenPath()}
                                            albumPhoto={currentValue.album.images[0].url}
                                            albumName={currentValue.album.name}
                                            songName={currentValue.name}
                                            artistName={currentValue.artists[0].name}
                                            popularity={currentValue._popularity}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div>
                    </div>
                );

            }
        }

    }
    render(){
        const { song } = this.state;

        return(
            <div className="Index">
                <div className="card">
                    <div className="card-content Index-containerSearchBox">
                        <div className="Index-searchBox">
                            <input 
                                type="text" 
                                className="Index-searchBox-input"
                                placeholder="Canción"
                                onChange={ (e) => { this.setState({ song: e.target.value})} }
                                value={ song }
                            />
                            <button
                                className="waves-effect waves-light btn blue"
                                onClick={(e) => this.props.search(song) }>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                { this.getResultsCard() }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        routes: state.routes,
        songs: state.player
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        checkSignIn, search
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);