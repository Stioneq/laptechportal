import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {BaseFilter} from '../model/base-filter';
import {FormGroup} from '@angular/forms';
import {RangeFilterViewComponent} from '../component/range-filter-view/range-filter-view.component';
import {TextFilterViewComponent} from '../component/text-filter-view/text-filter-view.component';
import {FilterView} from '../model/filter-view';
import {ListFilterViewComponent} from '../component/list-filter-view/list-filter-view.component';
import {DynamicComponentService} from "../service/dynamic-component.service";




@Directive({
  selector: '[appFilterView]'
})
export class FilterViewDirective implements OnInit {

  @Input() filter: BaseFilter<any>;
  @Input() form: FormGroup;
  private component: ComponentRef<FilterView<any>>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef,
              private dynamicComponentService: DynamicComponentService) {
  }

  ngOnInit(): void {
    const component = this.dynamicComponentService.get(this.filter.type);
    const factory = this.resolver.resolveComponentFactory<FilterView<any>>(component);
    this.component = this.container.createComponent(factory);
    this.component.instance.form = this.form;
    this.component.instance.filter = this.filter;
  }
}
