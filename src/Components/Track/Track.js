import React from 'react';
import './Track.css';

class Track extends React.Component{
  constructor(props){
    super(props)

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.state = {};
  }

  componentDidMount(){
    this.playPreview()}

  renderAction(){
    if(this.props.isRemoval){
      return(
        <a id={this.props.track.key} className="Track-action" onClick={this.removeTrack}>-</a>
      )
    }else{
      return(<a id={this.props.track.key} className="Track-action" onClick={this.addTrack}>+</a>
    )
    }
  }

addTrack(){
  this.props.onAdd(this.props.track);
}

removeTrack(){
  this.props.onRemove(this.props.track);
}

playPreview () {
   this.props.onPlay(this.props.track.id).then(previewUrl =>{
      console.log(previewUrl);
      this.setState({ previewUrl })
   })
}



render(){
  return(
    <div className="Track" key={this.props.track.id}>
    <div className="Track-information">
      <div><img src={this.props.track.cover} alt="There is no cover preview"/> </div>
      <h3>  {this.props.track.name}</h3>
      <p>
      {this.props.track.artist} | {this.props.track.album}</p>
    </div>
    {this.state.previewUrl ?
    <audio controls>
       <source src={this.state.previewUrl} type="audio/mp3" />
       Your browser does not support the audio element.
    </audio>
 : <div>loading preview</div>
}{this.renderAction()}
    </div>
  )
}
}

export default Track;
