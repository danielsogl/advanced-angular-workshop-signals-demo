import { Component, computed, input, signal } from '@angular/core';

interface SelectOption {
  key: string;
  value: number;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  options = input.required<SelectOption[]>();
  // selectedItem = signal<number>(-1);

  selectState = computed(() => {
    this.options();

    return {
      selectedItem: signal(-1),
    };
  });

  // constructor() {
  //   effect(
  //     () => {
  //       this.options();
  //       this.selectedItem.set(-1);
  //     },
  //     { allowSignalWrites: true }
  //   );
  // }

  selectItem(index: number) {
    this.selectState().selectedItem.set(index);
  }
}
