import React from 'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registerEmail: '',
            registerName: '',
            registerPassword: ''
        }
    }
    onNameChange = (event) => {
        this.setState({registerName:event.target.value});
    }
    onEmailChange = (event) => {
        this.setState({registerEmail:event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({registerPassword:event.target.value});
    }
    onSubmitSignIn = () => {
       console.log(this.state);
       fetch('https://immense-wildwood-38455.herokuapp.com/register',{
           method: 'post',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({
               email: this.state.registerEmail,
               password: this.state.registerPassword,
               name: this.state.registerName,
               id: (Math.random()).toString()
           })})
           .then(response=>response.json()) // Recall that response.json() reads our response as a json
           .then(user=>{
               if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                    console.log('Successful registeration :D');
                    console.log(user);
               } else{console.log('Some went wrong');}
           })  
    }
    render(){
        // const {onRouteChange} = this.props.onRouteChange;
        return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onNameChange} type="name" name="Name"  id="username"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onEmailChange} type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onPasswordChange} type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div className="">                                                                      
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSubmitSignIn} type="submit" value="Register"/>
                    </div>
                    <div className="lh-copy mt3">
                    </div>
                </form>
            </main>
        </article>
        );
}
}
export default Register;