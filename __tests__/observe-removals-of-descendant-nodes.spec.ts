import { Observable, firstValueFrom } from 'rxjs'
import { observeRemovalsOfDescendantNodes } from '@src/observe-removals-of-descendant-nodes.js'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('observeRemovalsOfDescendantNodes', () => {
  it('push when a child node is removed', async () => {
    const node = document.createElement('div')
    document.body.append(node)

    const result = observeRemovalsOfDescendantNodes(document.body)
    queueMicrotask(() => node.remove())
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toEqual([node])
  })
})
