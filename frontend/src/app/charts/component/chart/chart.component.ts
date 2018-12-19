import * as d3 from 'd3';
import 'd3-selection-multi';
import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ToastService} from '../../../toast/service/toast.service';
import {generate} from '../../chart-data-generator';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input('model') model = generate();
  @Input('config') config = {
    margin: {left: 50, top: 10, right: 10, bottom: 50}
  };
  @ViewChild('chart') chart: ElementRef;
  private svg: any;

  private helpers: any = {};
  private interval: any;

  constructor(private notificationService: ToastService) {
  }


  ngOnInit() {
    console.log(this.chart.nativeElement);
    console.log('init');
  }

  ngAfterViewInit(): void {
    this.interval = setInterval(()=>{
      this.refreshData();
    }, 1000);

    const svg = this.svg = d3.select(this.chart.nativeElement);
    const config = this.config;
    const w = this.helpers.w = parseInt(svg.style('width'), 10) - config.margin.left - config.margin.right;
    const h = this.helpers.h = parseInt(svg.style('height'), 10) - config.margin.top - config.margin.bottom;
    /*this.notificationService.sendInfoMessage('svg wh', `w:${w}, h:${h}`);*/
    const chartGroup = svg.append('g').classed('chartGroup', true);
    chartGroup
      .attr('transform', `translate(${config.margin.left},${config.margin.top})`);
    this.initScales();
    this.drawAxis(chartGroup);
    console.log('after view init');
    this.renderChart(chartGroup);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
  }

  ngOnDestroy(): void {
    console.log(this.chart.nativeElement);
    clearInterval(this.interval);
    console.log('on destroy');
  }

  refreshData() {
    this.model = generate();
    this.updateChart();
  }

  private initScales() {
    this.helpers.xScale = d3.scaleBand().rangeRound([0, this.helpers.w]).paddingOuter(0.2).paddingInner(0.3);
    this.helpers.yScale = d3.scaleLinear().range([this.helpers.h, 0]);
    this.helpers.groupScale = d3.scaleBand().paddingInner(0.1);
  }

  private drawAxis(chartGroup: any) {
    const xAxis = d3.axisTop(this.helpers.xScale);
    const yAxis = d3.axisLeft(this.helpers.yScale);
    chartGroup.append('g').classed('xAxis', true)
      .attr('transform', `translate(0,${this.helpers.h})`)
      .call(xAxis);
    chartGroup.append('g').classed('yAxis', true).call(yAxis);
  }

  private drawChart(chartGroup: any) {
    const model = this.model;
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const barGroups = chartGroup.selectAll('.barGroup')
      .data(model.data);
    const groups = barGroups
      .enter().append('g').classed('barGroup', true).merge(barGroups).attrs({
        'transform': (d, i) => `translate(${this.helpers.xScale(i)},0)`
      }).selectAll('.bar').data(d => d.values);
    groups.enter()
      .append('rect').classed('bar', true)
      .merge(groups)
      .attr('x', (d, i) => this.helpers.groupScale(i))

      .attr('width', this.helpers.groupScale.bandwidth)
      .attr('fill', (d, i) => colors(i))
      .on('mouseover', function () {
        d3.select(this).attr('opacity', '.7');
      })
      .on('mouseout', function () {
        d3.select(this).attr('opacity', '1');
      }).transition().duration(1000).attrs({
      'height': d => this.helpers.yScale(d),
      'y' : (d, i) => this.helpers.h - this.helpers.yScale(d)
    });


    /*
      .merge(circles)
      .transition().duration(1000)
      .attrs({
        'r': d => d,
        'fill': (d, i) => colors(i),
        'cx': (d, i) => this.helpers.xScale(i),
        'cy': d => this.helpers.yScale(d)
      });*/
  }

  private updateScales() {
    const model = this.model;
    this.helpers.xScale.domain(model.data.map((d, i) => i));
    this.helpers.yScale.domain([0, d3.max(model.data, d => d3.max(d.values)) * 1.2]);
    this.helpers.groupScale.domain(model.data[0].values.map((d, i) => i)).rangeRound([0, this.helpers.xScale.bandwidth()]);
  }

  private updateChart() {
    const chartGroup = this.svg.select('.chartGroup');
    this.renderChart(chartGroup);
  }

  private renderChart(chartGroup: any) {
    this.updateScales();
    this.updateAxis(chartGroup);
    this.drawChart(chartGroup);
  }

  private updateAxis(chartGroup: any) {
    const xAxis = d3.axisTop(this.helpers.xScale);
    const yAxis = d3.axisLeft(this.helpers.yScale);
    chartGroup.select('.xAxis').transition().duration(1000).call(xAxis);
    chartGroup.select('.yAxis').transition().duration(1000).call(yAxis);
  }
}

