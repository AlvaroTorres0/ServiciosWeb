import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../api.service';

@Component({
  selector: 'app-componente-principal',
  templateUrl: './componente-principal.component.html',
  styleUrls: ['./componente-principal.component.css']
})
export class ComponentePrincipalComponent implements OnInit {
  estados = [false,false,false,false];
  datosUsuario = {
    "nombre": "",
    "apellidos": "",
    "password": "",
    "role": "",
    "edad": ""
  }
  idUsuario = "";
  data : any = [];
  //Variable que nos permite validar si existen campos vacíos
  vacios = false;
  texto = false;
  numero = false;

  constructor(private _apiService:ApiService) { }
  ngOnInit(): void {
  }

  //Método para mostrar el formulario correspondiente y cambiar el color de los botones superiores
  activarBoton = (boton:any) =>{
    const botones = document.getElementsByClassName("btnNav");

    for (let i = 0; i < botones.length; i++) {
      if (i == boton) {
        botones[i]?.classList.add("active");
        this.estados[boton] = true;      
      }else{
        botones[i]?.classList.toggle("active",false);
        this.estados[i] = false;
      }   
    }
  }


  registrarUsuario = () =>{
    let elementsRegistro = document.querySelectorAll(".registro");
    this.validar(elementsRegistro,"registro");

    if (this.numero == true || this.texto == true || this.vacios == true) {
        //restablecemos el valor de estas para volver a validad nuevamente si es necesario
        this.texto = false;
        this.numero = false;
        this.vacios = false;
      return;      

    }else{
      this._apiService.agregarUsuario(this.datosUsuario).subscribe((resp: any) => {
        alert("Usuario registrado correctamente");
      });
      
      const itemsInput = document.getElementsByTagName("input");
        for (let i = 0; i < itemsInput.length; i++) {
          itemsInput[i].value = "";    
        }
        this.vaciarDatosUsuario();
    } 
  }


  mostrarUsuario = () =>{
    this._apiService.consultaUsuario().subscribe((resp:any) =>{ 
      console.log(resp.respuesta);
      this.data = Object.values(resp.respuesta);
    });
  }

  //Busca usuario para modificación
  buscarUsuario = () =>{
    this._apiService.consultaUsuarioIndividual(this.idUsuario).subscribe((resp:any)=>{
      this.datosUsuario = resp.respuesta;
      console.log(this.datosUsuario);
    });
  }

  actualizarUsuario = () =>{
    let elementsRegistro = document.querySelectorAll(".modificar");
    this.validar(elementsRegistro,"modificar");

    if (this.numero == true || this.texto == true || this.vacios == true) {
        //restablecemos el valor de estas para volver a validad nuevamente si es necesario
        this.texto = false;
        this.numero = false;
        this.vacios = false;
      return;      
    }

    this._apiService.actualizarUsuario(this.datosUsuario,this.idUsuario).subscribe((resp:any) =>{
      console.log(this.datosUsuario);
    });
    alert("Usuario actualizado correctamente");
    this.idUsuario = "";
    this.vaciarDatosUsuario();
  }

  eliminarUsuario = () =>{
    this._apiService.eliminarUsuario(this.idUsuario).subscribe((resp:any)=>{
      alert("Usuario eliminado correctamente");
    });
    this.idUsuario = "";
  }

  eliminarUsuarioBuscar = (id:any)=>{
    this._apiService.eliminarUsuario(id).subscribe((resp:any)=>{
      alert("Usuario eliminado correctamente");
    });
  }

//Validaciones
  validarVacios = (elementos:any)=>{
    for (let i = 0; i < elementos.length; i++) {
        if(elementos[i].value == ""){
          this.vacios = true;
            alert("Existen campos vacios, verifique");
            return;
        }
    }
  }
  validarTiposDato = (campo:any,tipo:any) =>{
    let contenidoCampo = campo.value;

    if (tipo === "texto") {
        for (let caracter of contenidoCampo) {
            if (caracter.charCodeAt(0)>=48 && caracter.charCodeAt(0)<=57) {
                alert(`El campo ${campo.getAttribute("id")} contiene números, por favor verifique`);      
                campo.value = "";
                this.numero = true; 
                break;
            }        
        }  
    }else if(tipo === "numero"){
        for (let caracter of contenidoCampo) {
            if ((caracter.charCodeAt(0)>57 || caracter.charCodeAt(0)<45)) {
                alert(`El campo ${campo.getAttribute("id")} solo debe contener números, por favor verifique`);    
                campo.value = "";  
                this.texto = true;
                break;             
            }        
        }
               
    }
  }

  validar = (arrayElements:any,className:any) =>{
    let elementsRegistro = document.querySelectorAll(`.${className}`);
    this.validarVacios(elementsRegistro);

    for (let i = 0; i < elementsRegistro.length; i++) {
      if (elementsRegistro[i].classList.contains("soloTexto")) {
          this.validarTiposDato(elementsRegistro[i],"texto");            
      }
      if (elementsRegistro[i].classList.contains("soloNumero")) {
          this.validarTiposDato(elementsRegistro[i],"numero");            
      }
    }
  }

  vaciarDatosUsuario = () => {
      this.datosUsuario.apellidos = "";
      this.datosUsuario.edad = "";
      this.datosUsuario.nombre = "";
      this.datosUsuario.password = "";
      this.datosUsuario.role = "";
  }
}

