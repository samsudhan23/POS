import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToasterService } from './toaster/toaster.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DashboardComponent],
  providers: [ToasterService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'store-pos';
}
