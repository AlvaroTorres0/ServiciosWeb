import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Componente1Component } from './vistas/componente1/componente1.component';
import { Componente2Component } from './vistas/componente2/componente2.component';
import { Componente3Component } from './vistas/componente3/componente3.component';
import { Componente4Component } from './vistas/componente4/componente4.component';
import { PianoappComponent } from './component/pianoapp/pianoapp.component';
import { NgModelComponent } from './vistas/ng-model/ng-model.component';
import { FormsModule } from '@angular/forms';
//Ruta o importación para el servicio
import { HttpClientModule} from '@angular/common/http';
import { ComponentePrincipalComponent } from './formulario/componente-principal/componente-principal.component';



@NgModule({
  declarations: [
    AppComponent,
    Componente1Component,
    Componente2Component,
    Componente3Component,
    Componente4Component,
    PianoappComponent,
    NgModelComponent,
    ComponentePrincipalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //Se manda a llamar ya que se va a utiliza en varios componentes
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
