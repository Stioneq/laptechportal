import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Tag} from '../../model/tag';
import {ColorService} from '../../service/color.service';
import {TagService} from '../../service/tag.service';
import {of, Subject, Subscription} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {IgnoreValuesPipe} from '../../pipe/ignore-values.pipe';
import * as _ from 'lodash';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss']
})
export class TagSelectorComponent implements OnInit, OnDestroy {
  @Input('tags') tags: Tag[] = [];
  @ViewChild('tagInput') input: ElementRef;
  tagPattern = /^[a-zA-Z0-9]+$/;
  searchTerm$ = new Subject<string>();
  hintTags: Tag[] = [];
  searchResultSubscription: Subscription;

  constructor(private colorService: ColorService, private tagService: TagService, private ignorePipe: IgnoreValuesPipe) {
  }

  ngOnInit() {
    this.searchResultSubscription = this.searchTerm$
      .pipe(
        debounceTime(300),
        switchMap(term => this.tagService.searchTags(term).pipe(catchError(err => of([])))),
        map(res => this.ignorePipe.transform(res, this.tags)))
      .subscribe(result => {
        this.hintTags = result;
      });
  }

  onKeyUp(event) {
    this.searchTerm$.next(event.target.value);
    if (event.keyCode === 13) {
      _.first(this.hintTags);
      const alreadyExistedTag = this.hintTags.filter(a => a.title.toLowerCase() === event.target.value.toLowerCase());
      let tag;
      if (alreadyExistedTag && alreadyExistedTag.length === 1) {
        tag = alreadyExistedTag[0];
      } else {
        const color = this.colorService.getRandomColor();
        tag = {title: event.target.value.trim(), ...color};
      }
      this.addNewTag(tag);
    }
  }

  /**
   * Invokes when tags is clicked to be removed
   * @param i
   */
  onTagDelete(i) {
    this.tags.splice(i, 1);
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
    if (event.keyCode === 8 && event.target.value === '' && this.tags.length > 0) {
      this.onTagDelete(this.tags.length - 1);
    } else if (event.keyCode === 9 && this.hintTags.length > 0) {
      this.addNewTag(this.hintTags[0]);
      event.preventDefault();
    }
  }

  onTagClicked(tag: Tag) {
    this.addNewTag(tag);
  }

  private addNewTag(tag: Tag) {
    if (this.isAllowedTag(tag)) {
      this.tags.push(tag);
      this.input.nativeElement.value = '';
      this.searchTerm$.next('');
    }
  }

  private isAllowedTag(tag: Tag) {

    return this.tagPattern.test(tag.title) && !_.find(this.tags, t => t.title.toLowerCase() === tag.title.toLowerCase());
  }

  ngOnDestroy(): void {
    this.searchResultSubscription.unsubscribe();
  }
}
