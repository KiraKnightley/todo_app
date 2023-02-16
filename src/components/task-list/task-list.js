import React from "react";
import './task-list.css';

import Task from '../task'

const TaskList = () => {
    return (
        <section className="main">
            <ul className="todo-list">
                <li className="completed">
                    <Task date='created 17 seconds ago' description='Completed task' />
                </li>
                <li className="editing">
                    <Task date='created 5 minutes ago' description='Editing task' />
                    <input type="text" class="edit" value="Editing task" />
                </li>
                <li>
                    <Task date='created 5 minutes ago' description='Active task' />
                </li>
            </ul>
        </section>
    )
}

export default TaskList