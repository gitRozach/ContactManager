import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamSort'
})
export class TeamSortPipe implements PipeTransform {

  transform(items: string[], value: 'ASC' | 'DESC'): string[] {
    if(!items || !value) return items;
    if(value === 'ASC') return items.sort((a, b) => a < b ? -1 : (a > b ? 1 : 0))
    if(value === 'DESC') return items.sort((a, b) => a > b ? -1 : (a < b ? 1 : 0))
    return items;
  }
}
