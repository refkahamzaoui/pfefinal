import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText3: string): any[] {
      if(!items) return [];
      if(!searchText3) return items;
  searchText3 = searchText3.toLowerCase();
return items.filter( it => {
      return it["title"].toLowerCase().includes(searchText3);
    });
   }
   
}