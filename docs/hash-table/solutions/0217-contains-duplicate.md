---
title: 「力扣」第 217 题：存在重复元素（简单）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---


+ 题目链接：[217. 存在重复元素](https://leetcode-cn.com/problems/contains-duplicate/);
+ 题解地址：[哈希表 + 排序（Python 代码、Java 代码）](https://leetcode-cn.com/problems/contains-duplicate/solution/ha-xi-biao-pai-xu-python-dai-ma-java-dai-ma-by-liw/)。

## 题目描述

给定一个整数数组，判断是否存在重复元素。

如果存在一值在数组中出现至少两次，函数返回 `true` 。如果数组中每个元素都不相同，则返回 `false` 。

**示例 1:**

```
输入: [1,2,3,1]
输出: true
```

**示例 2:**

```
输入: [1,2,3,4]
输出: false
```

**示例 3:**

```
输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
```

**Constraints:**

- $1 \le \text{nums.length} \le 10^5$
- $-10^9 \le \text{nums[i]} \le 10^9$

**参考代码**：

```python
class Solution:
    def containsDuplicate(self, nums):
        s = set()
        for num in nums:
            if num in s:
                return True
            else:
                s.add(num)
        return False
```



## 思路分析

这是一道非常简单的算法题，可以让刚接触算法题的朋友们热热身。解题思路也很容易想到：

+ 使用哈希表判重，以空间换时间；
+ 先将数组排序，如果有重复元素，它们就会相邻放置，遍历一遍数组，就容易发现相邻的重复元素。

两种方法各有优劣，体现在下面的「复杂度分析」中。

### 方法一：哈希表

**参考代码**：



<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.HashSet;
import java.util.Set;

public class Solution {

    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (set.contains(num)) {
                return true;
            } else {
                set.add(num);
            }
        }
        return false;
    }

}
```
</CodeGroupItem>
<CodeGroupItem title="Java">
```java
import java.util.HashSet;
import java.util.Set;

public class Solution {

    public boolean containsDuplicate1(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            boolean success = set.add(num);
            if (!success) {
                // 如果没有添加成功，表示有重复元素，直接返回就可以了
                return true;
            }
        }
        return false;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
from typing import List


class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        s = set()
        for num in nums:
            if num in s:
                return True
            else:
                s.add(num)
        return False

```
</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是数组的长度，算法遍历了一次数组；
+ 空间复杂度：$O(N)$，使用哈希表遍历了一遍数组中的每个元素。

## 方法二：对数组做预处理（排序）

排序以后再判断重复。


**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.Arrays;

public class Solution {
    public boolean containsDuplicate(int[] nums) {
        int len = nums.length;
        // 特判
        if (len < 2) {
            return false;
        }

        // 原地排序，这一步是关键
        Arrays.sort(nums);

        for (int i = 0; i < len - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                return true;
            }
        }
        return false;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
from typing import List


class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        size = len(nums)
        # 特殊判断
        if size < 2:
            return False

        # 原地排序，这一步是关键
        nums.sort()

        for i in range(1, size):
            if nums[i] == nums[i - 1]:
                return True
        return False
```
</CodeGroupItem>
</CodeGroup>


**复杂度分析**：

+ 时间复杂度：$O(N \log N)$，这里 $N$ 是数组的长度，算法先对数组排序，时间复杂度为 $O(N \log N)$，然后遍历了一次数组，时间复杂度为 $O(N)$；
+ 空间复杂度：$O(1)$，没有使用额外的存储空间，但是也修改了数组。





