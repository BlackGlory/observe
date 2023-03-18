import { fromMutationObserver } from '@utils/from-mutation-observer.js'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import * as Iter from 'iterable-operator'

export function observeAdditionOfDescendantNodes(node: Node): Observable<Node[]> {
  return fromMutationObserver(
    node
  , { childList: true, subtree: true }
  ).pipe(
    map(records => Iter.toArray(
      Iter.flatten<Node>(
        Iter.map(records, x => x.addedNodes)
      )
    ))
  , filter(addedNodes => addedNodes.length > 0)
  )
}
