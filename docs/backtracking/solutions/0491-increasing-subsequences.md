---
title: 「力扣」第 491 题：递增子序列（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
---


+ 题目链接：[491. 递增子序列](https://leetcode-cn.com/problems/increasing-subsequences/)。

## 题目描述

典型的使用「回溯算法」解决问题的问法：找到所有。

题目中的关键字：子序列（不要求连续）、不重复，所以想到使用哈希表去重。

### 方法一：二叉树

前额叶没长好的题解。

### 方法二：多叉树

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {

    public List<List<Integer>> findSubsequences(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Deque<Integer> path = new ArrayDeque<>();
        dfs(nums, 0, path, res);
        return res;
    }

    private void dfs(int[] nums, int begin, Deque<Integer> path, List<List<Integer>> res) {
        if (path.size() > 1) {
            res.add(new ArrayList<>(path));
            // 注意这里不要加 return，因为要取所有的可能
        }

        // 子序列，不要求连续，因此这里使用哈希表去重
        Set<Integer> hashSet = new HashSet<>();
        for (int i = begin; i < nums.length; i++) {
            if (hashSet.contains(nums[i])) {
                continue;
            }

            // 注意：递增不是严格递增，因此使用 >=
            if (path.isEmpty() || nums[i] >= path.peekLast()) {
                path.addLast(nums[i]);
                dfs(nums, i + 1, path, res);
                path.removeLast();

                hashSet.add(nums[i]);
            }
        }
    }
}
```

```Python []
from typing import List


class Solution:
    def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        res = []

        def dfs(nums, begin, path, res):
            if len(path) >= 2:
                # 转换成 tuple 类型，才可以在结果集中去重
                res.append(tuple(path + []))

            for i in range(begin, len(nums)):
                if i > begin and nums[i] == nums[i - 1]:
                    continue
                if path and nums[i] < path[-1]:
                    continue
                path.append(nums[i])
                dfs(nums, i + 1, path, res)
                path.pop()

        dfs(nums, 0, [], res)
        return list(set(res))
```

