import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../api.service';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.css']
})

export class Componente1Component implements OnInit {

  //Se pone any cuando no sabemos qué puede llegar
  public usuarios: any;

  public clientes = {
    name: "Álvaro",
    apellidos: "Torres"
  }
  public direccion = [{
    calle: "",
    numExt:"",
    numInt: "",
    colonia: "",
    municipio: ""
  }];
  
  constructor(private apiConsult: ApiService) {
   }

  ngOnInit(): void {
    this.nuevoMetodo();

  }
  
  nuevoMetodo(){
    this.apiConsult.mostrarMensaje();
  }

}
