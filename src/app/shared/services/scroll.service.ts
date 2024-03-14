import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {map, throttleTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollPositionSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public scrollPosition$: Observable<number> = this.scrollPositionSubject.asObservable();

  private videoDialogVisibilitySubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public videoDialogVisibility$: Observable<boolean> = this.videoDialogVisibilitySubject.asObservable();

  constructor() {
    fromEvent(window, 'scroll').pipe(
      throttleTime(10), // Prevent too many events
      map(() => window.scrollY)
    ).subscribe(scroll => {
      this.scrollPositionSubject.next(scroll);
    });
  }

  setVideoDialogVisibility(isVisible: boolean): void {
    this.videoDialogVisibilitySubject.next(isVisible);
  }
}
