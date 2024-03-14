import {Component, OnInit, OnDestroy} from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ScrollService } from './shared/services/scroll.service';
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {MainSectionComponent} from "./shared/components/main-section/main-section.component";
import {FeaturesSectionComponent} from "./shared/components/features-section/features-section.component";
// import {HeroComponent} from "./shared/components/hero/hero.component";
import {VideoDisplayComponent} from "./shared/components/video-display/video-display.component";
import {SubtitleComponent} from "./shared/components/subtitle/subtitle.component";
import {HumanAssistantComponent} from "./shared/components/human-assistant/human-assistant.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MainSectionComponent,
    FeaturesSectionComponent,
    VideoDisplayComponent,
    SubtitleComponent,
    HumanAssistantComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Digital Assistant';
  hideVideoDockWrapper: boolean = false;
  private dialogVisibilitySubscription: Subscription = new Subscription();

  showAssistant = true;
  handleClose() {
    this.showAssistant = false;
  }

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.dialogVisibilitySubscription = this.scrollService.videoDialogVisibility$.subscribe(isVisible => {
      this.hideVideoDockWrapper = isVisible;
    });
  }

  ngOnDestroy(): void {
    if (this.dialogVisibilitySubscription) {
      this.dialogVisibilitySubscription.unsubscribe();
    }
  }
}
