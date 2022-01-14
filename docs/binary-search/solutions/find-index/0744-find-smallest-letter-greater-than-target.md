---
title: 「力扣」第 744 题：寻找比目标字母大的最小字母（简单）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

- 题目链接：[744. 寻找比目标字母大的最小字母](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/)；
- 题解链接：[转换为第 35 题，找第 1 个严格大于 target 元素的位置（模板写法）](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/solution/zhuan-huan-wei-di-35-ti-zhao-di-1-ge-yan-ge-da-yu-/)。

## 题目描述

给你一个排序后的字符列表 `letters` ，列表中只包含小写英文字母。另给出一个目标字母 `target`，请你寻找在这一有序列表里比目标字母大的最小字母。

在比较时，字母是依序循环出现的。举个例子：

- 如果目标字母 `target = 'z'` 并且字符列表为 `letters = ['a', 'b']`，则答案返回 `'a'`

**示例：**

```
输入:
letters = ["c", "f", "j"]
target = "a"
输出: "c"

输入:
letters = ["c", "f", "j"]
target = "c"
输出: "f"

输入:
letters = ["c", "f", "j"]
target = "d"
输出: "f"

输入:
letters = ["c", "f", "j"]
target = "g"
输出: "j"

输入:
letters = ["c", "f", "j"]
target = "j"
输出: "c"

输入:
letters = ["c", "f", "j"]
target = "k"
输出: "c"
```

**提示：**

1. `letters`长度范围在`[2, 10000]`区间内。
2. `letters` 仅由小写字母组成，最少包含两个不同的字母。
3. 目标字母`target` 是一个小写字母。

## 思路分析

1、要特别注意题目中如下的示例：

```
输入:
letters = ["c", "f", "j"]
target = "j"
输出: "c"
```

明明找到了，但是题目要求找**严格**大于 `j` 的第 1 个位置，因此这道题特别像第 35 题，因此搜索范围是 `[0, len]`，注意，不是 `[0, len - 1]`。

2、根据题意：小于等于一定不是解，先写 `letters[mid] <= target` 这个分支，得到下一轮搜索的区间是：`[mid + 1, right]`，即 `left = mid + 1`，这一点确定了以后，反面就是 `right = mid`，分支这样写，不用调整成右中位数；

3、需要后处理：还是上面那个示例，如果找到的位置超出了 `len - 1`，就说明找不到，可根据题意，返回第 0 号索引元素，否则返回查找到的那个位置的元素。

以上思路基于 [“二分搜索法模板”](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)，分析清楚以后，不难写出如下两版代码。

**参考代码 1**：特殊判断放在最后面，**此时要注意二分搜索初始化的右边界**。

```java
public class Solution {

    // 比目标字母大的最小字母
    // 找严格大于 target 的第 1 个位置

    public char nextGreatestLetter(char[] letters, char target) {
        int len = letters.length;
        // 转换为第 35 题：其实就是找插入元素的位置
        // 搜索范围 [0, len]
        int left = 0;
        // 分析这一步特别重要
        int right = len;

        while (left < right){
            int mid = (left + right) >>> 1;
            if (letters[mid] <= target){
                // 下一轮搜索的区间是：[mid + 1, right]
                left = mid + 1;
            }else {
                right = mid;
            }
        }
        // 因为有可能不存在
        if (left == len){
            return letters[0];
        }
        return letters[left];
    }
}
```

当然，最特殊的判断也可以放在最前面。

**参考代码 2**：一开始就做特殊判断，接下来就可以确定在 `[0, len - 1]` 范围里一定有解，无需后处理。

```java
public class Solution {
    public char nextGreatestLetter(char[] letters, char target) {
        int len = letters.length;

        if (target >= letters[len - 1]) {
            return letters[0];
        }

        int left = 0;
        int right = len - 1;

        while (left < right) {
            int mid = (left + right) >>> 1;
            if (letters[mid] <= target) {
                // 下一轮搜索的区间是：[mid + 1, right]
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return letters[left];
    }
}
```
