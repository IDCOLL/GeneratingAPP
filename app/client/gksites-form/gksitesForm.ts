/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

import {Component, View} from '../typings/angular2/angular2';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';

import {gksitess} from '../../collections/gksitess';

import {gksitesService, gksitesModel} from '../gksites-list/gksitesService';

@Component({
    selector: 'gksites-form'
})

@View({
    templateUrl: 'client/gksites-form/gksites-form.html',
    directives: [FORM_DIRECTIVES]
})

export class gksitesForm {

    public newgksites: ControlGroup;

    public service: gksitesService;

    public constructor(gksitesService:gksitesService) {
        this.setUpgksitesForm();
        this.service = gksitesService;
    }

    public submitCreategksites(newgksites: gksitesModel):void {
        if(this.newgksites.valid){
            this.service.creategksites(newgksites);
        }
    }

    public openModal():void{
        let element: any = $('#modal1');
        element.openModal();
    }

    private setUpgksitesForm(): void{
        var formBuilder = new FormBuilder();
        this.newgksites = formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            location: ['', Validators.required],
            public: [false]
        });
    }

}
