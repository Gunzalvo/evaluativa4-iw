import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Nota } from '../nota';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public notas:Array<Nota> = [];
  private selected:number = -1;
  
  constructor(private servicio:ClienteService) { }

  ngOnInit(): void {
      this.servicio.consultarNotas().subscribe((datos:Array<Nota>)=>{
        for(let i = 0; i < datos.length; i++)
           this.notas.push(datos[i]);
     });
  }
   
  editarNota(id:number):void {
   this.selected = id;
   
   let notasContainer: HTMLElement | null = document.getElementById("notas-container");
   let actualizarDialogo: HTMLElement | null = document.getElementById("actualizar");
   
   if( notasContainer != null )
      notasContainer.style.display = "none";
   
   if( actualizarDialogo != null )
      actualizarDialogo.style.display = "block";
   
   let titulo: HTMLInputElement | null = document.querySelector("#actualizar input[type='text']");
   let estado: HTMLSelectElement | null = document.querySelector("#actualizar select");
   let descripcion: HTMLTextAreaElement | null = document.querySelector("#actualizar textarea");
   
   for(let i = 0; i < this.notas.length; i++) {
      if( this.notas[i].id == this.selected ) {
         if( titulo != null )
            titulo.value = this.notas[i].titulo;
         
         if( estado != null )
            estado.selectedIndex = this.notas[i].estado;
         
         if( descripcion != null )
            descripcion.value = this.notas[i].descripcion;
         break;
      }
   }
  }
  
  actualizarNotas():void {
   
   let titulo: HTMLInputElement | null = document.querySelector("#actualizar input[type='text']");
   let estado: HTMLSelectElement | null = document.querySelector("#actualizar select");
   let descripcion: HTMLTextAreaElement | null = document.querySelector("#actualizar textarea");
   
   
   if( this.selected != -1 ) {
      let notaEl: HTMLElement | null = document.getElementById("nota-" + this.selected);
      
      if( notaEl != null ) {
         let tituloNota : HTMLElement | null = notaEl.querySelector("h2");
         let descripcionNota: HTMLElement | null = notaEl.querySelector("p");
         
         let tituloString = "";
         if( titulo != null )
            tituloString = titulo.value;
         
         let descString = "";
         if( descripcion != null )
            descString = descripcion.value;
         
         let estadoIndex = -1;
         if( estado != null )
            estadoIndex = estado.selectedIndex;
         
         if( tituloNota != null )
            tituloNota.innerText = tituloString;
         
         if( descripcionNota != null )
            descripcionNota.innerText = descString;
         
         for(let i = 0; i < this.notas.length; i++) {
            if( this.notas[i].id == this.selected ) {
               this.notas[i].titulo = tituloString;
               this.notas[i].descripcion = descString;
               
               if( this.notas[i].estado !== estadoIndex ) {
                  
                  let container:HTMLElement | null = null;
                  let parent:HTMLElement | null = notaEl.parentElement;
                  
                  switch(estadoIndex) {
                     case 0:
                        container = document.getElementById("notas-abiertas");
                        break;
                     case 1:
                        container = document.getElementById("notas-proceso");
                        break;
                     case 2:
                        container = document.getElementById("notas-cerradas");
                        break;
                  }
                     
                  if( parent != null && container != null ) {
                     container.appendChild(parent.removeChild(notaEl));
                  }
                  
                  this.notas[i].estado = estadoIndex;
               }
               
               //servicio.actualizarNota( this.notas[i] );
               break;
            }
         }
         
      }
         
   } else {
      
      
      //let nota:Nota = new Nota();
      //let id:number = servicio.agregarNota(nota);
   }
   let notasContainer: HTMLElement | null = document.getElementById("notas-container");
   let actualizarDialogo: HTMLElement | null = document.getElementById("actualizar");
   
   if( notasContainer != null )
      notasContainer.style.display = "flex";
   
   if( actualizarDialogo != null )
      actualizarDialogo.style.display = "none";
  }
  
  borrarNota(id:number) : void {
     //servicio.borrarNota(id);
  }
}
