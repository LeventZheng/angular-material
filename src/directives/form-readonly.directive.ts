import { NgModule, Directive, Input, OnInit, Renderer2, ElementRef, OnChanges } from '@angular/core';

/**
 * 设置表单只读属性
 * @export
 * @class FormReadonlyDirective
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Directive({ selector: '[form-readonly]' })
export class FormReadonlyDirective implements OnInit, OnChanges {
    @Input("form-readonly") readonly;
    constructor(
        private render: Renderer2,
        private elementRef: ElementRef
    ) { }

    ngOnInit() {
        this.setReadOnly();
    }

    ngOnChanges() {
        this.setReadOnly();
    }

    setReadOnly() {
        if (this.readonly) {
            this.render.setAttribute(this.elementRef.nativeElement, 'readonly', '');
        } else {
            this.render.removeAttribute(this.elementRef.nativeElement, 'readonly');
        }
    }
}

@NgModule({
    imports: [],
    exports: [FormReadonlyDirective],
    declarations: [FormReadonlyDirective],
    providers: [],
})
export class FormReadonlyDirectiveModule { }
