/// <reference path="../../typings/angular2-meteor.d.ts" />
import {Pipe} from '../typings/angular2/angular2';

@Pipe({
  name: 'gksitesFilter'
})
export class gksitesFilter{
    transform(value){
        console.log(value);
        return '**=> ' +  value;
    }
}
