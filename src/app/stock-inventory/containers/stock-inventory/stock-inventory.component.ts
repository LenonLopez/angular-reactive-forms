import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Product } from './../../models/product.interface';

@Component({
    selector: 'stock-inventory',
    styleUrls: ['./stock-inventory.component.scss'],
    template: `
        <div class="stock-inventory">
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              
            <stock-branch
            [parent]="form"></stock-branch>

            <stock-selector
            [parent]="form"
            [products]="products"
            (addStock)="onAddStock($event)"></stock-selector>

            <stock-products
            [parent]="form"
            (removed)="removeStock($event)"></stock-products>


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
    products: Product[] = [

        { "id": 1, "price": 2800, "name": 'MacBook Pro' },
        { "id": 2, "price": 200, "name": 'USB C adapter' },
        { "id": 3, "price": 500, "name": 'nexus tablet' },
        { "id": 4, "price": 600, "name": 'Iphone 6' },
        { "id": 5, "price": 700, "name": 'Asus laptop' }
    ];

    form = new FormGroup(
        {
            store: new FormGroup({
                branch: new FormControl(''),
                code: new FormControl('')
            }),
            selector: this.createStock({}),
            stock: new FormArray([
                this.createStock({ product_id: 3, quantity: 100 }),
                this.createStock({ product_id: 4, quantity: 100 }),
                this.createStock({ product_id: 5, quantity: 100 })

            ])
        }
    );

    private get selectorStock() {
        return this.form.get('selector') as FormGroup;
    }
    private get stockFormArray() {
        return this.form.get('stock') as FormArray;
    }
    private createStock(stock) {
        return new FormGroup({
            product_id: new FormControl(parseInt(stock.product_id, 10) || ''),
            quantity: new FormControl(stock.quantity || 10)
        })
    }
    onSubmit() {

        console.log("submit", this.form.value);
    }
    onAddStock(stock) {
        console.log("adding stock:", stock);
        this.stockFormArray.push(this.createStock(stock));
    }
    removeStock({ group, index }: { group: FormGroup, index: number }) {
        console.log("removing stock, withing container:", { group, index });
        this.stockFormArray.removeAt(index);
    }
}