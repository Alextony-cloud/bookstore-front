import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { Livro } from '../livro.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit{
  
  livros: Livro[] = []

  id_cat:string = ''

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acao'];

  constructor(private service: LivroService, private router: ActivatedRoute){}
  
  ngOnInit(): void {
    this.id_cat = this.router.snapshot.paramMap.get('id_cat')!;
    this.findAll();
  }

  findAll(){
    this.service.findAllByCategoria(this.id_cat!).subscribe((r => {
      this.livros = r
      console.log(this.livros)
    }))
  }

}
