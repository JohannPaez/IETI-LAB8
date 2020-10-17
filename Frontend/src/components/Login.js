import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css';
import {Link, withRouter} from 'react-router-dom';
import SidebarPage from './SidebarPage';
import '../degradados.css';
import axios from 'axios';


export class Login extends React.Component{

    constructor(props) {
        super(props);  
        this.state = {email: "", passwd: ""};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    render(){
        if (localStorage.getItem('isLoggedIn'))  {
            return (
              <SidebarPage />
            );
        }

        return (
            <div className = "login" style = {{width:'100%', height:'100hv', backgroundImage: 'linear-gradient(135deg, #08185B, #949CBC)', display:'flex'}}>
                    <React.Fragment>
                        <CssBaseline />
                        <main className="layout">
                            <Paper className="paper">
                                
                                <Typography variant="h2">Task Planner</Typography>
                                <div className="form" onSubmit={this.handleSubmit}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleEmailChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={this.handlePassChange}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className="submit"
                                        onClick = {this.handleSubmit}
                                    >
                                        LOGIN
                                    </Button>
                                    <br></br>
                                    <br></br>
                                    <Link to ="/register"> Sign Up</Link>
                                </div>
                            </Paper>
                        </main>
                    </React.Fragment>
            </div>
        );
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePassChange(e) {
        this.setState({
            passwd: e.target.value
        });
    }

    handleSubmit() {  
        let email = this.state.email;
        let passwd = this.state.passwd;
        axios.post('https://mighty-brushlands-30483.herokuapp.com/user/login', 
            {email: email, password: passwd},
            {
             headers: { "Content-Type": "application/json" }
            })
             .then(response => { 
                 console.log(response.data);
                 localStorage.setItem("token", response.data.accessToken);
                 localStorage.setItem("username", "Andres");
                 localStorage.setItem("email", email);                
                 localStorage.setItem('isLoggedIn', true);
                this.props.history.push("/home");
                return;
             })
             .catch(e => {
                alert("Usuario o contraseña incorrectos, intente nuevamente!")
             });
    }


}

export default withRouter(Login);