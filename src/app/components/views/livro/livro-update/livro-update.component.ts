import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent {

  livro: Livro ={
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  titulo = new FormControl('', [Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  id_cat:string = ''

  constructor(private service:LivroService, private activatedRoute: ActivatedRoute, private router: Router){

  }
  ngOnInit(): void {
    this.id_cat = this.activatedRoute.snapshot.paramMap.get('id_cat')!;  
    this.livro.id = this.activatedRoute.snapshot.paramMap.get('id')!; 
    this.findById();
  }

  getMessage(){
    if(this.titulo.invalid){
      return 'O campo TITULO deve conter entre 3 e 50 caracteres';
    }
    if(this.nome_autor.invalid){
      return 'O campo NOME DO AUTOR deve conter entre 3 e 50 caracteres';
    }
    if (this.texto.invalid){
      return 'O campo TEXTO deve conter entre 10 e 2.000.000 caracteres';
    }
    return false
  }

  update(){
    this.service.update(this.livro).subscribe((r)=>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro atualizado com sucesso!')
    }, e => {
      this.service.mensagem('Erro ao atualizar livro! Tente mais tarde.')
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
    })
  }


  cancel(){
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  findById(){
    this.service.findById(this.livro.id!).subscribe((r) => {
      this.livro = r
      console.log(this.livro)
    })
  }
}
