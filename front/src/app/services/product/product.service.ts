import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  private baseUrl='http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/categories';
  constructor(private httpClient:HttpClient) { }

  getProduct(theProductId:number):Observable<Product>
  {
    const searchUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(searchUrl);
  }
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }
  getProductsList(theCategoryId:number):Observable<Product[]>
  {

    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(this.baseUrl);
  }
  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }
  getProductCategories():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe
    (map(response => response._embedded.categories));
  }
}

interface GetResponseProduct{
  _embedded:{
    products: Product[];
  }
 
}
interface GetResponseCategory{
  _embedded:{
    categories: ProductCategory[];
  }

}