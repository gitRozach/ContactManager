import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(items: Contact[], value: string, searchCounter: {count: number}): Contact[] {
    if(!items || !value) return items;
    const result = items.filter(entry =>  entry.name?.toLowerCase().includes(value.toLowerCase()) || 
                                          entry.team?.toLowerCase().includes(value.toLowerCase()) || 
                                          entry.title?.toLowerCase().includes(value.toLowerCase()) || 
                                          entry.email?.toLowerCase().includes(value.toLowerCase()) || 
                                          entry.phoneNumber?.toLowerCase().includes(value.toLowerCase()));
    searchCounter.count = result.length;
    return result;
  }

}
