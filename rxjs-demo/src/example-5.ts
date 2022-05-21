/*
  Example 5: Observables and Composing Operators
*/

import { fromEvent } from 'rxjs';
import { map, scan, mergeWith } from 'rxjs/operators';

const incrementClicks$ = fromEvent(document.getElementById('increment'), 'click');
const decrementClicks$ = fromEvent(document.getElementById('decrement'), 'click');

const clicks$ = incrementClicks$.pipe(
  mergeWith(decrementClicks$),
  map((event: any) => parseInt(event.target.value, 10))
);

const total$ = clicks$.pipe(
  scan((total, value) => total + value, 0)
);

total$.subscribe(total => {
  document.getElementById('counter').innerText = total.toString();
});

// ----i------------------>
// -------d---------d----->
//          merge
// ----i--d---------d----->
//           map
// ----p--n---------n----->
//           scan
// 0---1--0-------(-1)---->