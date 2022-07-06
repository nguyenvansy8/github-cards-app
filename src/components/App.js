import * as React from 'react';

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card {...profile}/>)}
  </div>
)

class Addcard extends React.Component{
  // nameInput = React.createRef();
  state = {name: ''};
    handleSubmit = async (event) => {
      event.preventDefault();
      const respond = await axios.get(`https://api.github.com/users/${this.state.name}`);
      this.props.onSubmit(respond.data);
      this.setState({name: ''});
    }
    
  render(){
    return(
      <form onSubmit = {this.handleSubmit}>
        <input 
          type="text" 
          placeholder="GitHub name" 
          value = {this.state.name}
          onChange = {event => this.setState({name: event.target.value})}
          required/>
        <button>ADD</button>
      </form>
    );
  }
}

class Card extends React.Component{
  render(){
    const profile = this.props
    return(
      <div className="github-profile" style={{ margin: "1rem"}}>
        <img src={profile.avatar_url}/>
        <div className="info" style={{ display: "inline-block", marginLeft: 10}}>
          <div className="name" style={{ fontSize: '200%', color: 'red'}}>{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class CardsApp extends React.Component{
  state = {
    profiles: [],
  };
  
  addNewProfile = (profileData1) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData1],
    }));
  };
  
  render(){
    return (
      <div>
        <div className="header" style={{fontSize: '200%'}}>{this.props.title}</div>
        <Addcard onSubmit = {this.addNewProfile}/>
        <CardList profiles = {this.state.profiles}/>
      </div>
    );
  }
}

export function App() {
  return (
    <CardsApp title="The GitHub Cards App" />
  );
}
