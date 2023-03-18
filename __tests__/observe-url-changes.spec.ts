import { observeURLChanges } from '@src/observe-url-changes.js'
import { Observable, firstValueFrom } from 'rxjs'

describe('observeURLChanges(): Observable<void>', () => {
  it('push when url changed', async () => {
    const result = observeURLChanges()
    queueMicrotask(() => location.hash = 'test')
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toBeUndefined()
  })
})
