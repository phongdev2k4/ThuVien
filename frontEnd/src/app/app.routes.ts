import { Routes } from '@angular/router';
import { ChitietComponent } from './components/chitiet/chitiet/chitiet.component';

import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [

    {
        path:'',
        component:HomeComponent
    },
    {
        path:'chitiet',
        component:ChitietComponent
    },
 
];
