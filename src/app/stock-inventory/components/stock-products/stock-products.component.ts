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
                                    {{ item.value?.product_id }}
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
    @Output()
    removed: EventEmitter<any> = new EventEmitter<any>();
    
    get stocks() {
       // console.log((this.parent.get('stock') as FormArray).controls);
        return (this.parent.get('stock') as FormArray).controls;
    }

    onRemove(group, index) {
        this.removed.emit({ group, index });
    }

}