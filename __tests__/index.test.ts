import * as Index from '@src/index.js'

test('Index', () => {
  expect(Object.keys(Index).sort()).toEqual([
    'observeURLChanges'
  , 'observeStateChanges'
  , 'observeAdditionOfDescendantNodes'
  , 'observeRemovalOfDescendantNodes'
  ].sort())
})
