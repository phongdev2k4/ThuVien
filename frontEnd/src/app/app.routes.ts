import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BookpageComponent } from './components/bookpage/bookpage.component';

export const routes: Routes = [

    {
        path:'',
        component:HomeComponent
    },
    {
        path:'Bookpage',
        component:BookpageComponent
    },
   
  

 
];
