import React, { createContext, useReducer } from "react";
import { IBaseAction } from "../common/IBaseAction";
import { IActivity } from "../components/activity/IActivity";

//possible change from task to topic.
export const ACTIVITY_ON_FETCH_REQUEST: string = "ACTIVITY_ON_FETCH_REQUEST";
export const ACTIVITY_ON_FETCH_SUCESS: string = "ACTIVITY_ON_FETCH_SUCESS";
export const ACTIVITY_ON_FETCH_FAILURE: string = "ACTIVITY_ON_FETCH_FAILURE";
export const ACTIVITY_ON_CREATE_SUCESS: string = "ACTIVITY_ON_CREATE_SUCESS";

export interface IActivityState {
  activities: { byId: { [id: string]: IActivity }; allIds: string[] };
}

export type IActivityContext = {
  state: IActivityState;
  dispatch: React.Dispatch<IBaseAction<any>>;
};

export const ActivityContext = createContext<Partial<IActivityContext>>({});

const createTaskStateInstance = (): IActivityState => ({
  activities: { byId: {}, allIds: [] },
});

const activityReducer = (
  state: IActivityState = createTaskStateInstance(),
  action: IBaseAction<any>
): IActivityState => {
  switch (action.type) {
    case ACTIVITY_ON_CREATE_SUCESS:
      return {
        ...state,
        activities: {
          byId: {
            ...state.activities.byId,
            [action.payload?._id]: action.payload,
          },
          allIds: Array.from(
            new Set([...state.activities.allIds, action.payload?._id])
          ),
        },
      };
    case ACTIVITY_ON_FETCH_SUCESS:
      const newActivities: { [id: string]: IActivity } = {};
      const newActivityIds: string[] = [];
      if (action.payload && action.payload.length) {
        action.payload.map((a: IActivity) => {
          newActivities[a._id] = a;
          newActivityIds.push(a._id);
        });
      }

      return {
        ...state,
        activities: {
          byId: { ...state.activities.byId, ...newActivities },
          allIds: Array.from(
            new Set([...state.activities.allIds, ...newActivityIds])
          ),
        },
      };
    default:
      return state;
  }
};

export const ActivityContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(
    activityReducer,
    createTaskStateInstance()
  );
  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ActivityContext.Provider>
  );
};

const reverseArray = (arr: Array<any> = []) => {
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
};

export const getActivitiesSelector = (state?: IActivityState): IActivity[] => {
  return state?.activities
    ? reverseArray(state?.activities.allIds).map(
        (id: string) => state.activities.byId[id]
      )
    : [];
};

export const getActivitiesByDateSelector = (
  state?: IActivityState
): Map<string, Array<IActivity>> => {
  const dateActivitys = new Map<string, Array<IActivity>>();
  if (state?.activities && state.activities.allIds.length > 0) {
    getActivitiesSelector(state).map((activity: IActivity) => {
      const date = new Date(activity.dateTime).toDateString();
      let activities: IActivity[];
      const groupActivities = dateActivitys.get(date) || [];
      groupActivities.push(activity);
      activities = groupActivities;
      dateActivitys.set(date, activities);
    });
  }

  return dateActivitys;
};
