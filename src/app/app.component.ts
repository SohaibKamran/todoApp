import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
interface Todo{
  description:string
  done:boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todoApp';
  todos:Todo[]=[]
  description:FormControl = new FormControl('',Validators.required)
  saveTodo(){
    let todo = {
      description:this.description.value,
      done:false
    }
    this.todos.push(todo)
  }
}
