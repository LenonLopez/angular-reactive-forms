import { Product } from './../../models/product.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
@Component({
    selector: 'stock-products',
    styleUrls: ['./stock-products.component.scss'],
    template: `
            <div class="stock-product" [formGroup]="parent">
                <div formArrayName="stock">
                    <div *ngFor="let item of stocks; let i = index;">
                            <div class="stock-product__content" [formGroupName]="i">
                            <div class="stock-product__name">
                                    {{ getProductName(item.value.product_id).name }}
                            </div>
                            <div class="stock-product__price">
                            {{ getProductName(item.value.product_id).price | currency: 'USD':true}}
                            </div>

                                <input
                                type="number"
                                min="10"
                                max="100"
                                step="10"
                                formControlName="quantity">

                                <button 
                                (click)="onRemove(item,i)"
                                type="button">
                                    remove
                                </button>
                            </div>
                            
                    </div>
                </div>
            </div>
    `
})
export class StockProductsComponent {
    @Input()
    parent: FormGroup;
    @Input()
    map: Map<number, Product>;
    @Output()
    removed: EventEmitter<any> = new EventEmitter<any>();
    
    get stocks() {
        return (this.parent.get('stock') as FormArray).controls;
    }

    getProductName(id: number){
        if(id){
            return this.map.get(id);
        }
    }
    onRemove(group, index) {
        this.removed.emit({ group, index });
    }

}