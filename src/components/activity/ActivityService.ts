import { baseUrl } from "../../common/constants";
import { FetchWrapper } from "../../common/fetchWrapper";
import { TaskService } from "../task/TaskService";

export class ActivityService {
  public static async createActivity(taskId: string, description: string) {
    return await FetchWrapper.post<any, any>(`${baseUrl}/api/activity`, {
      description,
      taskId,
    });
  }

  public static async getActivities(taskId: string) {
    const task = await TaskService.getTasksById(taskId);
    return task.activities;
    // return await FetchWrapper.get<IActivity[]>(`${baseUrl}/api/activity`);
  }
}
