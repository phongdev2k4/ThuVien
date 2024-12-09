import { Component } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';

@Component({
    selector: 'app-dashboard-admin',
    standalone: true,
    imports: [
        AsideComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
