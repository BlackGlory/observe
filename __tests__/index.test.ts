import * as Index from '@src/index.js'

test('Index', () => {
  expect(Object.keys(Index).sort()).toEqual([
    'observeUrlChanges'
  , 'observeStateChanges'
  , 'observeAdditionOfDescendantNodes'
  , 'observeRemovalOfDescendantNodes'
  ].sort())
})
