import {Directive, Input, ElementRef, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[leave]'
})
export class LeaveDirective implements OnDestroy{
  constructor(public el: ElementRef,public renderer: Renderer2) {}

  public listener: any;
  @Input() leave: { className: string, duration: number };

  clearOldAnimation(node: HTMLBaseElement) {
    node.style.animationPlayState = '';
    node.style.animationDuration = '';
    node.style.animationIterationCount = '';
    node.style.animationTimingFunction = '';
    node.style.animationFillMode = '';
    node.style.animationDelay = '';
    node.style.animationName = 'none';
    node.style.animationDirection = '';
    node.style.animation = 'none'
  }

  createNode(parent, node, nodeStyle:  ClientRect) {
    // debugger
    node.style.position = 'fixed';
    node.style.width = nodeStyle.width + 'px';
    node.style.height = nodeStyle.height + 'px';
    node.style.top = nodeStyle.top + 'px';
    node.style.left = nodeStyle.left + 'px';
    parent.appendChild(node)
  }

  ngOnDestroy() {
    const parent = this.el.nativeElement.parentElement;
    const node = this.el.nativeElement.cloneNode(true) as HTMLBaseElement;
    const nodeStyle = this.el.nativeElement.getBoundingClientRect();
    this.createNode(parent,node,nodeStyle);
    this.clearOldAnimation(node);
    // setTimeout(()=>{
      node.classList.add(this.leave.className);
      setTimeout(()=> {
        parent.removeChild(node)
      },this.leave.duration)
    // })
  }

}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [LeaveDirective],
  declarations: [LeaveDirective],
  providers: [],
})
export class LeaveDirectiveModule { }
