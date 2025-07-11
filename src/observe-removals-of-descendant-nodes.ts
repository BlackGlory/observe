import { observeMutations } from './observe-mutations.js'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import * as Iter from 'iterable-operator'

export function observeRemovalsOfDescendantNodes(node: Node): Observable<Node[]> {
  return observeMutations(
    node
  , { childList: true, subtree: true }
  ).pipe(
    map(records => Iter.toArray(Iter.flatMap(records, x => x.removedNodes)))
  , filter(removedNodes => removedNodes.length > 0)
  )
}
