import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  task: string = "";
  taskList: { id: number, task: string }[] = []

  addTask() {
    if (this.task.trim() === "") {
      alert("Please anter a task");
    }
    else {
      const newTask = {
        id: this.taskList.length + 1,
        task: this.task,
      };
      this.taskList.push(newTask);
      this.task = "";
    }
  }

  removeTask(id: number) {
    this.taskList = this.taskList.filter(task => task.id !== id);
    alert("Task deleted successfully");
  }
}