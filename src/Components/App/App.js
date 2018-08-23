import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Name Your Playlist',
      playlistTracks: []
      }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search= this.search.bind(this);
    this.getPreviewUrl = this.getPreviewUrl.bind(this);
    }



    addTrack(track){
      if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
      } else {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
        }
      }

    removeTrack(track){
      let tracks = this.state.playlistTracks;
    tracks = tracks.filter(current => current.id !== track.id);
    this.setState({ playlistTracks: tracks });
    }

    updatePlaylistName(name){
      this.setState({playlistName: name})
    }

    savePlaylist(){
      const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    })
}

    search(term) {
      Spotify.search(term).then(searchResults => {
        this.setState({ searchResults: searchResults })
    });
  }

  getPreviewUrl(trackId) {
   const previewUrl = Spotify.getTrackPreview(trackId);
   return previewUrl;
}

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar
              onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onPlay={this.getPreviewUrl}
              />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onPlay={this.getPreviewUrl}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default App;