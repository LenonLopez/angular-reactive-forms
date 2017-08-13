import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { StockInventoryService } from './../../services/stock-inventory.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Product, Item } from './../../models/product.interface';

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
            [map]="productMap"
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
export class StockInventoryComponent implements OnInit {
    products: Product[] = [];
    productMap: Map<number, Product>;
    form = this.fb.group(
        {
            store: this.fb.group({
                branch: '',
                code: ''
            }),
            selector: this.createStock({}),
            stock: this.fb.array([])
        }
    );

    constructor(private fb: FormBuilder, private service: StockInventoryService) { }

    ngOnInit() {

        const cart: Observable<Item[]> = this.service.getCartItemsClient();
        const products: Observable<Product[]> = this.service.getProductsClient();

        Observable.forkJoin(cart, products)
            .subscribe(([cart, products]: [Item[], Product[]]) =>{
                const myMap = products
                .map<[number, Product]>(product => [product.id, product])
                this.productMap = new Map<number, Product>(myMap);
                this.products = products;
                cart.forEach( x=> this.onAddStock(x))
            }
            );
    }
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