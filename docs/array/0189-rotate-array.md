---
title: 「力扣」第 189 题：生成旋转数组（中等）
icon: yongyan
categories: 字符串
tags:
  - 字符串
---

+ 题目链接：[189. 旋转数组](https://leetcode-cn.com/problems/rotate-array/description/) 。

## 题目描述

给定一个数组，将数组中的元素向右移动 `k` 个位置，其中 `k` 是非负数。

**示例 1:**

```
输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]
```

**示例 2:**

```
输入: [-1,-100,3,99] 和 k = 2
输出: [3,99,-1,-100]
解释: 
向右旋转 1 步: [99,-1,-100,3]
向右旋转 2 步: [3,99,-1,-100]
```

**提示：**

- `1 <= nums.length <= 105`
- `-231 <= nums[i] <= 231 - 1`
- `0 <= k <= 105`

**说明:**

- 尽可能想出更多的解决方案，至少有 **三种** 不同的方法可以解决这个问题。
- 你可以使用空间复杂度为 `O(1)` 的 **原地** 算法解决这个问题吗？

**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.Arrays;

public class Solution {

    public void rotate(int[] nums, int k) {
        int len = nums.length;
        // [1, 2, 3, 4, 5, 6, 7] 向右旋转 7 位相当于不旋转
        if (k % len == 0) {
            return;
        }

        k = k % len;

        // 第 1 步：前 len - k 位反转
        // 第 2 步：后 k 位反转
        // 第 3 步：整体反转
        reverse(nums, 0, len - k - 1);
        reverse(nums, len - k, len - 1);
        reverse(nums, 0, len - 1);
    }

    private void reverse(int[] nums, int left, int right) {
        while (left < right) {
            swap(nums, left, right);
            left++;
            right--;
        }
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        # 先处理极端情况
        if k % len(nums) == 0:
            return

        k = k % len(nums)

        # 做下面 3 个逆转动作的时候，注意边界条件
        # 技巧就是举具体的例子
        self.__reverse(nums, 0, len(nums) - 1)
        self.__reverse(nums, 0, k - 1)
        self.__reverse(nums, k, len(nums) - 1)

    def __reverse(self, nums, index1, index2):
        """
        将数组 [index1,index2] 区间内的元素进行逆转
        :param nums:
        :param index1:
        :param index2:
        :return:
        """

        while index1 < index2:
            nums[index1], nums[index2] = nums[index2], nums[index1]
            index1 += 1
            index2 -= 1
```
</CodeGroupItem>
</CodeGroup>
