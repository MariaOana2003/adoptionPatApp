import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AddPetPageComponent } from './pages/add-pet-page/add-pet-page.component';
import { AdoptionFormPageComponent} from './pages/adoption-form-page/adoption-form-page.component';

export const routes: Routes = [
    {path:'', component: HomePageComponent},
    {path:'mainPage', component: MainPageComponent},
    {path:'favoritesPage', component: FavoritesPageComponent},
    {path:'aboutPage',component: AboutPageComponent},
    {path:'contactPage',component: ContactPageComponent},
    {path:'singlePost/:id',component: SinglePostComponent},
    {path:'addPetPage', component: AddPetPageComponent},
    {path: 'adoption-form-page', component: AdoptionFormPageComponent}
    

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }