---
title: 「力扣」第 1 题：两数之和（简单）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

+ 题目链接：[]()；
+ 题解链接：[]()。

## 题目描述

### 「力扣」第 1 题：两数之和

传送门：[1. 两数之和](https://leetcode-cn.com/problems/two-sum/)。

> 给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。
>
> 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
>
> **示例:**
>
> ```
> 给定 nums = [2, 7, 11, 15], target = 9
> 
> 因为 nums[0] + nums[1] = 2 + 7 = 9
> 所以返回 [0, 1]
> ```

思路：用集合 Set 做差补来完成（推荐）

Python 代码：

```python
class Solution(object):
    def findNumbersWithSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        
        s = set()
        for num in nums:
            if target - num not in s:
                s.add(num)
            else:
                return [num, target - num]
```

### 


# 「力扣」第 1 题：两数之和


### 方法一：暴力解法

Java 代码：

```java
public class Solution {

    public int[] twoSum(int[] nums, int target) {
        int len = nums.length;
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        throw new RuntimeException("没有找到和为 target 的两个数。");
    }
}
```

Python3 代码：

```pytho

```

C++ 代码：

```cpp

```

### 方法二：哈希表

Java 代码：

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int[] twoSum(int[] nums, int target) {
        int len = nums.length;
        
        Map<Integer, Integer> hashMap = new HashMap<>(len - 1);
        hashMap.put(nums[0], 0);
        for (int i = 1; i < len; i++) {
            int another = target - nums[i];
            if (hashMap.containsKey(another)) {
                return new int[]{i, hashMap.get(another)};
            }
            hashMap.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}
```

Python 代码：

```python
class Solution:
    def twoSum(self, nums, target):
        map = dict()
        for index, num in enumerate(nums):
            if target - num in map:
                return [index, map[target - num]]
            else:
                map[num] = index
```



