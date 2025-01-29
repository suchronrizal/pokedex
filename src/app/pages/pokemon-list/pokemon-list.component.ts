import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { finalize } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  standalone: false,
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  allPokemons: any[] = [];
  types: any[] = [];
  selectedType: string = '';
  offset: number = 0;
  limit: number = 10;
  isAlertOpen: boolean = false;
  isLoading: boolean = false;
  alertMessage: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.generateItems();
    this.getPokemonTypes();
  }

  getPokemonTypes() {
    this.pokemonService.getPokemonTypes().subscribe((types) => {
      this.types = types;
    });
  }

  filterByType(type: string) {
    this.selectedType = type;
    this.offset = 0;
    this.pokemons = [];
    this.allPokemons = [];

    this.generateItems();
  }

  generateItems() {
    if (this.selectedType) {
      this.isLoading = true;
      if (this.offset === 0) {
        this.pokemonService
          .getPokemonByType(this.selectedType)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({
            next: (details) => {
              this.allPokemons = details.map((pokemon: any) => ({
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                url: pokemon.url,
                types: pokemon.types.map((type: any) => type.type.name),
              }));
              //Buat dynanic pagination
              this.pokemons = this.allPokemons.slice(0, this.limit);
              this.offset += this.limit;
            },
            error: (error) => {
              console.log(error);
              this.isLoading = false;
            },
          });
      } else {
        // Offset akan di tambahkan berdasarkan limit jika terjadi load more data
        const newPokemons = this.allPokemons.slice(
          this.offset,
          this.offset + this.limit
        );
        this.pokemons = [...this.pokemons, ...newPokemons];
        this.isLoading = false;
      }
    } else {
      this.pokemonService
        .getPokemonWithDetails(this.offset, this.limit)
        .subscribe({
          next: (details) => {
            this.allPokemons = [
              ...this.allPokemons,
              ...details.map((pokemon: any) => ({
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                url: pokemon.species.url,
                types: pokemon.types?.map((type: any) => type.type.name) || [],
              })),
            ];
            //Buat dynanic pagination
            this.pokemons = [...this.allPokemons];
            this.offset += this.limit;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  addToFavourites(pokemon: any) {
    this.isAlertOpen = false;
    if (pokemon) {
      const isAdded = this.pokemonService.addFavourite(pokemon);
      if (!isAdded) {
        this.isAlertOpen = true;
        this.alertMessage = `${pokemon.name} added to favourites`;
      }
    }
  }
}
