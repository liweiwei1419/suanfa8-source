---
title: 「力扣」第 508 题：出现次数最多的子树元素和（中等）
icon: yongyan
category: 二叉树
tags:
  - 深度优先遍历
  - 后序遍历
---

知识点：后序遍历

- 题目链接：[508. 出现次数最多的子树元素和](https://leetcode-cn.com/problems/most-frequent-subtree-sum/)。

## 题目描述

给你一个二叉树的根结点，请你找出出现次数最多的子树元素和。一个结点的「子树元素和」定义为以该结点为根的二叉树上所有结点的元素之和（包括结点本身）。

你需要返回出现次数最多的子树元素和。如果有多个元素出现的次数相同，返回所有出现次数最多的子树元素和（不限顺序）。

**示例 1：**

输入：

```
  5
 /  \
2   -3
```

返回 `[2, -3, 4]`，所有的值均只出现一次，以任意顺序返回所有值。

**示例 2：**

输入：

```
  5
 /  \
2   -5
```

返回 [2]，只有 2 出现两次，-5 只出现 1 次。

**提示：** 假设任意子树元素和均可以用 32 位有符号整数表示。

---

- 以该结点为根的二叉树上所有结点的元素之和（包括结点本身）；
- 以该结点为根的二叉树上所有结点的元素之和（包括结点本身）；
- 以该结点为根的二叉树上所有结点的元素之和（包括结点本身）。

**参考代码**：

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {

    private Map<Integer, Integer> freq = new HashMap<>();
    private Integer maxFrequent = Integer.MIN_VALUE;

    public int[] findFrequentTreeSum(TreeNode root) {
        dfs(root);

        List<Integer> res = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
            if (entry.getValue() == maxFrequent) {
                res.add(entry.getKey());
            }
        }

        int size = res.size();
        int[] result = new int[size];
        for (int i = 0; i < size; i++) {
            result[i] = res.get(i);
        }
        return result;
    }

    private int dfs(TreeNode node) {
        if (node == null) {
            return 0;
        }

        int left = dfs(node.left);
        int right = dfs(node.right);

        int sum = left + right + node.val;
        int count = freq.getOrDefault(sum, 0);
        freq.put(sum, count + 1);
        maxFrequent = Math.max(maxFrequent, count + 1);
        return sum;
    }
}
```
