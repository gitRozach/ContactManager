import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interface/contact';

@Pipe({
  name: 'teamFilter'
})
export class TeamFilterPipe implements PipeTransform {

  transform(items: Contact[], value: string): Contact[] {
    if(!items || !value) return items;
    return items.filter(entry =>  entry.team?.toLowerCase().includes(value.toLowerCase()));
  }
}
