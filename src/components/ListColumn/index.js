import React from "react";
import { List } from "components";

class ListColumn extends React.Component {
    render() {
        const { list, taskMap, index, createNewTask } = this.props;
        let tasksList;
        if (list.tasks) {
            tasksList = list.tasks.map((task) => taskMap[task.id]);
        }

        return (
            <div>
                <List
                    list={list}
                    tasks={tasksList}
                    index={index}
                    createNewTask={createNewTask}
                />
            </div>
        );
    }
}

export default ListColumn;
