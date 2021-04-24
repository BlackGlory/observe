import { fromMutationObserver } from '@utils/from-mutation-observer'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { IterableOperator } from 'iterable-operator/lib/es2015/style/chaining'

export function observeAdditionOfDescendantNodes(node: Node): Observable<Node[]> {
  return fromMutationObserver(
    node
  , { childList: true, subtree: true }
  ).pipe(
    map(records => new IterableOperator(records)
      .map(x => x.addedNodes)
      .flatten<Node>()
      .toArray()
    )
  , filter(addedNodes => addedNodes.length > 0)
  )
}
