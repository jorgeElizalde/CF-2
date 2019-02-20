import { NgModule } from '@angular/core';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BlogComponent } from './components/blog/blog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventsComponent } from './components/events/events.component';

const routes: Routes = [
  {path:'login', component: SigInComponent},
  {path:'register', component: SignUpComponent},
  {path:'blog', component: BlogComponent},
  {path:'home', component: DashboardComponent},
  {path:'event', component: EventsComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
