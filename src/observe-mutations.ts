import { Observable } from 'rxjs'

export function observeMutations(
  ...args: Parameters<MutationObserver['observe']>
): Observable<MutationRecord[]> {
  return new Observable(subscriber => {
    const observer = new MutationObserver(
      mutationList => subscriber.next(mutationList)
    )
    observer.observe(...args)
    return () => observer.disconnect()
  })
}
