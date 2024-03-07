import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit{

  categoria: Categoria ={
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service:CategoriaService,private router: ActivatedRoute, private routerLink: Router){}
  
  ngOnInit(): void {
    this.categoria.id = this.router.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void{
    this.service.findById(this.categoria.id!).subscribe((r) =>{
      this.categoria.nome = r.nome
      this.categoria.descricao = r.descricao
      
    })
  }
  
  delete(){
    this.service.delete(this.categoria.id!).subscribe((r) =>  {
      this.service.mensagem('Categoria deletada com sucesso!')
    }, e => {
      this.service.mensagem(e.error.error)
    })  
  }
  
  cancel(){
    this.routerLink.navigate(['categorias']);
  }
}
