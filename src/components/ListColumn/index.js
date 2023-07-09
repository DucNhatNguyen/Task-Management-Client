import React from "react";
import { List } from "components";

class ListColumn extends React.Component {
    render() {
        const { list, index, createNewTask } = this.props;
        let tasks;
        // if (list.tasks) {
        //     tasks = list.taskIds.map((taskId) => taskMap[taskId]);
        // }
        return (
            <div>
                <List
                    list={list}
                    tasks={list.tasks}
                    index={index}
                    createNewTask={createNewTask}
                />
            </div>
        );
    }
}

export default ListColumn;
