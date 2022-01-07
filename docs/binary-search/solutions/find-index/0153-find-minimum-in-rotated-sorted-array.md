---
title: 「力扣」第 153 题：旋转排序数组的最小值（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

+ 题目地址：[153. 寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)。
+ 题解地址：[二分法 + 分治法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/solution/er-fen-fa-fen-zhi-fa-python-dai-ma-java-dai-ma-by-/)。

## 题目描述

已知一个长度为 `n` 的数组，预先按照升序排列，经由 `1` 到 `n` 次 **旋转** 后，得到输入数组。例如，原数组 `nums = [0,1,2,4,5,6,7]` 在变化后可能得到：

- 若旋转 `4` 次，则可以得到 `[4,5,6,7,0,1,2]`
- 若旋转 `7` 次，则可以得到 `[0,1,2,4,5,6,7]`

注意，数组 `[a[0], a[1], a[2], ..., a[n-1]]` **旋转一次** 的结果为数组 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]` 。

给你一个元素值 **互不相同** 的数组 `nums` ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 **最小元素** 。

**示例 1：**

```
输入：nums = [3,4,5,1,2]
输出：1
解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。
```

**示例 2：**

```
输入：nums = [4,5,6,7,0,1,2]
输出：0
解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。
```

**示例 3：**

```
输入：nums = [11,13,15,17]
输出：11
解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。
```

 **提示：**

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`

- `nums` 中的所有整数 **互不相同**
- `nums` 原来是一个升序排序的数组，并进行了 `1` 至 `n` 次旋转

先说重点：如何写对二分查找，我总结在了「力扣」第 35 题：「搜索插入位置」的题解： [用减治思想写二分查找问题、几种模板写法的介绍与比较](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/) ，希望能对大家有所帮助。


---

## 方法一：暴力法

遍历一次数组，选出最小值。这个方法叫「假设修正法」。

## 方法二：二分查找

**思路分析**：二分法也可以解决这个问题，因为「旋转排序数组」，几乎有序的数组，也可以通过比较特定位置的元素的值的判断达到「减治」的效果（ **逐渐缩小搜索区间** ）。

很自然地，我们会看 **中间数** （位于待搜索区间中间位置的元素，由于不是有序数组，因此不能称之为中位数）。

另外，待搜索区间头和尾的元素是位置特殊的元素。有两个比较自然的思路是：

+ 思路 1：看看当前搜索区间的 **左边界** 和「中间数」（注意这里不是中位数），是不是可以缩小搜索区间的范围；
+ 思路 2：看看当前搜索区间的 **右边界** 和「中间数」（注意这里不是中位数），是不是可以缩小搜索区间的范围；

要想清楚这个问题，我们不妨举几个例子。

+ 针对思路 1：

例 1：`[1, 2, 3, 4, 5]`
例 2：`[2, 3, 4, 5, 1]`

这两个例子的「中间数」都比左边界大，但是「旋转排序数组」的最小值一个在「中间数」的左边，一个在「中间数」的右边，因此思路 1 不可行。

+ 针对思路 2，依然写两个例子，这两个例子分别是「中间数比右边界大」和「中间数比右边界小」，看看能不能推导出一般化的结论。

例 3：`[7, 8, 9, 10, 11, 12, 1, 2, 3]`

「中间数」 11 比右边界 3 大，因此中间数左边的数（包括中间数）都不是「旋转排序数组」的最小值，因此，下一轮搜索的区间是 `[mid + 1, right]`，将下一轮搜索的左边界设置成中间数位置 + 1，即 `left = mid + 1`。

例 4：`[7, 8, 1, 2, 3]`

「中间数」 1 比右边界 3 小，说明，中间数到右边界是递增的，那么中间数右边的（不包括中间数）一定不是「旋转排序数组」的最小值，可以把它们排除，但中间数有可能是整个数组中的最小值，就如本例，因此，在下一轮搜索区间是 `[left, mid]`，于是把右边界设置为 `right = mid`。

从例 3 和例 4 可以看出，不论中间数比右边界大，还是中间数比右边界小，我们都可以排除掉将近一半的元素，把原始问题转换成一个规模更小的子问题，这正是「减而治之」思想的体现，因此思路 2 可行。


**参考代码 1**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int findMin(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            throw new IllegalArgumentException("数组为空，无最小元素");
        }
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            // int mid = (left + right) >>> 1;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                // 因为题目中说：你可以假设数组中不存在重复元素。
                // 此时一定有 nums[mid] < nums[right]
                right = mid;
            }
        }
        // 一定存在最小元素，因此无需再做判断
        return nums[left];
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
from typing import List


class Solution:
    def findMin(self, nums: List[int]) -> int:
        size = len(nums)
        if size == 0:
            raise Exception('程序出错')
        if size == 1:
            return nums[0]
        left = 0
        right = size - 1
        while left < right:
            # mid = left + (right - left) // 2
            mid = (left + right) >> 1
            # [7, 8, 1, 2, 3, 4, 5, 6]
            if nums[mid] > nums[right]:
                # [3, 4, 5, 6, 7, 8, 1, 2]
                # 此时 mid 肯定不是最小元素
                left = mid + 1
            else:
                # mid 有可能是最小元素，所以，不能排除它
                assert nums[mid] < nums[right]
                right = mid
        # 一定存在最小元素，因此无需再做判断
        return nums[left]
```
</CodeGroupItem>
</CodeGroup>



**复杂度分析**：

+ 时间复杂度：$O(\log N)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(1)$，只使用了常数个临时变量。


## 方法三：分治法

分治法将原问题划分成若干与原问题同结构且规模更小的子问题，等到这些子问题解决了以后，原问题也得到了解决。

分治法同样适用于「力扣」[第 154 题](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)。

**参考代码 2**：（Python 代码未与 Java 代码同步）

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int findMin(int[] nums) {
        int len = nums.length;
        return findMin(nums, 0, len - 1);
    }

    private int findMin(int[] nums, int left, int right) {
        if (left == right) {
            return nums[left];
        }

        if (left + 1 == right) {
            return Math.min(nums[left], nums[right]);
        }
        int mid = left + (right - left) / 2;

        // 这一步是关键
        if (nums[left] < nums[right]) {
            return nums[left];
        }

        if (nums[mid] < nums[right]) {
            // 右边是顺序数组，[mid + 1 , right] 这个区间里的元素可以不看
            return findMin(nums, left, mid);
        } else {
            // nums[mid] > nums[right]
            // 左边是顺序数组，[left + 1, mid] 这个区间里的元素可以不看
            return findMin(nums, mid + 1, right);
        }
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
from typing import List


class Solution:
    def findMin(self, nums: List[int]) -> int:
        size = len(nums)
        if size == 0:
            raise ValueError("传入无效的参数")
        if size == 1:
            return nums[0]
        return self.__find_min(nums, 0, size - 1)

    def __find_min(self, nums, left, right):
        if left == right:
            return nums[left]
        if left + 1 == right:
            return min(nums[left], nums[right])
        mid = (left + right) // 2

        if nums[mid] < nums[right]:
            return min(self.__find_min(nums, left, mid - 1), nums[mid])
        else:
            # nums[mid] > nums[right]
            # [4,5,6,7,8,1,2]
            return min(nums[left], self.__find_min(nums, mid + 1, right))
```
</CodeGroupItem>
</CodeGroup>


**复杂度分析**：

+ 时间复杂度：$O(\log N)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(\log N)$，递归函数的栈空间消耗为 $\log N$。
