---
title: 第 3 节 理解回溯
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---

通过打印输出来观察变量的执行过程，是理解「回溯算法」的重要方法。

# 理解回溯

从 `[1, 2, 3]` 到 `[1, 3, 2]` ，深度优先遍历是这样做的，从 `[1, 2, 3]` 回到 `[1, 2]` 的时候，需要撤销刚刚已经选择的数 `3`，因为在这一层只有一个数 `3` 我们已经尝试过了，因此程序回到上一层，需要撤销对 `2` 的选择，好让后面的程序知道，选择 `3` 了以后还能够选择 `2`。

执行深度优先遍历，从较深层的结点返回到较浅层结点的时候，需要做「状态重置」，即「回到过去」「恢复现场」，我们举一个例子。

## 月光宝盒

只有撤销上一次的选择，重置现场，才能够回到 **完全一样** 的过去，再开始新的尝试才会是有效的。

《大话西游》里有这样的情节，至尊宝要对着「月光宝盒」喊一声「波若菠萝蜜」，时间就可以回到回去（所有的人物、事物都得一样，才能叫「回到过去」），他才能救人。这个道理其实和这里的「撤销选择」是一模一样的。 

![image.png](https://pic.leetcode-cn.com/1598173544-FsXLpL-image.png)

理解回溯比较困难的是理解「回到过去」，**现实世界里我们无法回到过去，但是在算法的世界里可以**。

## 通过打印输出观察

**参考代码 2**：

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;


public class Solution {

    public List<List<Integer>> permute(int[] nums) {
        int len = nums.length;
        // 使用一个动态数组保存所有可能的全排列
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        boolean[] used = new boolean[len];
        Deque<Integer> path = new ArrayDeque<>(len);

        dfs(nums, len, 0, path, used, res);
        return res;
    }

    private void dfs(int[] nums, int len, int depth,
                     Deque<Integer> path, boolean[] used,
                     List<List<Integer>> res) {
        if (depth == len) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < len; i++) {
            if (!used[i]) {
                path.addLast(nums[i]);
                used[i] = true;

                System.out.println("  递归之前 => " + path);
                dfs(nums, len, depth + 1, path, used, res);

                used[i] = false;
                path.removeLast();
                System.out.println("递归之后 => " + path);
            }
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        Solution solution = new Solution();
        List<List<Integer>> lists = solution.permute(nums);
        System.out.println(lists);
    }
}
```


控制台输出：

```shell
  递归之前 => [1]
  递归之前 => [1, 2]
  递归之前 => [1, 2, 3]
递归之后 => [1, 2]
递归之后 => [1]
  递归之前 => [1, 3]
  递归之前 => [1, 3, 2]
递归之后 => [1, 3]
递归之后 => [1]
递归之后 => []
  递归之前 => [2]
  递归之前 => [2, 1]
  递归之前 => [2, 1, 3]
递归之后 => [2, 1]
递归之后 => [2]
  递归之前 => [2, 3]
  递归之前 => [2, 3, 1]
递归之后 => [2, 3]
递归之后 => [2]
递归之后 => []
  递归之前 => [3]
  递归之前 => [3, 1]
  递归之前 => [3, 1, 2]
递归之后 => [3, 1]
递归之后 => [3]
  递归之前 => [3, 2]
  递归之前 => [3, 2, 1]
递归之后 => [3, 2]
递归之后 => [3]
递归之后 => []
输出 => [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
```