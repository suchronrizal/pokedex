import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';

const router = [
  {
    path: '',
    component: PokemonListComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule],
  declarations: [],
})
export class PokemonListRoutingModule {}
