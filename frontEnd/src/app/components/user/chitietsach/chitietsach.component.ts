import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chitietsach',
  imports: [],
  templateUrl: './chitietsach.component.html',
  styleUrl: './chitietsach.component.css'
})
export class ChitietsachComponent {
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['masach'];
      console.log(id);
    });
  }
}
