import { Observable, firstValueFrom } from 'rxjs'
import { observeAdditionOfDescendantNodes }
  from '@src/observe-addtion-of-descendant-nodes'
import 'core-js/web/queue-microtask'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('observeAdditionOfDescendantNodes(node: Node): Observable<Node[]>', () => {
  it('push when new children node is added', async () => {
    const node = document.createElement('div')

    const result = observeAdditionOfDescendantNodes(document.body)
    queueMicrotask(() => document.body.append(node))
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toEqual([node])
  })
})
