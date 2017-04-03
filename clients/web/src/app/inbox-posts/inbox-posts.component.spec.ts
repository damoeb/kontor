import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxPostsComponent } from './inbox-posts.component';

describe('InboxPostsComponent', () => {
  let component: InboxPostsComponent;
  let fixture: ComponentFixture<InboxPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
