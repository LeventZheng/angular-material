import {Directive, Input, Output, EventEmitter, OnDestroy, OnInit, ElementRef} from '@angular/core';

/**
 * 监听点击框外事件
 * @export
 * @class ClickOutsideDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive({
  selector: '[uiClickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  constructor(public element: ElementRef) {
  }

  @Input() clickOutsideDelay = 0; //事件初始化延迟，用于避免弹框初始化的时候同步调用，触发点击事件；下拉框不影响
  @Output('uiClickOutside') onClickOutside = new EventEmitter();

  escKeyListener = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.onClickOutside.emit();
    }
  }

  clickListener = (event) => {
    if (!isSelfOrAncestorNode(this.element.nativeElement, event.target  as Node || event.srcElement)) {
      this.onClickOutside.emit();
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      document.addEventListener('click', this.clickListener);
      document.addEventListener('keyup', this.escKeyListener);
    },this.clickOutsideDelay);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.clickListener);
    document.removeEventListener('keyup', this.escKeyListener);
  }
}

function isSelfOrAncestorNode(ancestor: Node, node: Node): boolean {
  while (node) {
    // console.log(node);
    if (node === ancestor) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [ClickOutsideDirective],
  declarations: [ClickOutsideDirective],
  providers: [],
})
export class ClickOutsideDirectiveModule { }

