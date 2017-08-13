import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Product } from './../../models/product.interface';

@Component({
    selector: 'stock-inventory',
    styleUrls:['./stock-inventory.component.scss'],
    template: `
        <div class="stock-inventory">
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              
            <stock-branch
            [parent]="form"></stock-branch>

            <stock-selector
            [parent]="form"
            [products]="products"></stock-selector>

            <stock-products
            [parent]="form"></stock-products>


                <div class="stock-inventory__buttons">
                    <button 
                    [disabled]="form.invalid" 
                    type="submit">
                    Order Stock
                    </button>
                </div>
                <pre>{{ form.value | json }}</pre>
            </form>
        </div>
    `
    

})
export class StockInventoryComponent {
products: Product[] =[

    {"id": 1, "price": 2800, "name": 'MacBook Pro'},
    {"id": 2, "price": 200, "name": 'USB C adapter'},
    {"id": 3, "price": 500, "name": 'nexus tablet'},
    {"id": 4, "price": 600, "name": 'Iphone 6'},
    {"id": 5, "price": 700, "name": 'Asus laptop'}
];

    form = new FormGroup({
    store:  new FormGroup({
        branch: new FormControl(''),
        code: new FormControl('')
    }),
    selector: new FormGroup({
        product_id: new FormControl(''),
        quantity: new FormControl(10)
    }),
    stock: new FormArray([])


});

onSubmit(){

    console.log("submit", this.form.value);
}

}