import {gksitess} from '../collections/gksitess';

Meteor.publish('gksitess', function(options: any, regex: string) {
    console.log("gksitess ", options);
    return gksitess.find({name: new RegExp(regex, "g")}, options);
});

Meteor.publish('gksites', function(gksitesId: string) {
    return gksitess.find({_id: gksitesId});
});

Meteor.methods({
    updategksites: function(id: string, data: any){
        gksitess.update({_id: id}, {$set: {name: 'updated'}})
    },
    gksitesCount: function(regex: string){
        return gksitess.find({name: new RegExp(regex, "g")}).count();
    }
});
 