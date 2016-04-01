/// <reference path="../../typings/angular2-meteor.d.ts" />
import {gksitess} from '../../collections/gksitess';

export class gksitesModel {
    public name:string = '';
    public description:string = '';
    public location:string = '';
    public public:boolean = false;
}

export class gksitesService {

    public creategksites(newgksites:gksitesModel):void {
        gksitess.insert({
            name: newgksites.name,
            description: newgksites.description,
            location: newgksites.location,
            public: newgksites.public
        }, (error)=> {
            if (error){
                console.log(error);
            }
        })
    }

    public updategksites(id:string, gksites:gksitesModel):void {
        gksitess.update(id, {
            $set: {
                name: gksites.name,
                description: gksites.description,
                location: gksites.location,
                public: gksites.public
            }
        });
    }

    public gksitesStatus(status:boolean) {
        if (status) {
            return 'Public';
        } else {
            return 'Private';
        }
    }

    public deletegksites(gksitesId:String):void {
        gksitess.remove({_id: gksitesId});
    }
}
