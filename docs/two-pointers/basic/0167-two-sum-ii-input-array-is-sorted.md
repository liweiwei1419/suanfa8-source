---
title: 「力扣」第 167 题：两数之和 II - 输入有序数组（简单）
icon: yongyan
category: 双指针
tags:
  - 双指针
---

+ 题目地址：[167. 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)；
+ 题解地址：[双指针对撞 + 二分法（Java、Python）]()。

## 题目描述

给定一个已按照 **非递减顺序排列** 的整数数组 `numbers` ，请你从数组中找出两个数满足相加之和等于目标数 `target` 。

函数应该以长度为 `2` 的整数数组的形式返回这两个数的下标值*。*`numbers` 的下标 **从 1 开始计数** ，所以答案数组应当满足 `1 <= answer[0] < answer[1] <= numbers.length` 。

你可以假设每个输入 **只对应唯一的答案** ，而且你 **不可以** 重复使用相同的元素。

**示例 1：**

```
输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

**示例 2：**

```
输入：numbers = [2,3,4], target = 6
输出：[1,3]
```

**示例 3：**

```
输入：numbers = [-1,0], target = -1
输出：[1,2]
```

**提示：**

- `2 <= numbers.length <= 3 * 104`
- `-1000 <= numbers[i] <= 1000`
- `numbers` 按 **非递减顺序** 排列
- `-1000 <= target <= 1000`
- **仅存在一个有效答案**

---

## 方法一：指针对撞（双指针）

**参考代码**：


```Python []
from typing import List


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        size = len(numbers)
        left = 0
        right = size - 1
        while left < right:
            if numbers[left] + numbers[right] > target:
                right -= 1
            elif numbers[left] + numbers[right] < target:
                left += 1
            else:
                return [left + 1, right + 1]
public class Solution {

    public int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            } else if (sum > target) {
                right--;
            } else {
                left++;
            }
        }
        throw new RuntimeException("在数组中没有找到这样的两个数，使得它们的和为指定值");
    }
}
```
**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 表示数组中的元素的大小。
+ 空间复杂度：$O(1)$，只使用了常数个变量。


既然是有序数组，不妨考虑使用二分查找。

## 方法二：二分查找

**思路分析**：

二分查找，起点得固定，因此，外面要套上一层循环。

**参考代码**：


```Python []
from typing import List


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        size = len(numbers)
        for left in range(size - 1):
            right = self.__binary_search(numbers, left + 1, size - 1, target - numbers[left])
            if right != -1:
                return [left + 1, right + 1]

    def __binary_search(self, numbers, left, right, target):
        # 在子区间 [left, right] 找 target
        while left < right:
            mid = (left + right) >> 1
            if numbers[mid] < target:
                left = mid + 1
            else:
                right = mid
        return left if numbers[left] == target else -1
public class Solution {

    public int[] twoSum(int[] numbers, int target) {
        int len = numbers.length;
        // 最后一个数不会成为起始的数字
        for (int left = 0; left < numbers.length - 1; left++) {
            // 挨个二分查找
            int right = binarySearch(numbers, left + 1, len - 1, target - numbers[left]);
            if (right != -1) {
                return new int[]{left + 1, right + 1};
            }
        }
        throw new RuntimeException("在数组中没有找到这样的两个数，使得它们的和为指定值");
    }

    public int binarySearch(int[] nums, int left, int right, int target) {
        while (left < right) {
            int mid = (left + right) >>>  1;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        if (nums[left] == target) {
            return left;
        }
        return -1;
    }

}
```
**复杂度分析**：

+ 时间复杂度：$O(N \log N)$，这里 $N$ 表示数组中的元素的大小，外层循环是线性时间复杂度，内层循环是对数级别的时间复杂度；
+ 空间复杂度：$O(1)$，只使用了常数个变量。





