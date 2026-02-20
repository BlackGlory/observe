import { Observable, firstValueFrom } from 'rxjs'
import { observeAdditionsOfDescendantNodes } from '@src/observe-addtions-of-descendant-nodes.js'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('observeAdditionsOfDescendantNodes', () => {
  it('push when a child node is added', async () => {
    const node = document.createElement('div')

    const result = observeAdditionsOfDescendantNodes(document.body)
    queueMicrotask(() => document.body.append(node))
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toEqual([node])
  })
})
