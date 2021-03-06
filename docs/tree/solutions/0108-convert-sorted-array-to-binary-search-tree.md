---
title: 「力扣」第 108 题：将有序数组转换为二叉搜索树（简单）
icon: yongyan
category: 二叉搜索树
tags:
  - 二叉树
  - 二叉搜索树
---

- 题目链接：[108. 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)；
- 题解链接：[分而治之（递归）](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/solution/fen-er-zhi-zhi-di-gui-by-liweiwei1419/)。

## 题目描述

给你一个整数数组 `nums` ，其中元素已经按 **升序** 排列，请你将其转换为一棵 **高度平衡** 二叉搜索树。

**高度平衡** 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/18/btree1.jpg)

```
输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：
```

![img](https://assets.leetcode.com/uploads/2021/02/18/btree2.jpg)

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/02/18/btree.jpg)

```
输入：nums = [1,3]
输出：[3,1]
解释：[1,3] 和 [3,1] 都是高度平衡二叉搜索树。
```

**提示：**

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` 按 **严格递增** 顺序排列

思路：题目要求**构建高度平衡二叉搜索树**，找到解决问题的突破口。

1、将有序数组一分为二，中间结点成为根结点，前半部分是左子树，右半部分是右子树；
2、递归构建左子树和右子树，应用到分治思想。

**参考代码**：

```Java []
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    public TreeNode sortedArrayToBST(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return null;
        }
        return merge(nums, 0, len - 1);
    }

    private TreeNode merge(int[] nums, int left, int right) {
        if (left > right) {
            return null;
        }

        if (left == right) {
            return new TreeNode(nums[left]);
        }

        int mid = left + (right - left) / 2;

        TreeNode treeNode = new TreeNode(nums[mid]);
        treeNode.left = merge(nums, left, mid - 1);
        treeNode.right = merge(nums, mid + 1, right);
        return treeNode;
    }
}
```

```Python []
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:

    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        def helper(nums, left, right):
            if left > right:
                return None

            if left == right:
                return TreeNode(nums[left])

            mid = (left + right) >> 1
            root = TreeNode(nums[mid])
            root.left = helper(nums, left, mid - 1)
            root.right = helper(nums, mid + 1, right)
            return root

        size = len(nums)
        if size == 0:
            return None
        return helper(nums, 0, size - 1)
```

```C++ []
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    public TreeNode sortedArrayToBST(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return null;
        }
        return merge(nums, 0, len - 1);
    }

    private TreeNode merge(int[] nums, int left, int right) {
        if (left > right) {
            return null;
        }

        if (left == right) {
            return new TreeNode(nums[left]);
        }

        int mid = (left + right) >>> 1;

        TreeNode treeNode = new TreeNode(nums[mid]);
        treeNode.left = merge(nums, left, mid - 1);
        treeNode.right = merge(nums, mid + 1, right);
        return treeNode;
    }
}
```

Python 代码：

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:

    def sortedArrayToBST(self, nums):
        if len(nums) == 0:
            return None
        return self.__helper(nums, 0, len(nums) - 1)

    def __helper(self, nums, left, right):
        # 写递归问题：先写递归终止条件，然后再写递归流程
        if left > right:
            return None
        if left == right:
            return TreeNode(nums[left])
        mid = left + (right - left) // 2
        root = TreeNode(nums[mid])
        root.left = self.__helper(nums, left, mid - 1)
        root.right = self.__helper(nums, mid + 1, right)
        return root
```

**复杂度分析**：

- 时间复杂度：$O(N)$，根据主定理：$T(N) = 2 \times T(\frac{N}{2}) + O(1)$，这里 $N$ 是数组的长度。
- 空间复杂度：$O(\log N)$。
