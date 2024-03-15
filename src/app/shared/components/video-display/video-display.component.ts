import {
  Component,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  Renderer2
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
export class VideoDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() videoSource: string = '';
  @Input() videoType: string = '';
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;
  videoSubscription!: Subscription;
  /**
   * @todo will implement this in the future for multiple videos sources
   */
  // videoSources: string[] = [];


  constructor(private renderer: Renderer2, private videoService: VideoService) {
    //console.log("constructor => VideoDisplayComponent", this.videoSource );
    this.videoSubscription =  this.videoService.currentVideoSource.subscribe((source: string) => {
      console.log("this.videoSubscription",source);
      this.videoSource = source;
    });
  }


  ngOnInit(): void {
    // console.log("ngOnInit =>VideoDisplayComponent",this.videoSource)
    // if(this.videoSource === '') {
    //   this.videoSource = ""
    // }
  }

  ngAfterViewInit(): void {
    // console.log("ngAfterViewInit => VideoDisplayComponent", this.videoSource );
    // this.videoSubscription =  this.videoService.currentVideoSource.subscribe((source: string) => {
    //   console.log("this.videoSubscription",source);
    //   this.videoSource = source;
    this.videoLoadAndPlay();
    // });

  }

  videoLoadAndPlay() {
    console.log("videoLoadAndPlay => start");
    this.videoPlayers.forEach(video => {
      const nativeVideo: HTMLVideoElement = video.nativeElement;
      this.renderer.listen(nativeVideo, 'canplay', () => {
        nativeVideo.muted = false; // Ensure the video is not muted
        nativeVideo.play().catch(err => {
          console.error(`Error playing video: ${err.message}`);
        });
      });
      console.log(nativeVideo);
      nativeVideo.load();  // Trigger video loading (can also trigger play in mobile browsers)
    });
    // this.videoPlayers.forEach((videoElementRef, index) => {
    //   const videoElement = videoElementRef.nativeElement;
    //   console.log(videoElement);
    //   // Set the new source
    //   // videoElement.src = newSources[index];
    //
    //   // Load the new video
    //   videoElement.load();
    //   // Start playback
    //   videoElement.play();
    // });
  }

  ngOnDestroy(): void {
    this.videoSubscription.unsubscribe();
  }

}
