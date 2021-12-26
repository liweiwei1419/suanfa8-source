## 「力扣」第 144 题：二叉树的前序遍历

传送门：英文网址：[144. Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/description/) ，中文网址：[144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/) 。

> 给定一个二叉树，返回它的 *前序* 遍历。
>
> **示例:**
>
> ```
> 输入: [1,null,2,3]  
> 1
> \
> 2
> /
> 3 
> 
> 输出: [1,2,3]
> ```
>
> **进阶:** 递归算法很简单，你可以通过迭代算法完成吗？

递归的写法。下面这种写法是错的：这是我想当然，轻视问题而写出的错误程序。

```java
/**
 * 使用递归的方式实现二叉树的前序遍历
 *
 * @param root
 * @return
 */
public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root != null) {
        result.add(root.val);
        preorderTraversal(root.left);
        preorderTraversal(root.right);
    }
    return result;
}
```

因为这里要求返回一个数组，而不是在遍历的时候打印这个节点的值，所以如果要使用递归来解决问题，应该在这个方法之外声明一个成员变量，作为返回值；并且另外声明一个递归函数来完成递归的任务，正确的代码如下：

Java 代码：

```java
public class Solution3 {

    private List<Integer> result = new ArrayList<>();
    /**
     * 使用递归的方式实现二叉树的前序遍历
     *
     * @param root
     * @return
     */
    public List<Integer> preorderTraversal(TreeNode root) {
        preorder(root);
        return result;
    }

    private void preorder(TreeNode root) {
        if (root != null) {
            result.add(root.val);
            preorderTraversal(root.left);
            preorderTraversal(root.right);
        }
    }
}
```

Python 代码：在入栈的时候，就可以判断是不是空，只将非空结点入栈。顺序问题：如果我们期望代码执行的顺序是 1 2 3 ， 那么，我们应该以 3 2 1 的方式将代码入栈。即顺序执行 a b c 这件事情，须要往栈里依次推入 c b a

```python
# 掌握前序遍历，使用栈的写法

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


# 教科书上的前序遍历非递归写法

class Solution:
    def preorderTraversal(self, root):
        """
        :type root: TreeNode
        :rtype: List[int]
        """
        if not root:
            return []

        stack = [root]
        res = []
        while stack:
            node = stack.pop()
            # 前序遍历：先自己，再左孩子，右孩子
            if node.right:
                stack.append(node.right)
            if node.left:
                stack.append(node.left)
            res.append(node.val)
        return res
```

我们借助“栈”完成了二叉树的非递归前序遍历，其实借助这种思路，即“模拟系统栈”，可以完成二叉树的 3 种遍历。

Python 代码2：“模拟系统栈”实现二叉树的“前序遍历”。

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def preorderTraversal(self, root):
        if not root:
            return []
        res = []
        stack = [(1, root)]
        while stack:
            command, node = stack.pop()
            if command == 0:
                res.append(node.val)
            else:
                if node.right:
                    stack.append((1, node.right))
                if node.left:
                    stack.append((1, node.left))
                stack.append((0, node))
        return res
```

Java 代码：非递归的写法，使用模拟的系统栈，写出一个非递归的程序

```java
enum UseType {
    RECURSION, ADD
}


/**
 * 我们自定义的 Command 类
 */
class MyCommand {
    UseType useType; // 是对这个节点进行操作，还是递归调用这个节点
    TreeNode treeNode;

    MyCommand(UseType useType, TreeNode treeNode) {
        this.useType = useType;
        this.treeNode = treeNode;
    }
}

public class Solution4 {

    /**
     * 非递归就是要顺序执行，所以不用自己声明一个递归函数来完成
     *
     * @param root
     * @return
     */
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }
        Stack<MyCommand> stack = new Stack<>();
        stack.push(new MyCommand(UseType.RECURSION, root));
        while (!stack.isEmpty()) {
            MyCommand currentCommand = stack.pop();
            if (UseType.ADD == currentCommand.useType) {
                result.add(currentCommand.treeNode.val);
            } else {
                assert UseType.RECURSION == currentCommand.useType; // 模拟系统栈的作用，注意，应该倒过来写
                if (currentCommand.treeNode.right != null) {
                    stack.push(new MyCommand(UseType.RECURSION, currentCommand.treeNode.right));
                }
                if (currentCommand.treeNode.left != null) {
                    stack.push(new MyCommand(UseType.RECURSION, currentCommand.treeNode.left));
                }
                stack.push(new MyCommand(UseType.ADD, currentCommand.treeNode));
            }
        }
        return result;
    }
}
```

### 