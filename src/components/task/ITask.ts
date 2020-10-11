import { IActivity } from "../activity/IActivity";

export interface ITask {
  tittle: string;
  _id: string;
  activities: IActivity[];
}
