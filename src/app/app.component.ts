import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Todo{
  id: number
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
  todoForm!: FormGroup;
  type: string='todos';
  constructor(private fb:FormBuilder){
    this.formInit()
  }
  formInit(){
    this.todoForm = this.fb.group({
      description:['',Validators.required]
    })
  }
  get description(){
    return this.todoForm?.get('description')
  }
  saveTodo(){
    let todo = {
      id: this.todos.length+1,
      description:this.description?.value,
      done:false
    }
    this.todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(this.todos))
  }
  deleteTodo(todo:Todo,i:number){
    // this.todos = this.todos.filter((data,j)=>j!=i)
    // this.todos = this.todos.filter((data,j)=>data.description!=todo.description)
    this.todos = this.todos.filter((data,j)=>data.id!=todo.id)
    // let newArray:Todo[]=[]
    // for (let i = 0; i < this.todos.length; i++) {
    //   debugger
    //   if(this.todos[i].id!=todo.id)
    //     newArray.push(this.todos[i])
    // }
    // this.todos = newArray
    localStorage.setItem('todos',JSON.stringify(this.todos))
  }
  done(i:number){
    this.todos[i].done = !this.todos[i].done
    localStorage.setItem('todos',JSON.stringify(this.todos))
    // this.filter(this.type)
  }
  filter(value:string){
    this.type = value;
    if(value=="rem"){
      this.todos = JSON.parse(localStorage.getItem('todos')!)
      this.todos = this.todos.filter(data=>data.done==false)
    }else if(value=="com"){
      this.todos = JSON.parse(localStorage.getItem('todos')!)
      this.todos = this.todos.filter(data=>data.done==true)
    }else{
      this.todos = JSON.parse(localStorage.getItem('todos')!)
      // this.todos = this.todos.filter(data=>(data.done==false || data.done==true))
    }
  }
}
