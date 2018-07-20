import React from 'react';
import PropTypes from 'prop-types'
import Todo from './Todo';

const TodoList = ({ todos , onTodoClick }) => (
    <ul>
        {
            todos.map(todo => (
                <Todo key={todo.id} {...todo} onClick={ () => { onTodoClick(todo.id)} }/>
            ))
        }
    </ul>
)

TodoList.propTypes = {
    todos:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.number,
            completed:PropTypes.bool,
            text:PropTypes.string
        })
    ),
    onTodoClick:PropTypes.func
}

export default TodoList;