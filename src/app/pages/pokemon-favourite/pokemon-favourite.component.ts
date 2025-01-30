import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-favourite',
  templateUrl: './pokemon-favourite.component.html',
  styleUrls: ['./pokemon-favourite.component.scss'],
  standalone: false,
})
export class PokemonFavouriteComponent implements OnInit {
  pokemons: Pokemon[] = [];
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.favourites$.subscribe((favourites) => {
      this.pokemons = favourites;
    });
  }

  removeFromFavourites(pokemon: Pokemon) {
    this.pokemonService.removeFavourite(pokemon);
  }

  onIonInfinite(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
