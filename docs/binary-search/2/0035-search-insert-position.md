---
title: 例 1：查找插入元素的位置
---

# 「力扣」第 35 题：搜索插入位置（简单）

+ [链接](https://leetcode-cn.com/problems/search-insert-position)
+ [题解链接（含视频讲解）](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例 1：

```
输入: [1, 3, 5, 6], 5
输出: 2
```


示例 2：

```
输入: [1, 3, 5, 6], 2
输出: 1
```


示例 3：

```
输入: [1, 3, 5, 6], 7
输出: 4
```

示例 4：

```
输入: [1, 3, 5, 6], 0
输出: 0
```

## 解题思路

要找到大于或者等于 `target` 的第 1 个元素的下标，因此严格小于 `target` 的元素就不是解。根据这一点写出代码。

参考代码：

```java
public class Solution {

    public int searchInsert(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        if (nums[len - 1] < target) {
            return len;
        }
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            // 当 nums[mid] 严格小于目标元素时，不是解
            if (nums[mid] < target) {
                // 下一轮搜索的区间 [mid + 1, right]
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}
```

