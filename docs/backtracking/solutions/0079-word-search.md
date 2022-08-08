---
title: 「力扣」第 79 题：单词搜索（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
---

- 题目链接：[79. 单词搜索](https://leetcode-cn.com/problems/word-search/)；
- 题解链接：[回溯算法（Java）](https://leetcode-cn.com/problems//solution/zai-er-wei-ping-mian-shang-shi-yong-hui-su-fa-pyth/)。

## 题目描述

给定一个 `m x n` 二维字符网格 `board` 和一个字符串单词 `word` 。如果 `word` 存在于网格中，返回 `true` ；否则，返回 `false` 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

**示例 1：**

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tojp8xr2j208y06qq2y.jpg)

```
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true
```

**示例 2：**

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tojs3t3mj208y06qaa2.jpg)

```
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
输出：true
```

**示例 3：**

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tojudlldj208y06qgll.jpg)

```
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
输出：false
```

**提示：**

- `m == board.length`
- `n = board[i].length`
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` 和 `word` 仅由大小写英文字母组成

**进阶：**你可以使用搜索剪枝的技术来优化解决方案，使其在 `board` 更大的情况下可以更快解决问题？
