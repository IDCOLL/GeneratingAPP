/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, Input } from '../typings/angular2/angular2';

import {gksitesService, gksitesModel} from '../gksites-list/gksitesService';

import {RouterLink} from '../typings/angular2/router';

@Component({
    selector: 'gksites-item'
})

@View({
    templateUrl: 'client/gksites-item/gksites-item.html',
    directives: [RouterLink]
})

export class gksitesItem {

    @Input() item: gksitesModel;

    public gksitesStatus:string;
    
    private gksitesService: gksitesService;
    
    public constructor(gksitesService:gksitesService){
        this.gksitesService = gksitesService;
    }
    
    onInit() {
        this.gksitesStatus = this.gksitesService.gksitesStatus(this.item.public);
    }

}


