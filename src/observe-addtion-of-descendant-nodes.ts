import { fromMutationObserver } from '@utils/from-mutation-observer'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs'

export function observeAdditionOfDescendantNodes(node: Node): Observable<Node[]> {
  return fromMutationObserver(
    node
  , { childList: true, subtree: true }
  ).pipe(
    map(records => records.map(x => Array.from(x.addedNodes)).flat())
  , filter(addedNodes => addedNodes.length > 0)
  )
}
