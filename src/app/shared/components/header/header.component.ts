import {Component, HostListener, ElementRef, AfterViewInit} from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements AfterViewInit {
  private stickyHeaderOffsetTop: number = 0; // Assign an initial value

  constructor(private elRef: ElementRef) {
  }

  ngAfterViewInit() {
    // Calculate the initial position of the sticky header after the view initializes
    const stickyHeader = this.elRef.nativeElement.querySelector('#sticky-header');
    this.stickyHeaderOffsetTop = stickyHeader.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const stickyHeader = this.elRef.nativeElement.querySelector('#sticky-header');
    if (window.pageYOffset > this.stickyHeaderOffsetTop + 400) {
      stickyHeader.classList.add('scrolled');
    } else {
      stickyHeader.classList.remove('scrolled');
    }
  }
}



