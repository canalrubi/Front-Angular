import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks = [];

  constructor(private taskService:TaskService, private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.taskService.getTasks()
        .subscribe(
          res   => {this.tasks = res},
          error => console.log(error)
        )
  }

  changeStatus(selectTask, status){
    const temporalStatus = selectTask.status;
    selectTask.status    = status;
    this.taskService.editTask(selectTask)
        .subscribe(
          res   => {selectTask.status = status},
          error => {selectTask.status = temporalStatus
            if(error instanceof HttpErrorResponse){
              if(error.status === 401){
                this.snackBar.open("No estas logueado... Enviando al login", null,{
                  duration: 3000
                })
                this.router.navigate(['/login'])
              }
            }
          } 
        )
  }

  delete(deleteTask){
    this.taskService.deleteTask(deleteTask)
        .subscribe(
          res=>{const index = this.tasks.indexOf(deleteTask)
            if(index>-1){
              this.tasks.splice(index,1)
              this.snackBar.open("Tarea eliminada con exito", null,{
                duration:2000
              })
            }
          },
          error=>{console.warn(error)
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            this.snackBar.open("No estas logueado... Enviando al login", null,{
              duration: 3000
            })
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }

}
