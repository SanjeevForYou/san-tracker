import React, { createContext, useReducer } from "react";
import { IBaseAction } from "../common/IBaseAction";
import { ITask } from "../components/task/ITask";

//possible change from task to topic.
export const TASK_ON_TASK_FETCH_REQUEST: string = "TASK_ON_TASK_FETCH_REQUEST";
export const TASK_ON_TASK_FETCH_SUCESS: string = "TASK_ON_TASK_FETCH_SUCESS";
export const TASK_ON_TASK_FETCH_FAILURE: string = "TASK_ON_TASK_FETCH_FAILURE";

export interface ITaskState {
  tasks: { byId: { [id: string]: ITask }; allIds: string[] };
  isLoading?: boolean;
  error?: string;
}

export type ITaskContext = {
  state: ITaskState;
  dispatch: React.Dispatch<IBaseAction<any>>;
};

export const TaskContext = createContext<Partial<ITaskContext>>({});

const createTaskStateInstance = (): ITaskState => ({
  tasks: { byId: {}, allIds: [] },
});

const taskReducer = (
  state: ITaskState = createTaskStateInstance(),
  action: IBaseAction<any>
): ITaskState => {
  switch (action.type) {
    case TASK_ON_TASK_FETCH_REQUEST:
      return { ...state, isLoading: true };
    case TASK_ON_TASK_FETCH_SUCESS:
      const newTasks: { [id: string]: ITask } = {};
      const newTaskIds: string[] = [];
      if (action.payload && action.payload.length) {
        action.payload.map((a: ITask) => {
          newTasks[a._id] = a;
          newTaskIds.push(a._id);
        });
      }

      return {
        ...state,
        isLoading: false,
        tasks: {
          byId: { ...state.tasks.byId, ...newTasks },
          allIds: Array.from(new Set([...state.tasks.allIds, ...newTaskIds])),
        },
      };
    case TASK_ON_TASK_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const TaskContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(taskReducer, createTaskStateInstance());
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export const getTasksSelector = (state?: ITaskState): ITask[] => {
  return state?.tasks
    ? state?.tasks.allIds.map((id: string) => state.tasks.byId[id])
    : [];
};
