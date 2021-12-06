---
title: 1.4 总结
icon: yongyan
category: 二分查找
tags:
  - 减治思想
---

# 总结

[[TOC]]

## 把待搜索区间分成 3 个部分

循环部分给出的条件是 `while (left <= right)`，表示当 `left == right` 成立的时候，还有一个元素，即下标为 `left`（`right`）位置的元素还没有看到，需要继续查看这个元素的值，看看是不是我们想要的。

这个思路把待查找数组分为了 3 个部分：

+ `mid` 所在位置；
+ `mid` 的左边（不包括 `mid`）；
+ `mid` 的右边（不包括 `mid`）。

根据 `mid` 元素与目标元素的值的大小关系，如果 `nums[mid]` 恰好等于 `target` 直接返回。否则根据不等关系，**确定下一轮搜索的区间**。

「力扣」上有些二分问题用这个思路是没有问题的，**有的时候往往会顺带思考很多问题，增加了出错率**，例如：

+ 返回 `left` 还是 `right`；
+ 明明已经看到了等于 `target` 的元素，但是题目要求返回小于等于 `target` 的第 1 个元素的位置，或则要求返回大于等于 `target` 的最后 1 个元素的位置的时候，一不小心会把代码写成线性查找。

这两个问题有时会增加思考问题的负担，一不小心还有可能出错。这一类问题的共同特点是：目标值往往在待查找数组中存在多个，但是题目要求我们返回的是一个边界值。


## 把待搜索区间分成 2 个部分

在循环结束以后判断目标元素是否存在。

::: danger 提示

下面这种把区间分成两个部分的写法，在以后做题的时候会经常用到。

:::

+ 特点：在循环结束以后判断目标元素是否存在。在循环中，分支只有两个判断更少；
+ 缺点：如果这个写法掌握得不好，容易出错。

**「力扣」第 704 题参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] < target) {
                // 下一轮搜索区间是：[mid + 1..right]
                left = mid + 1;
            } else {
                // 此时 nums[mid] >= target，
                // mid 的右边一定不存在 target，下一轮搜索区间是：[left..mid]
                right = mid;
            }
        }
        // 不要忘了单独做判断
        if (nums[left] == target) {
            return left;
        }
        return -1;
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Java">

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        while (left < right) {
            // 注意：根据分支逻辑，需要在取中间数的时候，向上取整
            int mid = (left + right + 1) / 2;
            if (nums[mid] > target) {
                // 下一轮搜索区间是：[left..mid - 1]
                right = mid - 1;
            } else {
                // 此时 nums[mid] <= target
                // mid 的左边一定不等于目标元素
                // 下一轮搜索区间是：[mid..right]
                left = mid;
            }
        }
        // 不要忘了单独做判断
        if (nums[left] == target) {
            return left;
        }
        return -1;
    }
}
```

</CodeGroupItem>
</CodeGroup>

**注意**：看到 `left = mid;` ，一定要记得将取中间数的行为上取整，即 `int mid = (left + right + 1) / 2;`，原因我们以后再说。

<Utterances />