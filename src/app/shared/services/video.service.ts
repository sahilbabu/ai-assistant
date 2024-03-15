import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videoSource = new BehaviorSubject<string>('');
  currentVideoSource: Observable<string> = this.videoSource.asObservable();

  constructor() { }

  changeVideoSource(url: string) {
    this.videoSource.next(url);
  }

}
