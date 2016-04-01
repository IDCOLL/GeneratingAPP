/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {gksitesForm} from '../gksites-form/gksitesForm';

import {gksitess} from '../../collections/gksitess';

import {MeteorComponent} from 'angular2-meteor';

import {gksitesService, gksitesModel} from '../gksites-list/gksitesService';

import {gksitesFilter} from '../gksites-list/gksitesFilter';

import {gksitesItem} from '../gksites-item/gksitesItem';


@Component({
    selector: 'gksites-list'
})

@View({
    pipes: [gksitesFilter],
    templateUrl: '/client/gksites-list/gksites-list.html',
    directives: [gksitesForm, NgFor, gksitesItem, NgIf]
})

export class gksitesList extends MeteorComponent {

    public pageTitle:string;
    public gksitess:Mongo.Cursor<any>;

    private service:gksitesService;

    private subscription;

    private searchValue:any = "";

    private typing;

    public pagination:{perPage: number, currentPage: number, items: number, totalPages: number, arrayPages: number[]} = {
        perPage: 10,
        currentPage: 1,
        items: 0,
        totalPages: 0,
        arrayPages: []
    };

    public constructor(gksitesService:gksitesService) {
        super();

        this.service = gksitesService;

        this.setUpPageDetails();

        this.meteorSubscribe();

    }

    public changePage(page:number):void {
        this.pagination.currentPage = page;
        this.meteorSubscribe();
        this.pagination.totalPages = Math.ceil(this.pagination.items / this.pagination.perPage);

        var pages:number[] = [];

        for (let i = 1; i < this.pagination.totalPages + 1; i++) {
            pages.push(i);
        }

        this.pagination.arrayPages = pages;

    }

    public searchBindingStart(search:string):void {

        clearTimeout(this.typing);
        this.typing = setTimeout(()=> {
            console.log(search);
            this.searchValue = search;
            this.pagination.currentPage = 1;
            this.meteorSubscribe();
        }, 1000);

    }

    public searchBindingStop():void {
        clearTimeout(this.typing);
    }

    public isCurrentPage(page:number):string {
        if (page == this.pagination.currentPage) {
            return 'active';
        }
        return 'waves-effect';
    }

    public onDestroy() {
        if (this.subscription) {
            this.subscription.stop();
        }
    }

    private meteorSubscribe():void {

        if (this.subscription) {
            this.subscription.stop();
        }

        this.subscription = Meteor.subscribe('gksitess', {
            limit: this.pagination.perPage,
            skip: this.pagination.currentPage * this.pagination.perPage - this.pagination.perPage
        }, this.searchValue, ()=> {
            
        });

        this.autorun(()=> {
            this.gksitess = gksitess.find();

            Meteor.call('gksitesCount', this.searchValue, (error:any, results:any)=> {

                if(error){
                    console.log(error);
                }

                let totalPages:number = Math.ceil(results / this.pagination.perPage);

                var pages:number[] = [];

                for (let i = 1; i < totalPages + 1; i++) {
                    pages.push(i);
                }

                this.pagination.arrayPages = pages;

                this.pagination = {
                    perPage: this.pagination.perPage,
                    currentPage: this.pagination.currentPage,
                    items: results,
                    totalPages: Math.ceil(results / this.pagination.perPage),
                    arrayPages: pages
                };
            });
        }, true);


    }
    

    private setUpPageDetails():void {
        this.pageTitle = 'Recent gksitess';
    }

}