---
title: 「力扣」第 136 题：只出现一次的数字
icon: yongyan
category: 位运算
tags:
  - 位运算
---

- 题目链接：[136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)。

## 题目描述

给定一个**非空**整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

**说明：**

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

**示例 1:**

```
输入: [2,2,1]
输出: 1
```

**示例 2:**

```
输入: [4,1,2,1,2]
输出: 4
```

**Example 3:**

```
Input: nums = [1]
Output: 1
```

**Constraints:**

- `1 <= nums.length <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`
- Each element in the array appears twice except for one element which appears only once.

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.Arrays;

// 第 56 题：数组中数字出现的次数 P275
// 参考资料：
// 1、https://blog.csdn.net/derrantcm/article/details/46771717
public class Solution {

    // 考察位运算：或、与、异或、非，以及无符号左移 >>>
    public int[] findNumbersAppearanceOnce(int[] nums) {
        int len = nums.length;
        int[] res = new int[2];
        assert len >= 2;
        if (len == 2) {
            return nums;
        }
        // 那两个只出现一次的数的异或运算的结果
        int xor = xor(nums);

        // 关键在这里
        // 找到这个 xor 的二进制表示第 1 个是 1 的数位是第几位
        int binaryFirstNotZero = binaryFirstNotZero(xor);

        // 接下来分别对两组进行异或
        for (int i = 0; i < len; i++) {
            // 如果这个数右移这么多位是 1 的分在一组，是 0 的分在另外一组，遍历的时候，就进行异或运算
            if ((nums[i] >>> binaryFirstNotZero & 1) == 1) {
                res[0] ^= nums[i];
            } else {
                res[1] ^= nums[i];
            }
        }
        return res;
    }

    // 得到一个数组经过异或运算的结果 xor
    // 异或 的英文翻译就是 xor
    private int xor(int[] nums) {
        int xor = 0;
        for (int i = 0; i < nums.length; i++) {
            xor ^= nums[i];
        }
        return xor;
    }

    // 得到一个整数的二进制表示从右到左第 1 个非零的位数是第几位
    private int binaryFirstNotZero(int num) {
        int index = 0;
        // 这里的 1 把它看成二进制的 1，即 00000001
        while ((num & 1) == 0 && index < 32) {
            num >>>= 1;
            index++;
        }
        // 走到这里满足 (num & 1) == 1
        return index;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution(object):
    def findNumsAppearOnce(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        l = len(nums)
        if l < 2:
            raise Exception('程序出错')
        if l == 2:
            return nums

        # 全部相与一遍
        xor = 0
        for num in nums:
            xor ^= num

        # 最末尾的 1 从右向左边数在第几位
        counter = 0
        while xor & 1 == 0:
            xor >>= 1
            counter += 1

        res = [0, 0]
        for num in nums:
            if (num >> counter) & 1 == 1:
                res[1] ^= num
            else:
                res[0] ^= num
        return res
````

</CodeGroupItem>
</CodeGroup>
