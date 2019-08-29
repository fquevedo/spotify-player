import axios from 'axios'
import { TrackHandler, Client } from 'spotify-sdk'

let client = Client.instance;
client.settings = {
    clientId: '3de1f7ae28ef4fa69d43f49aa61b9a78',
    secretId: 'bcf9ad06c3214c7ea736b0d9bbd816dc',
    scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
    redirect_uri: 'http://localhost:3000/'
}

export const checkSignIn = () => {
    return ( dispatch, getState ) => {
        if (sessionStorage.token){
            client.token = sessionStorage.token;
        }
        else if (window.location.hash.split('&')[0].split('=')[1]) {
            sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
            client.token = sessionStorage.token;
        }
        else {
            client.login()
            .then( url => {
                window.location.href = url;
            });
        }
    }
}
const startFetch = () => { return { type: "IS_FETCHING", isFetching: true }};
const errorFetch = (err) => { return { type: 'ERROR_FETCH', isFetching: false }};
const completeFetch = (data) => { return { type: 'COMPLETE_FETCH', isFetching: false, payload: data }};

export const search = (trackName) =>{
    return ( dispatch, getState ) => {
        dispatch(startFetch());
        let track = new TrackHandler();
        track.search(trackName, { limit: 10 })
        .then( trackCollection => {
            console.log(trackCollection);
            dispatch(completeFetch(trackCollection));
        })
        .catch((err) => {
            dispatch(errorFetch);
        })
    }
}

const completeSong = (data) => { return { type : "COMPLETE_SONG", success : true, payload: data }};

export const playTrack = (songId) => {
    return ( dispatch, getState) => {
        dispatch(startFetch());
        axios.get('https://api.spotify.com/v1/tracks/'.concat(songId), { headers: { "Authorization" : 'Bearer ' + client.token }})
        .then( response =>{
            console.log(response.data)
            dispatch(completeSong(response.data));
        })
        .catch( err => {
            
        });
    }
}