import { Product, Item } from './../models/product.interface';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class StockInventoryService {

    constructor(private http: Http, private httpC: HttpClient) { }

    getCartItems(){

        return this.http.get('/localhost:3000/cart')
                    .map((response:Response) => response.json())
                    .catch((error:any) => Observable.throw(error.json()));
    }


    getCartItemsClient(): Observable<Item[]>{
       return this.httpC.get('http://localhost:3000/cart')
        .map((response:Response) => response)
        .catch((error:any) => Observable.throw(error));
    }
    getProductsClient(): Observable<Product[]>{
        return this.httpC.get('http://localhost:3000/products')
         .map((response:Response) => response)
         .catch((error:any) => Observable.throw(error));
     }
}