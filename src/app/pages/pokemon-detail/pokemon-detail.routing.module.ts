import { NgModule } from '@angular/core';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { RouterModule } from '@angular/router';

const router = [
  {
    path: '',
    component: PokemonDetailComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule],
  declarations: [],
})
export class PokemonDetailRoutingModule {}
