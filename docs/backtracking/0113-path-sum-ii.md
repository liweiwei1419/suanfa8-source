---
title: 「力扣」第 113 题：路径总和 II（中等）
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---

+ 题目链接：[113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/description/) ；

+ 题解链接：[回溯算法（Java）](https://leetcode-cn.com/problems/path-sum-ii/solution/hui-su-suan-fa-shen-du-you-xian-bian-li-zhuang-tai/)。

## 题目描述

给你二叉树的根节点 `root` 和一个整数目标和 `targetSum` ，找出所有 **从根节点到叶子节点** 路径总和等于给定目标和的路径。

**叶子节点** 是指没有子节点的节点。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsumii1.jpg)



```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：[[5,4,11,2],[5,8,4,5]]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)



```
输入：root = [1,2,3], targetSum = 5
输出：[]
```

**示例 3：**

```
输入：root = [1,2], targetSum = 0
输出：[]
```



**提示：**

- 树中节点总数在范围 `[0, 5000]` 内
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

---

问完成一件事情的所有解决方案，一般采用回溯算法（**深度优先遍历**）完成。做回溯算法问题一般先画图，好在这就是一个树形问题，题目已经给我们画好了示意图。

根据这个问题的特点，我们可以采用 **先序遍历** 的方式：先使用 `sum` 减去当前结点（如果非空）的值，然后再递归处理左子树和右子树。如果到了叶子结点，`sum` 恰好等于叶子结点的值，我们就得到了一个符合条件的列表（从根结点到当前叶子结点的路径）。

归纳一下递归终止条件：

+ 如果遍历到的结点为空结点，返回；
+ 如果遍历到的叶子结点，且 `sum` 恰好等于叶子结点的值。

下面是和 [@ohenry](/u/ohenry/) 讨论出来的 3 种写法，实际上都是一样的，区别仅仅在于一些细节上的处理，它们是：在当前结点非空的前提下，是否先减去当前结点的值，是否先把当前结点的值加入 `path` ，再判断递归终止条件，再递归调用。


**参考代码 1**：
```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> pathSum(TreeNode root, int sum) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }

        // Java 文档中 Stack 类建议使用 Deque 代替 Stack，注意：只使用栈的相关接口
        Deque<Integer> path = new ArrayDeque<>();
        dfs(root, sum, path, res);
        return res;
    }

    private void dfs(TreeNode node, int sum, Deque<Integer> path, List<List<Integer>> res) {
        // 递归终止条件 1
        if (node == null) {
            return;
        }
        
        // 递归终止条件 2
        if (node.val == sum && node.left == null && node.right == null) {
            // 当前结点的值还没添加到列表中，所以要先添加，然后再移除
            path.addLast(node.val);
            res.add(new ArrayList<>(path));
            path.removeLast();
            return;
        }

        path.addLast(node.val);
        dfs(node.left, sum - node.val, path, res);
        // 进入左右分支的 path 是一样的，这里不用写下面两行，因为一定会调用到 path.removeLast();
        // path.removeLast();
        // path.addLast(node.val);
        dfs(node.right, sum - node.val, path, res);
        path.removeLast();
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$ ，这里 $N$ 为二叉树的结点个数；
+ 空间复杂度：取决于结果列表的长度。

还可以这样写：

**参考代码 2**：

说明：由于先减去了当前非空结点的值，递归终止条件写 `sum == 0`。

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;


public class Solution {

    public List<List<Integer>> pathSum(TreeNode root, int sum) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }

        // Java 文档中 Stack 类建议使用 Deque 代替 Stack，注意：只使用栈的相关接口
        Deque<Integer> path = new ArrayDeque<>();
        pathSum(root, sum, path, res);
        return res;
    }

    public void pathSum(TreeNode node, int sum, Deque<Integer> path, List<List<Integer>> res) {
        // 递归终止条件 1：遇到空结点不再递归调用
        if (node == null) {
            return;
        }

        // 沿途结点必须选择，这个时候要做两件事：1、sum 减去这个结点的值；2、添加到 path 里
        sum -= node.val;
        path.addLast(node.val);

        // 递归终止条件 2：遇到叶子结点，sum 恰好为 0，说明从根结点到叶子结点的路径是一个符合要求的解
        if (sum == 0 && node.left == null && node.right == null) {
            // path 全局只有一份，必须做拷贝
            res.add(new ArrayList<>(path));
            // 注意：这里 return 之前必须重置
            path.removeLast();
            return;
        }

        pathSum(node.left, sum, path, res);
        pathSum(node.right, sum, path, res);
        // 递归完成以后，必须重置变量
        path.removeLast();
    }
}
```

下面再提供一种写法供大家比对，思想是一样的，只是细节不同。

**参考代码 3**：

说明：
+ 在对左右结点递归调用之前，先判断结点是否为空，左右结点非空才继续调用；
+ 对比参考代码 1 和参考代码 2：**由于有可能一个结点只有左结点或者只有右结点**，因此递归调用完成以后，一定要 `path.removeLast();`。


```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> pathSum(TreeNode root, int sum) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }

        Deque<Integer> path = new ArrayDeque<>();
        dfs(root, sum, path, res);
        return res;
    }

    public void dfs(TreeNode node, int sum, Deque<Integer> path, List<List<Integer>> res) {
        if (node == null) {
            return;
        }

        sum -= node.val;
        path.addLast(node.val);

        if (node.left == null && node.right == null && sum == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        // 在递归调用之前如果先判断了非空，在递归完成以后，需要重置 path
        if (node.left != null) {
            dfs(node.left, sum, path, res);
            path.removeLast();
        }

        if (node.right != null) {
            dfs(node.right, sum, path, res);
            path.removeLast();
        }
    }
}
```

回溯算法全程只使用一个变量去搜索所有可能的情况，在符合条件的时候才做复制和保存。如果 `path` 变量每次都复制，就不需要重置。

我们这里简单复习一下 Java 的参数传递机制：

+ 如果参数是原始类型参数（Primitive Data Type Arguments）：在调用函数时，将实际参数通过复制的方式传递到函数中。如果在函数中对参数修改，将不会影响到实际参数；
+ 如果参数是引用类型参数（Reference Data Type Arguments）：在调用函数时，将实际参数的 **内存地址** 复制到函数中。如果在函数中对参数修改，将会影响到实际参数。

在当前这个问题中，原始类型参数是 `sum`，它在递归方法嵌套调用的过程中的行为是 **复制**，而 `path` 变量是引用类型参数，它在递归方法嵌套调用的过程中的行为是 **复制内存地址（而不是真正的列表变量）**。

因此递归调用后，`sum` 不用重置，而 `path` 需要。

![image.png](https://pic.leetcode-cn.com/1601069091-JGRPAF-image.png)


**参考代码 4**：（供对比，不建议这么写）

注意：参考代码 4 的写法只能叫「深度优先遍历」，每一次向下传递，都会复制，复杂度很高，不能叫做「回溯算法」。


```Java []
import java.util.ArrayList;
import java.util.List;


public class Solution {

    public List<List<Integer>> pathSum(TreeNode root, int sum) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }

        // 从根结点到叶子结点的路径
        List<Integer> path = new ArrayList<>();
        dfs(root, sum, path, res);
        return res;
    }

    private void dfs(TreeNode root, int sum, List<Integer> path, List<List<Integer>> res) {
        if (root == null) {
            return;
        }

        path.add(root.val);
        sum -= root.val;

        if (root.left == null && root.right == null) {
            if (sum == 0) {
                // 正是因为每一次向下传递的过程中复制整个列表，在叶子结点出直接添加即可
                res.add(path);
                return;
            }
        }

        // 基本数据类型在方法传递过程中的行为是是复制
        // new ArrayList<>() 每一次向下传递的过程中复制整个列表，低效
        dfs(root.left, sum, new ArrayList<>(path), res);
        dfs(root.right, sum, new ArrayList<>(path), res);
        // 在递归结束以后无需「状态重置」
    }
}
```


## 总结

+ 回溯算法在 `res.add(new ArrayList<>(path));` 要套一层 `new ArrayList<>(path)`；
+ 在深度优先遍历的过程中，不同的状态之间差别很小，因此状态重置很方便。**广度优先遍历在不同层次之间的状态会发生「跳跃」**，因此深度优先遍历可以成为强大的回溯搜索算法；
+ 这里的状态是指完成一件事情进行到哪一个阶段，在上面的代码中：`path` 、`sum` 都是状态变量，`sum` 发生的行为是复制，所以无需重置，`path` 全程只有一份，因此在深度优先遍历从深层回到浅层以后，需要重置。


## 参考资料
+ Java 的参数传递机制：[Oracle 官方 JavaSE 主页的入门教程](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html)
