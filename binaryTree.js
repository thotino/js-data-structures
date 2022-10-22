/**
 * https://www.30secondsofcode.org/articles/s/js-data-structures-binary-tree
 * @description A binary tree is a data structure consisting of a set of linked nodes that represent a hierarchical tree structure.
 */
class BinaryTreeNode {
    constructor(key, value = key, parent = null, left = null, right = null) {
        this.key = key
        this.value = value
        this.parent = parent
        this.left = left
        this.right = right
    }

    get isLeaf() {
        return (this.left && this.left.length === 0) && (this.right && this.right.length === 0)
    }
    get hasChildren() {
        return !this.isLeaf
    }
}

class BinaryTree {
    constructor(key, value = key) {
        this.root = new BinaryTreeNode(key, value)
    }

    *preOrderTraversal(node = this.root) {
        yield node
        if (node.hasChildren) {
            if(node.left) yield* this.preOrderTraversal(node.left)
            if(node.right) yield* this.preOrderTraversal(node.right)
        }
    }

    *postOrderTraversal(node = this.root) {
        if(node.hasChildren) {
            if (node.left) yield* this.postOrderTraversal(node.left)
            if (node.right) yield* this.postOrderTraversal(node.right)
        }
        yield node
    }

    *inOrderTraversal(node = this.root) {
        if(node.left) yield* this.inOrderTraversal(node.left)
        yield node
        if(node.right) yield* this.inOrderTraversal(node.right)
    }

    insert(parentKey, childKey, childValue, { left, right } = { left: true, right: true }) {
        for (const node of this.preOrderTraversal()) {
            if (node.key === parentKey) {
                const newNode = new BinaryTreeNode(childKey, childValue, node)
                if (left && !node.left) { node.left = newNode }
                if (right && !node.right) { node.right = newNode}
            }
        }
        return false
    }

    remove(key) {
        for (const node of this.preOrderTraversal()) {
            if (node.key === key) {
                if (node.left) node.left = null
                if (node.right) node.right = null
                node = null
                return true
            }
        }
        return false
    }

    find(key) {
        for (const node of this.preOrderTraversal()) {
            if (node.key === key) {
                return node
            }
        }
    }

}