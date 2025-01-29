import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokemonDetailRoutingModule } from './pokemon-detail.routing.module';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import PokemonPipe from 'src/app/shared/utils/utility.pipe';
import { BaseLayoutComponent } from 'src/app/shared/components/base-layout.component';

@NgModule({
  declarations: [PokemonDetailComponent, PokemonPipe],
  imports: [
    PokemonDetailRoutingModule,
    CommonModule,
    IonicModule,
    RouterModule,
    BaseLayoutComponent,
  ],
})
export class PokemonDetailModule {}
