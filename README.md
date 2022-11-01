# observe
A module for observing things happening.

## Install
```sh
npm install --save @blackglory/observe
# or
yarn add @blackglory/observe
```

## API
### observeUrlChanges
```ts
function observeUrlChanges(): Observable<void>
```

### observeStateChanges
```ts
function observeStateChanges(): Observable<void>
```

### observeAdditionOfDescendantNodes
```ts
function observeAdditionOfDescendantNodes(node: Node): Observable<Node[]>
```

### observeRemovalOfDescendantNodes
```ts
function observeRemovalOfDescendantNodes(node: Node): Observable<Node[]>
```
