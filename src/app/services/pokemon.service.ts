import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private favouritesSubject = new BehaviorSubject<Pokemon[]>([]);
  favourites$ = this.favouritesSubject.asObservable();
  constructor(private http: HttpClient) {}

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
      .pipe(map((response: any) => response.results));
  }

  getPokemonDetail(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${name}`);
  }

  getPokemonWithDetails(offset: number, limit: number): Observable<any> {
    return this.getPokemonList(offset, limit).pipe(
      map((pokemons) => {
        const detailRequests = pokemons.map((pokemon: any) =>
          this.http.get<any>(pokemon.url)
        );
        return forkJoin(detailRequests);
      }),
      switchMap((detailsObservable) => detailsObservable)
    );
  }

  getPokemonByType(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/type/${type}`).pipe(
      map((response: any) =>
        response.pokemon.map((p: any) => ({
          name: p.pokemon.name,
          url: p.pokemon.url,
        }))
      ),
      switchMap((pokomonList) => {
        const detailRequests = pokomonList.map((pokemon: any) =>
          this.http.get<any>(pokemon.url)
        );
        return forkJoin(detailRequests);
      })
    );
  }

  getPokemonTypes(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/type`)
      .pipe(map((response: any) => response.results));
  }

  addFavourite(pokemon: any) {
    const favourites = this.favouritesSubject.value;
    const existingFavourite = favourites.find(
      (fav) => fav.name === pokemon.name
    );
    if (existingFavourite) return false;

    this.favouritesSubject.next([...this.favouritesSubject.value, pokemon]);
    return true;
  }

  removeFavourite(pokemon: any) {
    this.favouritesSubject.next(
      this.favouritesSubject.value.filter((fav) => fav.name !== pokemon.name)
    );
  }
}
