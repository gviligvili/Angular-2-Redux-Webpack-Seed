/**
 * Created by talgvili on 24/12/2016.
 */
import {Component, Input, OnChanges, ChangeDetectionStrategy, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
var bows = require("bows")
var blog = bows("article-view changed !", "with params ?")

@Component({
    selector: 'articles-view',
    templateUrl: 'articles-view.component.html',
    styleUrls: ['./articles-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesView implements OnChanges{
    @Input() articles:any;
    @Input() error:any;
    @Input() pending:any;
    @Output() articleSubmit = new EventEmitter();

    private articleForm:FormGroup

    constructor(private formBuilder:FormBuilder){
        this.articleForm = formBuilder.group({
            id: "",
            title: "",
            author: formBuilder.group({
                id: "",
                name: "",
                }),
            contributors: formBuilder.array([
                this.initUser()
            ])
        })
    }

    ngOnChanges() {
        blog(this.articles, "pending? ", this.pending, "error? ", this.error);
    }

    onSubmit(articleForm){
        let article = articleForm.getRawValue()
        console.log(article);
        this.articleSubmit.emit(article)
    }


    initUser() {
        // initialize our address
        return this.formBuilder.group({
            id: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    addContributor(){
        const control = <FormArray>this.articleForm.controls["contributors"];
        control.push(this.initUser())
    }

    removeContributor(index: number){
        const control = <FormArray>this.articleForm.controls["contributors"];
        control.removeAt(index);
    }
}
