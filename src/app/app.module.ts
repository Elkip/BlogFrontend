import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BlogComponent } from './blog/blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/matabs';
import { MatCardModule } from '@angular/material/card';
import {NgOptimizedImage} from '@angular/common';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'contact', component : ContactComponent },
  { path : 'portfolio', component : PortfolioComponent },
  { path : 'blog', component : BlogComponent },
  { path : 'about', component : AboutComponent },
  { path : '404', component : PageNotFoundComponent },
  { path : '**', redirectTo : '/404' }
];

@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        BlogComponent,
        AboutComponent,
        ContactComponent,
        PortfolioComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        FormsModule,
        BrowserAnimationsModule,
        TabsModule,
        MatCardModule,
        NgOptimizedImage], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
