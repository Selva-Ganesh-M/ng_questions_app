import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  value = 'selva';
  onClick(event: Event) {
    console.log(`click event triggered.`);
    // console.log(`event: ${(<HTMLInputElement>event.target).value}`);
    console.log(`event: ${event.target}`);
  }
}
