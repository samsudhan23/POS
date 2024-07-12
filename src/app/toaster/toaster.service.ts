import { Injectable, Inject, ComponentFactoryResolver } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToasterComponent } from './toaster.component';

@Injectable()
export class ToasterService {
  factoryResolver;
  rootViewContainer!: { parentInjector: any; detach: () => void; insert: (arg0: any) => void; };

  constructor(
    @Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private document: Document
  ) { 
    this.factoryResolver = factoryResolver
  }

  setRootViewContainerRef(viewContainerRef: { parentInjector: any; detach: () => void; insert: (arg0: any) => void; }) {
    this.rootViewContainer = viewContainerRef
  }

  dispatchToaster(){
   const factory = this.factoryResolver.resolveComponentFactory(ToasterComponent)
   const component = factory.create(this.rootViewContainer.parentInjector)
   this.rootViewContainer.detach();
   this.rootViewContainer.insert(component.hostView)
  }

  dismissToaster(){
    this.rootViewContainer.detach()
  }

}