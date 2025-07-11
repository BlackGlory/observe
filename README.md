# observe
A module for observing things happening.

## Install
```sh
npm install --save @blackglory/observe
# or
yarn add @blackglory/observe
```

## API
### observeURLChanges
```ts
function observeURLChanges(): Observable<void>
```

### observeStateChanges
```ts
function observeStateChanges(): Observable<void>
```

### observeAdditionsOfDescendantNodes
```ts
function observeAdditionsOfDescendantNodes(node: Node): Observable<Node[]>
```

### observeRemovalsOfDescendantNodes
```ts
function observeRemovalsOfDescendantNodes(node: Node): Observable<Node[]>
```

### observeMutations
```ts
function observeMutations(
  ...args: Parameters<MutationObserver['observe']>
): Observable<MutationRecord[]>
```
