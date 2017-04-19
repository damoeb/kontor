import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPostComponent } from './post.component';

describe('ArchivedPostComponent', () => {
  let component: ArchivedPostComponent;
  let fixture: ComponentFixture<ArchivedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
