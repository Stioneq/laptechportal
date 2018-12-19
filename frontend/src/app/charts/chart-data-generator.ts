export function generate() {
  const arr = Array(10).fill(1)
    .map((d, i) => ({
      title: 'A' + i,
      values: Array(3).fill(1).map( _ => Math.round(Math.random() * 500))
    }));
  /*  [{title: 'A', values: [5, 10, 20]}, {title: 'B', values: [5, 10, 20]}]*/
  return {data: arr};
}
