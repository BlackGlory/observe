import { Observable, firstValueFrom } from 'rxjs'
import { observeRemovalOfDescendantNodes }
  from '@src/observe-removal-of-descendant-nodes'
import 'core-js/web/queue-microtask'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('observeRemovalOfDescendantNodes(node: Node): Observable<Node[]>', () => {
  it('push when new children node is added', async () => {
    const node = document.createElement('div')
    document.body.append(node)

    const result = observeRemovalOfDescendantNodes(document.body)
    queueMicrotask(() => document.body.append(node))
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toEqual([node])
  })
})
