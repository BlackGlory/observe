# observe
A module for observing things happening.

## Install

```sh
npm install --save @blackglory/observe
# or
yarn add @blackglory/observe
```

## API

- `function observeUrlChanges(): Observable<void>`
- `function observeStateChanges(): Observable<void>`
- `function observeAdditionOfDescendantNodes(node: Node): Observable<Node[]>`
- `function observeRemovalOfDescendantNodes(node: Node): Observable<Node[]>`
