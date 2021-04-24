import { fromMutationObserver } from '@utils/from-mutation-observer'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs'

export function observeRemovalOfDescendantNodes(node: Node): Observable<Node[]> {
  return fromMutationObserver(
    node
  , { childList: true, subtree: true }
  ).pipe(
    map(records => records.map(x => Array.from(x.removedNodes)).flat())
  , filter(removedNodes => removedNodes.length > 0)
  )
}
