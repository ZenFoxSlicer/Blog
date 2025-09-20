import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  publishDate: Date;
  tags: string[];
  excerpt: string;
  readTime: number;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="blog-container">
      <!-- Header with Search -->
      <header class="blog-header">
        <div class="search-container">
          <div class="search-input-wrapper">
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              (input)="onSearch()"
              (focus)="onSearchFocus()"
              (blur)="onSearchBlur()"
              (keydown)="onSearchKeydown($event)"
              placeholder="Search articles by title, content, or tags..."
              class="search-input"
            >
            <div class="search-suggestions" *ngIf="showSuggestions && searchSuggestions.length > 0">
              <div 
                class="suggestion-item" 
                *ngFor="let suggestion of searchSuggestions; let i = index"
                [class.selected]="i === selectedSuggestionIndex"
                (click)="selectSuggestion(suggestion)"
                (mouseenter)="selectedSuggestionIndex = i"
              >
                <div class="suggestion-title">{{ suggestion.title }}</div>
                <div class="suggestion-meta">{{ suggestion.author }} • {{ suggestion.publishDate | date:'MMM d, y' }}</div>
                <div class="suggestion-excerpt">{{ suggestion.excerpt }}</div>
              </div>
            </div>
          </div>
          <button (click)="clearSearch()" class="clear-btn">Clear</button>
        </div>
        <div class="search-results-info" *ngIf="filteredArticles.length !== articles.length">
          Showing {{ filteredArticles.length }} of {{ articles.length }} articles
        </div>
      </header>

      <div class="blog-layout">
        <!-- Left Sidebar with Google Ad Spaces -->
        <aside class="left-sidebar">
          <!-- Article List -->
          <div class="article-list">
            <h3>{{ selectedArticle ? 'Related Articles' : 'All Articles' }}</h3>
            <div class="article-item" 
                 *ngFor="let article of getDisplayArticles()" 
                 (click)="selectArticle(article)"
                 [class.active]="selectedArticle?.id === article.id">
              <h4>{{ article.title }}</h4>
              <p class="article-meta">{{ article.author }} • {{ article.publishDate | date:'MMM d, y' }}</p>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <div class="match-percentage" *ngIf="selectedArticle && selectedArticle.id !== article.id">
                {{ getMatchPercentage(selectedArticle, article) }}% match
              </div>
            </div>
          </div>

          <!-- Google Ad Spaces -->
          <div class="ad-container">
            <div class="ad-debug" style="background: #f8f9fa; border: 1px solid #dee2e6; padding: 10px; margin: 10px 0; border-radius: 4px;">
              <h5 style="margin: 0 0 5px 0; color: #495057;">AdSense Debug Info</h5>
              <p style="margin: 0; font-size: 12px; color: #6c757d;">
                Client: ca-pub-7697634874358535<br>
                Slot: 1234567890 (placeholder)<br>
                Status: <span id="ad-status-1">Loading...</span>
              </p>
            </div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7697634874358535"
                 data-ad-slot="1234567890"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
          
          <div class="ad-container">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7697634874358535"
                 data-ad-slot="1234567891"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>

          <div class="ad-container">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7697634874358535"
                 data-ad-slot="1234567892"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="main-content">
          <div class="ad-banner" *ngIf="selectedArticle">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7697634874358535"
                 data-ad-slot="1234567893"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>

          <article class="article-content" *ngIf="selectedArticle">
            <header class="article-header">
              <h1>{{ selectedArticle.title }}</h1>
              <div class="article-meta">
                <span class="author">By {{ selectedArticle.author }}</span>
                <span class="date">{{ selectedArticle.publishDate | date:'MMMM d, y' }}</span>
                <span class="read-time">{{ selectedArticle.readTime }} min read</span>
              </div>
              <div class="tags">
                <span class="tag" *ngFor="let tag of selectedArticle.tags">{{ tag }}</span>
              </div>
            </header>

            <div class="article-body">
              <div [innerHTML]="selectedArticle.content"></div>
            </div>

            <!-- In-Content Ad -->
            <div class="in-content-ad">
              <ins class="adsbygoogle"
                   style="display:block"
                   data-ad-client="ca-pub-7697634874358535"
                   data-ad-slot="1234567894"
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
            </div>

            <div class="article-footer">
              <div class="navigation">
                <button (click)="previousArticle()" [disabled]="!hasPrevious()" class="nav-btn">
                  ← Previous
                </button>
                <button (click)="nextArticle()" [disabled]="!hasNext()" class="nav-btn">
                  Next →
                </button>
              </div>
            </div>
          </article>

          <div class="no-article" *ngIf="!selectedArticle">
            <h2>Welcome to Our Blog</h2>
            <p>Select an article from the sidebar to start reading, or use the search bar to find specific content.</p>
          </div>
        </main>

        <!-- Right Sidebar with More Ads -->
        <aside class="right-sidebar">
          <!-- Google Ad Spaces -->
          <div class="ad-container">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7697634874358535"
                 data-ad-slot="1234567895"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>

          <div class="ad-container">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7697634874358535"
                 data-ad-slot="1234567896"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>

          <div class="ad-container">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7697634874358535"
                 data-ad-slot="1234567897"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>

          <div class="ad-container">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7697634874358535"
                 data-ad-slot="1234567898"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>

          <div class="ad-container">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7697634874358535"
                 data-ad-slot="1234567899"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>

          <!-- Popular Articles -->
          <div class="popular-articles">
            <h3>Popular Articles</h3>
            <div class="popular-item" *ngFor="let article of getPopularArticles()">
              <h4 (click)="selectArticle(article)">{{ article.title }}</h4>
              <p>{{ article.excerpt }}</p>
            </div>
          </div>
        </aside>
      </div>

      <!-- Footer Ad -->
      <footer class="blog-footer">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-7697634874358535"
             data-ad-slot="1234567800"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </footer>
    </div>
  `,
  styles: [`
    .blog-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .blog-header {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-container {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    .search-input-wrapper {
      flex: 1;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e9ecef;
      border-radius: 6px;
      font-size: 16px;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    .search-input:focus {
      outline: none;
      border-color: #007bff;
    }

    .search-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #e9ecef;
      border-top: none;
      border-radius: 0 0 6px 6px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-height: 300px;
      overflow-y: auto;
      z-index: 1000;
    }

    .suggestion-item {
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid #f8f9fa;
      transition: background-color 0.2s ease;
    }

    .suggestion-item:hover,
    .suggestion-item.selected {
      background-color: #f8f9fa;
    }

    .suggestion-item:last-child {
      border-bottom: none;
    }

    .suggestion-title {
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 1.3;
    }

    .suggestion-meta {
      font-size: 12px;
      color: #6c757d;
      margin-bottom: 4px;
    }

    .suggestion-excerpt {
      font-size: 12px;
      color: #666;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .clear-btn {
      padding: 12px 20px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .clear-btn:hover {
      background: #5a6268;
    }

    .search-results-info {
      color: #6c757d;
      font-size: 14px;
    }

    .blog-layout {
      display: grid;
      grid-template-columns: 320px 1fr 320px;
      gap: 30px;
      min-height: 600px;
    }

    .left-sidebar, .right-sidebar {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .left-sidebar {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .right-sidebar {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .main-content {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .ad-container {
      text-align: center;
      flex-shrink: 0;
    }

    .ad-placeholder {
      background: #e9ecef;
      border: 2px dashed #6c757d;
      padding: 20px;
      border-radius: 6px;
      color: #6c757d;
      min-height: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .ad-placeholder h4 {
      margin: 0 0 10px 0;
      font-size: 14px;
    }

    .ad-placeholder p {
      margin: 0;
      font-size: 12px;
    }

    /* AdSense ad styling */
    .adsbygoogle {
      display: block;
      text-align: center;
      margin: 10px 0;
    }

    .ad-container .adsbygoogle {
      min-height: 250px;
    }

    .ad-banner .adsbygoogle {
      min-height: 90px;
    }

    .in-content-ad .adsbygoogle {
      min-height: 250px;
    }

    .blog-footer .adsbygoogle {
      min-height: 90px;
    }

    .right-sidebar .ad-container:nth-child(2) .ad-placeholder {
      min-height: 600px;
    }

    .ad-banner {
      padding: 20px;
      text-align: center;
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
    }

    .article-list h3, .popular-articles h3 {
      margin-top: 0;
      color: #333;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
    }

    .article-list {
      flex-shrink: 0;
    }

    .popular-articles {
      flex-shrink: 0;
    }

    .article-item, .popular-item {
      padding: 15px;
      margin-bottom: 10px;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid #e9ecef;
    }

    .article-item:hover, .popular-item:hover {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }

    .article-item.active {
      background: #007bff;
      color: white;
    }

    .article-item h4, .popular-item h4 {
      margin: 0 0 8px 0;
      font-size: 16px;
      line-height: 1.4;
    }

    .article-meta {
      font-size: 12px;
      color: #6c757d;
      margin: 5px 0;
    }

    .article-item.active .article-meta {
      color: #e9ecef;
    }

    .article-excerpt {
      font-size: 14px;
      color: #666;
      margin: 8px 0 0 0;
      line-height: 1.4;
    }

    .article-item.active .article-excerpt {
      color: #e9ecef;
    }

    .match-percentage {
      background: #e3f2fd;
      color: #1976d2;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 12px;
      margin-top: 8px;
      display: inline-block;
      border: 1px solid #bbdefb;
    }

    .article-content {
      padding: 30px;
    }

    .article-header h1 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 2.5rem;
      line-height: 1.2;
    }

    .article-header .article-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #6c757d;
    }

    .tags {
      margin-bottom: 30px;
    }

    .tag {
      display: inline-block;
      background: #e9ecef;
      color: #495057;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      margin-right: 8px;
      margin-bottom: 8px;
    }

    .article-body {
      font-size: 16px;
      line-height: 1.8;
      color: #333;
    }

    .article-body h2 {
      color: #333;
      margin-top: 30px;
      margin-bottom: 15px;
    }

    .article-body h3 {
      color: #555;
      margin-top: 25px;
      margin-bottom: 12px;
    }

    .article-body p {
      margin-bottom: 20px;
    }

    .in-content-ad {
      margin: 40px 0;
      text-align: center;
    }

    .article-footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
    }

    .navigation {
      display: flex;
      justify-content: space-between;
    }

    .nav-btn {
      padding: 12px 24px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .nav-btn:hover:not(:disabled) {
      background: #0056b3;
    }

    .nav-btn:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }

    .no-article {
      padding: 60px 30px;
      text-align: center;
      color: #6c757d;
    }

    .no-article h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .blog-footer {
      margin-top: 40px;
      text-align: center;
    }

    .popular-item h4 {
      cursor: pointer;
      color: #007bff;
    }

    .popular-item h4:hover {
      text-decoration: underline;
    }

    @media (max-width: 1400px) {
      .blog-layout {
        grid-template-columns: 280px 1fr 280px;
        gap: 25px;
      }
    }

    @media (max-width: 1200px) {
      .blog-layout {
        grid-template-columns: 250px 1fr 250px;
        gap: 20px;
      }
    }

    @media (max-width: 992px) {
      .blog-layout {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .left-sidebar, .right-sidebar {
        order: 2;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }
      
      .main-content {
        order: 1;
      }
    }

    @media (max-width: 768px) {
      .blog-container {
        padding: 10px;
      }
      
      .search-container {
        flex-direction: column;
      }
      
      .search-suggestions {
        max-height: 250px;
      }
      
      .suggestion-item {
        padding: 10px 12px;
      }
      
      .suggestion-title {
        font-size: 13px;
      }
      
      .suggestion-meta {
        font-size: 11px;
      }
      
      .suggestion-excerpt {
        font-size: 11px;
      }
      
      .article-header h1 {
        font-size: 2rem;
      }
      
      .article-header .article-meta {
        flex-direction: column;
        gap: 5px;
      }
    }

  `]
})
export class BlogComponent implements OnInit, AfterViewInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  selectedArticle: Article | null = null;
  searchQuery: string = '';
  searchSuggestions: Article[] = [];
  showSuggestions: boolean = false;
  selectedSuggestionIndex: number = -1;

  ngOnInit() {
    this.initializeArticles();
    this.filteredArticles = [...this.articles];
    if (this.articles.length > 0) {
      this.selectedArticle = this.articles[0];
    }
    
    // Initialize AdSense ads after view is initialized
    setTimeout(() => {
      this.initializeAdSense();
    }, 100);
  }

  ngAfterViewInit() {
    // Initialize AdSense ads when view is ready
    this.initializeAdSense();
  }

  initializeAdSense() {
    try {
      console.log('Blog component: Initializing AdSense...');
      // Use the global initialization function
      if (typeof (window as any).initializeAdSense === 'function') {
        (window as any).initializeAdSense();
      } else {
        console.log('Global AdSense function not available yet');
        // Fallback: try direct initialization
        if (typeof (window as any).adsbygoogle !== 'undefined') {
          console.log('Using fallback AdSense initialization');
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      }
    } catch (e) {
      console.log('AdSense initialization error:', e);
    }
  }

  initializeArticles() {
    this.articles = [
      {
        id: 1,
        title: "The Future of Artificial Intelligence: Trends and Predictions for 2024",
        content: `
          <p>Artificial intelligence continues to reshape our world at an unprecedented pace. In this comprehensive guide, we explore the latest trends and predictions that will define AI in 2024 and beyond.</p>
          
          <h2>Understanding AI's Current Landscape</h2>
          <p>AI technology has evolved from simple rule-based systems to sophisticated machine learning models that can understand, learn, and make decisions. Today's AI systems are more capable than ever, with applications spanning every industry.</p>
          
          <h3>Key AI Applications</h3>
          <ul>
            <li><strong>Natural Language Processing:</strong> Advanced chatbots and language translation</li>
            <li><strong>Computer Vision:</strong> Image recognition and autonomous vehicles</li>
            <li><strong>Predictive Analytics:</strong> Forecasting and decision support systems</li>
            <li><strong>Robotic Process Automation:</strong> Streamlining business operations</li>
          </ul>
          
          <h2>Emerging AI Trends</h2>
          <p>The integration of AI technology offers numerous advantages across industries, including improved efficiency, reduced costs, and enhanced decision-making capabilities. Organizations that adopt these technologies early often see significant competitive advantages.</p>
          
          <h3>Challenges and Considerations</h3>
          <p>While the benefits are substantial, implementing AI comes with challenges such as data privacy concerns, ethical considerations, and the need for skilled professionals. It's essential for organizations to carefully evaluate their needs and choose appropriate solutions.</p>
          
          <p>As we look toward the future, it's clear that AI will continue to play an increasingly important role in our daily lives, helping us solve complex problems and create new opportunities for innovation.</p>
        `,
        author: "Sarah Johnson",
        publishDate: new Date('2024-01-15'),
        tags: ['AI', 'Technology', 'Innovation', 'Future'],
        excerpt: "Explore how artificial intelligence is transforming industries and discover the latest trends that will shape our technological future.",
        readTime: 8
      },
      {
        id: 7,
        title: "A Beginner's Guide to Effective Study Habits",
        content: `<h2>Introduction</h2><p>Good study habits are essential for academic success, but many students never learn effective strategies. This beginner's guide will help you improve focus, retention, and results.</p><h3>1. Create a Study Schedule</h3><p>Consistency beats cramming.<br><strong>Tip:</strong> Use a planner to block time for study sessions.</p><h3>2. Use Active Recall</h3><p>Simply re-reading notes doesn't work.<br><strong>Tip:</strong> Quiz yourself to strengthen memory.</p><h3>3. Break Study Sessions</h3><p>Short sessions with breaks prevent fatigue.<br><strong>Tip:</strong> Try the Pomodoro method (25 mins study, 5 mins rest).</p><h3>4. Eliminate Distractions</h3><p>Phones and social media kill focus.<br><strong>Tip:</strong> Study in a quiet space or use apps that block distractions.</p><h2>Conclusion</h2><p>By developing these habits early, you'll build a solid foundation for lifelong learning and better grades.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Education', 'Study Habits', 'Beginner\'s Guide'],
        excerpt: "Start your academic journey with proven beginner-friendly study habits.",
        readTime: 5
      },
      {
        id: 8,
        title: "Beginner's Guide to Building a Professional Resume",
        content: `<h2>Introduction</h2><p>Your resume is your first impression to employers. As a beginner, knowing what to include (and what to skip) is crucial.</p><h3>1. Focus on Relevant Skills</h3><p>Even without experience, skills can shine.<br><strong>Tip:</strong> Highlight transferable skills like communication or teamwork.</p><h3>2. Keep Formatting Clean</h3><p>A cluttered resume won't get read.<br><strong>Tip:</strong> Use bullet points, consistent fonts, and white space.</p><h3>3. Tailor to Each Job</h3><p>A generic resume blends in.<br><strong>Tip:</strong> Match skills and keywords to the job description.</p><h2>Conclusion</h2><p>A strong beginner resume isn't about experience — it's about showing potential. Keep it clear, relevant, and tailored.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Education & Career', 'Resume Writing', 'Beginner\'s Guide'],
        excerpt: "Craft a job-winning resume even as a beginner with these simple steps.",
        readTime: 4
      },
      {
        id: 9,
        title: "Beginner's Guide to Learning a New Language",
        content: `<h2>Introduction</h2><p>Learning a new language can open doors personally and professionally. This guide makes the process less overwhelming for beginners.</p><h3>1. Start with Common Phrases</h3><p>Focus on everyday words and greetings first.</p><h3>2. Use Language Apps</h3><p>Apps like Duolingo or Memrise keep learning fun and consistent.</p><h3>3. Practice Daily</h3><p>Consistency beats long, irregular sessions.<br><strong>Tip:</strong> 15 minutes daily is better than 2 hours weekly.</p><h3>4. Speak Out Loud</h3><p>Don't just read — practice pronunciation by speaking aloud.</p><h2>Conclusion</h2><p>Language learning is about small steps daily. Start simple, stay consistent, and watch your skills grow.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Education', 'Languages', 'Beginner\'s Guide'],
        excerpt: "Start your language journey with easy, practical beginner strategies.",
        readTime: 5
      },
      {
        id: 10,
        title: "Essential Packing Checklist for Solo Travelers",
        content: `<h2>Introduction</h2><p>Traveling solo requires smart packing. Forgetting essentials can create unnecessary stress. Here's a checklist to ensure you're prepared.</p><ul><li>Passport and IDs</li><li>Portable charger</li><li>First-aid kit</li><li>Lightweight clothing</li><li>Travel locks</li></ul><h2>Conclusion</h2><p>With this checklist, you'll have peace of mind and freedom to enjoy your solo adventure.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Travel', 'Solo Travel', 'Checklists'],
        excerpt: "Never forget essentials on your solo trips with this packing checklist.",
        readTime: 4
      },
      {
        id: 2,
        title: "Essential Productivity Tips for Remote Work Success",
        content: `
          <p>Remote work has become the new normal for millions of professionals worldwide. This comprehensive guide covers essential strategies to maintain high productivity and work-life balance while working from home.</p>
          
          <h2>Creating Your Ideal Workspace</h2>
          <p>A well-designed workspace is crucial for maintaining focus and productivity. Here's how to set up your home office for success:</p>
          
          <h3>Workspace Essentials</h3>
          <ul>
            <li>Choose a dedicated space away from distractions</li>
            <li>Invest in ergonomic furniture and equipment</li>
            <li>Ensure proper lighting and ventilation</li>
            <li>Keep your workspace organized and clutter-free</li>
            <li>Add personal touches that inspire you</li>
          </ul>
          
          <h3>Technology Setup</h3>
          <p>Reliable technology is the backbone of remote work. Ensure you have a stable internet connection, quality audio/video equipment, and the necessary software tools for your role.</p>
          
          <h2>Time Management Strategies</h2>
          <p>Effective time management is essential for remote work success. Create a structured schedule, use time-blocking techniques, and set clear boundaries between work and personal time.</p>
          
          <h3>Productivity Techniques</h3>
          <ul>
            <li>Use the Pomodoro Technique for focused work sessions</li>
            <li>Prioritize tasks using the Eisenhower Matrix</li>
            <li>Minimize distractions with website blockers</li>
            <li>Take regular breaks to maintain energy</li>
          </ul>
          
          <h2>Communication and Collaboration</h2>
          <p>Maintaining strong communication with your team is crucial for remote work success. Use video calls for important discussions, leverage collaboration tools, and establish regular check-ins with your manager.</p>
          
          <p>Remember, remote work success comes from finding the right balance between structure and flexibility. Experiment with different approaches to find what works best for you.</p>
        `,
        author: "Michael Chen",
        publishDate: new Date('2024-01-10'),
        tags: ['Productivity', 'Remote Work', 'Work-Life Balance', 'Tips'],
        excerpt: "Learn essential strategies for maintaining high productivity and work-life balance while working remotely from home.",
        readTime: 6
      },
      {
        id: 3,
        title: "Understanding Cryptocurrency: A Beginner's Guide to Digital Assets",
        content: `
          <p>Cryptocurrency has emerged as one of the most talked-about financial innovations of our time. This comprehensive guide explains everything beginners need to know about digital currencies and blockchain technology.</p>
          
          <h2>What is Cryptocurrency?</h2>
          <p>Cryptocurrency is a digital or virtual form of currency that uses cryptography for security. Unlike traditional currencies, cryptocurrencies operate on decentralized networks based on blockchain technology, making them independent of central banks.</p>
          
          <h3>How Cryptocurrency Works</h3>
          <ul>
            <li>Blockchain technology ensures secure transactions</li>
            <li>Decentralized networks eliminate the need for intermediaries</li>
            <li>Cryptographic security protects against fraud</li>
            <li>Public ledgers provide transparency</li>
            <li>Mining or staking validates transactions</li>
          </ul>
          
          <h2>Popular Cryptocurrencies</h2>
          <p>While there are thousands of cryptocurrencies, a few have gained significant mainstream adoption. Here are the most well-known digital currencies:</p>
          
          <h3>Major Cryptocurrencies</h3>
          <ul>
            <li><strong>Bitcoin (BTC):</strong> The first and most valuable cryptocurrency</li>
            <li><strong>Ethereum (ETH):</strong> A platform for smart contracts and decentralized apps</li>
            <li><strong>Binance Coin (BNB):</strong> The native token of the Binance exchange</li>
            <li><strong>Cardano (ADA):</strong> A research-driven blockchain platform</li>
            <li><strong>Solana (SOL):</strong> A high-performance blockchain for decentralized apps</li>
          </ul>
          
          <h2>Getting Started with Cryptocurrency</h2>
          <p>If you're interested in investing in cryptocurrency, start by educating yourself about the risks and opportunities. Only invest what you can afford to lose, and consider consulting with a financial advisor.</p>
          
          <h3>Investment Considerations</h3>
          <ul>
            <li>Understand the technology behind each cryptocurrency</li>
            <li>Research the team and project goals</li>
            <li>Consider market volatility and risk tolerance</li>
            <li>Diversify your investment portfolio</li>
            <li>Use reputable exchanges and wallets</li>
          </ul>
          
          <p>Cryptocurrency represents a fascinating intersection of technology and finance. While it offers exciting opportunities, it's important to approach it with caution and thorough research.</p>
        `,
        author: "Emily Rodriguez",
        publishDate: new Date('2024-01-05'),
        tags: ['Cryptocurrency', 'Blockchain', 'Investment', 'Technology'],
        excerpt: "Learn the fundamentals of cryptocurrency and blockchain technology with this comprehensive beginner's guide to digital assets.",
        readTime: 7
      },
      {
        id: 4,
        title: "The Science of Sleep: How to Optimize Your Rest for Better Health",
        content: `
          <p>Sleep is one of the most important factors for overall health and well-being, yet many people struggle to get quality rest. This article explores the science behind sleep and provides practical strategies for improving your sleep quality.</p>
          
          <h2>Understanding Sleep Cycles</h2>
          <p>Sleep consists of several stages that cycle throughout the night, each playing a crucial role in physical and mental restoration. Understanding these cycles can help you optimize your sleep schedule.</p>
          
          <h3>Stages of Sleep</h3>
          <ul>
            <li><strong>Light Sleep (N1 & N2):</strong> Transition periods between wakefulness and deep sleep</li>
            <li><strong>Deep Sleep (N3):</strong> Physical restoration and immune system strengthening</li>
            <li><strong>REM Sleep:</strong> Mental processing, memory consolidation, and dreaming</li>
            <li><strong>Sleep Cycles:</strong> Complete cycles lasting 90-110 minutes</li>
          </ul>
          
          <h2>Benefits of Quality Sleep</h2>
          <p>Getting adequate, high-quality sleep offers numerous health benefits that extend far beyond simply feeling rested. Sleep affects virtually every system in your body.</p>
          
          <h3>Health Benefits</h3>
          <ul>
            <li><strong>Immune Function:</strong> Strengthens your body's defense system</li>
            <li><strong>Memory Consolidation:</strong> Helps process and store information</li>
            <li><strong>Physical Recovery:</strong> Repairs tissues and builds muscle</li>
            <li><strong>Mental Health:</strong> Regulates mood and reduces stress</li>
            <li><strong>Weight Management:</strong> Balances hunger hormones</li>
          </ul>
          
          <h2>Common Sleep Problems</h2>
          <p>Many factors can interfere with quality sleep, from lifestyle choices to medical conditions. Identifying and addressing these issues is key to improving your sleep.</p>
          
          <h3>Strategies for Better Sleep</h3>
          <ul>
            <li><strong>Consistent Schedule:</strong> Go to bed and wake up at the same time daily</li>
            <li><strong>Sleep Environment:</strong> Keep your bedroom cool, dark, and quiet</li>
            <li><strong>Pre-Sleep Routine:</strong> Develop relaxing activities before bed</li>
            <li><strong>Limit Screen Time:</strong> Avoid blue light from devices before sleep</li>
            <li><strong>Exercise Regularly:</strong> Physical activity promotes better sleep quality</li>
          </ul>
          
          <h2>When to Seek Help</h2>
          <p>If you consistently struggle with sleep despite implementing good sleep hygiene practices, consider consulting with a healthcare provider. Sleep disorders like insomnia, sleep apnea, or restless leg syndrome may require professional treatment.</p>
          
          <p>Remember, quality sleep is not a luxury—it's a necessity for optimal health and performance. Prioritize your sleep, and you'll likely see improvements in all areas of your life.</p>
        `,
        author: "James Wilson",
        publishDate: new Date('2024-01-01'),
        tags: ['Sleep', 'Health', 'Wellness', 'Lifestyle'],
        excerpt: "Discover the science behind sleep and learn practical strategies for optimizing your rest to improve overall health and well-being.",
        readTime: 9
      },
      {
        id: 5,
        title: "Sustainable Living: Simple Steps to Reduce Your Environmental Impact",
        content: `
          <p>Sustainable living has become more important than ever as we face growing environmental challenges. This guide provides practical, actionable steps you can take to reduce your environmental impact and live more sustainably.</p>
          
          <h2>Understanding Sustainability</h2>
          <p>Sustainable living means making choices that meet our current needs without compromising the ability of future generations to meet their own needs. It's about finding balance between environmental, social, and economic factors.</p>
          
          <h3>Key Principles of Sustainable Living</h3>
          <ul>
            <li><strong>Reduce:</strong> Minimize consumption and waste generation</li>
            <li><strong>Reuse:</strong> Find new purposes for items instead of discarding them</li>
            <li><strong>Recycle:</strong> Properly process materials for new use</li>
            <li><strong>Renew:</strong> Choose renewable resources when possible</li>
            <li><strong>Restore:</strong> Support efforts to restore damaged ecosystems</li>
          </ul>
          
          <h2>Energy Conservation</h2>
          <p>Reducing energy consumption is one of the most effective ways to lower your environmental impact. Small changes in your daily habits can lead to significant energy savings.</p>
          
          <h3>Energy-Saving Tips</h3>
          <ul>
            <li>Switch to LED light bulbs throughout your home</li>
            <li>Use programmable thermostats to optimize heating and cooling</li>
            <li>Unplug electronics when not in use</li>
            <li>Choose energy-efficient appliances</li>
            <li>Consider renewable energy sources like solar panels</li>
          </ul>
          
          <h2>Waste Reduction</h2>
          <p>Minimizing waste is crucial for sustainable living. Focus on reducing single-use items and finding creative ways to repurpose materials.</p>
          
          <h3>Waste Reduction Strategies</h3>
          <ul>
            <li>Use reusable shopping bags and water bottles</li>
            <li>Compost food scraps and yard waste</li>
            <li>Choose products with minimal packaging</li>
            <li>Repair items instead of replacing them</li>
            <li>Donate or sell items you no longer need</li>
          </ul>
          
          <h2>Sustainable Transportation</h2>
          <p>Transportation is a major source of greenhouse gas emissions. Consider alternative transportation methods to reduce your carbon footprint.</p>
          
          <h3>Eco-Friendly Transportation Options</h3>
          <ul>
            <li>Walk or bike for short trips</li>
            <li>Use public transportation when available</li>
            <li>Carpool with colleagues or friends</li>
            <li>Consider electric or hybrid vehicles</li>
            <li>Combine errands to reduce trips</li>
          </ul>
          
          <h2>Making Sustainable Choices</h2>
          <p>Every sustainable choice you make, no matter how small, contributes to a healthier planet. Start with one area of your life and gradually expand your sustainable practices.</p>
          
          <p>Remember, sustainable living is a journey, not a destination. Focus on progress rather than perfection, and celebrate the positive changes you make along the way.</p>
        `,
        author: "Lisa Thompson",
        publishDate: new Date('2023-12-28'),
        tags: ['Sustainability', 'Environment', 'Green Living', 'Eco-Friendly'],
        excerpt: "Learn practical steps to live more sustainably and reduce your environmental impact through simple lifestyle changes.",
        readTime: 10
      },
      {
        id: 11,
        title: "Family Vacation Checklist: What to Pack for Stress-Free Travel",
        content: `<h2>Introduction</h2><p>Traveling with family can be chaotic if you're not prepared. This checklist will keep things smooth.</p><ul><li>Snacks and water bottles</li><li>Entertainment for kids (books, games)</li><li>First-aid and medicines</li><li>Extra clothing</li><li>Important documents</li></ul><h2>Conclusion</h2><p>Planning ahead with this checklist means fewer meltdowns and more memories.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Travel', 'Family', 'Checklists'],
        excerpt: "Pack smart for family vacations with this handy checklist for parents.",
        readTime: 4
      },
      {
        id: 12,
        title: "Travel Safety Checklist Every Adventurer Needs",
        content: `<h2>Introduction</h2><p>Safety is the most important aspect of travel. This checklist will help you prepare for any situation.</p><ul><li>Travel insurance</li><li>Emergency contacts</li><li>Secure money belt</li><li>Photocopies of documents</li><li>Basic survival kit</li></ul><h2>Conclusion</h2><p>Use this checklist to protect yourself and ensure safe, worry-free adventures anywhere in the world.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Travel', 'Safety', 'Checklists'],
        excerpt: "Stay safe on your trips with this must-have traveler safety checklist.",
        readTime: 4
      },
      {
        id: 13,
        title: "Notion vs Evernote: Which Productivity App Wins in 2025?",
        content: `<h2>Introduction</h2><p>Notion and Evernote are two of the most popular productivity apps. But which one is right for you in 2025?</p><h3>Notion Pros</h3><ul><li>Highly customizable</li><li>All-in-one workspace</li></ul><h3>Notion Cons</h3><ul><li>Steeper learning curve</li></ul><h3>Evernote Pros</h3><ul><li>Simple note-taking</li><li>Powerful search</li></ul><h3>Evernote Cons</h3><ul><li>Less flexible than Notion</li></ul><h2>Conclusion</h2><p>If you want flexibility and customization, choose Notion. If you want simplicity, Evernote still shines.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Technology', 'Productivity Apps', 'Comparisons'],
        excerpt: "Compare Notion and Evernote in 2025 to find out which productivity app suits you best.",
        readTime: 6
      },
      {
        id: 14,
        title: "iPhone vs Android: Which Should You Buy This Year?",
        content: `<h2>Introduction</h2><p>The iPhone vs Android debate never ends. Here's a breakdown of what matters in 2025.</p><h3>iPhone Strengths</h3><ul><li>Seamless ecosystem</li><li>Strong privacy features</li></ul><h3>Android Strengths</h3><ul><li>Wider variety of devices</li><li>Better hardware customization</li></ul><h2>Conclusion</h2><p>Your choice depends on priorities: Apple for simplicity, Android for variety and flexibility.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Technology', 'Smartphones', 'Comparisons'],
        excerpt: "Weigh the pros and cons of iPhone vs Android in 2025 before buying.",
        readTime: 5
      },
      {
        id: 15,
        title: "ChatGPT vs Google Search: Which Is Better for Finding Answers?",
        content: `<h2>Introduction</h2><p>AI chatbots like ChatGPT are changing how we find information. But how does it compare to Google Search?</p><h3>ChatGPT Strengths</h3><ul><li>Conversational answers</li><li>Contextual understanding</li></ul><h3>Google Strengths</h3><ul><li>Real-time information</li><li>Comprehensive search results</li></ul><h2>Conclusion</h2><p>Use ChatGPT for explanations and brainstorming. Use Google for up-to-date news and sources.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Technology', 'Search Engines', 'Comparisons'],
        excerpt: "Explore the strengths of ChatGPT vs Google Search and when to use each.",
        readTime: 6
      },
      {
        id: 16,
        title: "25 Free Tools Every Home Cook Should Know About",
        content: `<h2>Introduction</h2><p>Cooking doesn't need to be expensive. These free tools can improve your kitchen experience.</p><ul><li>Paprika Recipe Manager</li><li>Yummly</li><li>SuperCook</li><li>Eat This Much</li><li>Kitchen Stories</li></ul><h2>Conclusion</h2><p>With these free tools, you can cook smarter, save money, and discover new meals.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Food', 'Cooking', 'Resource Roundups'],
        excerpt: "Discover 25 free apps and tools that make cooking easier and more fun.",
        readTime: 6
      },
      {
        id: 17,
        title: "10 Best Kitchen Gadgets for Beginners",
        content: `<h2>Introduction</h2><p>Starting in the kitchen? These beginner-friendly gadgets will make cooking easier.</p><ul><li>Chef's knife</li><li>Cutting board</li><li>Measuring cups</li><li>Non-stick skillet</li><li>Instant pot</li></ul><h2>Conclusion</h2><p>Equipping your kitchen with these gadgets gives you confidence to cook at home.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Food', 'Kitchen', 'Resource Roundups'],
        excerpt: "Start cooking with confidence using these 10 essential kitchen gadgets.",
        readTime: 5
      },
      {
        id: 18,
        title: "15 Online Cooking Classes Worth Taking in 2025",
        content: `<h2>Introduction</h2><p>Want to improve your cooking skills from home? These online classes are worth exploring in 2025.</p><ul><li>MasterClass with Gordon Ramsay</li><li>Udemy cooking courses</li><li>America's Test Kitchen Online</li><li>Skillshare food classes</li><li>BBC Good Food tutorials</li></ul><h2>Conclusion</h2><p>With these classes, you can upgrade your cooking skills without leaving your kitchen.</p>`,
        author: "AI Content Generator",
        publishDate: new Date('2025-09-20'),
        tags: ['Food', 'Cooking Classes', 'Resource Roundups'],
        excerpt: "Find the best online cooking classes in 2025 to improve your culinary skills.",
        readTime: 6
      }
    ];
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredArticles = [...this.articles];
      this.searchSuggestions = [];
      this.showSuggestions = false;
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    
    // Update suggestions for dropdown
    this.updateSearchSuggestions(query);
    
    // Update filtered articles for main display
    this.filteredArticles = this.articles.filter(article => {
      // Exact word search
      const exactMatch = article.title.toLowerCase().includes(query) ||
                        article.content.toLowerCase().includes(query) ||
                        article.excerpt.toLowerCase().includes(query) ||
                        article.author.toLowerCase().includes(query) ||
                        article.tags.some(tag => tag.toLowerCase().includes(query));

      // Context search - search for related terms
      const contextTerms = this.getContextTerms(query);
      const contextMatch = contextTerms.some(term => 
        article.title.toLowerCase().includes(term) ||
        article.content.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.tags.some(tag => tag.toLowerCase().includes(term))
      );

      return exactMatch || contextMatch;
    });
  }

  updateSearchSuggestions(query: string) {
    if (query.length < 2) {
      this.searchSuggestions = [];
      this.showSuggestions = false;
      return;
    }

    // Get suggestions based on title matches first, then other fields
    const suggestions = this.articles
      .filter(article => {
        const titleMatch = article.title.toLowerCase().includes(query);
        const excerptMatch = article.excerpt.toLowerCase().includes(query);
        const authorMatch = article.author.toLowerCase().includes(query);
        const tagMatch = article.tags.some(tag => tag.toLowerCase().includes(query));
        
        return titleMatch || excerptMatch || authorMatch || tagMatch;
      })
      .sort((a, b) => {
        // Prioritize title matches
        const aTitleMatch = a.title.toLowerCase().includes(query);
        const bTitleMatch = b.title.toLowerCase().includes(query);
        
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        
        // Then by relevance score
        const aScore = this.calculateRelevanceScore(a, query);
        const bScore = this.calculateRelevanceScore(b, query);
        
        return bScore - aScore;
      })
      .slice(0, 5); // Show max 5 suggestions

    this.searchSuggestions = suggestions;
    this.showSuggestions = true;
    this.selectedSuggestionIndex = -1;
  }

  calculateRelevanceScore(article: Article, query: string): number {
    let score = 0;
    const queryLower = query.toLowerCase();
    
    // Title match gets highest score
    if (article.title.toLowerCase().includes(queryLower)) {
      score += 10;
      // Exact title match gets even higher score
      if (article.title.toLowerCase().startsWith(queryLower)) {
        score += 5;
      }
    }
    
    // Author match
    if (article.author.toLowerCase().includes(queryLower)) {
      score += 3;
    }
    
    // Tag match
    if (article.tags.some(tag => tag.toLowerCase().includes(queryLower))) {
      score += 2;
    }
    
    // Excerpt match
    if (article.excerpt.toLowerCase().includes(queryLower)) {
      score += 1;
    }
    
    return score;
  }

  getContextTerms(query: string): string[] {
    const contextMap: { [key: string]: string[] } = {
      'ai': ['artificial intelligence', 'machine learning', 'technology', 'digital', 'automation'],
      'work': ['job', 'career', 'employment', 'professional', 'business'],
      'productivity': ['efficiency', 'performance', 'output', 'results', 'achievement'],
      'crypto': ['cryptocurrency', 'bitcoin', 'blockchain', 'digital currency', 'trading'],
      'sleep': ['rest', 'recovery', 'health', 'wellness', 'energy'],
      'sustainable': ['environment', 'green', 'eco-friendly', 'renewable', 'conservation'],
      'health': ['wellness', 'fitness', 'medical', 'lifestyle', 'wellbeing'],
      'technology': ['tech', 'innovation', 'digital', 'software', 'hardware'],
      'investment': ['finance', 'money', 'trading', 'portfolio', 'wealth'],
      'remote': ['work from home', 'telecommute', 'virtual', 'online', 'distributed'],
      'stress': ['anxiety', 'pressure', 'tension', 'worry', 'overwhelm'],
      'environment': ['climate', 'sustainability', 'green', 'carbon', 'pollution'],
      'lifestyle': ['habits', 'routine', 'daily', 'personal', 'wellness'],
      'finance': ['money', 'budget', 'savings', 'investment', 'wealth'],
      'wellness': ['health', 'fitness', 'mental health', 'self-care', 'mindfulness']
    };

    const terms = [query];
    for (const [key, values] of Object.entries(contextMap)) {
      if (query.includes(key) || key.includes(query)) {
        terms.push(...values);
      }
    }
    return [...new Set(terms)]; // Remove duplicates
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredArticles = [...this.articles];
    this.searchSuggestions = [];
    this.showSuggestions = false;
    this.selectedSuggestionIndex = -1;
  }

  onSearchFocus() {
    if (this.searchSuggestions.length > 0) {
      this.showSuggestions = true;
    }
  }

  onSearchBlur() {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      this.showSuggestions = false;
      this.selectedSuggestionIndex = -1;
    }, 200);
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (!this.showSuggestions || this.searchSuggestions.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedSuggestionIndex = Math.min(
          this.selectedSuggestionIndex + 1,
          this.searchSuggestions.length - 1
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedSuggestionIndex = Math.max(this.selectedSuggestionIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedSuggestionIndex >= 0) {
          this.selectSuggestion(this.searchSuggestions[this.selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        this.showSuggestions = false;
        this.selectedSuggestionIndex = -1;
        break;
    }
  }

  selectSuggestion(suggestion: Article) {
    this.searchQuery = suggestion.title;
    this.selectArticle(suggestion);
    this.showSuggestions = false;
    this.selectedSuggestionIndex = -1;
    this.onSearch(); // Update the filtered articles
  }

  selectArticle(article: Article) {
    this.selectedArticle = article;
    // Reinitialize ads when article changes
    setTimeout(() => {
      this.initializeAdSense();
    }, 100);
  }

  previousArticle() {
    if (!this.selectedArticle) return;
    
    const currentIndex = this.filteredArticles.findIndex(a => a.id === this.selectedArticle!.id);
    if (currentIndex > 0) {
      this.selectedArticle = this.filteredArticles[currentIndex - 1];
    }
  }

  nextArticle() {
    if (!this.selectedArticle) return;
    
    const currentIndex = this.filteredArticles.findIndex(a => a.id === this.selectedArticle!.id);
    if (currentIndex < this.filteredArticles.length - 1) {
      this.selectedArticle = this.filteredArticles[currentIndex + 1];
    }
  }

  hasPrevious(): boolean {
    if (!this.selectedArticle) return false;
    const currentIndex = this.filteredArticles.findIndex(a => a.id === this.selectedArticle!.id);
    return currentIndex > 0;
  }

  hasNext(): boolean {
    if (!this.selectedArticle) return false;
    const currentIndex = this.filteredArticles.findIndex(a => a.id === this.selectedArticle!.id);
    return currentIndex < this.filteredArticles.length - 1;
  }

  getPopularArticles(): Article[] {
    // Return first 3 articles as "popular" for demo purposes
    return this.articles.slice(0, 3);
  }

  getDisplayArticles(): Article[] {
    if (this.selectedArticle) {
      return this.getRelatedArticles(this.selectedArticle);
    }
    return this.filteredArticles;
  }

  getRelatedArticles(currentArticle: Article): Article[] {
    const maxPossibleScore = this.calculateMaxPossibleScore(currentArticle);
    
    const relatedArticles = this.articles
      .filter(article => article.id !== currentArticle.id)
      .map(article => {
        const score = this.calculateRelatednessScore(currentArticle, article);
        const percentage = maxPossibleScore > 0 ? (score / maxPossibleScore) * 100 : 0;
        return {
          article,
          score,
          percentage: Math.round(percentage)
        };
      })
      .filter(item => item.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5) // Show only top 5 matches
      .map(item => item.article);

    return relatedArticles.length > 0 ? relatedArticles : this.articles.slice(0, 5);
  }

  calculateMaxPossibleScore(currentArticle: Article): number {
    // Calculate the maximum possible score for perfect matching
    const titleWords = this.extractKeywords(currentArticle.title);
    const contentWords = this.extractKeywords(currentArticle.content);
    const contextTerms = this.getContextTerms(currentArticle.title);
    
    // Maximum possible scores
    const maxTagScore = currentArticle.tags.length * 3;
    const maxTitleScore = titleWords.length * 2;
    const maxContentScore = contentWords.length * 1;
    const maxContextScore = contextTerms.length * 2;
    
    return maxTagScore + maxTitleScore + maxContentScore + maxContextScore;
  }

  getMatchPercentage(currentArticle: Article, targetArticle: Article): number {
    const maxPossibleScore = this.calculateMaxPossibleScore(currentArticle);
    const score = this.calculateRelatednessScore(currentArticle, targetArticle);
    const percentage = maxPossibleScore > 0 ? (score / maxPossibleScore) * 100 : 0;
    return Math.round(percentage);
  }

  calculateRelatednessScore(article1: Article, article2: Article): number {
    let score = 0;
    
    // Check for common tags
    const commonTags = article1.tags.filter(tag => 
      article2.tags.some(tag2 => tag2.toLowerCase() === tag.toLowerCase())
    );
    score += commonTags.length * 3;

    // Check for common words in titles
    const title1Words = this.extractKeywords(article1.title);
    const title2Words = this.extractKeywords(article2.title);
    const commonTitleWords = title1Words.filter(word => 
      title2Words.some(word2 => word2 === word)
    );
    score += commonTitleWords.length * 2;

    // Check for common words in content
    const content1Words = this.extractKeywords(article1.content);
    const content2Words = this.extractKeywords(article2.content);
    const commonContentWords = content1Words.filter(word => 
      content2Words.some(word2 => word2 === word)
    );
    score += commonContentWords.length * 1;

    // Check for context terms
    const contextTerms1 = this.getContextTerms(article1.title);
    const contextTerms2 = this.getContextTerms(article2.title);
    const commonContextTerms = contextTerms1.filter(term => 
      contextTerms2.some(term2 => term2.toLowerCase() === term.toLowerCase())
    );
    score += commonContextTerms.length * 2;

    return score;
  }

  extractKeywords(text: string): string[] {
    // Remove HTML tags and extract meaningful words
    const cleanText = text.replace(/<[^>]*>/g, ' ').toLowerCase();
    const words = cleanText.split(/\W+/)
      .filter(word => word.length > 3) // Only words longer than 3 characters
      .filter(word => !this.isStopWord(word)); // Remove common stop words
    
    // Return unique words
    return [...new Set(words)];
  }

  isStopWord(word: string): boolean {
    const stopWords = [
      'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'she', 'use', 'way', 'will', 'with', 'this', 'that', 'they', 'have', 'from', 'been', 'were', 'said', 'each', 'which', 'their', 'time', 'will', 'about', 'there', 'could', 'other', 'after', 'first', 'well', 'also', 'where', 'much', 'some', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'these', 'think', 'want', 'what', 'year', 'your', 'good', 'know', 'right', 'should', 'work', 'great', 'little', 'might', 'must', 'never', 'seem', 'still', 'those', 'under', 'while', 'world', 'being', 'every', 'going', 'place', 'since', 'through', 'until', 'without', 'during', 'before', 'between', 'because', 'against', 'among', 'within', 'without'
    ];
    return stopWords.includes(word.toLowerCase());
  }
}
