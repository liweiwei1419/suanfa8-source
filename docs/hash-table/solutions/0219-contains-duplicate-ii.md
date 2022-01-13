---
title: 「力扣」第 219 题： 存在重复元素 II（中等）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

- 题目链接：[219. 存在重复元素 II](https://leetcode-cn.com/problems/contains-duplicate-ii/);
- 题解链接：[哈希表（Java、Python）](https://leetcode-cn.com/problems/contains-duplicate-ii/solution/ha-xi-biao-python-dai-ma-java-dai-ma-by-liweiwei14/)。

## 题目描述

给定一个整数数组和一个整数 _k_，判断数组中是否存在两个不同的索引 _i_ 和 _j_，使得 **nums [i] = nums [j]**，并且 _i_ 和 _j_ 的差的绝对值最大为 _k_。

**示例 1：**

```
输入: nums = [1,2,3,1], k = 3
输出: true
```

**示例 2:**

```
输入: nums = [1,0,1,1], k = 1
输出: true
```

**示例 3:**

```
输入: nums = [1,2,3,1,2,3], k = 2
输出: false
```

**Constraints:**

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `0 <= k <= 10^5`

## 思路分析

如果你做过 [「力扣」第 1 题： 两数之和](https://leetcode-cn.com/problems/two-sum/)，这道题就变得很容易了。

1、判定重复元素，首先我们会想到使用哈希表；

2、题目又要求“ `i` 和 `j` 的差的绝对值最大为 `k`”，因此，哈希表的 key 为数组元素，value 为其对应的索引；

3、“是否存在问题”的做法是：在遍历的过程中找到就直接返回，如果找不到，才返回 `false`。因此找到（或者说存在）的充分必要条件是：

> 找到重复元素的索引与之前出现过的这个元素的索引的差小于等于 `k`，后出现的数的索引一定比前出现的数的索引大，因此绝对值不用考虑。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.HashMap;

public class Solution {

    // 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，
    // 使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。
    // "并且 i 和 j 的差的绝对值最大为 k"，改成"并且 i 和 j 的差的绝对值不超过 k" 或许就好理解多了
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        int len = nums.length;
        // 先将极端用例返回
        if (len < 2) {
            return false;
        }
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < len; i++) {
            if (map.containsKey(nums[i])) {
                if (i - map.get(nums[i]) <= k) {
                    return true;
                }
            }
            map.put(nums[i], i);
        }
        return false;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:

    # 应该写 is not None
    # 判断存在重复元素的索引之差小于某个数

    def containsNearbyDuplicate(self, nums, k):
        # 先判断 nums [i] = nums [j]
        # 然后判断索引值是否相等，所以索引值可以用 map 存起来。

        size = len(nums)
        if size == 0:
            return False

        map = dict()
        for index in range(size):
            if nums[index] in map and index - map[nums[index]] <= k:
                # 只要存在就返回了
                return True
            # 更新为最新的索引
            map[nums[index]] = index
        return False
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析：**

- 时间复杂度：$O(N)$，这里 $N$ 是数组的元素个数，算法遍历了一次数组；
- 空间复杂度：$O(N)$，这里使用了哈希表存储已经出现的数，可以说是以空间换时间了。
