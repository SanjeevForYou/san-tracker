import { baseUrl } from "../../common/constants";
import { FetchWrapper } from "../../common/fetchWrapper";
import { ITask } from "./ITask";

export class TaskService {
  public static async getTasks() {
    return await FetchWrapper.get<ITask[]>(`${baseUrl}/api/task`);
  }

  public static async createTask(tittle: string) {
    return await FetchWrapper.post<any, any>(`${baseUrl}/api/task`, { tittle });
  }
}
