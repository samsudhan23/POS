import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
  animations: [
    
    trigger('slideIn', [
      state('flyIn', style({ 
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition(':enter', [
        style({ transform: 'translateX(20px)', opacity: 0, }),
        animate('0.2s 150ms ease-in')
      ])
    ])
  ]
})
export class ToasterComponent implements OnInit{
  @ViewChild('toasterWrapper') toasterWrapper: ElementRef | undefined
  constructor(
    private toasterService: ToasterService,
    private renderer: Renderer2
    ) { 
  }

  ngOnInit() {
  }

  showToast(){
    this.toasterService.dispatchToaster();
   
  }

  closeToast(){
    this.toasterService.dismissToaster();
  }
}
