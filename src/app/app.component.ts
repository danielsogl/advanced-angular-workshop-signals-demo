import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected readonly from = signal('Berlin');
  protected readonly to = signal('Munich');

  protected readonly selected = signal(false);

  protected readonly flightPath = computed(() => {
    const from = untracked(() => this.from());
    const to = this.to();

    return `${from} -> ${to}`;
  });

  protected readonly user = signal({ name: 'John Doe', age: 30 });

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly flightId = toSignal(
    this.activatedRoute.paramMap.pipe(map((params) => params.get('flightId'))),
    { initialValue: 'LH1234' }
  );
  private readonly flightId$ = toObservable(this.flightId);

  constructor() {
    effect(() => {
      this.searchFlight();
    });
  }

  setFrom(value: string) {
    this.from.set(value);
  }

  setAge(value: number) {
    this.user.update((user) => ({ ...user, age: value }));
  }

  get age() {
    return this.user().age;
  }

  searchFlight(): void {
    const from = this.from();
    const to = this.to();

    console.log(`Searching flight from ${from} to ${to}`);
  }
}
