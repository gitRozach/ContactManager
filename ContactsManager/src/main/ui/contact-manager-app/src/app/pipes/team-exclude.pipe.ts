import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamExclude'
})
export class TeamExcludePipe implements PipeTransform {

  transform(items: string[], value: string): string[] {
    return (!items || !value) ? items : items.filter(item => item != value);
  }

}
