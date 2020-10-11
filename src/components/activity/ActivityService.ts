import { baseUrl } from "../../common/constants";
import { FetchWrapper } from "../../common/fetchWrapper";
import { IActivity } from "./IActivity";

export class ActivityService {
  public static async createActivity(taskId: string, description: string) {
    return await FetchWrapper.post<any, any>(`${baseUrl}/api/activity`, {
      description,
      taskId,
    });
  }

  public static async getActivities() {
    return await FetchWrapper.get<IActivity[]>(`${baseUrl}/api/activity`);
  }
}
