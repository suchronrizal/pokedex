import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BaseLayoutComponent } from 'src/app/shared/components/base-layout.component';
import { PokemonFavouriteComponent } from './pokemon-favourite.component';
import { PokemonFavouriteRoutingModule } from './pokemon-favourites.routing.module';
import { PokemonCardComponent } from 'src/app/shared/components/pokemon-card.component';

@NgModule({
  declarations: [PokemonFavouriteComponent],
  imports: [
    CommonModule,
    BaseLayoutComponent,
    IonicModule,
    PokemonFavouriteRoutingModule,
    PokemonCardComponent,
  ],
})
export class PokemonFavouritesModule {}
