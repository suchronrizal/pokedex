import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  standalone: false,
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const name = params['name'];
      if (!name) {
        console.log('No Pokemon name provided, redirecting...');
        this.router.navigate(['/pokemon-list'], { replaceUrl: true });
        return;
      }
      this.pokemonService.getPokemonDetail(name).subscribe((item) => {
        this.pokemon = item;
      });
    });
  }

  addToFavourites(pokemon: any) {}
}
