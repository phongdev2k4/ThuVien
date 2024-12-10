import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vnpay-thatbai',
  standalone: true,
  imports: [],
  templateUrl: './vnpay-thatbai.component.html',
  styleUrl: './vnpay-thatbai.component.css'
})
export class VnpayThatbaiComponent {
  txnRef: string = '';
  errorCode: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Lấy các tham số từ query string của URL
    this.txnRef = this.route.snapshot.queryParamMap.get('txnRef')!;
    this.errorCode = this.route.snapshot.queryParamMap.get('errorCode')!;
  }
}
