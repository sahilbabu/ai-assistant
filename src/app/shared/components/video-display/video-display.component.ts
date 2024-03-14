import {
  AfterViewInit,
  OnDestroy,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {CommonModule} from "@angular/common";
import { Subscription } from 'rxjs';
import { VideoService } from '../../services/video.service';

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.scss']
})
export class VideoDisplayComponent implements OnDestroy {
  @Input() videoSource: string = '';
  @Input() videoType: string = '';

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  videoSubscription!: Subscription;

  constructor(private videoService: VideoService) {
    this.videoSubscription = this.videoService.currentVideoSource.subscribe(source => {
      if (this.videoPlayer && this.videoPlayer.nativeElement) {
        this.videoPlayer.nativeElement.src = source;
        this.videoPlayer.nativeElement.load();
      }
    });
  }

  ngOnDestroy(): void {
    this.videoSubscription.unsubscribe();
  }

}
