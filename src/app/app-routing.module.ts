import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pokemon-detail/:name',
    title: 'Pokemon Detail',
    loadChildren: () =>
      import('./pages/pokemon-detail/pokemon-detail.module').then(
        (m) => m.PokemonDetailModule
      ),
  },
  {
    path: 'pokemon-list',
    title: 'Pokemon List',
    loadChildren: () =>
      import('./pages/pokemon-list/pokemon-list.module').then(
        (m) => m.PokemonListModule
      ),
  },
  {
    path: 'pokemon-favourites',
    title: 'Pokemon Favourites',
    loadChildren: () =>
      import('./pages/pokemon-favourite/pokemon-favourites.module').then(
        (m) => m.PokemonFavouritesModule
      ),
  },
  {
    path: '',
    redirectTo: 'pokemon-list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'pokemon-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
