import { Observable, firstValueFrom } from 'rxjs'
import { observeStateChanges } from '@src/observe-state-changes'
import { waitForStateChanged } from '@blackglory/wait-for'
import 'core-js/web/queue-microtask'

describe('observeStateChanges(): Observable<void>', () => {
  it('push when location.hash changed', async () => {
    const result = observeStateChanges()
    queueMicrotask(() => location.hash = 'test')
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toBeUndefined()
  })

  it('push when history.back called', async () => {
    history.pushState(null, 'test')
    const result = observeStateChanges()
    queueMicrotask(() => history.back())
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toBeUndefined()
  })

  it('push when history.forward called', async () => {
    history.pushState(null, 'test')
    await historyBack()

    const result = observeStateChanges()
    queueMicrotask(() => history.forward())
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toBeUndefined()
  })

  it('push when history.go called', async () => {
    history.pushState(null, 'test')
    history.pushState(null, 'test')
    await historyBack()
    await historyBack()

    const result = observeStateChanges()
    queueMicrotask(() => history.go(2))
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toBeUndefined()
  })

  it('push when history.pushState called', async () => {
    const result = observeStateChanges()
    queueMicrotask(() => history.pushState(null, 'test'))
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toBeUndefined()
  })

  it('push when history.replaceState called', async () => {
    const result = observeStateChanges()
    queueMicrotask(() => history.replaceState(null, 'test'))
    const proResult = await firstValueFrom(result)

    expect(result).toBeInstanceOf(Observable)
    expect(proResult).toBeUndefined()
  })
})

function historyBack() {
  history.back()
  return waitForStateChanged() // history.back() is async
}
