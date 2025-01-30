import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-card',
  template: ` <ion-card class="flex flex-col items-center justify-center py-5">
    <img
      [src]="pokemon.image"
      alt="{{ pokemon.name }}"
      loading="lazy"
      class="w-32 h-32 rounded-md border border-slate-400 object-cover"
    />
    <ion-card-header>
      <ion-card-title
        class="!font-semibold text-sm md:font-bold md:text-lg text-center capitalize"
        >{{ pokemon.name }}</ion-card-title
      >
      <ion-card-subtitle class="text-center text-xs md:text-lg">{{
        pokemon.types
      }}</ion-card-subtitle>
    </ion-card-header>
    <div
      class="flex flex-col md:flex-row items-center md:justify-between text-center gap-1 md:gap-4"
    >
      <ion-button
        size="small"
        class="text-xs capitalize"
        [routerLink]="['/pokemon-detail', pokemon.name]"
        >Detail</ion-button
      >
      <ion-button
        (click)="addToFavourites(pokemon)"
        size="small"
        [color]="isAddFavourite ? 'primary' : 'danger'"
        class="text-xs capitalize"
        ><div class="flex items-center gap-1" *ngIf="isAddFavourite">
          <ion-icon
            name="heart"
            size="small"
            [class]="styleFavourite"
          ></ion-icon>
        </div>
        <span *ngIf="!isAddFavourite">Remove Favourites</span></ion-button
      >
    </div>
  </ion-card>`,
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Input() isAddFavourite: boolean = true;
  @Input() styleFavourite: string = '';
  @Output() actionButton = new EventEmitter<any>();
  addToFavourites(pokemon: any) {
    this.actionButton.emit(pokemon);
  }
}
