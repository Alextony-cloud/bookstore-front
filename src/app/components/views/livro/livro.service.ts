import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from './livro.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = 'http://localhost:8080';

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(id_cat:String):Observable<Livro[]>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }

  findById(id:String):Observable<Livro>{
    const url = `${this.baseUrl}/livros/${id}`;
    return this.http.get<Livro>(url);
  }

  create(livro: Livro, id_cat: String):Observable<Livro>{
    const url =  `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.post<Livro>(url, livro);
  }

  update(livro: Livro){
    const url =  `${this.baseUrl}/livros/${livro.id}`
    return this.http.put<Livro>(url, livro);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
