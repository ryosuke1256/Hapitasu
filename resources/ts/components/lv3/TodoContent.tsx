import React, { useState, useEffect } from "react";
import axios from "axios";
import { TaskCard, TextForm } from "../lv2/_index";
import { TaskAPI } from "../../type/api/TaskAPI";
import { TaskAndColor } from "../../type/TaskAndColor";
import styled from "styled-components";
import customMedia from "../../style/customMedia";

const TodoContent: React.VFC = () => {
    const [tasks, setTasks] = useState<any>([]);
    const [userID, setUserID] = useState();
    const [change, setChange] = useState(0); //render走らせる用
    const [tasksEditActive, setTasksEditActive] = useState(false);
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getTasks();
    }, [userID]);

    const getUser = async () => {
        await axios
            .get("api/users")
            .then((res) => {
                setUserID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getTasks = async () => {
        if (!(userID === undefined)) {
            const Data = await axios.get(`api/tasks/users/${userID}`);
            try {
                setTasks(Data.data.map((data: {}) => data));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const postTask = async (postData: TaskAPI) => {
        console.log({ postData });
        const res = await axios.post("api/tasks", postData);
        try {
            tasks.unshift(res.data);
            setChange(change + 1);
            // setTasks([...tasks, res.data]);
        } catch (err) {
            console.log(err);
        }
    };

    let i: number = -1;

    return (
        <>
            <TextForm postTask={postTask} userID={userID} />
            <_TaskCards>
                {tasks.map((task: TaskAndColor, key: number) => {
                    i++;
                    return (
                        <TaskCard
                            task={task}
                            setTasks={setTasks}
                            tasks={tasks}
                            tasksEditActive={tasksEditActive}
                            setTasksEditActive={setTasksEditActive}
                            id={task.id}
                            i={i}
                            key={key}
                        />
                    );
                })}
            </_TaskCards>
        </>
    );
};

export default TodoContent;

export const _TaskCards = styled.div`
    max-width: 1300px;
    width: 85%;
    margin: 0 auto;
    padding-top: 10px;
    //スマホ
    ${customMedia.lessThan("mobile")`
     /* screen width is less than 599px (tablet) */
    width: 100%;
    `} //タブレット
    ${customMedia.between("mobile", "tablet")`
    /* screen width is between 599px (tablet) and 1024px (desktop) */

    `} //PC
    ${customMedia.greaterThan("tablet")`
    /* screen width is greater than 1024px (tablet) */
    
    `}
`;