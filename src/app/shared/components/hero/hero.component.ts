import {Component, OnInit, OnDestroy,HostListener, NgModule, ElementRef} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { Subscription } from 'rxjs';
import {trigger, state, style, transition, animate} from '@angular/animations';

// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({
  //       opacity: 1,
  //       transform: 'translateY(0)'
  //     })),
  //     state('out', style({
  //       opacity: 0,
  //       transform: 'translateY(-100%)'
  //     })),
  //     transition('out => in', animate('400ms ease-in')),
  //     transition('in => out', animate('400ms ease-out'))
  //   ])
  // ]
})


export class HeroComponent implements OnInit, OnDestroy {
  hideVideoDockWrapper: boolean = false;
  isVisible: boolean = false;
  private scrollSubscription!: Subscription;

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.scrollSubscription = this.scrollService.scrollPosition$.subscribe(pos => {
      // You can modify this condition to fit your exact requirements
      this.isVisible = pos > 100; // Example: Show dialog when user scrolls past 100px
      this.scrollService.setVideoDialogVisibility(this.isVisible);
    });
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
  // public showVideoDialog: boolean = false;
  // private heroSectionOffsetBottom: number = 0;
  // public showAssistantUI: boolean = false;

  // constructor(private elRef: ElementRef) {
  // }

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const heroSection = document.querySelector('.video-docker');
  //   if (heroSection) {
  //     this.heroSectionOffsetBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;
  //     this.showVideoDialog = window.pageYOffset > this.heroSectionOffsetBottom;
  //   }
  // }
}

