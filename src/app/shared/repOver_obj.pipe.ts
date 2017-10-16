import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'repover_obj'})
export class RepOverObjPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    if (!value) {
      return value;
    } 

    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    } 
    return keys;
  } 
} 