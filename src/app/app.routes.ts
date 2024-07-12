import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './AuthGuard';

export const routes: Routes = [
    
    {
        path:'',component:LoginComponent,
       
    },
    {
        path:'dash', component:DashboardComponent
    },
    // {
    //     path:'dash', component:DashboardComponent ,canActivate: [AuthGuard]
    // }
];
