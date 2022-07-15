import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let h1: HTMLElement;
  let component: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('span');
  }));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app1'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app1');
  });



  it(`should title render`, () => {
    fixture.detectChanges();
    const text = (debugElement.query(By.css('span')).nativeElement as HTMLElement).innerHTML;

    expect(text).toContain('app1');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    console.log(1, h1.textContent);
    expect(h1.innerHTML).toContain(component.title);
  });

  test('should render title in a span tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('app1 app is running!');
  });

});
