import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate random position within min and max range', () => {
    const val = component.randomPosition(1, 100);
    expect(val).toBeGreaterThanOrEqual(1);
    expect(val).toBeLessThanOrEqual(100);
  });

  it('should create stars on init', () => {
    const stars = fixture.nativeElement.querySelectorAll('.star1, .star2, .star3, .star4, .star5, .star6');
    expect(stars.length).toBe(300);
    const firstStar = stars[0] as HTMLElement;
    expect(firstStar.style.position).toBe('absolute');
    expect(firstStar.style.top).toContain('%');
    expect(firstStar.style.left).toContain('%');
  });
});
