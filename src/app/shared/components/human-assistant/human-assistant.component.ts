import { Component, EventEmitter, Output, HostListener ,OnInit, OnDestroy, NgModule, ElementRef, ViewChildren, QueryList, AfterViewInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';
import { StreamingService } from '../../services/streaming.service';
import { VideoService } from '../../services/video.service';
import {VideoDisplayComponent} from "../video-display/video-display.component";
import {SubtitleComponent} from "../subtitle/subtitle.component";


@Component({
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    VideoDisplayComponent,
    SubtitleComponent
  ],
  selector: 'app-human-assistant',
  templateUrl: './human-assistant.component.html',
  styleUrls: ['./human-assistant.component.scss'],
})
export class HumanAssistantComponent implements OnInit, OnDestroy {

  @Output() onClose = new EventEmitter<void>();
  @Output() onOpen = new EventEmitter<void>();


  // initial video display Later it will come through StreamingService
  videoSource: string = 'https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/65c591c59dba3c9577cdec09_64264a8a9df8da0121b4ddbb_Untitled (5)-transcode.mp4';
  subtitlesText: string = '';
  questionText: string = '';
  inputText: string = '';
  videoTypeTop: string = 'top';
  videoTypeDialog: string = 'dialog';
  showAssistantDiv:boolean=false;

  hideVideoDockWrapper: boolean = false;
  isVisible: boolean = false;
  private scrollSubscription!: Subscription;

  constructor( private scrollService: ScrollService, private aiService: StreamingService, private videoService: VideoService) {}

  ngOnInit(): void {
    this.scrollSubscription = this.scrollService.scrollPosition$.subscribe(pos => {
      this.isVisible = pos > 200; //  Show dialog when user scrolls past 100px
      this.scrollService.setVideoDialogVisibility(this.isVisible);
    });

    console.log("ngOnInit => HumanAssistantComponent",)
    //this.changeSource("")
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  sendText() {
    if (this.inputText) {
      this.aiService.getAiResponse(this.inputText).subscribe({
        next: (response) => {
          // Assuming response contains  values 'videoUrl' and 'subtitles'
          this.videoSource = response.videoUrl;
          this.subtitlesText = response.subtitles;
          this.questionText = response.question;
          this.changeSource(this.videoSource );
        },
        error: (error) => {
          console.error('Error fetching AI response:', error);
        }
      });
      this.inputText = ''; // Clear input after sending
    }
  }

  changeSource(newSource: string): void {
    this.videoService.changeVideoSource(newSource);
  }

  openAssistant() {
    this. subtitlesText = "Hi, welcome to UneeQ digital humans, if you have any questions please feel free to just ask";
    this.showAssistantDiv = true;
    // this.onOpen.emit();
  }

  closeAssistant() {
    this.showAssistantDiv = false;
    // this.onClose.emit();
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeAssistant();
    }
  }
}
