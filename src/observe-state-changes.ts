import { Observable, Subscriber, fromEvent, merge } from 'rxjs'
import { map } from 'rxjs/operators'

export function observeStateChanges(): Observable<void> {
  return merge(
    observePushState()
  , observeReplaceState()
  , fromEvent(window, 'popstate')
  , fromEvent(window, 'hashchange')
  ).pipe(
    map(_ => undefined)
  )
}

const pushStateHooks = new Set<Subscriber<void>>()
let pushStateHookRegistered = false

function observePushState(): Observable<void> {
  return new Observable(observer => {
    ensurePushStateHook()

    pushStateHooks.add(observer)
    return () => pushStateHooks.delete(observer)
  })

  function ensurePushStateHook(): void {
    if (pushStateHookRegistered) return

    const pushState = history.pushState
    // 该猴子补丁不可复原, 因为在打上补丁后可能有其他代码也选择劫持`history.pushState`.
    history.pushState = function (...args) {
      Reflect.apply(pushState, this, args)
      pushStateHooks.forEach(observer => observer.next())
    }

    pushStateHookRegistered = true
  }
}

const replaceStateHooks = new Set<Subscriber<void>>()
let replaceStateHookRegistered = false

function observeReplaceState(): Observable<void> {
  return new Observable(observer => {
    ensureReplaceStateHook()

    replaceStateHooks.add(observer)
    return () => replaceStateHooks.delete(observer)
  })

  function ensureReplaceStateHook(): void {
    if (replaceStateHookRegistered) return

    const replaceState = history.replaceState
    // 该猴子补丁不可复原, 因为在打上补丁后可能有其他代码也选择劫持`history.replaceState`.
    history.replaceState = function (...args) {
      Reflect.apply(replaceState, this, args)
      replaceStateHooks.forEach(observer => observer.next())
    }

    replaceStateHookRegistered = true
  }
}
