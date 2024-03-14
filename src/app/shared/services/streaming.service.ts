import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


interface AiResponse {
  videoUrl: string;
  question: string;
  subtitles: string;
}
@Injectable({
  providedIn: 'root'
})
export class StreamingService {
  constructor() {}

  getAiResponse(inputText: string): Observable<AiResponse> {
    // Mock data - you would replace this with actual API calls or logic to generate responses
    const mockSubtitles = [
      "This is a journey into sound.",
      "The future is unwritten.",
      "Exploring new dimensions.",
      "A new wave of consciousness."
    ];
    const mockVideoUrls = [
      "https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/65c591c59dba3c9577cdec09_64264a8a9df8da0121b4ddbb_Untitled (5)-transcode.mp4",
      "https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/64264aa18e47366d93d89d62_Untitled (6)-transcode.mp4",
      "https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/64264aafdf43660d1efa0c72_Untitled (7)-transcode.mp4",
      "https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/65c591c59dba3c9577cdec09_64264a8a9df8da0121b4ddbb_Untitled (5)-transcode.mp4",
    ];

    // Randomly select a subtitle and video URL
    const randomSubtitle = mockSubtitles[Math.floor(Math.random() * mockSubtitles.length)];
    const randomVideoUrl = mockVideoUrls[Math.floor(Math.random() * mockVideoUrls.length)];
    const response: AiResponse = {
      videoUrl: randomVideoUrl,
      subtitles: randomSubtitle,
      question: inputText
    };

    // Use 'of' to return an observable that emits a single value
    return of(response);
  }
}
// https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/65c591c59dba3c9577cdec09_64264a8a9df8da0121b4ddbb_Untitled (5)-transcode.mp4
// https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/65c591c59dba3c9577cdec09_64264a8a9df8da0121b4ddbb_Untitled (5)-transcode.webm
// https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/64264aa18e47366d93d89d62_Untitled (6)-transcode.mp4
// https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/64264aa18e47366d93d89d62_Untitled (6)-transcode.webm
// https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/64264aafdf43660d1efa0c72_Untitled (7)-transcode.mp4
// https://assets-global.website-files.com/63a5141427f9360ebfaf9e6e/64264aafdf43660d1efa0c72_Untitled (7)-transcode.webm
