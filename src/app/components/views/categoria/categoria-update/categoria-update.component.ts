import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit{
 
  categoria: Categoria ={
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private router: ActivatedRoute, private routerLink: Router){

  }
 
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

  update(){
    this.service.update(this.categoria).subscribe((r) => {
      this.routerLink.navigate(['categorias'])
      this.service.mensagem('Categoria atualizada com sucesso!')
    }, e => {
      for(let i = 0; i < e.error.errors.length; i++){
        this.service.mensagem(e.error.errors[i].message)
      }
    })
  }

  cancel(){
    this.routerLink.navigate(['categorias']);
  }

}
