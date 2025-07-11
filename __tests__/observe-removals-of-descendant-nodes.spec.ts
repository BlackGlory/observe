import { Observable, firstValueFrom } from 'rxjs'
import { observeRemovalsOfDescendantNodes } from '@src/observe-removals-of-descendant-nodes.js'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('observeRemovalsOfDescendantNodes', () => {
  it('push when new children node is added', async () => {
    const node = document.createElement('div')
    document.body.append(node)

    const result = observeRemovalsOfDescendantNodes(document.body)
    queueMicrotask(() => document.body.append(node))
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toEqual([node])
  })
})
