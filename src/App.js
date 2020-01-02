import React,{Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import 'tachyons';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import SignIn from './Components/SignIn/SignIn.js'
import Register from './Components/Register/Register.js'

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey : 'f0f12532b4a04cfc946a6831d7f4e528'
});

class App extends Component {
  constructor(){
    super();
    // Our BUILT-IN state object
    this.state = {
      input: '',
      imageUrl:'',
      box: {},
      route: "signin",
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
// Recall that componentDidMount is a built-in function that fetches data after all components have been successfully dolled out
componentDidMount() {
  fetch('http://localhost:3000')
  .then(response=>response.json())
  .then(data=>console.log(data))
}

myUser = (userNow) => {
  console.log(userNow);
}

onInputChange = (event) => {
  console.log(event.target.value);
  this.setState({input:event.target.value});
}

onImageSubmit = () => {
  // To change the state, we use the setState() method via this.setState({--componentWeWantToChange--})
  this.setState({imageUrl:this.state.input}) // We refer to a state component via this.state.componentName 
  console.log('Click!');
  app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
    response => {
      if(response){
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })})
          .then(response=>response.json()) // Recall that response.json() reads our response as a json
          .then(userEntries=>{
              if(userEntries){
                console.log(userEntries);
                // Recall that this.setState() is meant to access and modify the state
                this.setState(Object.assign(this.state.user,{entries:userEntries}));//Impt! Doesn't completetly overwrite the user part like the one below
                //this.setState({user:{entries:userEntries}});
              } else{console.log('Some went wrong');}
          });
      }
      this.displayFaceBox(this.calculateFaceLocation(response)
    )
    })
    .catch(err=>console.log(err));
}
  
  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    const faceLocation = data.outputs[0].data.regions[0].region_info.bounding_box;
    return {
      leftCol: faceLocation.left_col*width,
      topRow: faceLocation.top_row*height,
      rightCol: width - (faceLocation.right_col*width),
      bottomRow: height - (faceLocation.bottom_row*height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
    console.log({box})
  }

  onRouteChange = (data) => {
    this.setState({route:data});
  }

  loadUser = (curUser) => {
    this.setState({user:{
      id: curUser.id,
      name: curUser.name,
      email: curUser.email,
      entries: curUser.entries,
      joined: curUser.date
    }});
  }

  curRoute = () => {
    console.log(this.state.route);
  }

  render(){
    return (
      <div className="App">
      <Particles
              className='particles'
              params={{
            		particles: {
                  number: {
                    value: 100,
                    density: {
                      enable:true,
                      value_area: 800
                    }
                  },
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
            		}
            	}}
            />
        {this.state.route === 'home'
        ? <div>
            <Navigation onRouteChange={this.onRouteChange}/>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
          </div>
        : (this.state.route === 'signin'
          ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} myUser={this.myUser} curRoute={this.curRoute}/>
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )
        }
      </div>
    );
  }
}

export default App;
