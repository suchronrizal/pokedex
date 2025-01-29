import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pokemonPipe', standalone: false })
export default class PokemonPipe implements PipeTransform {
  transform(
    value: { ability?: { name: string }; type?: { name: string } }[] | null,
    key: 'ability' | 'type'
  ): string {
    if (!Array.isArray(value) || value.length === 0) return 'Unknown';
    return value
      .map((item) => (key === 'ability' ? item.ability?.name : item.type?.name))
      .join(', ');
  }
}
