import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { isNgTemplate } from '@angular/compiler';

export interface ProductElement {
  Nombre: string;
  Description: string;
  Categoria: string;
  Precio: number;
  Cantidad: number;
  Inventario: string;
  Image:string;
  Acciones:string;
}
const ELEMENT_DATA: ProductElement[] = [];
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
@Injectable({
  providedIn: "root"
})
export class ListProductsComponent implements OnInit {

  constructor(private http: HttpClient) {
   }

  displayedColumns: string[] = ['Nombre', 'Categoria', 'Precio', 'Cantidad', "Inventario", "Acciones"];
  dataSource = ELEMENT_DATA;

  public getProducts():Observable<any>{
    return this.http.get('http://127.0.0.1:2511/product');
  }
  public generateData(data: Array<any>){
    const dataResult = data.map(product => {
      const productItem = {
        Nombre: product.Name,
        Description: product.Description,
        Categoria: product.Category,
        Precio: product.Price,
        Cantidad: product.Quantity,
        Inventario: product.Stock,
        Color: product.Stock === 'EN STOCK' ? 'green' : product.Stock === 'AGOTADO' ? 'red' : 'yellow',
        Image: `data:image/png;base64,${product.Image}`,
        Acciones: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
      }
      return productItem;
    })
    return dataResult;
  }
  async ngOnInit() {
    const response = await this.getProducts().
    toPromise()
    .then(response => response)
    .catch((error)=>{
      console.log(error);
    })
    console.log(response);
    if(response.headerResponse.code === 200){
      console.log("funciona");
      const data = this.generateData(response.payload.items)
      console.log(data);
      this.dataSource = data;
    }
  }

}
