import { fromMutationObserver } from '@utils/from-mutation-observer.js'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import * as Iter from 'iterable-operator'

export function observeRemovalOfDescendantNodes(node: Node): Observable<Node[]> {
  return fromMutationObserver(
    node
  , { childList: true, subtree: true }
  ).pipe(
    map(records => Iter.toArray(
      Iter.flatten<Node>(
        Iter.map(records, x => x.removedNodes)
      )
    ))
  , filter(removedNodes => removedNodes.length > 0)
  )
}
