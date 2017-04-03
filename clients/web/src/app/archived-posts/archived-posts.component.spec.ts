import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPostsComponent } from './archived-posts.component';

describe('ArchivedPostsComponent', () => {
  let component: ArchivedPostsComponent;
  let fixture: ComponentFixture<ArchivedPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
