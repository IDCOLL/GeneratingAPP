/// <reference path="../typings/angular2-meteor.d.ts" />

export var gksitess = new Mongo.Collection('gksitess');

gksitess.allow({
    insert: function(userId, gksites) {
        return true;
    },
    update: function(userId, gksites, fields, modifier) {
        return true;
    },
    remove: function(userId, gksites) {
        return true;
    } 
});

