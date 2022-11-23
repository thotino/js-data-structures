/**
 * https://www.30secondsofcode.org/articles/s/js-data-structures-tree
 * @description A tree is a data structure consisting of a set of linked nodes that represent a hierarchical tree structure.
 */
class TreeNode {
  constructor (key, value = key, parent = null) {
    this.key = key
    this.value = value
    this.parent = parent
    this.children = []
  }

  get isLeave () {
    return this.children.length === 0
  }

  get hasChildren () {
    return !this.isLeave()
  }
}

class Tree {
  constructor (key, value) {
    this.root = new TreeNode(key, value)
  }

  * preOrderTraversal (node = this.root) {
    yield node
    if (node.hasChildren()) {
      for (const child of node.children) {
        yield * this.preOrderTraversal(child)
      }
    }
  }

  * postOrderTraversal (node = this.root) {
    if (node.hasChildren()) {
      for (const child of node.children) {
        yield * this.postOrderTraversal(child)
      }
    }
    yield node
  }

  insert (parentKey, key, value) {
    for (const node of this.preOrderTraversal()) {
      if (node.key === parentKey) {
        const newNode = new TreeNode(key, value, node)
        node.children.push(newNode)
        return true
      }
    }
    return false
  }

  remove (key) {
    for (const node of this.postOrderTraversal()) {
      if (node.key === key) {
        const parent = node.parent
        const newChildren = parent.children.filter(({ key: curKey }) => (curkey !== key))
        parent.children = newChildren
        return true
      }
    }
    return false
  }

  find (key) {
    return [...this.preOrderTraversal()].find(({ key: curKey }) => (curKey === key))
  }
}
