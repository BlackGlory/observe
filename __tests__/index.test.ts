import * as Index from '@src/index'

test('Index', () => {
  expect(Object.keys(Index).sort()).toEqual([
    'observeUrlChanges'
  , 'observeStateChanges'
  , 'observeAdditionOfDescendantNodes'
  , 'observeRemovalOfDescendantNodes'
  ].sort())
})
