import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../api.service';


@Component({
  selector: 'app-pianoapp',
  templateUrl: './pianoapp.component.html',
  styleUrls: ['./pianoapp.component.css']
})
export class PianoappComponent implements OnInit {

  listaProductos: any [] = [{producto:"ACEITE",tienda:"OXXO"},
                            {producto:"QUESO BADON",tienda:"SEVEN ELEVEN"},
                            {producto:"PAPAS",tienda:"BODEGA AURRERA"}];
                            
  estado = false;
                            

  //Si se crea aquí el servicio, se tiene que crear arriba
  constructor(private _apiService:ApiService) {
    
  }

  ngOnInit(): void {
  }

  sonidoPiano(numero : number) : void{
    const mp3 = new Audio();
    mp3.src = `../assets/sonidos/note${numero}.wav`;  
    mp3.load();
    mp3.play(); 
  }

  sonidoPiano2(numeroAudio : number){
    let sonido = new Audio();
    if (numeroAudio >= 8) {
        sonido.src = `../assets/sonidos/note${numeroAudio}.mp3`; 
    }else if (numeroAudio<8) {
        sonido.src = `../assets/sonidos/note${numeroAudio}.wav`;
    }

    
    sonido.load();
    sonido.play(); 
  }

  mostrar(){
    this.estado = true;
  }
  ocultar(){
    this.estado = false;
  }

  mostrarOcultar(){
    if (this.estado) {
      this.estado = false;      
    }else if(this.estado == false){
      this.estado = true;
    }

  }

  getUser = () => {
    //subscribe manda a traer objetos
    this._apiService.consultaUsuario().subscribe((resp: any) => {
      console.log(resp.respuesta);
    })
  }

}
