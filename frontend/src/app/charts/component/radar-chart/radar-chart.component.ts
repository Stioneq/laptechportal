import {AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import 'd3-selection-multi';
import {radiusTransition, withTransition} from '../../util/animation.util';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  model = {
    center: {value: 50, percentage: 0.5},
    values: [100, 50, 60, 50, 30, 30, 50, 100, 5, 10, 20, 30],
    captions: ['A', 'dsa', 'dsad', 'B', 'Test',
      'Dasd', 'ADs', 'A', 'dasd', 'dsadas', 'dsadsad', 'd']
  };
  config = {
    font: {calc: true, multiplier: 0.025},
    animation: {speed: 1, enabled: true},
    margin: {left: 50, top: 10, right: 10, bottom: 50}
  };
  @ViewChild('chart') chart: ElementRef;
  private svg: any;
  private helpers: any = {};
  private nonRotatable: any;

  constructor() {

  }

  ngOnInit() {
    console.log(this.chart.nativeElement);
    console.log('init');
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  private draw() {
    const svg = this.svg = d3.select(this.chart.nativeElement);
    const config = this.config;
    const w = this.helpers.w = parseInt(svg.style('width'), 10) - config.margin.left - config.margin.right;
    const h = this.helpers.h = parseInt(svg.style('height'), 10) - config.margin.top - config.margin.bottom;
    const r = this.helpers.r = Math.min(w, h) * 0.8;
    const chartGroup = svg.append('g').classed('chartGroup', true);
    this.nonRotatable = svg.append('g').classed('nonRotatable', true);
    this.applyBaseFont(svg);
    this.initScales();

    chartGroup
      .attr('transform', `translate(${config.margin.left + w / 2},${config.margin.top + h / 2})`);
    this.nonRotatable.attr('transform', `translate(${config.margin.left + w / 2},${config.margin.top + h / 2})`);
    this.initGradients(svg);
    this.renderChart(chartGroup);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
  }

  ngOnDestroy(): void {
    console.log(this.chart.nativeElement);
    console.log('on destroy');
  }

  refreshData() {
    //  this.model = generate();
    this.updateChart();
  }

  private initScales() {
    this.helpers.barScale = d3.scaleLinear();
    this.helpers.pie = d3.pie().startAngle(0).endAngle(Math.PI * 2).value(1);

  }

  private drawChart(chartGroup: any) {

    this.drawFourthCircle(chartGroup);
    this.drawThirdCircle(chartGroup);
    this.drawSecondCircle(chartGroup);
    this.drawFirstCircle();

    this.drawPieGroups(chartGroup);
  }


  private updateChart() {
    const chartGroup = this.svg.select('.chartGroup');
    this.renderChart(chartGroup);
  }

  private renderChart(chartGroup: any) {
    this.drawChart(chartGroup);
  }


  private drawFirstCircle() {
    const model = this.model;
    const circleGroup = this.nonRotatable.selectAll('.centerCircle').data([this.model.center]).enter().append('g');
    circleGroup.append('circle')
      .attrs({
        'r': 0,
        'fill': '#999'
      }).classed('centerCircle', true);
    withTransition(circleGroup, this.config.animation, 0, 500, d3.easeLinear)
      .attrs({
        'r': this.calcRelativeValue(0.2)
      });
    const centerText = circleGroup.append('text').attrs({
      'opacity': 0,
      'fill': '#fff',
      'text-anchor': 'middle',
      'alignment-baseline': 'middle'
    });

    const valueSpan = centerText.append('tspan').text((d) => 'Total: ' + d.value)
      .attrs({
        'fill': '#fff',
        'font-size': '1.4em'
      });
    const height = valueSpan.node().getBBox().height;
    const percentageSpan = centerText.append('tspan')
      .html((d) => d.percentage + ' &#9824;').attrs({'dy': height, 'x': 0});
    withTransition(centerText.attr('fill', 'red').attr('transform', 'scale(5)'), this.config.animation, 4000, 1000, d3.easeBounce)
      .attrs({
        'transform': 'scale(1)',
        'fill': '#fff',
        'opacity': 1
      });

  }

  /**
   * Calculate relative size based on the radius value
   * @param {number} rel should be 0 < rel <= 1 for consistency
   * @returns {number}
   */
  private calcRelativeValue(rel: number) {
    return this.helpers.r * rel;
  }

  private drawSecondCircle(chartGroup: any) {
    const model = this.model;
    const circle = chartGroup.selectAll('.secondCircle').data([this.model.center]).enter().append('circle')
      .attrs({
        'r': 0,
        'fill': '#000'
      }).classed('secondCircle', true);
    withTransition(circle, this.config.animation, 300, 500, d3.easeLinear)
      .attrs({
        'r': this.calcRelativeValue(0.3),
      });
  }

  private drawThirdCircle(chartGroup: any) {
    const model = this.model;
    const circle = chartGroup.selectAll('.thirdCircle').data([this.model.center]).enter().append('circle')
      .attrs({
        'r': 0,
        'fill': '#999'
      }).classed('thirdCircle', true);
    withTransition(circle, this.config.animation, 800, 500, d3.easeLinear)
      .attrs({
        'r': this.calcRelativeValue(0.5)
      });
  }

  private drawFourthCircle(chartGroup: any) {
    const model = this.model;
    const circle = chartGroup.selectAll('.fourthCircle').data([this.model.center]).enter().append('circle')
      .attrs({
        'r': 0,
        'fill': '#000'
      }).classed('fourthCircle', true);
    withTransition(circle, this.config.animation, 1200, 500, d3.easeLinear)
      .attrs({
        'r': this.calcRelativeValue(0.60)
      });
  }

  private drawPieGroups(chartGroup: any) {
    const model = this.model;
    const svg = this.svg;
    const config = this.config;
    const helpers = this.helpers;
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const pieGroups = chartGroup.selectAll('.arcGroup').data(this.helpers.pie(model.values)).enter()
      .append('g').classed('arcGroup', true);
    pieGroups.on('click', function (d, i) {
      const a = chartGroup.attr('transform');

      withTransition(chartGroup, config.animation, 0, 1000, d3.easeLinear).attrs({
        'transform': `rotate(${-(d.startAngle + (d.endAngle - d.startAngle) / 2) / Math.PI * 180},${helpers.w / 2 + config.margin.left},${helpers.h / 2 + config.margin.top})
           translate(${helpers.w / 2 + config.margin.left},${helpers.h / 2 + config.margin.top})`
      });

    });
    this.drawArcs(pieGroups);
    this.drawBars(pieGroups);
    this.drawOuterText(pieGroups);

  }

  private drawArcs(pieGroups: any) {
    const startRadius = this.calcRelativeValue(0.3);
    const endRadius = this.calcRelativeValue(0.6);
    const arc = d3.arc().innerRadius(startRadius);
    const arcs = pieGroups.append('path').classed('arc', true)
      .attrs({
        'd': arc,
        'stroke': '#000',
        'fill': 'none'
      });
    withTransition(arcs, this.config.animation, 4000, 500, d3.easeLinear)
      .attrTween('d', radiusTransition(arc, startRadius, endRadius));
  }

  private drawBars(pieGroups: any) {
    const model = this.model;

    const innerRadius = this.calcRelativeValue(0.3);
    const outerRadius = this.calcRelativeValue(0.5);
    const that = this;
    const maxValue = d3.max(model.values);
    this.helpers.barScale.domain([0, maxValue]).rangeRound([innerRadius, outerRadius]);
    const colorsScale = d3.scaleSequential(d3.interpolateRgb('#000', '#2580b3')).domain([0, maxValue]);

    const bar = d3.arc().innerRadius(innerRadius);
    const bars = pieGroups.append('path')
      .attr('d', (d, i) => {
        console.log(d);
        return bar(d);
      }).attr('fill', (d, i) => colorsScale(d.data));
    withTransition(bars, this.config.animation, (d, i) => 50 * i + 2000, 100, d3.easeLinear)
      .attrTween('d', function (d) {

        return radiusTransition(bar, innerRadius, that.helpers.barScale(d.data))(d);
      });
  }

  private drawOuterText(pieGroups: any) {
    const startRadius = this.calcRelativeValue(0.5);
    const endRadius = this.calcRelativeValue(0.6);
    const arc = d3.arc().innerRadius(startRadius);
    const textRadius = (endRadius - startRadius) / 2 + startRadius;
    const textArc = d3.arc().innerRadius(textRadius).outerRadius(textRadius);
    const arcs = pieGroups.append('path').classed('arc', true)
      .attrs({
        'd': arc,
        'fill': '#fff'
      });
    const textArcs = pieGroups.append('path').classed('textArc', true)
      .attrs({
        'd': textArc,
        'fill': 'none',
        'opacity': 0
      }).attr('id', (d, i) => 'outer' + i);
    const text = pieGroups.append('text').attr('opacity', '0');
    text.append('textPath').attr('xlink:href', (d, i) => '#outer' + i).text((d, i) => this.model.captions[i]).attr('text-anchor', 'middle')
      .attr('startOffset', '25%').attr('alignment-baseline', 'middle');
    withTransition(text, this.config.animation, 5000, 1000, d3.easeLinear).attr('opacity', 1);


    withTransition(arcs, this.config.animation, 3000, 500, d3.easeLinear)
      .attrTween('d', radiusTransition(arc, startRadius, endRadius));
  }

  private applyBaseFont(svg: any) {
    const fontConfig: any = this.config.font;
    if (fontConfig && fontConfig.calc && fontConfig.multiplier) {
      fontConfig.size = fontConfig.multiplier && this.calcRelativeValue(fontConfig.multiplier) + 'px' || '16px';
    }
    svg.style('font-size', fontConfig.size);
  }

  onResize() {
    this.svg.selectAll('*').remove();
    this.draw();
  }

  private initGradients(svg: any) {
    const radialGradient = svg.append('defs')
      .append('radialGradient')
      .attr('gradientUnits', 'objectBoundingBox')
      .attr('id', 'bar-gradient')
      .attr('x1', '50%')
      .attr('y1', '50%')
      .attr('x2', '100%')
      .attr('y2', '100%');

    radialGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#000');

    radialGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2580b3');
  }
}
