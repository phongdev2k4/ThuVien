import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe',
  standalone: true
})
export class FilterpipePipe implements PipeTransform {

  transform(value: any,searchfilter:any): any {
    return value.filter((e:any)=>{
          return e.tenSach.indexOf(searchfilter)>-1;
  });
  }

}
