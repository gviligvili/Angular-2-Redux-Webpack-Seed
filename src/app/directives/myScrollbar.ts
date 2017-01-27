import {Directive, ElementRef, Input} from '@angular/core';
import * as Ps from 'perfect-scrollbar';

@Directive({
    selector: '[my-scrollbar]',
    host: {
        style: 'position: relative !important; overflow: hidden !important;'
    }
})
export class MyScrollbar {

    private lastWidth: number;
    private lastHeight: number;

    @Input() config?:Object;

    constructor(private elementRef:ElementRef) {}

    /** On component init, init the scrollbar. */
    ngAfterViewInit() {
        // Measure the div on start.
        this.lastHeight = this.elementRef.nativeElement.scrollHeight;
        this.lastWidth = this.elementRef.nativeElement.scrollWidth;
        Ps.initialize(this.elementRef.nativeElement, this.config || {});
    }


    /** On every view change, update the scrollbar.
     * I'm using ngAfterViewCheck and not ngDoCheck because ngDoCheck runs before any view changes and will give me the last state of the element, and ngAfterViewCheck gives me the current state.**/
    ngAfterViewChecked() {
        let currentHeight = this.elementRef.nativeElement.scrollHeight;
        let currentWidth = this.elementRef.nativeElement.scrollWidth;

        if (this.lastHeight != currentHeight || this.lastWidth != currentWidth) {
            console.log("lastHeight: ", this.lastHeight, " currentHeight: ", currentHeight, " lastWidth: ", this.lastWidth, " currentWidth: ", currentWidth);
            this.lastHeight = currentHeight;
            this.lastWidth = currentWidth;
            this.update();
        }
    }

    update() {
        Ps.update(this.elementRef.nativeElement);
    }

    /** When the directive gets destroyed, remove the scrollbar. **/
    ngOnDestroy() {
        Ps.destroy(this.elementRef.nativeElement);
    }


    /** Scrolls to a specific point **/
    scrollTo(position:number) {
        this.elementRef.nativeElement.scrollTop = position;

        this.update();
    }
}