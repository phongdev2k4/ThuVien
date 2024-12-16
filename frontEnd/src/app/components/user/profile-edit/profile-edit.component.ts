import { Component, OnInit } from '@angular/core';
import { IntergrationService } from '../../../services/intergration.service';


@Component({
    selector: 'app-profile-edit',
    standalone: true,
    imports: [],
    templateUrl: './profile-edit.component.html',
    styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit{
  userData: any;
  constructor(private userService: IntergrationService) {}
  ngOnInit() {
    const userId = 'admin'; // Replace with the actual user ID you want to fetch
    this.userService.getUserData(userId).subscribe(
        (data) => { 
            // Use the data here, e.g. assign it to a class property
            this.userData = data; // Assuming you have a userData property
            console.log('User data:', this.userData); // Use the data in some way
        },
        (error) => {
            console.error('Error fetching user data:', error);
        }
    );
}


}
