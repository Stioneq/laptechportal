import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/internal/operators';
import {Title} from '@angular/platform-browser';


const SEPARATOR = ' > ';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private APP_TITLE = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private title: Title) {
  }


  public init(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        return this.route.firstChild;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(() => this.route.data),
      map(data => {
        if (data.title) {
          return data.title;
        } else {
          // If not, we do a little magic on the url to create an approximation
          return this.router.url.split('/').reduce((acc, frag) => {
            if (acc && frag) {
              acc += SEPARATOR;
            }
            return acc + this.ucFirst(frag);
          });
        }
      })
    )
      .subscribe(data => {
        this.title.setTitle(`${data}`);
      });
  }

  private ucFirst(string) {
    if (!string) {
      return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
