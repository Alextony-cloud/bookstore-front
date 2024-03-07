import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  
  baseUrl: String = 'http://localhost:8080';

  constructor(private http: HttpClient) { 

  }

  findAll():Observable<Categoria[]>{
    const url =`${this.baseUrl}/categorias`
    return this.http.get<Categoria[]>(url);
  }
}
