import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Hero } from '../hero.ts';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators'; 

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  redditData : any;

  @ViewChild('searchBox') myInput : ElementRef;
  
  constructor(private heroService : HeroService, private messageService:MessageService) { }

  
  ngOnInit() {
  //  this.getHeroes();
    this.getReddit();
   
  }

  ngAfterViewInit(){
    const typeahead = fromEvent(this.myInput.nativeElement, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(() => {
        console.log(this.myInput.nativeElement.value);
        return this.heroService.getSubreddit(this.myInput.nativeElement.value);
      })
    );

    typeahead.subscribe((res:any) => {
      this.redditData = res.data.children.map(
        resp => {
          return {
            ...resp, selected : false
          }
        }
      )
    })
  }

  getHeroes() : void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  getReddit(): void {
    this.heroService.getReddit().subscribe(
      (res:any) => {
        this.redditData = res.data.children.map(
          resp => {
            return {
              ...resp, selected : false
            }
          }
        )
      }
    )
  }

  logSelected()
  {
    console.log(this.redditData.filter(el => el.selected));
    console.log(this.myInput);
  }
 
        
     
  
}
