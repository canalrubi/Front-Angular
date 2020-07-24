import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  createTask = {
    name:null,
    description:null
  }

  selectedFile:File=null;
  
  constructor(private taskService: TaskService, private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    this.selectedFile = <File>event.target.files[0]
  }

  createUploadImage(){
    const fd = new FormData();
    fd.append('image',       this.selectedFile, this.selectedFile.name);
    fd.append('name',        this.createTask.name);
    fd.append('description', this.createTask.description);
    this.taskService.createImageUpload(fd)
        .subscribe(
          res=>{
            this.router.navigate(['/tasks'])
          },
          error => {console.log(error)
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


  create(){
    this.taskService.createTask(this.createTask)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/tasks'])
          },
          error => {console.log(error)
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
