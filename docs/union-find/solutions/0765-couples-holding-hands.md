---
title: 「力扣」第 765 题：情侣牵手（中等）
icon: yongyan
category: 并查集
tags:
  - 并查集
---

这题比较有意思，关键在表示相邻两个位置的技巧。

+ 题目链接：[765. 情侣牵手](https://leetcode-cn.com/problems/couples-holding-hands/)。

## 题目描述

N 对情侣坐在连续排列的 $2N$ 个座位上，想要牵到对方的手。 计算最少交换座位的次数，以便每对情侣可以并肩坐在一起。 *一*次交换可选择任意两人，让他们站起来交换座位。

人和座位用 `0` 到 `2N - 1` 的整数表示，情侣们按顺序编号，第一对是 `(0, 1)`，第二对是 `(2, 3)`，以此类推，最后一对是 `(2N - 2, 2N - 1)`。

这些情侣的初始座位 `row[i]` 是由最初始坐在第 i 个座位上的人决定的。

**示例 1:**

```
输入: row = [0, 2, 1, 3]
输出: 1
解释: 我们只需要交换row[1]和row[2]的位置即可。
```

**示例 2:**

```
输入: row = [3, 2, 0, 1]
输出: 0
解释: 无需交换座位，所有的情侣都已经可以手牵手了。
```

**说明:**

1. `len(row)` 是偶数且数值在 `[4, 60]`范围内。
2. 可以保证`row` 是序列 `0...len(row)-1` 的一个全排列。





观察示例 2：`row = [3, 2, 0, 1]`，这是最好的情况，不用交换。

我们看这组数字有什么特点，两个两个来看，它们除以 $2$ 的结果是一样的。

| row                | 3    | 2    | 0    | 1    |
| ------------------ | ---- | ---- | ---- | ---- |
| 除以 2（向下取整） | 1    | 1    | 0    | 0    |


因此这些数除以 $2$ 的结果（**注意：下取整**），我们可以定义为第几对情侣。

再观察示例 1：`[0, 2, 1, 3]`，可以看到有 2 对情侣。

| row                | 0    | 2    | 1    | 3    |
| ------------------ | ---- | ---- | ---- | ---- |
| 除以 2（向下取整） | 0    | 1    | 0    | 1    |

因此做这个问题，感觉好像在玩「消消乐」一样，我可以两个两个拿出来的编号，除以 $2$（**注意：下取整**）的值如果一样，在结果集中就可以不考虑了。剩下的就是那些除了 $2$ 以后不相等的数，我们把它们放在一起，考虑如何交换次数最少，使得情侣坐在一起。

即接下来的操作就是将「不配对的情侣拆散」，这里得用一点逆向思维，即做拆解的工作，思路如下：

+ 最理想的情况，$N$ 对情侣都配对成功，彼此没有连接，如果画在一张图中，就表示有 $N$ 个连通分量；
+ 一开始可以假设 $N$ 对情侣都配对成功，即连通分量有 $N$ 个，如果两个本来属于不同连通分量的放在了一起，连通分量就少 $1$，在问题中，就得做一次交换的操作，让这个连通分量加回去。（强行解释，我也是醉了，欢迎朋友们拍砖。）

Java 代码：
```java
public class Solution {

    private class UnionFind {
        private int[] parent;
        private int count;

        public UnionFind(int n) {
            count = n;
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public int find(int x) {
            while (x != parent[x]) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        public void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            if (rootX == rootY) {
                return;
            }
            parent[rootX] = rootY;
            count--;
        }
    }

    public int minSwapsCouples(int[] row) {
        int len = row.length;
        int N = len / 2;
        UnionFind unionFind = new UnionFind(N);
        for (int i = 0; i < N; i++) {
            unionFind.union(row[2 * i] / 2, row[2 * i + 1] / 2);
        }
        return N - unionFind.count;
    }

    public static void main(String[] args) {
        int[] row = {0, 2, 1, 3};
        // int[] row = {3, 2, 0, 1};
        Solution solution = new Solution();

        int res = solution.minSwapsCouples(row);
        System.out.println(res);
    }
}
```