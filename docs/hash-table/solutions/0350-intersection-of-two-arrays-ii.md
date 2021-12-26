---
title: 「力扣」第 350 题：两个数组的交集 II
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

+ 题目链接：[]()；
+ 题解链接：[]()。

## 题目描述

#### [350. 两个数组的交集 II](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)





### 「力扣」第 350 题：两个数组的交集 II

虽然是一个简单的问题，但还是有陷阱。

Python 代码：

```python
class Solution:
    def intersect(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: List[int]
        """

        return [x for x in nums2 if x in nums1]
```

这样写是不对的，测试用例如下：

```
[4,9,5]
[9,4,9,8,4]
```

Python 代码：

```python
class Solution:
    def intersect(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: List[int]
        """
        nums1.sort()
        nums2.sort()
        len1 = len(nums1)
        len2 = len(nums2)
        result = []
        i = 0
        j = 0
        while i < len1 and j < len2:
            if nums1[i] < nums2[j]:
                i += 1
            elif nums1[i] == nums2[j]:
                result.append(nums1[i])
                i += 1
                j += 1
            else:
                j += 1
        return result


# 使用 HashMap 的写法
# https://gist.github.com/liweiwei1419/74ee4bc1d1443425ff6cc17df271a700

if __name__ == '__main__':
    nums1 = [4, 9, 5]
    nums2 = [9, 4, 9, 8, 4]

    solution = Solution()
    result = solution.intersect(nums1, nums2)
    print(result)

```

### 