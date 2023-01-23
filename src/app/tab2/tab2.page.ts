import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { map } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  pokemons: any[] = [];
  offset = 0;
  numberPokemon = 5;

  constructor(private http: HttpClient) {
    this.getPokemons();
  }

  getPokemons() {
    // Récupération de la liste de pokemons
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=151').subscribe(
      (data: any) => {
        data.results.forEach((pokemon: { url: string; }) => {
          // Récupération des détails de chaque pokemon
          this.http.get(pokemon.url).subscribe(
            (pokemonData: any) => {
              this.pokemons.push({
                name: pokemonData.name,
                weight: pokemonData.weight,
                height: pokemonData.height,
                base_experience: pokemonData.base_experience,
                hp: pokemonData.stats[0].base_stat,
                types: pokemonData.types[0].type.name,
                order: pokemonData.order,
                image: pokemonData.sprites.front_default
              });
            }
          );
        });
      }
    );
  }

  public onIonInfinite(event: any) {
    this.offset += this.numberPokemon;
    this.getPokemons();
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, this.numberPokemon);
  } 
}

