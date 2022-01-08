---
title: 「力扣」第 449 题：序列化和反序列化二叉搜索树（中等）
icon: yongyan
category: 二叉搜索树
tags:
  - 二叉树
  - 递归
---

+ 题目链接：[449. 序列化和反序列化二叉搜索树](https://leetcode-cn.com/problems/serialize-and-deserialize-bst/)。

## 题目描述

序列化是将数据结构或对象转换为一系列位的过程，以便它可以存储在文件或内存缓冲区中，或通过网络连接链路传输，以便稍后在同一个或另一个计算机环境中重建。

设计一个算法来序列化和反序列化 **二叉搜索树** 。 对序列化/反序列化算法的工作方式没有限制。 您只需确保二叉搜索树可以序列化为字符串，并且可以将该字符串反序列化为最初的二叉搜索树。

**编码的字符串应尽可能紧凑。**

**示例 1：**

```
输入：root = [2,1,3]
输出：[2,1,3]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**提示：**

- 树中节点数范围是 `[0, 10^4]`
- `0 <= Node.val <= 10^4`
- 题目数据 **保证** 输入的树是一棵二叉搜索树。


::: warning 说明
因时间和精力关系，本题没有写详解，只给出了参考代码。读者可以在「力扣」这道题的评论区和题解区找到适合自己的思路分析和代码。如果确实需要我编写具体的解题思路，可以发邮件到 liweiwei1419@gmail.com。
:::

**参考代码**：

```java
public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        if (root == null) {
            return "";
        }
        StringBuilder stringBuilder = new StringBuilder();
        dfs(root, stringBuilder);
        return stringBuilder.substring(0, stringBuilder.length() - 1);
    }

    private void dfs(TreeNode node, StringBuilder stringBuilder) {
        if (node == null) {
            return;
        }
        stringBuilder.append(node.val);
        stringBuilder.append(",");
        dfs(node.left, stringBuilder);
        dfs(node.right, stringBuilder);
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        int len = data.length();
        if (len == 0) {
            return null;
        }
        String[] dataArray = data.split(",");
        return deserialize(dataArray, 0, dataArray.length - 1);
    }

    private TreeNode deserialize(String[] arr, int left, int right) {
        if (left > right) {
            return null;
        }
        TreeNode root = new TreeNode(Integer.parseInt(arr[left]));
        int index = right + 1;
        for (int i = left + 1; i <= right; i++) {
            if (Integer.parseInt(arr[i]) > root.val) {
                index = i;
                break;
            }
        }
        root.left = deserialize(arr, left + 1, index - 1);
        root.right = deserialize(arr, index, right);
        return root;
    }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));
```

