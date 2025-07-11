import { Observable, firstValueFrom } from 'rxjs'
import { observeMutations } from '@src/observe-mutations.js'

afterEach(() => {
  document.body.innerHTML = ''
})

test('observeMutations', async () => {
  const result = observeMutations(document.body, { attributes: true })
  queueMicrotask(() => document.body.setAttribute('foo', 'bar'))
  const proResult = await firstValueFrom(result)

  expect(result).toBeInstanceOf(Observable)
  expect(proResult).toStrictEqual([expect.any(MutationRecord)])
})
