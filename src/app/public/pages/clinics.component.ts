import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Clinic {
  name: string;
  address: string;
  phone: string;
}

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="container">
      <h2>Our Locations</h2>
      <div class="clinics-grid">
        <article *ngFor="let clinic of clinics" class="clinic-card">
          <h3>{{ clinic.name }}</h3>
          <p>{{ clinic.address }}</p>
          <p>{{ clinic.phone }}</p>
        </article>
      </div>
    </section>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    h2 {
      text-align: center;
      margin-bottom: 40px;
      color: #333;
    }
    
    .clinics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .clinic-card {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    
    .clinic-card h3 {
      color: #007bff;
      margin-bottom: 15px;
    }
    
    .clinic-card p {
      margin: 8px 0;
      color: #666;
    }
  `]
})
export class ClinicsComponent {
  clinics: Clinic[] = [
    {
      name: "Downtown Office",
      address: "123 Main Street, Downtown",
      phone: "(555) 123-4567"
    },
    {
      name: "Westside Branch",
      address: "456 Oak Avenue, Westside",
      phone: "(555) 234-5678"
    },
    {
      name: "Eastside Location",
      address: "789 Pine Street, Eastside",
      phone: "(555) 345-6789"
    }
  ];
}



