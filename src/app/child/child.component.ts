import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  // @Input() selected = false;

  // @Output() selectedChange = new EventEmitter<boolean>();

  selected = model(false);

  foo = input();
  bar = output();
}
