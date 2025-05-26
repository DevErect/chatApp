import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  count: number = 0
  handleIncrement() {
    this.count++
  }
  handleReset() {
    this.count = 0
  }
  handleDecrement() {
    this.count--
  }

  handleCounter(action: "increment" | "decrement" | "reset") {
    switch (action) {
      case "increment": this.count++
        break;
      case "decrement": this.count--
        break;
      case "reset": this.count = 0
        break;
    }
  }
}
