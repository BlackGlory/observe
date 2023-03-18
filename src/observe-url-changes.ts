import { Observable, animationFrames } from 'rxjs'
import { filter, tap, map } from 'rxjs/operators'

export function observeURLChanges(): Observable<void> {
  let url = document.URL
  return animationFrames().pipe(
    filter(() => url !== document.URL)
  , tap(() => url = document.URL)
  , map(() => undefined)
  )
}
