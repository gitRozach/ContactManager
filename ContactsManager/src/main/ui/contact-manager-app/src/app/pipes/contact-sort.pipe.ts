import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interface/contact';

@Pipe({
  name: 'contactSort'
})
export class ContactSortPipe implements PipeTransform {

  transform(items: Contact[], value: 'ASC' | 'DESC'): Contact[] {
    if(!items || !value) return items;
    if(value === 'ASC') return items.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
    if(value === 'DESC') return items.sort((a, b) => a.name > b.name ? -1 : (a.name < b.name ? 1 : 0))
    return items;
  }
}
