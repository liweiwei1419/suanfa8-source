---
title: 「力扣」第 401 题：二进制手表问题
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
---

- 题目链接：[401. 二进制手表](https://leetcode-cn.com/problems/binary-watch/)。

## 题目描述

二进制手表顶部有 4 个 LED 代表**小时（0-11）**，底部的 6 个 LED 代表**分钟（0-59）**。

每个 LED 代表一个 0 或 1，最低位在右侧。

![LeetCode 第 401 题：二进制手表问题](https://liweiwei1419.gitee.io/images/leetcode-notes/backtracking/5-2.jpg)

例如，上面的二进制手表读取 “3:25”。

给定一个非负整数 _n_ 代表当前 LED 亮着的数量，返回所有可能的时间。

**案例:**

```
输入: n = 1
返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
```

**注意事项:**

- 输出的顺序没有要求。
- 小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。
- 分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。

典型的组合问题。

**参考代码**：

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;


public class Solution {

    private List<String> res = new ArrayList<>();

    private int[] hourArr = {8, 4, 2, 1};
    private int[] minuteArr = {32, 16, 8, 4, 2, 1};

    public List<String> readBinaryWatch(int num) {
        if (num > 10 || num < 0) {
            return res;
        }
        for (int i = 0; i <= num; i++) {
            // 应该定义组合
            List<Integer> hourCombination = findCombination(hourArr, i);
            List<Integer> minuteCombination = findCombination(minuteArr, num - i);
            for (int j = 0; j < hourCombination.size(); j++) {
                if (hourCombination.get(j) > 11) {
                    continue;
                }
                for (int k = 0; k < minuteCombination.size(); k++) {
                    if (minuteCombination.get(k) > 59) {
                        continue;
                    }
                    res.add(hourCombination.get(j) + ":" + (minuteCombination.get(k) < 10 ? "0" + minuteCombination.get(k) : minuteCombination.get(k)));
                }
            }
        }
        return res;
    }


    private List<Integer> findCombination(int[] arr, int count) {
        List<Integer> res = new ArrayList<>();
        findCombination(arr, count, 0, new Stack<>(), res);
        return res;
    }


    private Integer sum(List<Integer> pre) {
        int sum = 0;
        for (int i = 0; i < pre.size(); i++) {
            sum += pre.get(i);
        }
        return sum;
    }

    private void findCombination(int[] arr, int count, int start, Stack<Integer> pre, List<Integer> res) {
        if (pre.size() == count) {
            res.add(sum(pre));
            return;
        }
        for (int i = start; i < arr.length; i++) {
            pre.push(arr[i]);
            findCombination(arr, count, i + 1, pre, res);
            pre.pop();
        }
    }
}
```
