import React, { useContext, useEffect, useState } from "react";
import {
  ActivityContext,
  ACTIVITY_ON_FETCH_SUCESS,
  getActivitiesByDateSelector,
} from "../../context/ActivityContext";
import { Spinner } from "../Spinner";
import { ActivityService } from "./ActivityService";
import { IActivity } from "./IActivity";
import "./Activity.css";

type IActivitiesProps = {
  taskType?: string;
  taskId: string;
};

type IActivitesByTittle = {
  tittle: string;
  activities: IActivity[];
};

const ActivitiesByTittle: React.FC<IActivitesByTittle> = (
  props: IActivitesByTittle
) => (
  <div className="activities__activities-by-tittle">
    <h4>{props.tittle}</h4>
    <ul>
      {props.activities.map((activity: IActivity) => {
        return (
          <li key={activity._id}>
            <p>
              <span>{new Date(activity.dateTime).toLocaleTimeString()}</span>,{" "}
              {activity.description}
            </p>
          </li>
        );
      })}
    </ul>
  </div>
);

const Activities: React.FC<IActivitiesProps> = (props: IActivitiesProps) => {
  const [isLoading, setisLoading] = useState(false);
  const { state, dispatch } = useContext(ActivityContext);

  async function getActivities() {
    try {
      setisLoading(true);
      const activities = await ActivityService.getActivities(props.taskId);
      dispatch!({
        type: ACTIVITY_ON_FETCH_SUCESS,
        payload: activities,
      });
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  useEffect(() => {
    getActivities();
  }, []);

  const activitiesByDate = getActivitiesByDateSelector(state);
  const getActivitiesByDate = (date: string): IActivity[] =>
    activitiesByDate.get(date) || [];

  return (
    <Spinner isLoading={isLoading}>
      <div>
        <h2>{props.taskType}</h2>
        <ul>
          {Array.from(activitiesByDate.keys()).map((key: string) => {
            return (
              <li key={key}>
                <ActivitiesByTittle
                  tittle={key}
                  activities={getActivitiesByDate(key)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Spinner>
  );
};

Activities.defaultProps = {
  taskType: "Activities",
};

export default Activities;
