/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgIf, NgFor} from 'angular2/angular2';

import {MeteorComponent} from 'angular2-meteor';

//import {RouterLink, RouteParams} from '../typings/angular2/router';
import RouterLink from '../typings/angular2/router';

import {gksitess} from '../../collections/gksitess';

import {gksitesService, gksitesModel} from '../gksites-list/gksitesService';

import {gksitesEdit} from '../gksites-edit/gksitesEdit';

//import {Router} from '../typings/angular2/router'


@Component({
    selector: 'gksites-details'
})

@View({
    templateUrl: '/client/gksites-details/gksites-details.html',
    directives: [RouterLink, gksitesEdit, NgIf, NgFor]
})

export class gksitesDetails extends MeteorComponent {

    private gksitesId:string;

    public gksites:gksitesModel = new gksitesModel();

    public gksitesStatus:string = '';

    private gksitesService:gksitesService;
    
    private router: Router;

    public constructor(params:RouteParams, gksitesService:gksitesService, Router:Router) {
        super();
        
        this.gksitesId = params.get('id');

        this.gksitesService = gksitesService;
        
        this.router = Router;
        
        this.autorun(()=> {
            this.subscribe('gksites', this.gksitesId, ()=> {
                this.gksites = <gksitesModel>gksitess.findOne({_id: this.gksitesId});
                if (this.gksites){
                    this.gksitesStatus = this.gksitesService.gksitesStatus(this.gksites.public);
                }
            }, true);
        }, true);
  
    }
    
    public deleteConfirmation(): void {
        var element:any = $('#modal3');
        element.openModal();
    }
    
    public deletegksites(): void{
        var element:any = $('#modal3');
        this.gksitesService.deletegksites(this.gksitesId)
        element.closeModal();
        this.router.navigate(['/gksitesList']);
    }
    
    
}


    


