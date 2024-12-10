import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';

import{Chart,ChartData,ChartOptions,registerables} from 'chart.js';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReportsService } from '../../../services/reports.service';
import { BorrowReport } from '../../../models/borrow-report';
import { BrowserModule } from '@angular/platform-browser';
import { MostBorrowedBook } from '../../../models/most-borrowed-book';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { AsideComponent } from '../aside/aside.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';



export type ChartOptions123 = {
  series: {
    name: string;
    data: number[];
  }[]; // Array of objects, each with a series name and numeric data for the bars
  chart: ApexChart; // Configuration for chart type and behavior
  xaxis: ApexXAxis; // Configuration for the X-axis, including categories
  title: ApexTitleSubtitle; // Title for the chart
  plotOptions: ApexPlotOptions; // Optional: Customization for bar chart visuals
  colors: string[]; // Optional: Custom colors for the bars
  legend: ApexLegend; // Optional: Legend settings for the chart
  dataLabels: ApexDataLabels; // Optional: Enable or disable data labels
};



@Component({
  selector: 'app-reports',
  standalone: true,  // Add this line to make the component standalone
  imports: [AsideComponent, CommonModule, FormsModule,BaseChartDirective,NgApexchartsModule], // Valid in standalone components
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  chartOptions: ChartOptions123 = {
    series: [],
    chart: { type: 'bar', height: 400, stacked: true },
    xaxis: { categories: [] },
    title: { text: '' },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: { position: 'top' },
      },
    },
    dataLabels: { enabled: true },
    colors: [], // Optional custom colors
    legend: { position: 'top' },
  };
  
  
  inventoryHealth: { 'Available Books': number; 'Borrowed Books': number } = {
    'Available Books': 0,
    'Borrowed Books': 0,
  };
  borrowReports: BorrowReport[] = [];
  reportCounts: any = {
    HoiVien: 0,
    Sach: 0,
    SachNonNewCondition: 0,
  };
  conditionData: any = {
    new: 0,
    broken: 0,
    lost: 0,
    total: 0
  };
  selectedOption: string = 'month'; // Default option
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth() + 1; // Months are 0-based in JavaScript
  currentDay: number = new Date().getDate();
  year: number | null = null;
  month: number | null = null;
  day: number | null = null;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = []; // The labels for your x-axis (weeks or months)
  public barChartData: ChartData = { datasets: [] }; 
  constructor(private reportService:ReportsService,@Inject(PLATFORM_ID) private platformId: Object,private cdr: ChangeDetectorRef) { }
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.fetchConditionReport();
      this.fetchTop5BookMostBorrow();
      this.fetchReportCounts();
      Chart.register(...registerables);
      this.month = this.currentMonth;
      this.year = this.currentYear;
      this.loadChartData();
      this.fetchMonthlyReport();
      this.loadBorrowingTrends();
      this.getInventoryHealthReport();


    

    } else {
      console.log('Not running in the browser, skipping API call');
    }  // Lấy danh sách phiếu phạt khi component khởi tạo
  }
  getInventoryHealthReport():void {
    this.reportService.getInventoryHealthReport().subscribe((data) => {
      this.inventoryHealth = data;
      console.log(data)
      this.renderChart();  // { "Available Books": 500, "Borrowed Books": 200 }
    });
  }
  renderChart(): void {
  const ctx = document.getElementById('inventoryChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'doughnut', // Dynamic type: 'pie' or 'doughnut'
    data: {
      labels: ['Available Books', 'Borrowed Books'],
      datasets: [
        {
          data: [
            this.inventoryHealth['Available Books'],
            this.inventoryHealth['Borrowed Books'],
          ],
          backgroundColor: ['#519962', '#41c7c7'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  });
}

  loadBorrowingTrends(): void {
    this.reportService.getBorrowingTrendsByGenre().subscribe(data => {
      console.log(data);
      const labels = data.map((item: any) => item.genre);
      const counts = data.map((item: any) => item.borrowCount);
      this.createPolarAreaChart(labels, counts);
    });
  }
  
  createPolarAreaChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('myChartGenres') as HTMLCanvasElement;
  
    new Chart(ctx, {
      type: 'pie', // Changed to polarArea
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#66BB6A',
              '#42A5F5'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
  
  
  fetchReportCounts(): void {
    this.reportService.getReportCounts().subscribe({
      next: (data) => {
        this.reportCounts = data;
        console.log('Updated report counts:', this.reportCounts);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        console.error('Error fetching report counts:', err);
      },
    });
  }
  topBooks:MostBorrowedBook[] = [];
  fetchTop5BookMostBorrow():void{
    this.reportService.getTop5MostBorrowedBooks().subscribe((data) => {
      this.topBooks = data;
      this.updateChart(data);
      console.log('Top 5 most borrowed books:', this.topBooks);
    });
  }
  updateChart(data: MostBorrowedBook[]): void {
    const labels = data.map((item) => item.bookName);  // Get book names
    const counts = data.map((item) => item.borrowCount);  // Get borrow counts

    // Create a new chart with updated data
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'polarArea',  // Set chart type to 'pie'
      data: {
        labels: labels,  // Use book names as labels
        datasets: [
          {
            data: counts,  // Use borrow counts as data
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#FF8033'],  // Colors for each slice
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.label}: ${tooltipItem.raw} borrows`;  // Display count in tooltip
              }
            }
          }
        }
      }
    });
  }
  fetchConditionReport(): void {
    this.reportService.getConditionReport().subscribe({
      next: (data) => {
        this.conditionData = data;
        console.log(data)
        this.calculatePercentages();
      },
      error: (err) => {
        console.error('Failed to fetch condition report:', err);
      }
    });
  }
  calculatePercentages(): void {
    this.conditionData.total = this.conditionData.new + this.conditionData.broken + this.conditionData.lost;
    this.conditionData.newPercentage = (this.conditionData.new / this.conditionData.total) * 100;
    this.conditionData.brokenPercentage = (this.conditionData.broken / this.conditionData.total) * 100;
    this.conditionData.lostPercentage = (this.conditionData.lost / this.conditionData.total) * 100;
  }

  
  onOptionChange(): void {
    // Update the parameters based on selected option
    switch (this.selectedOption) {
      case 'week':
        // For Week, get both the current month and year
        this.month = this.currentMonth;
        this.year = this.currentYear;
        this.fetchWeeklyReport();
        break;
      case 'month':
        // For Month, set only the current month and year
        this.month = this.currentMonth;
        this.year = this.currentYear;
        this.fetchMonthlyReport();
        break;
      case 'year':
        // For Year, set only the current year
        this.year = this.currentYear;
        this.fetchYearlyReport();
        break;
      default:
        break;
    }

    console.log(`Selected: ${this.selectedOption}, Day: ${this.day}, Month: ${this.month}, Year: ${this.year}`);
  }
  fetchYearlyReport(): void {
    if (this.year) {
      this.reportService.getYearlyReport(this.year).subscribe((data) => {
        console.log(data)
        this.updateChart123(data);
      });
    }
  }

  fetchMonthlyReport(): void {
    if (this.year && this.month) {
      this.reportService.getMonthlyReport(this.year).subscribe((data) => {
        console.log(data)
        this.updateChart123(data);
      });
    }
  }

  fetchWeeklyReport(): void {
    if (this.year && this.month) {
      this.reportService.getWeeklyReport(this.year, this.month).subscribe((data) => {
        console.log(data)
        this.updateChart123(data);
      });
    }
  }

  updateChart123(data: any): void {
    // Handle Weekly Data
    if (this.selectedOption === 'week') {
      // Extract the weeks and counts from the data
      this.barChartLabels = data.map((item: any) => `Week ${item[0]}`); // Week numbers (e.g., Week 1, Week 2)
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: data.map((item: any) => item[1]), // maPMCount (borrowed book count)
            label: 'Books Borrowed',
            backgroundColor: '#42A5F5', // Color for the bars
            borderColor: '#1E88E5',
            borderWidth: 1,
          },
        ],
      };
    } 
    // Handle Monthly Data
    else if (this.selectedOption === 'month') {
      // Example for monthly data (similar logic for weekly and yearly reports)
      this.barChartLabels = data.map((item: any) => `Month ${item[0]}`);
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: data.map((item: any) => item[1]), // maPMCount (borrowed book count)
            label: 'Books Borrowed',
            backgroundColor: '#66BB6A',
            borderColor: '#388E3C',
            borderWidth: 1,
          },
        ],
      };
    } 
    // Handle Yearly Data
    else if (this.selectedOption === 'year') {
      // Assuming the data format is similar (array of [year, count] pairs)
      this.barChartLabels = data.map((item: any) => `Year ${item[0]}`); // Years (e.g., 2023, 2024)
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: data.map((item: any) => item[1]), // maPMCount (borrowed book count)
            label: 'Books Borrowed',
            backgroundColor: '#FF7043', // Color for the bars
            borderColor: '#FF5722',
            borderWidth: 1,
          },
        ],
      };
    }
  }
  
 
  loadChartData(): void {
    this.reportService.getHighDemandBooks()
      .subscribe(data => {
        // Extracting the data to map it into chart format
        const tenSach = data.map(item => item.bookName); // Book names
        const soLuotMuon = data.map(item => item.borrowCount); // Borrow counts
        const sachConTrongKho = data.map(item => item.availableCopies); // Unavailable copies
        const sachLoi = data.map(item => item.damagedCopies); // Damaged copies
  
        // Setting up the chart options
        this.chartOptions = {
          series: [
            {
              name: 'Số lượt mượn sách ',
              data: soLuotMuon
            },
            {
              name: 'Sách  mượn  được trong kho ',
              data: sachConTrongKho
            },
          ],
          chart: {
            type: 'bar', // Bar chart
            height: 350 // Chart height
          },
          xaxis: {
            categories: tenSach // X-axis categories (Book names)
          },
          title: {
            text: 'High-Demand Books Report' // Chart title
          },
          plotOptions: {
            bar: {
              horizontal: false, // Set to true if you want horizontal bars
              columnWidth: '55%', // Column width, you can adjust it based on preference
              borderRadius: 5 // Optional, for rounded corners in bars
            }
          },
          colors: ['#FF5733', '#33FF57', '#3357FF'], // Custom colors for each series
          legend: {
            position: 'top', // Position of the legend
            horizontalAlign: 'center', // Center-align legend horizontally
          },
          dataLabels: {
            enabled: true // Show data labels on bars
          }
        };
      });
  }
  
  
  
  
  
}
