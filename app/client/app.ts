/// <reference path="../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, provide} from 'angular2/angular2';

import {bootstrap} from 'angular2-meteor';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';

import {gksitesList} from 'client/gksites-list/gksitesList';
/*GNRT_IMPORT_LIST*/
import {gksitesService} from 'client/gksites-list/gksitesService';
/*GNRT_IMPORT_SERVICE*/
import {gksitesDetails } from 'client/gksites-details/gksitesDetails';
/*GNRT_IMPORT_DETAILS*/

@Component({
    selector: 'app'
})

@View({
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', redirectTo: '/'}
, { path: '/gksites/:id', as: 'gksitesDetails', component: gksitesDetails }
/*GNRT_ADD_ROUTE_DETAILS*/
, { path: '/gksitess', as: 'gksitesList', component: gksitesList }
/*GNRT_ADD_ROUTE_LIST*/
])

class Socially {}

bootstrap(Socially, [gksitesService, /*GNRT_ADD_SERVICE*/ , ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue: '/'})]);/// <reference path="../typings/angular2-meteor.d.ts" />
