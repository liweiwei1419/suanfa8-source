---
title: LeetCode 专题：查找表
date: 2019-02-16 09:00:00
author: liwei
top: false
mathjax: true
categories: leetcode 专题
tags:
  - 查找表
  - 哈希表
permalink: leetcode-tag/lockup-table
---

[TOC]


## 「力扣」专题：查找表

### 「力扣」第 349 题：计算两个数组的交集

Java 代码：

```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;


public class Solution {

    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set1 = new HashSet<>();
        for (int value : nums1) {
            set1.add(value);
        }
        
        Set<Integer> set2 = new HashSet<>();
        for (int value : nums2) {
            if (set1.contains(value)) {
                set2.add(value);
            }
        }
        
        int size = set2.size();
        int[] res = new int[size];
        int next = 0;
        for (Integer num : set2) {
            res[next] = num;
            next++;
        }
        return res;
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 2, 2, 1};
        int[] nums2 = {2, 2};
        int[] res = new Solution().intersection(nums1, nums2);
        System.out.println(Arrays.toString(res));
    }
}
```

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

### 「力扣」第 242 题：Valid Anagram

思路1：把两个字符串都转换成字符数组以后，进行排序，然后逐位进行比较。

Java 代码：

```java
public class Solution {
    public boolean isAnagram(String s, String t) {
        boolean isAnagram = true;
        if (s.length() != t.length()) {
            isAnagram = false;
        } else {
            char[] sArray = s.toCharArray();
            Arrays.sort(sArray);
            char[] tArray = t.toCharArray();
            Arrays.sort(tArray);
            for (int i = 0; i < sArray.length; i++) {
                if (sArray[i] != tArray[i]) {
                    isAnagram = false;
                    break;
                }
            }
        }
        return isAnagram;
    }
}
```

思路2：放入一个 Map 中，只要后面有一个元素不出现在 Map 中，就退出，最后应该使得这个 Map 里所有元素的 value 值都为 0。

Java 代码：

```java
public class Solution2 {
    public boolean isAnagram(String s, String t) {
        boolean isAnagram = true;
        if (s.length() != t.length()) {
            isAnagram = false;
        } else {
            char[] sArray = s.toCharArray();
            Map<Character, Integer> map1 = new HashMap<>();
            for (char c : sArray) {
                if (map1.containsKey(c)) {
                    map1.put(c, map1.get(c) + 1);
                } else {
                    map1.put(c, 1);
                }
            }
    
            char[] tArray = t.toCharArray();
            for (char c : tArray) {
                if (map1.containsKey(c) && map1.get(c) >= 1) {
                    map1.put(c, map1.get(c) - 1);
                } else {
                    isAnagram = false;
                    break;
                }
            }
        }
        return isAnagram;
    }
}
```

### 「力扣」第 202 题：快乐数

Java 代码：

```java
class Solution {
    public boolean isHappy(int n) {
        boolean isHappy = false;
        Set<Integer> set1 = new HashSet<>();
        String numberStr = String.valueOf(n);
        while (true) {
            int sum = 0;
            for (int i = 0; i < numberStr.length(); i++) {
                sum += Math.pow(Integer.valueOf(String.valueOf(numberStr.charAt(i))), 2);
            }
            if (sum == 1) {
                isHappy = true;
                break;
            } else if (set1.contains(sum)) {
                break;
            } else {
                set1.add(sum);
                numberStr = String.valueOf(sum);
            }
        }
        return isHappy;
    }
}
```

### 「力扣」第 290 题：Word Pattern

思路：这里有一个小小的坑，就是当测试用例是：`String pattern = "abba";String str = "dog dog dog dog";`的时候，我们须要判断出结果是 `false`。

Java 代码：

```java
public class Solution {
    public boolean wordPattern(String pattern, String str) {
        boolean wordPattern = false;
        int patternLength = pattern.length();
        String[] strArray = str.split(" ");
        if (patternLength == strArray.length) {

            Map<Character, String> map1 = new HashMap<>();
            Set<String> uniqueValue = new HashSet<>();
            char[] patternArray = pattern.toCharArray();
            for (int i = 0; i < patternLength; i++) {
                if (map1.containsKey(patternArray[i])) {
                    if (!map1.get(patternArray[i]).equals(strArray[i])) {
                        return wordPattern;
                    }
                } else {
                    if (uniqueValue.contains(strArray[i])) {
                        return wordPattern;
                    }
                    uniqueValue.add(strArray[i]);
                    map1.put(patternArray[i], strArray[i]);
                }
            }
            wordPattern = true;
        }
        return wordPattern;
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        String pattern = "abba";
        String str = "dog dog dog dog";
        boolean wordPattern = solution.wordPattern(pattern, str);
        System.out.println(wordPattern);
    }
}
```

### 「力扣」第 205 题：Isomorphic Strings 判断是否同构

### 「力扣」第 451 题：Sort Characters By Frequency

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

### 「力扣」第 15 题：三数之和

用 set 把最后一层循环给省掉了。

![image-20190120152934792](http://upload-images.jianshu.io/upload_images/414598-5c4032c0c8ae3c75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上面是在 set 里直接判重，下面是排好序以后判重。

![image-20190120153003611](http://upload-images.jianshu.io/upload_images/414598-3f8129bdcf5d9aaa.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image-20190111135711219](http://upload-images.jianshu.io/upload_images/414598-7dcf60ca790760e6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Python 代码1：使用指针对撞，首先要排序

```python
class Solution(object):
    def threeSum(self, nums):
        res = []
        nums.sort()
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            # 用指针对撞的方式
            l = i + 1
            r = len(nums) - 1
            # 不能等于，等于就变成取一样的数了
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if s > 0:
                    r -= 1
                elif s < 0:
                    l += 1
                else:
                    res.append([nums[i], nums[l], nums[r]])
                    # 注意：这一步在去重，是第一种解法 set 做不到的
                    # 看一看右边是不是和自己相等，如果相等，就向右边移动一格
                    while l < r and nums[l] == nums[l + 1]:
                        l += 1
                    # 看一看左边是不是和自己相等，如果相等，就向右边移动一格
                    while l < r and nums[r] == nums[r - 1]:
                        r -= 1
                    l += 1
                    r -= 1
        return res
```

Python 代码2：使用哈希表，首先要排序

```python
class Solution(object):
    # 排序可以去掉 -4 但是不能把后面重复的 2 去掉
    # [-4,-4, 2, 2]
    def threeSum(self, nums):
        if len(nums) < 3:
            return []
        nums.sort()

        # 特判
        if nums[0] == nums[-1] == 0:
            return [[0, 0, 0]]

        res = set()
        # 最后两个数就没有必要作为遍历的起点了
        for index, one in enumerate(nums[:-2]):
            # 因为题目要求，答案中不可以包含重复的三元组。
            if index >= 1 and nums[index] == nums[index - 1]:
                continue
            s = set()
            for two in nums[index + 1:]:
                if two not in s:
                    s.add(-one - two)
                else:
                    # 找到了一个解
                    res.add((one, two, -one - two))
        return list(map(list, res))
```

### 「力扣」第 18 题：4Sum

提示：采用了“三数之和”的解法，在外面多套了一层。

### 「力扣」第 16 题：3Sum Closest

Python 代码：还是首先要排序

```python
class Solution(object):
    def threeSumClosest(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: int
        """

        if len(nums) < 3:
            return []
        # 初始化
        diff = float('inf')
        nums.sort()
        for index in range(len(nums) - 2):
            if index > 0 and nums[index] == nums[index - 1]:
                continue
            l = index + 1
            r = len(nums) - 1
            while l < r:
                s = nums[index] + nums[l] + nums[r]
                if abs(s - target) < diff:
                    diff = abs(s - target)
                    res = s
                if s > target:
                    r -= 1
                elif s < target:
                    l += 1
                else:
                    # 如果已经等于 target 的话, 肯定是最接近的，根据题目要求，返回这三个数的和
                    return target
        return res
```

### 「力扣」第 454 题：4 个数之和

Python 代码：

```python
class Solution:
    def fourSumCount(self, A, B, C, D):
        """
        :type A: List[int]
        :type B: List[int]
        :type C: List[int]
        :type D: List[int]
        :rtype: int
        """

        map1 = self.get_map(A, B)
        map2 = self.get_map(C, D)
        res = 0

        for key1 in map1:
            if -key1 in map2:
                res += map1[key1] * map2[-key1]
        return res

    def get_map(self, tuple1, tuple2):
        map = dict()
        for num1 in tuple1:
            for num2 in tuple2:
                map[num1 + num2] = (map.setdefault(num1 + num2, 0) + 1)
        return map
```

### 「力扣」第 49 题：字母异位词分组

### 「力扣」第 447 题：Number of Boomerangs

### 「力扣」第 149 题：直线上最多的点数

## 查找表和滑动窗口

查找表和滑动窗口问题（三题）可以整理一下。

### 「力扣」第 217 题：Contains Duplicate 

> 给定一个整数数组，判断是否存在重复元素。如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。

提示：思路1：哈希表；思路2：排序以后判断重复。

### 「力扣」第 219 题：Contains Duplicate ||

> 给定一个整数数组和一个整数 *k*，判断数组中是否存在两个不同的索引 *i* 和 *j*，使得 **nums [i] = nums [j]**，并且 *i* 和 *j* 的差的绝对值最大为 *k*。

提示：用哈希 map，其中 key 是遍历到的数，value 是索引，遍历到重复的时候，检查一下当前索引和之前索引的差值就可以了。

### 「力扣」第 220 题：Contains Duplicate |||

提示：滑动窗口 + 查找表，这里的查找表是能查询上界和下界的 BST。

Java 代码：滑动窗口 + 查找表，这里的查找表是能查询上界和下界的 BST。

```java
class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        // 特判
        int len = nums.length;
        if (len == 0 || k <= 0 || t < 0) {
            return false;
        }
        TreeSet<Integer> treeSet = new TreeSet<>();
        for (int i = 0; i < len; i++) {
            // 大于等于 nums[i] 的最小数
            Integer ceiling = treeSet.ceiling(nums[i]);
            if (ceiling != null && (long) ceiling - (long) nums[i] <= t) {
                return true;
            }
            // 小于等于 nums[i] 的最大数
            Integer floor = treeSet.floor(nums[i]);
            if (floor != null && (long) nums[i] - (long) floor <= t) {
                return true;
            }
            treeSet.add(nums[i]);
            if (i >= k) {
                treeSet.remove(nums[i - k]);
            }
        }
        return false;
    }
}
```

（本节完）


