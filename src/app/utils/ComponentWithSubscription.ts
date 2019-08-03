import {OnDestroy} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export class ComponentWithSubscription implements OnDestroy {
  readonly destroyed$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  protected subscribeUntilDestroyed<T>(observable: Observable<T>, next: (arg: T) => void): Subscription {
    return observable.pipe(takeUntil(this.destroyed$))
      .subscribe(next);
  }
}
