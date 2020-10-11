import React, { useContext, useEffect, useState } from "react";
import {
  ActivityContext,
  ACTIVITY_ON_FETCH_SUCESS,
  getActivitiesSelector,
} from "../../context/ActivityContext";
import { Spinner } from "../Spinner";
import { ActivityService } from "./ActivityService";
import { IActivity } from "./IActivity";

type IActivitiesProps = {
  taskType?: string;
  taskId: string;
};

const Activities: React.FC<IActivitiesProps> = (props: IActivitiesProps) => {
  const [isLoading, setisLoading] = useState(false);
  const { state, dispatch } = useContext(ActivityContext);

  async function getActivities() {
    try {
      setisLoading(true);
      const activities = await ActivityService.getActivities();
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

  return (
    <Spinner isLoading={isLoading}>
      <div>
        <h2>{props.taskType}</h2>
        <ul>
          {getActivitiesSelector(state).map((activity: IActivity) => {
            return (
              <li key={activity._id}>
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {new Date(activity.dateTime).toLocaleTimeString()}
                  </span>
                  , {activity.description}
                </p>
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
