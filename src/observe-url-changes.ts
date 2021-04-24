import { Observable, animationFrames } from 'rxjs'
import { filter, tap, map } from 'rxjs/operators'

export function observeUrlChanges(): Observable<void> {
  let url = document.URL
  return animationFrames().pipe(
    filter(() => url !== document.URL)
  , tap(() => url = document.URL)
  , map(() => undefined)
  )
}
