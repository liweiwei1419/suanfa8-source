---
title: 「力扣」第 128 题：最长连续序列（困难）
icon: yongyan
categories: 并查集
tags:
  - 并查集
---

::: danger 提示
这道题因为有判断「是否在并查集」中的需要，因此需要把并查集的底层数组设置为「哈希表」。
:::

+ [题目链接](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

## 题目描述

给定一个未排序的整数数组，找出最长连续序列的长度。

要求算法的时间复杂度为 $O(n)$。

**示例**：

```
输入: [100, 4, 200, 1, 3, 2]
输出: 4
解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
```



### 理解题意

+ 序列：即子序列，不需要连续；
+ 严格上升，并且间隔是 $1$，才能形成最长。

关键的地方在于连续。



### 方法一：暴力解法（时间复杂度不符合要求）

+ 先排序，然后逐个判断是否连续。

**参考代码**：

```java
import java.util.Arrays;

public class Solution {

    public int longestConsecutive(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }

        Arrays.sort(nums);

        int longestLen = 1;
        int res = 1;
        int pre = nums[0];
        for (int i = 1; i < len; i++) {
            if (nums[i] == nums[i - 1]) {
                // 重复元素要去掉
                continue;
            } else if (nums[i] == (pre + 1)) {
                longestLen++;
                res = Math.max(res, longestLen);
            } else {
                longestLen = 1;
            }
            pre = nums[i];
        }
        return res;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        // int[] nums = new int[]{100, 4, 200, 1, 3, 2};
        int[] nums = new int[]{1, 2, 0, 1};
        int res = solution.longestConsecutive(nums);
        System.out.println(res);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N \log N + N)$；
+ 空间复杂度：$O(1)$。

### 方法二：哈希表

+ 空间换时间：每个数会被看 $3$ 次。

**参考代码**：

```java
import java.util.HashSet;
import java.util.Set;

public class Solution {

    public int longestConsecutive(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }

        // 除了快速查找，还有去重的效果，如果有很多起点，会重复计算
        Set<Integer> hashSet = new HashSet<>(len);
        for (int num : nums) {
            hashSet.add(num);
        }

        // 最长连续子序列的长度
        int res = 0;
        for (int num : hashSet) {
            // 关键：保证连续序列的起点最小
            if (hashSet.contains(num - 1)) {
                continue;
            }

            int longestLen = 1;
            // 遍历找出以 num 为起点的间隔为 1 的最长连续子序列
            while (hashSet.contains(num + 1)) {
                longestLen++;
                num++;
            }

            res = Math.max(res, longestLen);
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，每一个数会被看 $3$ 遍；
+ 空间复杂度：$O(N)$。

### 方法三：针对方法二的优化

**参考代码**：

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int longestConsecutive(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }

        // key：nums[i] 中的数值
        // value：以 nums[i] 为边界的「连续」数组的长度，只有边界才有意义
        Map<Integer, Integer> hashMap = new HashMap<>(len);

        int res = 1;
        for (int num : nums) {
            if (hashMap.containsKey(num)) {
                continue;
            }

            Integer leftBound = hashMap.get(num - 1);
            Integer rightBound = hashMap.get(num + 1);

            if (leftBound == null && rightBound == null) {
                hashMap.put(num, 1);
            } else if (leftBound != null && rightBound != null) {
                int longestLen = leftBound + rightBound + 1;
                res = Math.max(res, longestLen);

                // num 只需要占一个位置即可，num - leftBound 和 num + rightBound 的定义需要准确
                hashMap.put(num, 0);
                hashMap.put(num - leftBound, longestLen);
                hashMap.put(num + rightBound, longestLen);
            } else if (leftBound == null) {
                int longestLen = rightBound + 1;
                res = Math.max(res, longestLen);

                hashMap.put(num, longestLen);
                hashMap.put(num + rightBound, longestLen);
            } else {
                // rightBound == null
                int longestLen = leftBound + 1;
                res = Math.max(res, longestLen);

                hashMap.put(num, longestLen);
                hashMap.put(num - leftBound, longestLen);
            }
        }
        return res;
    }

    // 100(1), 4(4),200(1),1(4),3(2),2(0)

    public static void main(String[] args) {
        Solution3 solution3 = new Solution3();
        int[] nums = new int[]{100, 4, 200, 1, 3, 2};

        // int[] nums = new int[]{4, 0, -4, -2, 2, 5, 2, 0, -8, -8, -8, -8, -1, 7, 4, 5, 5, -4, 6, 6, -3};
        // int[] nums = new int[]{1, 2, 0, 1};
        int res = solution3.longestConsecutive(nums);
        System.out.println(res);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，每一个数会被看 $1$ 遍；
+ 空间复杂度：$O(N)$。

### 方法四：并查集



+ 并查集底层用「哈希表」实现；
+ 因此设计 `size` ，这里是「按秩合并」的思想，「秩」表示以并查集根结点为子树的结点的个数；
+ 改造 `union` 方法，返回合并以后的新的连通分量的结点个数。


::: info 注意
这里封装的「并查集」有一些特殊，`union` 方法返回的是 `size` ，可以理解成基于 `size` 合并的意思，这里的 `size` 在这道问题里是有实际意义。
:::

**参考代码**：

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int longestConsecutive(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }

        UnionFind unionFind = new UnionFind(nums);
        int res = 1;
        for (int num : nums) {
            if (unionFind.contains(num - 1)) {
                res = Math.max(res, unionFind.union(num, num - 1));
            }

            if (unionFind.contains(num + 1)) {
                res = Math.max(res, unionFind.union(num, num + 1));
            }
        }
        return res;
    }

    /**
     * 由于数值是离散的，parent 数组使用哈希表代替
     */
    private class UnionFind {

        private Map<Integer, Integer> parent;
        // 维护以当前结点为根的子树的结点总数
        private Map<Integer, Integer> size;

        public UnionFind(int[] nums) {
            int len = nums.length;
            parent = new HashMap<>(len);
            size = new HashMap<>(len);

            for (int num : nums) {
                parent.put(num, num);
                size.put(num, 1);
            }
        }

        /**
         * union 方法返回了以合并以后的连通分量的结点个数
         *
         * @param x
         * @param y
         * @return
         */
        public int union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX == rootY) {
                return 0;
            }

            int sizeX = size.get(rootX);
            int sizeY = size.get(rootY);

            int sum = sizeX + sizeY;
            if (sizeX < sizeY) {
                parent.put(rootX, rootY);
                size.put(rootY, sum);
            } else {
                parent.put(rootY, rootX);
                size.put(rootX, sum);
            }
            return sum;
        }

        public int find(int x) {
            while (x != parent.get(x)) {
                // 实现了路径压缩，底下那些结点错了没有关系，根结点对就可以了
                parent.put(x, parent.get(parent.get(x)));
                x = parent.get(x);
            }
            return x;
        }

        /**
         * 新增 contains 方法
         *
         * @param x
         * @return
         */
        public boolean contains(int x) {
            return parent.containsKey(x);
        }
    }
}

```

**复杂度分析**：

+ 时间复杂度：平均意义下 ，$O(N)$，每一个数会被看 $1$ 遍；
+ 空间复杂度：$O(N)$。