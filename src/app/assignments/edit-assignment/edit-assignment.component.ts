import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
 styles: [
  `
  .app-title-login {
    text-align: center;
    padding: 10px;
    color: #333;
    width: 500px;
    align : center;
    color : green;
  }
  `
]
})
export class EditAssignmentComponent implements OnInit {
 assignment!: Assignment | undefined;
 // associées aux champs du formulaire
 nomAssignment!: string;
 dateDeRendu!: Date;
 matiere!:string;
 matiereSelectionnee!: string;


 constructor(
   private assignmentsService: AssignmentsService,
   private route: ActivatedRoute,
   private router: Router
 ) {}

 ngOnInit(): void {
   this.getAssignment();
 }
 getAssignment() {
  // on récupère l'id dans le snapshot passé par le routeur
  // le "+" force l'id de type string en "number"
  const id = +this.route.snapshot.params['id'];

  // Exemple de récupération des query params (après le ? dans l'url)
  const queryParams = this.route.snapshot.queryParams;
  console.log(queryParams);
  console.log("nom :"  + queryParams['nom'])
  console.log("matière :" + queryParams['matiere'])
 
  // Exemple de récupération du fragment (après le # dans l'url)
  const fragment = this.route.snapshot.fragment;
  console.log("Fragment = " + fragment);

  this.assignmentsService.getAssignment(id)
  .subscribe((assignment) => {
    if (!assignment) return;
    this.assignment = assignment;
    // Pour pré-remplir le formulaire
    this.nomAssignment = assignment.nom;
    this.dateDeRendu = assignment.dateDeRendu;
    this.matiere = assignment.matiere;
  });
}
onSaveAssignment() {
  if (!this.assignment) return;

  // on récupère les valeurs dans le formulaire
  this.assignment.nom = this.nomAssignment;
  this.assignment.dateDeRendu = this.dateDeRendu;
  this.assignmentsService
    .updateAssignment(this.assignment)
    .subscribe((message) => {
      console.log(message);

      // navigation vers la home page
      this.router.navigate(['/home']);
    });
}
matieres = [
  { nom: 'Angular', avatar: 'assets/images/angular.jpg' },
  { nom: 'Big-DATA', avatar: 'assets/images/big-data.jpg' },
  { nom: 'Anglais', avatar: 'assets/images/anglais.jpg' },
  { nom: 'Analyse-des-données', avatar: 'assets/images/analyse-des donnees.jpg' }
];

}
