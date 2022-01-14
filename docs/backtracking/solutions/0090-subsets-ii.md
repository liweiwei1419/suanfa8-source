---
title: 「力扣」第 90 题：子集 II（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 剪枝
---

- 题目链接：[90. 子集 II](https://leetcode-cn.com/problems/subsets-ii/)；
- 视频讲解：[B 站](https://www.bilibili.com/video/BV147411A7Yq?p=3)。

## 题目描述

给你一个整数数组 `nums` ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 **不能** 包含重复的子集。返回的解集中，子集可以按 **任意顺序** 排列。

**示例 1：**

```
输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
```

**示例 2：**

```
输入：nums = [0]
输出：[[],[0]]
```

**提示：**

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`

## 思路分析

借用「力扣」第 47 题的剪枝思想，先对数组排序，只要搜索起点一样，必然发生重复，此时剪枝即可。

![「力扣」第 90 题：子集 II（回溯算法）题解-1](https://img-blog.csdnimg.cn/20200227131432547.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x3X3Bvd2Vy,size_16,color_FFFFFF,t_70)

::: info 为什么要先排序

- 根据题目意思，子集的每个元素其实是不考虑次序的，因此 `[1, 2]` 和 `[2, 1]` 在结果集里只能保留一个；
- 有重复元素的时候，得到的子集也有重复列表，如何对列表去重呢？排个序以后，再逐个比对，这样做很麻烦，但其实可以在搜索的时候，就排序，然后绕过会产生重复结果的分支；
- 这里因为是不考虑顺序的，因此搜索的时候按顺序搜索即可，需要设置状态变量 `start`（正是因为按顺序搜索，因此不用设置布尔数组 `used` ） 和路径变量 `path` 。
  :::

**参考代码**：

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;
import java.util.Stack;

public class Solution {

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        int len = nums.length;
        if (len == 0) {
            return res;
        }
        // 排序是为了后面剪枝去重
        Arrays.sort(nums);

        Deque<Integer> path = new ArrayDeque<>();
        dfs(nums, 0, len, path, res);
        return res;
    }

    private void dfs(int[] nums, int start, int len, Deque<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));

        for (int i = start; i < len; i++) {
            // 常见的剪枝操作
            if (i > start && nums[i] == nums[i - 1]) {
                continue;
            }

            path.addLast(nums[i]);

            // 从 i + 1 开始继续枚举，按顺序枚举，所以不会重复
            dfs(nums, i + 1, len, path, res);
            path.removeLast();
        }
    }
}
```

**复杂度分析**：（理由同「力扣」第 78 题思路 2）

- 时间复杂度：$O(2^N)$，整棵树的结点个数最多 $2^N$ 个；
- 空间复杂度：$O(N \times 2^N)$，保存子集需要长度为 $2^N$ 的列表，每一个子集的元素最多长度为 $N$。

## 总结

- 找出所有可能的解，这样的问题一般用回溯算法解决；
- 回溯算法能解决的问题的特点是：解决一个问题有多种办法，每一个办法又分为多个步骤，我们使用遍历的方法得到所有的结果；
- 解决回溯算法首先要画出树形图，以打开思路，进而考虑编码，考虑剪枝条件怎么写；
- 一般画树形图的时候都是一层一层画，这是人的思维，但是编码的时候，用深度优先遍历，这是计算机的思维，好处在《全排列》这个专辑里已经介绍了（借用系统栈、全程可以使用一份状态变量，节约空间）。
