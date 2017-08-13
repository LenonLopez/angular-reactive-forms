import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';
import { StockProductsComponent } from './components/stock-products/stock-products.component';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { StockBranchComponent } from './components/stock-branch/stock-branch.component';


@NgModule({

    declarations: [
        StockInventoryComponent,
        StockProductsComponent,
        StockSelectorComponent,
        StockBranchComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports:[
        StockInventoryComponent
    ]
})
export class StockInventoryModule{

}