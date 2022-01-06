---
title: 《剑指 Offer》（第 2 版）面试题56 - I. 数组中数字出现的次数
icon: yongyan
category: 位运算
tags:
  - 位运算
---


+ 题目链接：[剑指 Offer 56 - I. 数组中数字出现的次数](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)。

## 题目描述

一个整型数组 `nums` 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是 $O(n)$，空间复杂度是 $O(1)$。

示例 1：

```
输入：nums = [4,1,4,6]
输出：[1,6] 或 [6,1]
```


示例 2：

```
输入：nums = [1,2,10,4,1,4,3,3]
输出：[2,10] 或 [10,2]
```


限制：

+ `2 <= nums <= 10000`

Java 代码：

```java
import java.util.Arrays;

public class Solution {

    public int[] singleNumbers(int[] nums) {
        
        // 考察位运算：或、与、异或、非，以及无符号左移 >>>
        int len = nums.length;
        int[] res = new int[2];
        assert len >= 2;
        if (len == 2) {
            return nums;
        }
        // 那两个只出现一次的数的异或运算的结果
        int xor = xor(nums);
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

    /**
     * 得到一个数组经过异或运算的结果 xor，异或 的英文翻译就是 xor
     *
     * @param nums
     * @return
     */
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

    public static void main(String[] args) {
        int[] nums = {2, 4, 3, 6, 3, 2, 5, 5};
        Solution solution = new Solution();
        int[] res = solution.singleNumbers(nums);
        System.out.println(Arrays.toString(res));

        int[] nums2 = {2, 4, 3, 6, 3, 2, 5, 5};
        int[] res2 = solution.singleNumbers(nums2);
        System.out.println(Arrays.toString(res2));

        int[] nums3 = {4, 6};
        int[] res3 = solution.singleNumbers(nums3);
        System.out.println(Arrays.toString(res3));

        int[] nums4 = {4, 6, 1, 1, 1, 1};
        int[] res4 = solution.singleNumbers(nums4);
        System.out.println(Arrays.toString(res4));
    }
}
```

Python 代码：

```python
from typing import List


class Solution:
    def singleNumbers(self, nums: List[int]) -> List[int]:
        size = len(nums)
        if size < 2:
            raise Exception('程序出错')
        if size == 2:
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


if __name__ == '__main__':
    nums = [1, 2, 3, 3, 4, 4]
    solution = Solution()
    result = solution.singleNumbers(nums)
    print(result)

```





