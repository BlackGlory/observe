import { observeMutations } from './observe-mutations.js'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import * as Iter from 'iterable-operator'

export function observeAdditionOfDescendantNodes(node: Node): Observable<Node[]> {
  return observeMutations(
    node
  , { childList: true, subtree: true }
  ).pipe(
    map(records => Iter.toArray(Iter.flatMap(records, x => x.addedNodes)))
  , filter(addedNodes => addedNodes.length > 0)
  )
}
