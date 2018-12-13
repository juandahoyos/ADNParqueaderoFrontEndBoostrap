import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbTabsetConfig,NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ParqueaderoService } from './parqueadero.service';
import { Parqueadero } from './model/Parqueadero';
import { Vehiculo } from './model/vehiculo';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `],
  providers: [NgbTabsetConfig,ParqueaderoService]
})
export class ParqueaderoComponent implements OnInit {

  closeResult: string;

  parqueadero:any = new Parqueadero;
  parqueaderoConsultado:any = {};
  

  consultaPlaca:String="";
  mensajeListar:String="";
  mostrarMensajeListar:boolean = false;
  mostrarDatos:boolean = false;
  consultaSalida:boolean = false;


  
  registro = new FormGroup({
    placa: new FormControl('',[Validators.required]),
    tipoVehiculo: new FormControl('',[Validators.required]),
    cilindraje: new FormControl('')
  })


  constructor(config: NgbTabsetConfig, private service:ParqueaderoService,private modalService: NgbModal) { 
    config.justify = 'center';
    config.type = 'pills';
  }

  ngOnInit() {
  }


  lanzarModal(content){
    if(this.consultaPlaca==""){
      alert("Por Favor digite la placa.");
    }

    if(this.consultaPlaca!=""){
        this.consultar();
        this.openVerticallyCentered(content);
    }
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
    this.consultaPlaca="";
    }

  listar(){
    this.service.listar().then(data => {
      this.parqueadero=data;
      if(this.parqueadero){
        this.mostrarDatos = true;
      }
    },error => {
      console.log(error.error.message);
      alert(error.error);
    }
  )
  }

  cancelarIngreso(){
    this.registro.reset();
  }

  limpiarTabla(){
    this.parqueadero = null;
    this.mostrarDatos=false;
  }

  consultar(){
    this.service.consultar(this.consultaPlaca).then(data=>{
      if(data){
        this.parqueaderoConsultado = data;
        this.consultaSalida = true;
        this.mensajeListar = "";
        this.mostrarMensajeListar=false;

      }
    },error =>  {
      console.log(error.error);
      this.consultaSalida = false;
      this.mostrarDatos = false;
      this.mensajeListar = error.error;
      this.mostrarMensajeListar=true;
    }
  )    
  }

  guardar(){
      console.log(this.registro.value)
      if(this.registro.value.tipoVehiculo=="MOTO" && (this.registro.value.cilindraje==""
      || this.registro.value.cilindraje==null)){
        alert("Debe digitar el Cilindraje");
      }else{this.service.guardar(this.registro.value).then(data=>{
        if(data){
          alert("El vehiculo se guardo correctamente");
          console.log(data);
        }
      
      },error =>{
        console.log(error.error.mensaje);
        console.log(error.error.message);
          alert(error.error);
      } )}
      
  }

}
