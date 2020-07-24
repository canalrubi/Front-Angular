import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private TaskUrl            = "http://localhost:3003/api/tasks";
  private LisTaskUrl         = "http://localhost:3003/api/tasks/list";
  private taskImageUploadUrl = "http://localhost:3003/api/tasks/uploadImage";


  constructor(private http: HttpClient) { }

  createImageUpload(task){
   return this.http.post<any>(this.taskImageUploadUrl, task)
  }

  createTask(task){
    return this.http.post<any>(this.TaskUrl, task)
  }

  getTasks(){
    return this.http.get<any>(this.LisTaskUrl)
  }

  editTask(task){
    return this.http.put<any>(this.TaskUrl, task)
  }

  deleteTask(task){
    const _id = task._id;
    const url = `${this.TaskUrl}/${_id}`;
    return this.http.delete<any>(url);
  }
}
