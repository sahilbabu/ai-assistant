import { Component, Input } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'app-subtitle',
  templateUrl: './subtitle.component.html',
  styleUrls: ['./subtitle.component.scss']
})
export class SubtitleComponent {
  @Input() subtitlesText: string = '';
  @Input() questionText: string = '';

  constructor() {}
}
