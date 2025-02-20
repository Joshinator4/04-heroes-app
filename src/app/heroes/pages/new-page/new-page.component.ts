import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{
  public heroForm = new FormGroup({
    id: new FormControl<string | null>(null),
    superhero: new FormControl<string>(''),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publishers = [
    {id:'Dc Comics', desc:'DC - Comics'},
    {id: 'Marvel Comics', desc:'Marvel - Comics'}
  ]

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snakBar: MatSnackBar,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    if(!this.router.url.includes('edit')){
      return;
    }
    this.activatedRoute.params.pipe(
          switchMap(({id}) => this.heroesService.getHeroById(id))
        ).subscribe(hero => {
          if(!hero) return this.router.navigate(['/heroes/list']);
          this.heroForm.reset(hero)
          return;
        })
  }

  private showSnackbar (message: string): void{
    this.snakBar.open(message, 'OK', {
      duration: 2500,
    })
  }

  get currentHero (): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void{
    if(this.heroForm.invalid){
      return
    }

    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
        .subscribe( hero => {
          //TODO: Mostrar snackbar
          this.showSnackbar(`${ hero.superhero } updated!`)
        });
        return;
    }

    //const { id, ...heroWithoutId } = this.currentHero; // Elimina la propiedad id
    console.log(this.currentHero)
    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        //TODO: mostrar snackbar y navegar a /heroes/edit/hero.id
        this.showSnackbar(`${ hero.superhero } created!`);
        this.router.navigate(['/heroes/list']);

      })

    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value
    // })
  }

  public onDeleteHero(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:this.heroForm.value
    });
  }
}
