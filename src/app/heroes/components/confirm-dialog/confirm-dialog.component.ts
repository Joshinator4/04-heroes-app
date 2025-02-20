import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
// este componente ha sido creado con:   ng g c heroes/components/confirmDialog --inline-style --skip-tests
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private heroesService: HeroesService,
    private router: Router,
    private snakBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ){}

  private showSnackbar (message: string): void{
    this.snakBar.open(message, 'OK', {
      duration: 2500,
    })
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  onConfirm(): void{
    this.heroesService.deleteHeroById(this.data.id)
      .subscribe( valido => {
        if(valido == true){
          this.showSnackbar(`${ this.data.superhero } has been removed!`);
          this.router.navigate(['/heroes/list']);
        }else{
          this.showSnackbar('ERROR: Hero not found');
          throw Error('ERROR: Hero not found');
        }
      });
    this.dialogRef.close(true);
  }
}
