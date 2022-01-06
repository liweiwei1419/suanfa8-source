---
title: 「力扣」第 904 题：水果成篮（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

+ 题目链接：[904. 水果成篮](https://leetcode-cn.com/problems/fruit-into-baskets/)（中等）

在一排树中，第 `i` 棵树产生 `tree[i]` 型的水果。

你可以**从你选择的任何树开始**，然后重复执行以下步骤：

1. 把这棵树上的水果放进你的篮子里。如果你做不到，就停下来。
2. 移动到当前树右侧的下一棵树。如果右边没有树，就停下来。

请注意，在选择一颗树后，你没有任何选择：你必须执行步骤 1，然后执行步骤 2，然后返回步骤 1，然后执行步骤 2，依此类推，直至停止。

你有两个篮子，每个篮子可以携带任何数量的水果，但你希望每个篮子只携带一种类型的水果。

用这个程序你能收集的水果树的最大总量是多少？

**提示：**

- `1 <= tree.length <= 40000`

- `0 <= tree[i] < tree.length`

题目的意思难懂：**求只包含两种元素的最长连续子序列****。**

## 思路分析

注意：由于要判定滑动窗口内已经出现的数字的个数，使用哈希表表示频数数组。

**参考代码 1**：使用哈希表记录频数。

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int totalFruit(int[] tree) {
        int len = tree.length;

        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        int right = 0;
        int res = 1;
        // [left..right) 内不同字符的个数不超过 2 个
        while (right < len) {
            freq.put(tree[right], freq.getOrDefault(tree[right], 0) + 1);
            right++;

            while (freq.size() > 2) {
                freq.put(tree[left], freq.get(tree[left]) - 1);
                if (freq.get(tree[left]) == 0) {
                    freq.remove(tree[left]);
                }
                left++;
            }
            res = Math.max(res, right - left);
        }
        return res;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] tree = new int[]{0, 1, 2, 2};
        int res = solution.totalFruit(tree);
        System.out.println(res);
    }
}
```

**参考代码 2**：使用数组记录频数

```java
public class Solution {

    public int totalFruit(int[] tree) {
        int len = tree.length;

        int[] freq = new int[len + 1];
        int left = 0;
        int right = 0;
        int res = 1;
        // [left..right) 区间里不同正数的个数
        int count = 0;
        // [left..right) 内不同字符的个数不超过 2 个
        while (right < len) {
            if (freq[tree[right]] == 0) {
                count++;
            }
            freq[tree[right]]++;
            right++;

            while (count > 2) {
                freq[tree[left]]--;
                if (freq[tree[left]] == 0) {
                    count--;
                }
                left++;
            }
            res = Math.max(res, right - left);
        }
        return res;
    }
}
```

