import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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
    products: Product[] = [];
    form = this.fb.group(
        {
            store: this.fb.group({
                branch: '',
                code: ''
            }),
            selector: this.createStock({}),
            stock: this.fb.array([
                this.createStock({ product_id: 3, quantity: 100 }),
                this.createStock({ product_id: 4, quantity: 100 }),
                this.createStock({ product_id: 5, quantity: 100 })

            ])
        }
    );

    constructor(private fb: FormBuilder) {}

    private get selectorStock() {
        return this.form.get('selector') as FormGroup;
    }
    private get stockFormArray() {
        return this.form.get('stock') as FormArray;
    }
    private createStock(stock) {
        return this.fb.group({
            product_id: parseInt(stock.product_id, 10) || '',
            quantity: stock.quantity || 10
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