/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, Input} from 'angular2/angular2';

import {gksitesService, gksitesModel} from '../gksites-list/gksitesService';

import {MeteorComponent} from 'angular2-meteor';

import {gksitess} from '../../collections/gksitess';

@Component({
    selector: 'gksites-edit'
})

@View({
    templateUrl: '/client/gksites-edit/gksites-edit.html'
})

export class gksitesEdit extends MeteorComponent {

    @Input() id:string;

    public gksites:gksitesModel = new gksitesModel();
    
    private gksitesService: gksitesService;

    public constructor(gksitesService:gksitesService) {
        super();
        this.gksitesService = gksitesService;
    }
    
    public onInit(){
        this.autorun(()=> {
            this.subscribe('gksites', this.id, ()=> {
                this.gksites = <gksitesModel>gksitess.findOne({_id: this.id});
            }, true);
        }, true);
    }

    public openModal():void {
        var element:any = $('#modal2');
        element.openModal();
    }

    public update():void {
        this.gksitesService.updategksites(this.id, this.gksites);
    }

}


