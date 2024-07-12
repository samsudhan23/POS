import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface Section {
  name: string;
  updated: Date;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatExpansionModule, MatListModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  showFiller = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Walk in Customer' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  folders: any = [
    {
      id: 0,
      name: 'All',
      updated: new Date('1/1/16'),
    },
    {
      id: 1,
      name: 'Drinks',
      updated: new Date('1/1/16'),
    },
    {
      id: 2,
      name: 'Stationary',
      updated: new Date('1/17/16'),
    },
    {
      id: 3,
      name: 'Groceries',
      updated: new Date('1/28/16'),
    },
  ];
  // prValue: any = 1;

  Products: any = [
    {
      id: 0,
      name: 'Sprite',
      image: '../../assets/Images/sprite.png',
      stock: 14,
      amount: 35,
      prValue: 1,
      netAmount: 35,
    },
    {
      id: 1,
      name: 'Olive Oil',
      image: '../../assets/Images/oil.png',
      stock: 65,
      amount: 120,
      prValue: 1,
      netAmount: 120,
    },
    {
      id: 2,
      name: 'Pencil',
      image: '../../assets/Images/T5.png',
      stock: 100,
      amount: 60,
      prValue: 1,
      netAmount: 60,
    },
    {
      id: 3,
      name: 'sunflower Oil',
      image: '../../assets/Images/oil.png',
      stock: 50,
      amount: 100,
      prValue: 1,
      netAmount: 100,
    },
    {
      id: 4,
      name: 'Oil',
      image: '../../assets/Images/oil.png',
      stock: 65,
      amount: 120,
      prValue: 1,
      netAmount: 120,
    },
  ]

  constructor(private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }
  disabledButtons: boolean[] = [];

  addingValues: any = {};
  add(data: any, index: any) {

    const product = data.amount;
    this.Products[index].prValue++;

    this.addingValues[index] = this.Products[index].prValue * product

    if (this.addingValues.hasOwnProperty(this.Products[index].id)) {
      this.Products[index].netAmount = this.addingValues[index]
    }
    const pri = this.placeorderArray.map((a: {
      netAmount: any; id: any;
    }) => a.netAmount)

    this.price = pri.reduce((partialSum: any, a: any) => partialSum + a, 0)

  }

  remove(data: any, index: any) {
    const product = data.amount;
    if (this.Products[index].prValue > 1) {
      this.Products[index].prValue--
      this.addingValues[index] = this.Products[index].prValue * product

      if (this.addingValues.hasOwnProperty(this.Products[index].id)) {
        this.Products[index].netAmount = this.addingValues[index]
      }

      const pri = this.placeorderArray.map((a: {
        netAmount: any; id: any;
      }) => a.netAmount)

      this.price = pri.reduce((partialSum: any, a: any) => partialSum + a, 0)

    }
  }
  placeorderArray: any = [];
  price: any;

  placeorder(data: any, id: any) {
    if (this.placeorderArray.map((ite: { id: any; name: any }) => ite.id).includes(id) == false) {
      this.placeorderArray.push(data)
      console.log('this.placeorderArray: ', this.placeorderArray);
    } else {

      let sb = this._snackBar.open('Product Already Exit !', 'Cancel', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ["custom-style"]
      });
      sb.onAction().subscribe(() => {
        sb.dismiss();
      });

      this.disabledButtons = [true];
    }

    const pri = this.placeorderArray.map((a: {
      netAmount: any; id: any;
    }) => a.netAmount)
    this.price = pri.reduce((partialSum: any, a: any) => partialSum + a, 0)
    // console.log(this.placeorderArray.map((ite: { id: any; name: any }) => ite.id))
    this.disabledButtons = this.placeorderArray.map((ite: { id: any; name: any }) => ite.id).map((item: any) => this.Products.map((it: { id: any; }) => it.id).includes(item));

  }



  openDialog() {
    const dialogRef = this.dialog.open(CustomerComponent, {
      data: '11',
      width: '500px',
      height: '300px',
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  cancelrow(row: any) {
    this.placeorderArray.splice(this.placeorderArray.findIndex((a: { id: any; }) => a.id === row.id), 1)
    console.log('this.placeorderArray: ', this.placeorderArray);
    const pri = this.placeorderArray.map((a: {
      netAmount: any; id: any;
    }) => a.netAmount)

    this.price = pri.reduce((partialSum: any, a: any) => partialSum + a, 0)
    this.disabledButtons = this.placeorderArray.map((ite: { id: any; name: any }) => ite.id).map((item: any) => this.Products.map((it: { id: any; }) => it.id).includes(item));
    this.disabledButtons = [false];
  }


  buynow() {

  }
}
