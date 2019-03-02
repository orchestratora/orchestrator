import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function getStepAnimation(name: string) {
  return [
    trigger(`${name}Backward`, [stepAnimationTransition(name, false)]),
    trigger(`${name}Forward`, [stepAnimationTransition(name, true)]),
    trigger(`${name}Prev`, []),
    trigger(`${name}Next`, []),
  ];
}

export function stepAnimationTransition(name: string, forwards: boolean) {
  return transition('* <=> *', [
    // Initial state
    style({
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
      'flex-direction': 'row',
      'flex-wrap': 'nowrap',
    }),
    query(`@${name}Prev, @${name}Next`, [
      style({
        width: '100%',
        'flex-shrink': 0,
        'will-change': 'transform',
      }),
    ]),
    query(
      `@${name}Prev`,
      [style({ position: 'absolute', top: 0 }), animateChild()],
      { optional: true },
    ),
    query(
      `@${name}Next`,
      style({ transform: `translateX(${forwards ? '' : '-'}100%)` }),
    ),
    // Transition
    group([
      query(
        `@${name}Prev`,
        animate(
          '300ms ease-out',
          style({ transform: `translateX(${forwards ? '-' : ''}100%)` }),
        ),
        { optional: true },
      ),
      query(
        `@${name}Next`,
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ),
    ]),
    query(`@${name}Next`, animateChild()),
  ]);
}
