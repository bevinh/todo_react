import React from 'react';

export const TodoForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" value={props.current_todo} onChange={props.handleInputChange}/>
    </form>
)

TodoForm.propTypes = {
    currentTodo: React.PropTypes.string,
    handleInputChange: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
}