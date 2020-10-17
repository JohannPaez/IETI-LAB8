import React, {Component} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import 'date-fns';
import FormDialog from './Dialogo';
import Filter from './Filter';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import axios from 'axios';


export default class TodoApp extends Component {

    
    constructor(props) {
        super(props);
        const listaInicial = [];    
        this.state = {items: listaInicial, description:"", name: '', email: '', status: '', dueDate: null, 
        open: false, openFilter: false, dueFilter: null, emailFilter: null, statusFilter: null, itemsFilter: [], isFilter: false};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setOpen = this.setOpen.bind(this);
        this.setOpenFilter = this.setOpenFilter.bind(this);
        this.handleDueFilter = this.handleDueFilter.bind(this);
        this.handleEmailFilter = this.handleEmailFilter.bind(this);
        this.handleStatusFilter = this.handleStatusFilter.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleIsFilter = this.handleIsFilter.bind(this);
        this.showDuedates = this.showDuedates.bind(this);
        this.showEmails = this.showEmails.bind(this);
        this.disableFilter = this.disableFilter.bind(this);
               
        
    }
    
    handleFilter(e) {    
        var itemsFiltered = []
        for (var i = 0; i < this.state.items.length; i++) {
            const item = this.state.items[i];
            if (item.dueDate.toString() === this.state.dueFilter || 
                item.email === this.state.emailFilter || 
                item.status === this.state.statusFilter) {
                    itemsFiltered.push(item);
            }
        }
        this.setState({
            itemsFilter: itemsFiltered
        });

        this.handleIsFilter(true);
        this.setOpenFilter(false);
    }

    showDuedates() {
        let setDuedates = new Set()
        for (var i = 0; i < this.state.items.length; i++) {
            const item = this.state.items[i];
            setDuedates.add(item.dueDate.toString());
        }        
    
        return [...setDuedates];
    }

    showEmails() {
        let setEmais = new Set()
        for (var i = 0; i < this.state.items.length; i++) {
            const item = this.state.items[i];
            setEmais.add(item.email);
        }

        return [...setEmais];
    }

    handleIsFilter(bool) {
         this.setState({
            isFilter: bool
        });
    }
    handleDueFilter(e) {
        this.setState({
            dueFilter: e.target.value
        });
    }

    handleEmailFilter(e) {
        this.setState({
            emailFilter: e.target.value
        });
    }

    handleStatusFilter(e) {
        this.setState({
            statusFilter: e.target.value
        });
    }


    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }
    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleSubmit(e) {

        e.preventDefault();


        const newItem = {
            description: this.state.description,
            name: this.state.name,
            email: this.state.email,
            status: this.state.status,
            dueDate: this.state.dueDate
        };

        this.addTaskToPlanner(newItem);

        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            description: '',
            name: '',
            email: '',
            status: '',
            dueDate: null
        }));
        this.setOpen(false);
        var itemsFiltered = this.state.itemsFilter;        
        if (newItem.dueDate === this.state.dueFilter || 
            newItem.email === this.state.emailFilter || 
            newItem.status === this.state.statusFilter) {
                itemsFiltered.push(newItem);
                this.setState({
                    itemsFilter: itemsFiltered
                });
            }

    }

    setOpen(boolean) {
        this.setState({
            open: boolean
        });
    }

    setOpenFilter(boolean) {
        this.setState({
            openFilter: boolean
        });
    }

    disableFilter() {
        this.setState({
            isFilter: false,
            dueFilter: null,
            emailFilter: null,
            statusFilter: null
        });
    }


    componentDidMount() {
        axios.get('https://mighty-brushlands-30483.herokuapp.com/api', 
            {
                headers: { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                        }
            })
             .then(response => { 
                this.setState({
                    items: response.data
                });
             })
             .catch(e => {    
                console.log(e);             
                alert("Ha ocurrido un error!");
                this.setState({
                    items: []
                });
             });            
    }
    
    addTaskToPlanner = (task) => {
        axios.post('https://mighty-brushlands-30483.herokuapp.com/api', 
            task,
            {
                headers: { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                        }
            })
             .then(response => { 
                this.componentDidMount();  
             })
             .catch(e => {    
                console.log("Error");
                console.log(e);
                alert("An error has occurred!");
             });        
    }

    render() {      
        return (
            <div className="App">
                <FormDialog 
                    open = {this.state.open} 
                    fun = {this.setOpen}
                    handleDescriptionChange = {this.handleDescriptionChange}
                    handleNameChange = {this.handleNameChange}
                    handleEmailChange = {this.handleEmailChange}
                    handleStatusChange = {this.handleStatusChange}
                    handleDateChange = {this.handleDateChange}
                    handleSubmit = {this.handleSubmit}
                    state = {this.state}
                />

                <Filter 
                    open = {this.state.openFilter} 
                    fun = {this.setOpenFilter}
                    handleDueFilter = {this.handleDueFilter}
                    handleEmailFilter = {this.handleEmailFilter} 
                    handleStatusFilter = {this.handleStatusFilter}
                    handleFilter = {this.handleFilter} 
                    showDuedates = {this.showDuedates}
                    showEmails = {this.showEmails}
                    state = {this.state}
                />
                <br/>
                <div style = {{overflowY: 'scroll', height: '350px'}}>
                    <TodoList todoList={this.state.isFilter ? this.state.itemsFilter: this.state.items}/>                            
                </div>
                <br></br>
                <Fab aria-label='Add' color= 'primary' style = {{right: '-40%'}} >
                    <AddIcon onClick = {this.setOpen}/>
                </Fab>        
                <br></br><br></br>
                <div >
                    <Button variant="contained" size="large" color="primary" onClick = {this.setOpenFilter}>
                       Filters
                    </Button>
                    <Button style = {{display: this.state.isFilter ? 'inline-block': 'none'}} variant="contained" size="large" color="secondary" onClick = {this.disableFilter}>
                        Disable Filters
                    </Button>
                </div>
                
            </div>
        );
    }
}
