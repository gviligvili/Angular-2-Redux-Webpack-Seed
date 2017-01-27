import { MyScrollbar } from './../directives/myScrollbar';
import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule, ReactiveFormsModule}         from '@angular/forms';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MyScrollbar
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MyScrollbar
    ]
})
export class SharedModule {
}