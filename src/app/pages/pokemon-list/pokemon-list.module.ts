import { NgModule } from '@angular/core';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonListRoutingModule } from './pokemon-list.routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { BaseLayoutComponent } from '../../shared/components/base-layout.component';
import { PokemonCardComponent } from '../../shared/components/pokemon-card.component';

@NgModule({
  declarations: [PokemonListComponent],
  imports: [
    PokemonListRoutingModule,
    CommonModule,
    IonicModule,
    HttpClientModule,
    BaseLayoutComponent,
    PokemonCardComponent,
  ],
})
export class PokemonListModule {}
