import { Component, OnInit } from '@angular/core';
import { Estudante} from './../Estudante';
import { EstudanteService } from '../estudante.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estudante',
  templateUrl: './Estudante.component.html',
  styleUrls: ['./Estudante.component.css']
})
export class EstudanteComponent implements OnInit {
  Estudantes: Estudante[] = [];
  isEditing: boolean = false;
  formGroupEstudante: FormGroup;

  constructor(private estudanteService: EstudanteService, private formBuilder: FormBuilder) {
    this.formGroupEstudante = this.formBuilder.group({
      id: [''],
      name: [''],
      idade: [''],
      telefone: [''],
      email: [''],
      cpf: ['']
    });
  }

  save() {
    if (this.isEditing) {
      this.estudanteService.update(this.formGroupEstudante.value).subscribe({
        next: () => {
          this.loadEstudantes();
          this.formGroupEstudante.reset();
          this.isEditing = false;
        }
      })
    }

    else {
      this.estudanteService.save(this.formGroupEstudante.value).subscribe({
        next: data => {
          this.Estudantes.push(data);
          this.formGroupEstudante.reset();
        }
      })
    }
  }

  ngOnInit() : void {
    this.loadEstudantes();
  }

  loadEstudantes() {
    this.estudanteService.getEstudante().subscribe({
      next: data => this.Estudantes = data
    });
  }

  edit(estudante: Estudante) {
    this.formGroupEstudante.setValue(estudante);
    this.isEditing = true;
  }

  delete(estudante: Estudante) {
    this.estudanteService.delete(estudante).subscribe({
      next: () => this.loadEstudantes()
    });
  }
}
