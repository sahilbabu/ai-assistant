import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanAssistantComponent } from './human-assistant.component';

describe('HumanAssistantComponent', () => {
  let component: HumanAssistantComponent;
  let fixture: ComponentFixture<HumanAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumanAssistantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HumanAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
