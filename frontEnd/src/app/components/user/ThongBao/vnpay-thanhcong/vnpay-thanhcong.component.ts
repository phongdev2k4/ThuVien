import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vnpay-thanhcong',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './vnpay-thanhcong.component.html',
  styleUrl: './vnpay-thanhcong.component.css'
})
export class VnpayThanhcongComponent {
  txnRef: string = '';
  amount: string = '';

  constructor(private route2: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    // Lấy các tham số từ query string của URL
    this.txnRef = this.route2.snapshot.queryParamMap.get('txnRef')!;
    this.amount = this.route2.snapshot.queryParamMap.get('amount')!;
    this.amount = (Number(this.amount) / 100).toString();
  }

}
