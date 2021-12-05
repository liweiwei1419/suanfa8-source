#### 方法一：使用先序遍历和中序遍历构造二叉树

**分析**

该方法基于两个结论：

- 根据二叉树的先序遍历和中序遍历，可以唯一确定并构造出这课二叉树。可以参考[从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)。

- 如果二叉树是一颗二叉搜索树，那么它的中序遍历就是树中所有的元素的值的升序排序。

根据上述两个结论，我们可以将先序遍历进行生序排序，得到中序遍历，再使用两者构造出二叉搜索树。

**算法**

首先将先序遍历排序得到中序遍历，随后使用分治的方法从先序遍历和中序遍历构造出二叉搜索树。具体的方法是，我们先获取先序遍历中的第一个元素，它对应了二叉树的根节点，它在中序遍历中的位置为 `x`，那么中序遍历中 `x` 左边的所有元素都在根节点的左子树中，`x` 右边的所有元素都在根节点的右子树中，这样根节点的左子树和右子树中的节点个数就都确定了。我们回到先序遍历中，由于根节点的左子树和右子树在先序遍历中一定都是连续的一段，并且它们的个数已经确定，且左子树的先序遍历出现在右子树之前，那么我们就得到了根节点左子树和右子树对应的先序遍历。有了子树的先序遍历和中序遍历，我们就可以递归地构造子树了。下图中给出了这种方法的详细步骤。

![bla](https://pic.leetcode-cn.com/Figures/1008/preorder_inorder.png){:width=600}
{:align=center}

```Java [sol1]
class Solution {
    // start from first preorder element
    int pre_idx = 0;
    int[] preorder;
    HashMap<Integer, Integer> idx_map = new HashMap<Integer, Integer>();

    public TreeNode helper(int in_left, int in_right) {
        // if there is no elements to construct subtrees
        if (in_left == in_right)
            return null;

        // pick up pre_idx element as a root
        int root_val = preorder[pre_idx];
        TreeNode root = new TreeNode(root_val);

        // root splits inorder list
        // into left and right subtrees
        int index = idx_map.get(root_val);

        // recursion 
        pre_idx++;
        // build left subtree
        root.left = helper(in_left, index);
        // build right subtree
        root.right = helper(index + 1, in_right);
        return root;
    }

    public TreeNode bstFromPreorder(int[] preorder) {
        this.preorder = preorder;
        int [] inorder = Arrays.copyOf(preorder, preorder.length);
        Arrays.sort(inorder);

        // build a hashmap value -> its index
        int idx = 0;
        for (Integer val : inorder)
            idx_map.put(val, idx++);
        return helper(0, inorder.length);
    }
}
```

```Python [sol1]
class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> TreeNode:
        def helper(in_left = 0, in_right = len(preorder)):
            nonlocal pre_idx
            # if there is no elements to construct subtrees
            if in_left == in_right:
                return None
            
            # pick up pre_idx element as a root
            root_val = preorder[pre_idx]
            root = TreeNode(root_val)

            # root splits inorder list
            # into left and right subtrees
            index = idx_map[root_val]

            # recursion 
            pre_idx += 1
            # build left subtree
            root.left = helper(in_left, index)
            # build right subtree
            root.right = helper(index + 1, in_right)
            return root
        
        inorder = sorted(preorder)
        # start from first preorder element
        pre_idx = 0
        # build a hashmap value -> its index
        idx_map = {val:idx for idx, val in enumerate(inorder)} 
        return helper()
```

**复杂度分析**

* 时间复杂度：$O(N \log N)$。对先序遍历进行排序的时间复杂度为 $O(N \log N)$，构造二叉搜索树的时间复杂度为 $O(N)$，因此总的时间复杂度为 $O(N \log N)$。

* 空间复杂度：$O(N)$，中序遍历使用的数组的空间为 $O(N)$。

#### 方法二：递归

**分析**

当我们将先序遍历排序得到中序遍历时，我们花费了 $O(N \log N)$ 的时间复杂度，但事实上并没有得到任何额外的信息。也就是说，我们可以直接跳过生成中序遍历的步骤，根据先序遍历直接构造出二叉树。注意，由于题目中的二叉树是二叉搜索树，因此根据先序遍历构造出的二叉树才是唯一的。

我们使用递归的方法，在扫描先序遍历的同时构造出二叉树。我们在递归时维护一个 `(lower, upper)` 二元组，表示当前位置可以插入的节点的值的上下界。如果此时先序遍历位置的值处于上下界中，就将这个值作为新的节点插入到当前位置，并递归地处理当前位置的左右孩子的两个位置。否则回溯到当前位置的父节点。

**算法**

- 将 `lower` 和 `upper` 的初始值分别设置为负无穷和正无穷，因为根节点的值可以为任意值。

- 从先序遍历的第一个元素 `idx = 0` 开始构造二叉树，构造使用的函数名为 `helper(lower, upper)`：

    - 如果 `idx = n`，即先序遍历中的所有元素已经被添加到二叉树中，那么此时构造已经完成；

    - 如果当前 `idx` 对应的先序遍历中的元素 `val = preorder[idx]` 的值不在 `[lower, upper]` 范围内，则进行回溯；

    - 如果 `idx` 对应的先序遍历中的元素 `val = preorder[idx]` 的值在 `[lower, upper]` 范围内，则新建一个节点 `root`，并对其左孩子递归处理 `helper(lower, val)`，对其右孩子递归处理 `helper(val, upper)`。

![bla](https://pic.leetcode-cn.com/Figures/1008/recursion2.png){:width=600}
{:align=center}

```Java [sol2]
class Solution {
    int idx = 0;
    int[] preorder;
    int n;

    public TreeNode helper(int lower, int upper) {
        // if all elements from preorder are used
        // then the tree is constructed
        if (idx == n) return null;

        int val = preorder[idx];
        // if the current element 
        // couldn't be placed here to meet BST requirements
        if (val < lower || val > upper) return null;

        // place the current element
        // and recursively construct subtrees
        idx++;
        TreeNode root = new TreeNode(val);
        root.left = helper(lower, val);
        root.right = helper(val, upper);
        return root;
    }

    public TreeNode bstFromPreorder(int[] preorder) {
        this.preorder = preorder;
        n = preorder.length;
        return helper(Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
}
```

```Python [sol2]
class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> TreeNode:
        def helper(lower = float('-inf'), upper = float('inf')):
            nonlocal idx
            # if all elements from preorder are used
            # then the tree is constructed
            if idx == n:
                return None
            
            val = preorder[idx]
            # if the current element 
            # couldn't be placed here to meet BST requirements
            if val < lower or val > upper:
                return None
            
            # place the current element
            # and recursively construct subtrees
            idx += 1
            root = TreeNode(val)
            root.left = helper(lower, val)
            root.right = helper(val, upper)
            return root
        
        idx = 0
        n = len(preorder)
        return helper()
```

**复杂度分析**

* 时间复杂度：$O(N)$，仅扫描前序遍历一次。

* 空间复杂度：$O(N)$，用来存储二叉树。

#### 方法三：迭代

方法二中的递归可以通过添加一个栈变成迭代。

- 将先序遍历中的第一个元素作为二叉树的根节点，即 `root = new TreeNode(preorder[0])`，并将其放入栈中。

- 使用 `for` 循环迭代先序遍历中剩下的所有元素：

    - 将栈顶的元素作为父节点，当前先序遍历中的元素作为子节点。如果栈顶的元素值小于子节点的元素值，则将栈顶的元素弹出并作为新的父节点，直到栈空或栈顶的元素值大于子节点的元素值。注意，这里作为父节点的是最后一个被弹出栈的元素，而不是此时栈顶的元素；

    - 如果父节点的元素值小于子节点的元素值，则子节点为右孩子，否则为左孩子；

    - 将子节点放入栈中。

<![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_1.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_2.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_3.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_4.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_5.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_6.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_7.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_8.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_9.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_10.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_11.png),![1200](https://pic.leetcode-cn.com/Figures/1008/1008_slide_12.png)>

```Java [sol3]
class Solution {
  public TreeNode bstFromPreorder(int[] preorder) {
    int n = preorder.length;
    if (n == 0) return null;

    TreeNode root = new TreeNode(preorder[0]);
    Deque<TreeNode> deque = new ArrayDeque<TreeNode>();
    deque.push(root);

    for (int i = 1; i < n; i++) {
      // take the last element of the deque as a parent
      // and create a child from the next preorder element
      TreeNode node = deque.peek();
      TreeNode child = new TreeNode(preorder[i]);
      // adjust the parent 
      while (!deque.isEmpty() && deque.peek().val < child.val)
        node = deque.pop();

      // follow BST logic to create a parent-child link
      if (node.val < child.val) node.right = child;
      else node.left = child;
      // add the child into deque
      deque.push(child);
    }
    return root;
  }
}
```

```Python [sol3]
class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> TreeNode:
        n = len(preorder)
        if not n:
            return None
        
        root = TreeNode(preorder[0])         
        stack = [root, ] 
        
        for i in range(1, n):
            # take the last element of the stack as a parent
            # and create a child from the next preorder element
            node, child = stack[-1], TreeNode(preorder[i])
            # adjust the parent 
            while stack and stack[-1].val < child.val: 
                node = stack.pop()
             
            # follow BST logic to create a parent-child link
            if node.val < child.val:
                node.right = child 
            else:
                node.left = child 
            # add the child into stack
            stack.append(child)
  
        return root
```

**复杂度分析**

* 时间复杂度：$O(N)$，仅扫描前序遍历一次。

* 空间复杂度：$O(N)$，用来存储栈和二叉树。