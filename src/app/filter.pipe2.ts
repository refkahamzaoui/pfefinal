import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText2: string): any[] {
      if(!items) return [];
      if(!searchText2) return items;
  searchText2 = searchText2.toLowerCase();
return items.filter( it => {
      return it["name"].toLowerCase().includes(searchText2) || it["status"].toLowerCase().includes(searchText2);
    });
   }
   
}