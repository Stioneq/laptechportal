import * as d3 from 'd3';

export function radiusTransition(arc: any, fromRadius: number, toRadius: number) {
  return function (d) {
    const interpolateRadius = d3.interpolate(fromRadius, toRadius);
    return function (t) {
      d.outerRadius = interpolateRadius(t);
      return arc(d);
    };
  };
}

/**
 * Creates transition for given selection, should be used with call method
 * @param selection
 * @param config animation config
 * @param delay delay of transition in milliseconds
 * @param duration duration of transition in milliseconds
 * @param easing
 * @returns {any}
 */
export function withTransition(selection, config, delay, duration, easing) {
  if (config.enabled) {
    let _delay = delay;
    if (!isFunction(delay)) {
      _delay = () => delay;
    }
    return selection.transition().delay((d, i) => _delay(d, i) * config.speed).duration(duration * config.speed).ease(easing);
  } else {
    return selection;
  }
}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
