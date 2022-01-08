---
title: 「力扣」第 945 题：使数组唯一的最小增量（中等）
icon: yongyan
category: 并查集
tags:
  - 并查集
---

+ 题目链接：[945. 使数组唯一的最小增量](https://leetcode-cn.com/problems/minimum-increment-to-make-array-unique)；
+ 题解链接：[贪心算法、并查集（Java）](https://leetcode-cn.com/problems/minimum-increment-to-make-array-unique/solution/tan-xin-suan-fa-bing-cha-ji-java-by-liweiwei1419/)。

## 题目描述

给定整数数组 A，每次 move 操作将会选择任意 A[i]，并将其递增 1。

返回使 A 中的每个值都是唯一的最少操作次数。

示例 1：

```
输入：[1,2,2]
输出：1
解释：经过一次 move 操作，数组将变为 [1, 2, 3]。
```

示例 2:

```
输入：[3,2,1,2,1,7]
输出：6
解释：经过 6 次 move 操作，数组将变为 [3, 4, 1, 2, 5, 7]。
可以看出 5 次或 5 次以下的 move 操作是不能让数组的每个值唯一的。
```

提示：

+ `0 <= A.length <= 40000`
+ `0 <= A[i] < 40000`

## 思路分析

我们需要先把题目意思读清楚，然后拿着示例在草稿纸上写写画画。

题目说：

> 消除重复元素的办法，只能自增。

那么在这个数组里，最小的那个元素（如果唯一的话），一定不需要自增。例如：示例 1 最小元素 `1`。

同理，最大的那个元素（如果唯一的话），也不需要自增。例如：示例 2 最大元素 `7`（这句话回过头来看是不严谨的，但是不妨碍我们找到求解这个问题的思路）。

题目又说：

> 返回使 A 中的每个值都是唯一的最少操作次数。

这句话告诉我们对于相同的数，自增 1 的操作次数是有上限的，加到一定程度就没有必要再加了。

因此，**对原始数组进行排序，大概可以解决这个问题**。我们看示例 2。

### 方法一：贪心算法

![01.png](https://pic.leetcode-cn.com/351c7f33a8a1c103cb852047e1f81ec48b127d8e171d0a1ebe4311ee931043ad-01.png)

这个算法每一步只用看当前的情况，当前最优，全局就最优，所以是「贪心算法」。证明贪心算法主要有 2 个途径：一是数学归纳法，二是反证法。

这里用反证法相对容易（以下论证仅供参考，本人水平有限，对这贪心算法这一块没有过多涉及）。

「贪心算法」最优性证明：

假设当前算法的决策不是最优解。
现在假设一个新算法得到的解是最优解，这个新算法是：

+ 如果新算法是：修改原始算法的第 1 个步骤，将 move 数 - 1甚至减去更大的数，其它步骤不变，肯定不符合要求，因为题目说了，只能增加。

+ 那么这个新算法就只能在原始算法的第 1 个步骤里，再多增加 1，由于这个问题的特点，之前的数多了 1，它会影响到后面所有的阶段的决策。

例如：原来被 2 占的位置，现在被 3 占用了，那么原来 3 占用的位置，就得换成 4。

由于这种连锁的效应，这个新算法一定不会比原始算法得到的解更好，与最开始的假设新算法的最优性矛盾。因此原始算法是最优解。


**参考代码 1**：

```Java []
import java.util.Arrays;

public class Solution {

    public int minIncrementForUnique(int[] A) {
        int len = A.length;
        if (len == 0) {
            return 0;
        }

        Arrays.sort(A);
        // 打开调试
        // System.out.println(Arrays.toString(A));

        int preNum = A[0];
        int res = 0;
        for (int i = 1; i < len; i++) {
            // preNum + 1 表示当前数「最好」是这个值

            if (A[i] == preNum + 1) {
                preNum = A[i];
            } else if (A[i] > preNum + 1) {
                // 当前这个数已经足够大，这种情况可以合并到上一个分支
                preNum = A[i];
            } else {
                // A[i] < preNum + 1
                res += (preNum + 1 - A[i]);
                preNum++;
            }
        }
        return res;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] A = new int[]{1, 2, 2};
        // int[] A = new int[]{3, 2, 1, 2, 1, 7};
        int res = solution.minIncrementForUnique(A);
        System.out.println(res);
    }
}
```

**复杂度分析：**

+ 时间复杂度：$O(N\log N)$，这里 $N$ 是数组的长度。主要消耗在排序算法上。
+ 空间复杂度：$O(1)$。

这个思路是先排序，然后一次遍历就可以了。那么可不可以不排序，一次遍历就算出 move 的最少次数呢。经过尝试是可以的，思路是「以空间换时间」，一定要记住一些东西，所以我们需要选一些数据结构，以达到**看一眼当前的这个数，就知道应该 `move` 多少次的效果**。

### 方法二：使用恰当的数据结构，以空间换时间

我一开始想到的是哈希表、二分搜索树（因为要排序），我还想过用二分查找去做，但是都不太好做。

![02.png](https://pic.leetcode-cn.com/b72bb9201a53ddc74f67c5d1f1e2482a724a856025f8a7cfcd97a97175e8d9cd-02.png)

我们需要在每个连通分量里面，使用当前连通分量的最大值作为代表元。

由于在放置元素，产生冲突的时候，只能在冲突位置的所在的那一片**连续的**区域里面的下一个空位置存放，并查集就能够帮我们找到冲突位置的所在的那一片区域里面最大的那个元素。在实现并查集的时候，需要把代表元设计成当前连通分量里最大的，因此在合并的时候，我们总是把数值小的结点指向数值大的结点。

为此，可以设计这样的算法：

1、如果遍历到新元素 `num` 的时候，如果没有在并查集里，就把它加进去，同时看一看它左边的数 `num - 1` 在不在并查集里，在的话合并一下，同理看一下它右边的数 `num + 1` 在不在并查集里，在的话合并一下，让它们都连通起来；

2、如果遍历到新元素 `num` 的时候，如果它在并查集里，就说明当前这个数肯定要自增了，它应该自增到 `num` 所在的集合的代表元 + 1，这个时候就记一下 `move` 的值。然后把它加进去。

加进去的时候，依然是要合并一下。左边肯定存在，直接合并。右边不一定存在，因为有可能存在下面这种情况。

![03.png](https://pic.leetcode-cn.com/e23f7b895670c276cb30dc0f5d4b3e7789ef1812092a6b1f286b48a86a3a324b-03.png)

在使用并查集的时候，需要进行一些改造。

+ 初始化的时候不能一下子初始化成自己，要设计这个元素是否在并查集中的方法；我想过用哈希表作为底层实现，但是实现下来比较慢，又换了数组，会快一些；
+ 特别注意：在 `union()` 的时候，只能把数值较小的元素指向数值交大的元素，这样 `find()` 方法才可以返回这个连通分量的最大值；
+ 并查集在实现的时候，「路径压缩」与「按秩合并」选择一个实现，这里「合并」的路被这个算法给堵死了，所以「路径压缩」一定要做，否则会超时，我这里选择的是「隔代压缩」，就是把「当前结点指向父亲结点的父亲结点」，大家尝试写成「完全压缩」，所有结点都指向根结点都是可以的。

并查集、左边看一眼合并一下，右边看一眼合并一下的思路来自「力扣」第 128 题：[最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)，我在学习并查集的时候做过这道，感兴趣的朋友可以做一下。

刷题就是刷经验，如果一下子没有思路不要对自己有什么怀疑，很可能就只是我们没有见过而已。

**参考代码 2**： 底层是数组实现，较快

```Java []
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int minIncrementForUnique(int[] A) {

        int len = A.length;
        if (len == 0) {
            return 0;
        }

        UnionFind unionFind = new UnionFind();
        int res = 0;
        for (int num : A) {
            if (unionFind.contains(num)) {
                int root = unionFind.find(num);
                int add = root + 1;
                res += (add - num);
                unionFind.init(add);
            } else {
                unionFind.init(num);
            }
        }
        return res;
    }

    private class UnionFind {
        /**
         * 代表元法，元素指向父亲结点
         */
        private int[] parent;

        public void init(int x) {
            // 初始化的时候，就得左边看一眼，右边看一眼
            parent[x] = x;
            if (x > 0 && parent[x - 1] != -1) {
                union(x, x - 1);
            }

            if (parent[x + 1] != -1) {
                union(x, x + 1);
            }
        }

        public boolean contains(int x) {
            return parent[x] != -1;
        }

        public UnionFind() {
            // 最坏情况下，题目给出的数值都是 40000，
            // 依次排下去，排到 79999
            this.parent = new int[79999];
            // 应初始化成为 -1，表示这个元素还没放进并查集
            Arrays.fill(parent, -1);
        }

        /**
         * 返回代表元结点
         *
         * @param x
         * @return 针对这道题，代表元选所有元素中最大的那个
         */
        public int find(int x) {
            while (x != parent[x]) {
                // 只要自己的父亲结点不是自己，就说明不是根结点，继续往上找 x = parent[x];
                // 这句是路径压缩，并查集的优化，不加也行
                // parent[x] = parent[parent[x]]; 把 x 的父结点指向父亲结点的父亲结点
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        public void union(int x, int y) {

            int rootX = find(x);
            int rootY = find(y);

            // 注意：根据这个问题的特点
            // 只能把小的结点指向大的结点
            if (rootX < rootY) {
                parent[rootX] = rootY;
            }

            if (rootY < rootX) {
                parent[rootY] = rootX;
            }
        }
    }


    public static void main(String[] args) {
        Solution solution = new Solution();
        // int[] A = new int[]{1, 2, 2};
        int[] A = new int[]{3, 2, 1, 2, 1, 7};
        int res = solution.minIncrementForUnique(A);
        System.out.println(res);
    }
}
```

**复杂度分析：**

+ 时间复杂度：至少是 $O(N)，$待定，并查集的查询与合并，在优化得比较好的时候，是一个反阿克曼函数，这个函数的增长效率很低，具体我就不会分析了，欢迎大家指导或纠错。
+ 空间复杂度：$O(N)$，我们就是要让所有元素都不一样，因此底层数组占用 $O(N)$ 的空间，至多是 $2N$，代码注释中已经说明。


**参考代码 3**：底层是哈希表实现，较慢

```Java []
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int minIncrementForUnique(int[] A) {

        int len = A.length;
        if (len == 0) {
            return 0;
        }

        UnionFind unionFind = new UnionFind(len);
        int res = 0;
        for (int num : A) {
            if (unionFind.contains(num)) {
                int root = unionFind.find(num);
                int add = root + 1;
                res += (add - num);
                unionFind.init(add);
            } else {
                unionFind.init(num);
            }
        }
        return res;
    }

    private class UnionFind {
        /**
         * 代表元法，元素指向父亲结点
         */
        private Map<Integer, Integer> parent;

        public void init(int x) {
            parent.put(x, x);
            if (parent.containsKey(x - 1) ) {
                union(x, x - 1);
            }
            if (parent.containsKey(x + 1) ) {
                union(x, x + 1);
            }
        }

        public boolean contains(int x) {
            return parent.containsKey(x);
        }

        public UnionFind(int n) {
            this.parent = new HashMap<>(n);
        }

        /**
         * 返回代表元结点
         *
         * @param x
         * @return 针对这道题，代表元选所有元素中最大的那个
         */
        public int find(int x) {
            while (x != parent.get(x)) {
                // 只要自己的父亲结点不是自己，就说明不是根结点，继续往上找 x = parent[x];
                // 这句是路径压缩，并查集的优化，不加也行
                // parent[x] = parent[parent[x]]; 把 x 的父结点指向父亲结点的父亲结点
                parent.put(x, parent.get(parent.get(x)));
                x = parent.get(x);
            }
            return x;
        }

        public void union(int x, int y) {

            int rootX = find(x);
            int rootY = find(y);

            // 注意：根据这个问题的特点
            // 只能把小的结点指向大的结点
            if (rootX < rootY) {
                parent.put(rootX, rootY);
            }

            if (rootY < rootX) {
                parent.put(rootY, rootX);
            }
        }
    }


    public static void main(String[] args) {
        Solution solution = new Solution();
        // int[] A = new int[]{1, 2, 2};
        int[] A = new int[]{7, 2, 7, 2, 1, 4, 3, 1, 4, 8};
        int res = solution.minIncrementForUnique(A);
        System.out.println(res);
    }
}
```

**复杂度分析：**（同上）



