import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[loading]',
})
export class LoadingDirective implements OnChanges, AfterViewInit {
  loadingNode;
  @Input() loading: boolean;
  @Input() loadingSize: 'small' | 'normal' | 'large';

  constructor(private el: ElementRef) {
    this.loadingNode = document.createElement('div');
    this.loadingNode.style.cssText = 'position: absolute; width: 100%; height: 100%; top: 0; left: 0;z-index:9999;';
    this.loadingNode.innerHTML = `<div class="home-spin-dot home-spin-dot-spin"><i></i><i></i><i></i><i></i></div>`;
  }

  ngAfterViewInit(): void {
    const SIZE = {
      small: 0.4,
      normal: 0.6,
      large: 1,
    };
    this.loadingNode.firstElementChild.style.cssText = `zoom:${SIZE[this.loadingSize] || SIZE.normal};`;

    const element = this.el.nativeElement;
    const computedStyle = window.getComputedStyle(element);
    if (!computedStyle.position || computedStyle.position === 'static') element.style.position = 'relative';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showLoading(changes.loading && changes.loading.currentValue);
  }

  private showLoading(visible: boolean) {
    if (visible) return this.el.nativeElement.append(this.loadingNode);
    this.loadingNode.remove();
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [LoadingDirective],
  declarations: [LoadingDirective],
  providers: [],
})
export class LoadingDirectiveModule {}
