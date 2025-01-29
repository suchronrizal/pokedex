import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PokemonFavouriteComponent } from './pokemon-favourite.component';

const router = [
  {
    path: '',
    component: PokemonFavouriteComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule],
  declarations: [],
})
export class PokemonFavouriteRoutingModule {}
