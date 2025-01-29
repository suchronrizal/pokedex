import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { IonicModule } from '@ionic/angular';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-base-layout',
  template: `
    <ion-header>
      <ion-toolbar class="px-3 items-center flex">
        <ion-title slot="start">{{ title$ | async }}</ion-title>
        <ion-button [routerLink]="'/pokemon-list'" fill="clear" slot="end">
          <ion-icon name="home" size="large" class="text-slate-600"></ion-icon>
        </ion-button>
        <ion-buttons slot="end">
          <ion-button
            [routerLink]="'/pokemon-favourites'"
            color="light"
            class="bordered"
            fill="solid"
          >
            <ion-icon name="heart" size="large" color="danger" />{{
              favourites.length
            }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content [fullscreen]="true">
      <div class="flex container justify-center px-5 w-full pt-5">
        <div class="flex mx-auto max-w-sm">
          <ng-content select="[slot=filter]"></ng-content>
        </div>
      </div>
      <div
        class="flex items-center justify-center font-bold mt-5"
        *ngIf="withMessage"
      >
        <span class="text-2xl" *ngIf="data && data.length === 0 && !isLoading"
          >No Pokemons Found</span
        >
        <ion-item *ngIf="isLoading">
          <ion-spinner name="bubbles"></ion-spinner>
          <ion-label>Loading...</ion-label>
        </ion-item>
      </div>
      <ng-content></ng-content>
    </ion-content>
  `,

  styles: [
    `
      ion-content {
        --background: linear-gradient(to bottom, #cee3ff, #056fe7);
      }
      ion-header {
        height: auto;
        ion-toolbar {
          min-height: 56px;
          padding-top: env(safe-area-inset-top);
        }
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class BaseLayoutComponent implements OnInit {
  favourites: any[] = [];
  @Input() data?: any[] = [];
  @Input() isLoading?: boolean = false;
  @Input() withMessage?: boolean = true;
  route = inject(ActivatedRoute);
  router = inject(Router);
  title$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(() => {
      return this.getRouterTitle();
    })
  );

  constructor(private pokemonService: PokemonService) {
    this.setStatusBar();
  }

  async setStatusBar() {
    if (Capacitor.getPlatform() !== 'web') {
      await StatusBar.setOverlaysWebView({ overlay: false });
      await StatusBar.show();
    }
  }

  ngOnInit(): void {
    this.pokemonService.favourites$.subscribe((favourites) => {
      this.favourites = favourites;
    });
  }

  getRouterTitle() {
    let route: ActivatedRoute = this.router.routerState.root;
    let routerTitle = '';
    while (route!.firstChild) {
      route = route.firstChild;
    }
    if (route.snapshot.title) {
      routerTitle = route.snapshot.title;
    }
    return routerTitle;
  }
}
