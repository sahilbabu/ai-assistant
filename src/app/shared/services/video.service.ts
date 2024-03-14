import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videoSource = new BehaviorSubject<string>('');
  currentVideoSource = this.videoSource.asObservable();

  constructor() { }

  changeVideoSource(url: string) {
    this.videoSource.next(url);
  }
}
