import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { finalize } from 'rxjs';
import {
  Pokemon,
  PokemonDetail,
  PokemonType,
  PokemonTypes,
} from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  standalone: false,
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  allPokemons: Pokemon[] = [];
  favourites: Pokemon[] = [];
  types: any[] = [];
  selectedType: PokemonType | '' = '';
  isAlertOpen: boolean = false;
  isLoading: boolean = false;
  alertMessage: string = '';
  offset: number = 0;
  readonly limit: number = 10;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadGenerateItems();
    this.getPokemonTypes();

    this.pokemonService.favourites$.subscribe(
      (favourites) => (this.favourites = favourites)
    );
  }

  getPokemonTypes() {
    this.pokemonService
      .getPokemonTypes()
      .subscribe((types) => (this.types = types));
  }

  filterByType(type: PokemonType | '') {
    this.selectedType = type;
    this.resetPagination();
    this.loadGenerateItems();
  }

  loadGenerateItems() {
    this.isLoading = true;
    if (this.selectedType) {
      this.loadPokemonByType();
    } else {
      this.loadPokemonWithDetails();
    }
  }

  loadPokemonByType() {
    this.pokemonService
      .getPokemonByType(this.selectedType)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (details) => this.handlePokemonByTypeSuccess(details),
        error: (error) => this.handleError(error),
      });
  }

  loadPokemonWithDetails() {
    this.pokemonService
      .getPokemonWithDetails(this.offset, this.limit)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (details) => {
          this.allPokemons.push(
            ...details.map((pokemon: PokemonDetail) => ({
              name: pokemon.name,
              image: pokemon.sprites.front_default,
              url: pokemon.species.url,
              types:
                pokemon.types?.map((type: PokemonTypes) => type.type.name) ||
                [],
            }))
          );
          this.paginateAllPokemons();
        },
        error: (error) => this.handleError(error),
      });
  }

  paginateAllPokemons() {
    const newPokemons = this.allPokemons.slice(
      this.offset,
      this.offset + this.limit
    );
    this.pokemons = [...this.pokemons, ...newPokemons];
    this.offset += this.limit;
  }

  handlePokemonByTypeSuccess(details: PokemonDetail[]) {
    this.allPokemons = details.map((pokemon) => ({
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      url: pokemon.species.url,
      types: pokemon.types.map((type: PokemonTypes) => type.type.name),
    }));
    this.paginateAllPokemons();
  }

  handleError(error: any) {
    this.isAlertOpen = true;
    this.alertMessage = 'Failed to load Pokemon data. Please try again later.';
    console.error('Error loading Pokemon:', error);
  }

  // generateItems() {
  //   if (this.selectedType) {
  //     this.isLoading = true;
  //     if (this.offset === 0) {
  //       this.pokemonService
  //         .getPokemonByType(this.selectedType)
  //         .pipe(finalize(() => (this.isLoading = false)))
  //         .subscribe({
  //           next: (details) => {
  //             this.allPokemons = details.map((pokemon: any) => ({
  //               name: pokemon.name,
  //               image: pokemon.sprites.front_default,
  //               url: pokemon.url,
  //               types: pokemon.types.map((type: any) => type.type.name),
  //             }));
  //             //Buat dynanic pagination
  //             this.pokemons = this.allPokemons.slice(0, this.limit);
  //             this.offset += this.limit;
  //           },
  //           error: (error) => {
  //             console.log(error);
  //             this.isLoading = false;
  //           },
  //         });
  //     } else {
  //       // Offset akan di tambahkan berdasarkan limit jika terjadi load more data
  //       const newPokemons = this.allPokemons.slice(
  //         this.offset,
  //         this.offset + this.limit
  //       );
  //       this.pokemons = [...this.pokemons, ...newPokemons];
  //       this.isLoading = false;
  //     }
  //   } else {
  //     this.pokemonService
  //       .getPokemonWithDetails(this.offset, this.limit)
  //       .subscribe({
  //         next: (details) => {
  //           this.allPokemons = [
  //             ...this.allPokemons,
  //             ...details.map((pokemon: any) => ({
  //               name: pokemon.name,
  //               image: pokemon.sprites.front_default,
  //               url: pokemon.species.url,
  //               types: pokemon.types?.map((type: any) => type.type.name) || [],
  //             })),
  //           ];
  //           //Buat dynanic pagination
  //           this.pokemons = [...this.allPokemons];
  //           this.offset += this.limit;
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         },
  //       });
  //   }
  // }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.loadGenerateItems();
    event.target.complete();
  }

  addToFavourites(pokemon: Pokemon) {
    if (!this.isFavourite(pokemon)) {
      this.pokemonService.addFavourite(pokemon);
    } else {
      this.pokemonService.removeFavourite(pokemon);
    }
  }

  isFavourite(pokemon: Pokemon): boolean {
    return this.favourites.some((fav) => fav.name === pokemon.name);
  }

  resetPagination() {
    this.offset = 0;
    this.pokemons = [];
    this.allPokemons = [];
  }
}
