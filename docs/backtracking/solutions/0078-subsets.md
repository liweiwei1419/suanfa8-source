---
title: 「力扣」第 78 题：子集（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 剪枝
---

- 题目链接：[78. 子集](https://leetcode-cn.com/problems/subsets/)；
- 题解链接：[（含视频讲解）](https://leetcode-cn.com/problems/subsets/solution/hui-su-python-dai-ma-by-liweiwei1419/)。

## 题目描述

给你一个整数数组 `nums` ，数组中的元素 **互不相同** 。返回该数组所有可能的子集（幂集）。

解集 **不能** 包含重复的子集。你可以按 **任意顺序** 返回解集。

**示例 1：**

```
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**示例 2：**

```
输入：nums = [0]
输出：[[],[0]]
```

**提示：**

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有元素 **互不相同**

**思路 1** ：

- 画出树形图：按照“一个数可以选，也可以不选”的思路，画出如下树形图；

![「力扣」第 78 题：子集（回溯算法）题解-1](https://img-blog.csdnimg.cn/20200219183543818.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x3X3Bvd2Vy,size_16,color_FFFFFF,t_70)

- 结果出现在哪里？所有符合条件的结果出现在叶子结点中。
- 使用**深度优先遍历**需要的状态变量：1、当前考虑的是第几个数 `index`；2、从根结点到叶子结点的路径 `path` ，不难分析出它是一个栈。

Java 代码：

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> subsets(int[] nums) {
        int len = nums.length;

        List<List<Integer>> res = new ArrayList<>();
        if (len == 0){
            return res;
        }

        Deque<Integer> path = new ArrayDeque<>();
        dfs(nums, len, 0, path, res);
        return res;
    }

    private void dfs(int[] nums, int len, int index, Deque<Integer> path, List<List<Integer>> res) {
        if (index == len){
            res.add(new ArrayList<>(path));
            return;
        }

        path.addLast(nums[index]);
        dfs(nums, len, index + 1, path, res);
        path.removeLast();

        dfs(nums, len, index + 1, path, res);
    }
}
```

使用示例 `[1, 2, 3]` 写一段测试代码运行一下，输出结果：

```
[[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]
```

符合我们画出的树形图。

**复杂度分析**：

- 时间复杂度：$O(N \times 2^N)$，这里 $N$ 为数组的长度，叶子结点一共有 $2^N$ 个，树的高度为 $N$。
- 空间复杂度：$O(N \times 2^N)$，理由同时间复杂度。保存子集需要长度为 $2^N$ 的列表，每一个子集的元素最多长度为 $N$。

**思路 2** ：

- 画出树形图：按照“按照每一层选出一个数产生分支”的思路，可以画出如下树形图；

![「力扣」第 78 题：子集（回溯算法）题解-2](https://img-blog.csdnimg.cn/20200219183616697.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x3X3Bvd2Vy,size_16,color_FFFFFF,t_70)

- 结果出现在哪里？所有的结点都是符合条件的结果。
- 使用**深度优先遍历**需要的状态变量：1、从候选数组的哪一个下标开始搜索 `start`；2、从根结点到叶子结点的路径 `path` ，这个变量我们多次遇到了。

Java 代码：

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        int len = nums.length;
        if (len == 0) {
            return res;
        }

        Deque<Integer> path = new ArrayDeque<>();
        dfs(nums, 0, len, path, res);
        return res;
    }

    private void dfs(int[] nums, int begin, int len, Deque<Integer> path, List<List<Integer>> res) {
        // 在遍历的过程中，收集符合条件的结果
        res.add(new ArrayList<>(path));
        for (int i = begin; i < len; i++) {
            path.addLast(nums[i]);
            dfs(nums, i + 1, len, path, res);
            path.removeLast();
        }
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(2^N)$，整棵树的结点个数一共是 $2^N$ 个。
- 空间复杂度：$O(N \times 2^N)$，保存子集需要长度为 $2^N$ 的列表，每一个子集的元素最多长度为 $N$。

**思路 3** ：

- 每一个候选数选与不选，这恰恰好是计算机世界里二进制数能够表示的含义，1 表示选择，0 表示不选；
- 因此，我们可以枚举数组长度的二进制数的所有可能十进制值，按照每一个数位的值枚举所有的可能性（这句话没有说得很准确，大家领会意思即可）。

![「力扣」第 78 题：子集（回溯算法）题解-3](https://img-blog.csdnimg.cn/20200227131606317.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x3X3Bvd2Vy,size_16,color_FFFFFF,t_70)

Java 代码：

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public List<List<Integer>> subsets(int[] nums) {
        int size = nums.length;
        int n = 1 << size;
        List<List<Integer>> res = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            List<Integer> cur = new ArrayList<>();
            for (int j = 0; j < size; j++) {
                if (((i >> j) & 1) == 1) {
                    cur.add(nums[j]);
                }
            }
            res.add(cur);
        }
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N \times 2^N)$，这里 $N$ 为数组的长度，叶子结点一共有 $2^N$ 个子集，遍历每一个子集所代表的二进制数有 $N$ 位。
- 空间复杂度：$O(N \times 2^N)$，保存子集需要长度为 $2^N$ 的列表，每一个子集的元素最多长度为 $N$。
