---
title: 「力扣」第 40 题：组合总和 II（中等）
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 剪枝
---

+ 题目链接：[40. 组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)；
+ 题解链接：[回溯算法 + 剪枝（Java、Python）](https://leetcode-cn.com/problems/combination-sum-ii/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-3/)。

## 题目描述

给定一个数组 `candidates` 和一个目标数 `target` ，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

`candidates` 中的每个数字在每个组合中只能使用一次。

**注意**：解集不能包含重复的组合。 

**示例 1:**

```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

**示例 2:**

```
输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]
```

 **提示:**

- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

::: danger 解题思路
按顺序搜索，设置合理的变量，在搜索的过程中判断是否会出现重复集结果。重点理解对输入数组排序的作用和 **参考代码** 中大剪枝和小剪枝 的意思。 
:::

## 与第 39 题（组合之和）的差别

这道题与上一问的区别在于：

+ [第 39 题](https://leetcode-cn.com/problems/combination-sum/)：`candidates` 中的数字可以无限制重复被选取；
+ 第 40 题：`candidates` 中的每个数字在每个组合中只能使用一次。

相同点是：相同数字列表的不同排列视为一个结果。

## 如何去掉重复的集合（重点）

为了使得解集不包含重复的组合。有以下 $2$ 种方案：

+ 使用 **哈希表** 天然的去重功能，但是编码相对复杂；
+ 这里我们使用和第 39 题和第 15 题（三数之和）类似的思路：不重复就需要按 **顺序** 搜索， **在搜索的过程中检测分支是否会出现重复结果** 。注意：这里的顺序不仅仅指数组 `candidates`  有序，还指按照一定顺序搜索结果。

![image.png](https://pic.leetcode-cn.com/1599718525-iXEiiy-image.png)

![image.png](https://pic.leetcode-cn.com/1599716342-gGiISM-image.png)

由第 39 题我们知道，数组 `candidates`  有序，也是 **深度优先遍历** 过程中实现「剪枝」的前提。
将数组先排序的思路来自于这个问题：去掉一个数组中重复的元素。很容易想到的方案是：先对数组 **升序** 排序，重复的元素一定不是排好序以后相同的连续数组区域的第 $1$ 个元素。也就是说，剪枝发生在：**同一层数值相同的结点第 $2$、$3$ ... 个结点，因为数值相同的第 $1$ 个结点已经搜索出了包含了这个数值的全部结果**，同一层的其它结点，候选数的个数更少，搜索出的结果一定不会比第 $1$ 个结点更多，并且是第 $1$ 个结点的子集。（说明：这段文字很拗口，大家可以结合具体例子，在纸上写写画画进行理解。）


**说明**：
+ 解决这个问题可能需要解决 **第 15 题**（[三数之和](https://leetcode-cn.com/problems/3sum/)）、 **第 47 题**（[全排列 II](https://leetcode-cn.com/problems/permutations-ii/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liwe-2/)）、 **第 39 题**（[组合之和](https://leetcode-cn.com/problems/combination-sum/)）的经验；
+ 对于如何去重还不太清楚的朋友，可以参考当前题解的 [高赞置顶评论](https://leetcode-cn.com/problems/combination-sum-ii/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-3/225211) 。

感谢用户 [@rmokerone](/u/rmokerone/) 提供的 C++ 版本的参考代码。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        int len = candidates.length;
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        // 关键步骤
        Arrays.sort(candidates);

        Deque<Integer> path = new ArrayDeque<>(len);
        dfs(candidates, len, 0, target, path, res);
        return res;
    }

    /**
     * @param candidates 候选数组
     * @param len        冗余变量
     * @param begin      从候选数组的 begin 位置开始搜索
     * @param target     表示剩余，这个值一开始等于 target，基于题目中说明的"所有数字（包括目标数）都是正整数"这个条件
     * @param path       从根结点到叶子结点的路径
     * @param res
     */
    private void dfs(int[] candidates, int len, int begin, int target, Deque<Integer> path, List<List<Integer>> res) {
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = begin; i < len; i++) {
            // 大剪枝：减去 candidates[i] 小于 0，减去后面的 candidates[i + 1]、candidates[i + 2] 肯定也小于 0，因此用 break
            if (target - candidates[i] < 0) {
                break;
            }

            // 小剪枝：同一层相同数值的结点，从第 2 个开始，候选数更少，结果一定发生重复，因此跳过，用 continue
            if (i > begin && candidates[i] == candidates[i - 1]) {
                continue;
            }

            path.addLast(candidates[i]);
            // 调试语句 ①
            // System.out.println("递归之前 => " + path + "，剩余 = " + (target - candidates[i]));

            // 因为元素不可以重复使用，这里递归传递下去的是 i + 1 而不是 i
            dfs(candidates, len, i + 1, target - candidates[i], path, res);

            path.removeLast();
            // 调试语句 ②
            // System.out.println("递归之后 => " + path + "，剩余 = " + (target - candidates[i]));
        }
    }

    public static void main(String[] args) {
        int[] candidates = new int[]{10, 1, 2, 7, 6, 1, 5};
        int target = 8;
        Solution solution = new Solution();
        List<List<Integer>> res = solution.combinationSum2(candidates, target);
        System.out.println("输出 => " + res);
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:

    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        def dfs(begin, path, residue):
            if residue == 0:
                res.append(path[:])
                return

            for index in range(begin, size):
                if candidates[index] > residue:
                    break

                if index > begin and candidates[index - 1] == candidates[index]:
                    continue

                path.append(candidates[index])
                dfs(index + 1, path, residue - candidates[index])
                path.pop()

        size = len(candidates)
        if size == 0:
            return []

        candidates.sort()
        res = []
        dfs(0, [], target)
        return res
```
</CodeGroupItem>
</CodeGroup>


打开上面的调试语句（Java 版代码），针对输入 `int[] candidates = new int[]{10, 1, 2, 7, 6, 1, 5};` 和 `int target = 8;` 控制台输出如下：

```
递归之前 => [1]，剩余 = 7
递归之前 => [1, 1]，剩余 = 6
递归之前 => [1, 1, 2]，剩余 = 4
递归之后 => [1, 1]，剩余 = 4
递归之前 => [1, 1, 5]，剩余 = 1
递归之后 => [1, 1]，剩余 = 1
递归之前 => [1, 1, 6]，剩余 = 0
递归之后 => [1, 1]，剩余 = 0
递归之后 => [1]，剩余 = 6
递归之前 => [1, 2]，剩余 = 5
递归之前 => [1, 2, 5]，剩余 = 0
递归之后 => [1, 2]，剩余 = 0
递归之后 => [1]，剩余 = 5
递归之前 => [1, 5]，剩余 = 2
递归之后 => [1]，剩余 = 2
递归之前 => [1, 6]，剩余 = 1
递归之后 => [1]，剩余 = 1
递归之前 => [1, 7]，剩余 = 0
递归之后 => [1]，剩余 = 0
递归之后 => []，剩余 = 7
递归之前 => [2]，剩余 = 6
递归之前 => [2, 5]，剩余 = 1
递归之后 => [2]，剩余 = 1
递归之前 => [2, 6]，剩余 = 0
递归之后 => [2]，剩余 = 0
递归之后 => []，剩余 = 6
递归之前 => [5]，剩余 = 3
递归之后 => []，剩余 = 3
递归之前 => [6]，剩余 = 2
递归之后 => []，剩余 = 2
递归之前 => [7]，剩余 = 1
递归之后 => []，剩余 = 1
输出 => [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
```

**复杂度分析**：

请见本题「力扣」 [官方题解](https://leetcode-cn.com/problems/combination-sum-ii/solution/zu-he-zong-he-ii-by-leetcode-solution/)。
