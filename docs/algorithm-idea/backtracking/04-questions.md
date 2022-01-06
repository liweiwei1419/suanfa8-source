---
title: 5.4 回溯算法的几点说明
icon: yongyan
author: liweiwei1419
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---


思考以下几个问题，更深入理解「回溯算法」。

# 几点说明帮助理解「回溯算法」

## 每一次尝试都「复制」，则不需要回溯

如果在每一个 **非叶子结点** 分支的尝试，都创建 **新的变量** 表示状态，那么

+ 在回到上一层结点的时候不需要「回溯」；
+ 在递归终止的时候也不需要做拷贝。
  这样的做法虽然可以得到解，但也会创建很多中间变量，这些中间变量很多时候是我们不需要的，会有一定空间和时间上的消耗。为了验证上面的说明，我们写如下代码进行实验：

**参考代码 3**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayList;
import java.util.List;


public class Solution {

    public List<List<Integer>> permute(int[] nums) {
        // 首先是特判
        int len = nums.length;
        // 使用一个动态数组保存所有可能的全排列
        List<List<Integer>> res = new ArrayList<>();

        if (len == 0) {
            return res;
        }

        boolean[] used = new boolean[len];
        List<Integer> path = new ArrayList<>();

        dfs(nums, len, 0, path, used, res);
        return res;
    }

    private void dfs(int[] nums, int len, int depth,
                     List<Integer> path, boolean[] used,
                     List<List<Integer>> res) {
        if (depth == len) {
            // 3、不用拷贝，因为每一层传递下来的 path 变量都是新建的
            res.add(path);
            return;
        }

        for (int i = 0; i < len; i++) {
            if (!used[i]) {
                // 1、每一次尝试都创建新的变量表示当前的"状态"
                List<Integer> newPath = new ArrayList<>(path);
                newPath.add(nums[i]);

                boolean[] newUsed = new boolean[len];
                System.arraycopy(used, 0, newUsed, 0, len);
                newUsed[i] = true;

                dfs(nums, len, depth + 1, newPath, newUsed, res);
                // 2、无需回溯
            }
        }
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        def dfs(nums, size, depth, path, state, res):
            if depth == size:
                res.append(path)
                return

            for i in range(size):
                if ((state >> i) & 1) == 0:
                    dfs(nums, size, depth + 1, path + [nums[i]], state ^ (1 << i), res)

        size = len(nums)
        if size == 0:
            return []

        state = 0
        res = []
        dfs(nums, size, 0, [], state, res)
        return res
```
</CodeGroupItem>
</CodeGroup>

这就好比我们在实验室里做「对比实验」，每一个步骤的尝试都要保证使用的材料是一样的。我们有两种办法：

+ 每做完一种尝试，都把实验材料恢复成做上一个实验之前的样子，只有这样做出的对比才有意义；
+ 每一次尝试都使用同样的 **新的材料** 做实验。

在生活中做实验对材料有破坏性，这个过程通常不可逆。而在计算机的世界里，「恢复现场」和「回到过去」是相对容易的。

在一些字符串的搜索问题中，有时不需要回溯的原因是这样的：字符串变量在拼接的过程中会产生新的对象（针对 Java 和 Python 语言，其它语言我并不清楚）。如果您使用 Python 语言，会知道有这样一种语法：`[1, 2, 3] + [4]` 也是创建了一个新的列表对象，我们已经在「参考代码 2」中展示这种写法。

## 为什么不是广度优先遍历

+ 首先是正确性，只有遍历状态空间，才能得到所有符合条件的解，这一点 BFS 和 DFS 其实都可以；
+ 在深度优先遍历的时候，**不同状态之间的切换很容易** ，可以再看一下上面有很多箭头的那张图，每两个状态之间的差别只有 $1$ 处，因此回退非常方便，这样全局才能使用一份状态变量完成搜索；
+ 如果使用广度优先遍历，从浅层转到深层，状态的变化就很大，此时我们不得不在每一个状态都新建变量去保存它，从性能来说是不划算的；
+ 如果使用广度优先遍历就得使用队列，然后编写结点类。队列中需要存储每一步的状态信息，**需要存储的数据很大，真正能用到的很少** 。
+ 使用深度优先遍历，直接使用了系统栈，系统栈帮助我们保存了每一个结点的状态信息。我们不用编写结点类，不必手动编写栈完成深度优先遍历。

## 不回溯可不可以

可以。搜索问题的状态空间一般很大，如果每一个状态都去创建新的变量，时间复杂度是 $O(N)$。在候选数比较多的时候，在非叶子结点上创建新的状态变量的性能消耗就很严重。

就本题而言，只需要叶子结点的那个状态，在叶子结点执行拷贝，时间复杂度是 $O(N)$。路径变量在深度优先遍历的时候，结点之间的转换只需要 $O(1)$。

最后，由于回溯算法的时间复杂度很高，因此在遍历的时候，如果能够提前知道这一条分支不能搜索到满意的结果，就可以提前结束，这一步操作称为 **剪枝**。