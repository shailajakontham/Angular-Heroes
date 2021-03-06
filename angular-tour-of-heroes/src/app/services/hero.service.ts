import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero.ts';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = '/heroes';
  constructor(private http: HttpClient,private messageService : MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getReddit()
  {
    return this.http.get('https://www.reddit.com/r/news.json');
  }

  getSubreddit(sub)
  {
    return this.http.get('https://www.reddit.com/r/'+sub+'.json');
  }
}
