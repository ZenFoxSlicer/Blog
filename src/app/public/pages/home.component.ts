import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="container">
      <h1>Welcome to Our Platform</h1>
      <p>Your comprehensive solution for modern business management.</p>
      <div class="cta-buttons">
        <a routerLink="/blog" class="btn btn-primary">Read Our Blog</a>
      </div>
    </section>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
    }
    
    h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      color: #333;
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 30px;
      color: #666;
    }
    
    .cta-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn {
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background: #007bff;
      color: white;
    }
    
    .btn-primary:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }
    
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    
    .btn-secondary:hover {
      background: #545b62;
      transform: translateY(-2px);
    }
  `]
})
export class HomeComponent {}



