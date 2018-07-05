import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input
} from '@angular/core';
import { conformToMask } from 'angular2-text-mask';

@Component({
  selector: 'app-social-number-keyboard',
  templateUrl: './social-number-keyboard.component.html',
  styleUrls: ['./social-number-keyboard.component.scss']
})
export class SocialNumberKeyboardComponent implements OnInit, AfterViewInit {
  private inputLength = 11;
  @ViewChild('socialNumberKeyboardEl') private socialNumberKeyboardElRef;
  private socialNumberKeyboardEl: HTMLElement;
  @Input() public autoSize = true;
  inputModel = '';
  inputMask = [
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
  ];
  @Output() socialNumber = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.socialNumberKeyboardElRef) {
      this.socialNumberKeyboardEl = this.socialNumberKeyboardElRef.nativeElement;
      if (this.autoSize) {
        this.socialNumberKeyboardEl.style.fontSize =
          this.socialNumberKeyboardEl.parentElement.offsetHeight * 0.04 + 'px';
      }
    }
  }

  keyboardPressed($event) {
    if (!$event || !$event.srcElement) {
      return;
    }
    const keyEl: HTMLElement = $event.srcElement;
    const keyVal: string = keyEl.textContent;
    if (this.inputModel.length >= this.inputLength) {
      return;
    }
    this.inputModel += keyVal;
  }

  submit() {
    if (this.inputModel.length < this.inputLength) {
      return;
    }
    this.socialNumber.emit(this.inputModel);
    this.inputModel = '';
  }

  backspace() {
    if (this.inputModel.length === 0) {
      return;
    }
    this.inputModel = this.inputModel.slice(0, this.inputModel.length - 1);
  }
}
