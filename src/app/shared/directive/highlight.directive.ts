import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[colorHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input() colorHighlight: string;
  @Input() defaultColor: string;
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const colorGet = JSON.parse(localStorage.getItem('table-highlight')!);
    this.colorHighlight = colorGet.cheched;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.colorHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
