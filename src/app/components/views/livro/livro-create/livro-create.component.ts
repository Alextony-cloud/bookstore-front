import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit{

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

  create(){
    this.service.create(this.livro,this.id_cat).subscribe((r) =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro criado com sucesso!');
    }, e =>{
      this.service.mensagem('Erro ao criar um novo livro! Tente mais tarde.')
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
    })
  }

  cancel(){
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }
}
