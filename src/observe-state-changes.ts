import { Observable, Subscriber, fromEvent, merge } from 'rxjs'
import { map } from 'rxjs/operators'

const pushStateHooks = new Set<Subscriber<void>>()
const replaceStateHooks = new Set<Subscriber<void>>()
let pushStateHookRegistered = false
let replaceStateHookRegistered = false

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

function observePushState(): Observable<void> {
  return new Observable(observer => {
    if (!pushStateHookRegistered) {
      registerPushStateHook()
    }
    pushStateHooks.add(observer)
    return () => pushStateHooks.delete(observer)
  })
}

function observeReplaceState(): Observable<void> {
  return new Observable(observer => {
    if (!replaceStateHookRegistered) {
      registerReplaceStateHook()
    }
    replaceStateHooks.add(observer)
    return () => replaceStateHooks.delete(observer)
  })
}

function registerPushStateHook() {
  const pushState = history.pushState
  history.pushState = function (...args) {
    Reflect.apply(pushState, this, args)
    pushStateHooks.forEach(observer => observer.next())
  }
  pushStateHookRegistered = true
}

function registerReplaceStateHook() {
  const replaceState = history.replaceState
  history.replaceState = function (...args) {
    Reflect.apply(replaceState, this, args)
    replaceStateHooks.forEach(observer => observer.next())
  }
  replaceStateHookRegistered = true
}
