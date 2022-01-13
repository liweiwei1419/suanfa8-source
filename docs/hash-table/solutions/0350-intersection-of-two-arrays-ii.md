---
title: 「力扣」第 350 题：两个数组的交集 II（中等）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

- 题目链接：[350. 两个数组的交集 II](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)。

## 题目描述

给你两个整数数组 `nums1` 和 `nums2` ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。

**示例 1：**

```
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]
```

**示例 2:**

```
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]
```

**Constraints:**

- `1 <= nums1.length, nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 1000`

**进阶**：

- 如果给定的数组已经排好序呢？你将如何优化你的算法？
- 如果 `nums1` 的大小比 `nums2` 小，哪种方法更优？
- 如果 `nums2` 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

## 方法一：哈希表

**参考代码**：

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class Solution {

    public int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map1 = new HashMap<>();
        for (int num : nums1) {
            if (map1.containsKey(num)) {
                map1.put(num, map1.get(num) + 1);
            } else {
                map1.put(num, 1);
            }
        }

        List<Integer> resultList = new ArrayList<>();
        for (int num : nums2) {
            if (map1.containsKey(num) && map1.get(num) >= 1) {
                resultList.add(num);
                map1.put(num, map1.get(num) - 1);
            }
        }

        int[] res = new int[resultList.size()];
        for (int i = 0; i < resultList.size(); i++) {
            res[i] = resultList.get(i);
        }
        return res;
    }
}
```

## 方法二：排序以后逐个比较

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {

    public int[] intersect(int[] nums1, int[] nums2) {
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        int i = 0;
        int j = 0;
        List<Integer> list = new ArrayList<>();
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] < nums2[j]) {
                i++;
            } else if (nums1[i] > nums2[j]) {
                j++;
            } else {
                list.add(nums1[i]);
                i++;
                j++;
            }
        }

        int[] res = new int[list.size()];
        int index = 0;
        for (Integer integer : list) {
            res[index] = integer;
            index++;
        }
        return res;
    }

}

````

</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
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
````

</CodeGroupItem>
</CodeGroup>

补充：虽然是一个简单的问题，但还是有陷阱。

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
