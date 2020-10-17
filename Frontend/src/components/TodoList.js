import React from 'react';
import {Todo} from './Todo'

export class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} description={todo.description} name={todo.name} email={todo.email} status={todo.status} dueDate={todo.dueDate}/>
            );
        });

        return (
            todoList
        );


    }

}