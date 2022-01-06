---
title: 位运算
icon: yongyan
category: 位运算
tags:
  - 位运算
---


## 知识点整理

二进制原码、反码、补码最好的解释 

<https://www.zhihu.com/question/20159860/answer/71256667>

1、为什么要有原码。

> **为了解决“正负相加等于0”的问题，在“原码”的基础上，人们发明了“反码”**。

在计算机的世界里，只有 1 和 0。 原码是为了表示负数而引入的一种编码表示方式。 

规则：最高位作为符号位：0 表示正数， 1 表示负数。 

但是有如下问题： 

（1）此时数字 $0$ 的表示出现了二义性。 

例如：$1000 0000$ 和 $0000 0000$ 都表示 $0$。 

（2）数字会产生突然的变化 

例如：$0111 1111$ + $1$ = $1000 0000$ 

127 + 1  = 0 并且这个 0 是 -0 

例如：1111 1111 + 1 = 0000 0000 

-127 变成了 +0 

（3）原码参与运算会出错 

2、反码：反码是通过原码得到的。 

正数的反码是自己， 

负数的反码：符号位不变 

位运算总结：

`n & (n-1)`：可以把从右边到左边的第 $1$ 个 $1$ 变成 $0$。 

`n & (~(n-1))`：只保留了从右边到左边的第 $1$ 个 $1$。 

## 例题

### LeetCode 第 136 题：只出现一次的数字

传送门：[136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)。

> 给定一个**非空**整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
>
> **说明：**
>
> 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
>
> **示例 1:**
>
> ```
> 输入: [2,2,1]
> 输出: 1
> ```
>
> **示例 2:**
>
> ```
> 输入: [4,1,2,1,2]
> 输出: 4
> ```

### LeetCode 第 201 题：[数字范围按位与](https://leetcode-cn.com/problems/bitwise-and-of-numbers-range)

传送门：[201. 数字范围按位与](https://leetcode-cn.com/problems/bitwise-and-of-numbers-range/)。

> 给定范围 [m, n]，其中 0 <= m <= n <= 2147483647，返回此范围内所有数字的按位与（包含 m, n 两端点）。
>
> **示例 1:** 
>
> ```
> 输入: [5,7]
> 输出: 4
> ```
>
> **示例 2:**
>
> ```
> 输入: [0,1]
> 输出: 0
> ```

分析：位运算的问题，干脆就把它记住。

思路：相邻的两个数末尾相与一定等于 $0$。于是就有如下写法：

Java 代码：

```java
public class Solution2 {
    /**
     * 真的是很酷！
     *
     * @param m
     * @param n
     * @return
     */
    public int rangeBitwiseAnd(int m, int n) {
        int count = 0;
        while (m != n) {
            m >>= 1;
            n >>= 1;
            count++;
        }
        return m << count;
    }
}
```

于是我们可以一步到位，利用 `n &= (n - 1)` 运算依次消去“大于” `m` 的部分的 $1$。

Java 代码：

```java
/**
 * https://blog.csdn.net/DERRANTCM/article/details/47997613
 *
 * @author liwei
 * @date 18/6/29 下午9:37
 */
public class Solution3 {

    /**
     * 利用了 n &= (n - 1) 一下能消死一大片
     *
     * @param m
     * @param n
     * @return
     */
    public int rangeBitwiseAnd(int m, int n) {
        while (n > m) {
            n &= (n - 1);
        }
        return n;
    }
}
```







### LeetCode 第 477 题：汉明距离总和

传送门：[477. 汉明距离总和](https://leetcode-cn.com/problems/total-hamming-distance/)。

> 两个整数的 [汉明距离](https://baike.baidu.com/item/%E6%B1%89%E6%98%8E%E8%B7%9D%E7%A6%BB/475174?fr=aladdin) 指的是这两个数字的二进制数对应位不同的数量。
>
> 计算一个数组中，任意两个数之间汉明距离的总和。
>
> **示例:**
>
> ```
> 输入: 4, 14, 2
> 
> 输出: 6
> 
> 解释: 在二进制表示中，4表示为0100，14表示为1110，2表示为0010。（这样表示是为了体现后四位之间关系）
> 所以答案为：
> HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.
> ```
>
> **注意:**
>
> 1. 数组中元素的范围为从 `0`到 `10^9`。
> 2. 数组的长度不超过 `10^4`。

Java 代码：某一位上 $1$ 的数量乘上 $0$ 的数量就是这一位对结果的贡献，当某一位上全是 $0$ 时就没有继续计算下去的必要了。

```java
/**
 * 计算任意汉明距离总和
 */
public class Solution {

    public int totalHammingDistance(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }
        int mask = 1;
        int total = 0;
        for (int i = 0; i < 32; i++) {
            // 在这个数位上有多少个 1
            int oneCount = 0;
            for (int num : nums) {
                if ((num & mask) > 0) {
                    oneCount++;
                }
            }
            total += ((len - oneCount) * oneCount);
            mask <<= 1;
        }
        return total;
    }

    public static void main(String[] args) {
        int[] nums = new int[]{4, 14, 2};
        Solution solution = new Solution();
        int totalHammingDistance = solution.totalHammingDistance(nums);
        System.out.println(totalHammingDistance);
    }
}
```

### 《剑指 Offer 》（第 2 版）第 56 题：数组中只出现一次的两个数字

传送门：[数组中只出现一次的两个数字](https://www.acwing.com/problem/content/69/)。

> 一个整型数组里除了两个数字之外，其他的数字都出现了两次。
>
> 请写程序找出这两个只出现一次的数字。
>
> 你可以假设这两个数字一定存在。
>
> #### 样例
>
> ```
> 输入：[1,2,3,3,4,4]
> 
> 输出：[1,2]
> ```

思路：==按位分组==。

Python 代码：

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
```

Java 代码：

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

    public static void main(String[] args) {
        int[] nums = {2, 4, 3, 6, 3, 2, 5, 5};
        Solution solution = new Solution();
        int[] res = solution.findNumbersAppearanceOnce(nums);
        System.out.println(Arrays.toString(res));

        int[] nums2 = {2, 4, 3, 6, 3, 2, 5, 5};
        int[] res2 = solution.findNumbersAppearanceOnce(nums2);
        System.out.println(Arrays.toString(res2));

        int[] nums3 = {4, 6};
        int[] res3 = solution.findNumbersAppearanceOnce(nums3);
        System.out.println(Arrays.toString(res3));

        int[] nums4 = {4, 6, 1, 1, 1, 1};
        int[] res4 = solution.findNumbersAppearanceOnce(nums4);
        System.out.println(Arrays.toString(res4));
    }
}
```





### LeetCode 第 421 题：数组中两个数的最大异或值

要求：给定一个非空数组，数组中元素为 a0, a1, a2, … , an-1，其中 0 ≤ ai < 231 。

找到 ai 和aj 最大的异或 (XOR) 运算结果，其中0 ≤ *i*,  *j* < *n* 。

你能在O(*n*)的时间解决这个问题吗？

 参考资料：https://www.cnblogs.com/njufl/p/6403043.html

1、这里Trie树建立的思路是，整数在存储时是一个占据 32bit 的数，因此可以看成一个含32个字符的字符串，这个字符串中的每个字符只可能是0或1。

因此，将一个整数插入 Trie 树就是从它的最高位开始，根据每一位上的值进入不同的分支，直到最低位。

3、那么如何找到最大的异或值呢？

（1）两个数异或得到一个数，这个数的值要尽量大，那么这个数的二进制表示法中，第一个1出现的位数越高这个数就越大，即置1位越高数越大。

所以，对于数组中的每一个数，要找到它和数组中其他数异或后得到的最大异或值，可以采用**类似贪心的策略**，从最高位开始，找和它在这一位相反的数。如果有，那么和这个数异或就得到最大异或值，如果没有就依次往下一位找，直到找到相异的位。

 

4、一开始，先将数组中所有的数，建成一棵 Trie 树后再对每一个数求各自的最大异或值，然后再取最大值，建立 Trie 树的时间复杂度是 O(32n) ，这里的 32 即 Trie 树的键值最大长度；

5、Trie树的高度为 32 ，因此查找每个数的最大异或值得时间复杂度是 O(32n) ，合起来是 O(64n) ，提交时出现了TLE，显然时间复杂度太高了。代码大致如下：

 



342： 4 的幂




### LeetCode 第 868 题：二进制间距

要求：给定一个正整数 `N`，找到并返回 `N` 的二进制表示中两个连续的 1 之间的最长距离。 

如果没有两个连续的 1，返回 `0` 。

注意：这里设置 pre 初值为 -1 的小技巧，即 pre 一定要被赋值以后，才能参与计算。

![image-20190111002912609](https://ws4.sinaimg.cn/large/006tNc79ly1fz1yfn36x7j30xg0ooqa1.jpg)

 


（本节完）


# 位运算问题

## 位运算问题

位运算问题一般有技巧性，要积累要一定程度才有“感觉”。



---
title: LeetCode 专题：位运算
date: 2018-09-25 08:00:00
author: liwei
top: false
mathjax: true
category: leetcode 专题
tags:
  - 位运算
permalink: leetcode-tag/bit-manipulation
---

# LeetCode 专题：位运算

---

[TOC]

---

## 知识点整理

二进制原码、反码、补码最好的解释 

<https://www.zhihu.com/question/20159860/answer/71256667>

1、为什么要有原码。

> **为了解决“正负相加等于0”的问题，在“原码”的基础上，人们发明了“反码”**。

在计算机的世界里，只有 1 和 0。 原码是为了表示负数而引入的一种编码表示方式。 

规则：最高位作为符号位：0 表示正数， 1 表示负数。 

但是有如下问题： 

（1）此时数字 $0$ 的表示出现了二义性。 

例如：$1000 0000$ 和 $0000 0000$ 都表示 $0$。 

（2）数字会产生突然的变化 

例如：$0111 1111$ + $1$ = $1000 0000$ 

127 + 1  = 0 并且这个 0 是 -0 

例如：1111 1111 + 1 = 0000 0000 

-127 变成了 +0 

（3）原码参与运算会出错 

2、反码：反码是通过原码得到的。 

正数的反码是自己， 

负数的反码：符号位不变 

位运算总结：

`n & (n-1)`：可以把从右边到左边的第 $1$ 个 $1$ 变成 $0$。 

`n & (~(n-1))`：只保留了从右边到左边的第 $1$ 个 $1$。 

## 例题





 


