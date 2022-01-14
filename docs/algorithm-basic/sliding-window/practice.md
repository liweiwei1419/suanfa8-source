---
title: 3.3 滑动窗口的练习
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

**重点问题**：

| 题号 | 链接                                                                                                                                | 题解                                                                                                                                                     |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3    | [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters)（中等）                     | [文字题解](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/ge-ban-fa-hua-dong-chuang-kou-dong-tai-gui-hua-pyt/) |
| 76   | [最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring)（困难）                                                   | [【视频讲解】]()                                                                                                                                         |
| 209  | [长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum)（中等）                                              |                                                                                                                                                          |
| 424  | [替换后的最长重复字符](https://leetcode-cn.com/problems/longest-repeating-character-replacement/)（中等）                           |                                                                                                                                                          |
| 1493 | [ 删掉一个元素以后全为 1 的最长子数组](https://leetcode-cn.com/problems/longest-subarray-of-1s-after-deleting-one-element/)（中等） |                                                                                                                                                          |

**友情提示**：第 3 题和第 76 题是必须要会做的基本问题。上面的问题理解透彻了，下面的问题就可以比较轻松地做出来。

**说明**：

- 第 3 题：先暴力解法，再优化；
- 第 76 题：滑动窗口的典型问题，重点分析为什么可以使用滑动窗口。字符频数数组可以使用哈希表，也可以直接使用数组；使用 **距离** 的定义加速计算；
- 第 424 题：重点分析为什么可以使用滑动窗口。设计变量 `maxCount` 的含义：在滑动的过程中，出现的字符频数最多的个数；收集结果的判断语句（`while (right - left > maxCount + k)`）比较难想到。第 424 题同类问题：「力扣」第 1493 题：[删掉一个元素以后全为 1 的最长子数组](https://leetcode-cn.com/problems/longest-subarray-of-1s-after-deleting-one-element/) 。

```Java []
public class Solution {

    // 第 424 题代码：滑动窗口（暴力解法的优化）

    public int longestSubarray(int[] nums) {
        int len = nums.length;
        int left = 0;
        int right = 0;

        // 连续的 1 的个数
        int ones = 0;

        // 删除一个元素以后全为 1 的最长的子串的长度
        int maxCount = 0;
        int res = 0;

        while (right < len) {
            if (nums[right] == 1) {
                ones++;
            }
            maxCount = Math.max(maxCount, ones);
            right++;
            // maxCount + 1 里的 1 就表示删除的那个元素
            while (right - left > maxCount + 1) {
                if (nums[left] == 1) {
                    ones--;
                }
                left++;
            }
            res = Math.max(res, right - left);
        }
        // 注意：这里返回 res 要减 1
        return res - 1;
    }
}
```

**练习**：

| 题号 | 题目                                                                                                  | 题解 | 知识点 |
| ---- | ----------------------------------------------------------------------------------------------------- | ---- | ------ |
| 438  | [找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)（中等） |      |        |
| 567  | [字符串的排列](https://leetcode-cn.com/problems/permutation-in-string)（中等）                        |      |        |
| 643  | [子数组最大平均数 I](https://leetcode-cn.com/problems/maximum-average-subarray-i)（简单）             |      |        |
| 978  | [最长湍流子数组](https://leetcode-cn.com/problems/longest-turbulent-subarray)（中等）                 |      |        |
| 992  | [K 个不同整数的子数组](https://leetcode-cn.com/problems/subarrays-with-k-different-integers)（困难）  |      |        |

**说明**：

- 第 209 题：题目中给出的关键信息：**数组里的元素全部是正整数**。一共有以下 3 种方法。

  - 方法一：暴力解法

  - 方法二：滑动窗口（分析可以使用滑动窗口的原因）

  - 方法三：构造前缀和数组，然后使用二分查找

- 第 438 题：同第 76 题；
- 第 567 题：同第 76 题，收集符合条件的语句不一样而已。

---

# 知识结构

![](https://files.mdnice.com/user/5576/5acc6da0-7aac-42b6-8cb3-5fb1701511b5.png)

# 入门问题

这些问题用于入门「滑动窗口」问题，通过解决它们理解「滑动窗口」算法是暴力解法的优化。

- 「力扣」第 3 题：无重复字符的最长子串（中等）
- 「力扣」第 209 题：长度最小的子数组（中等）

# 经典问题

这两道经典的「滑动窗口」问题问题包含了一些解决同类问题的技巧。可以把「力扣」第 76 题和第 424 题当作例题学习，然后完成对应的练习。

「力扣」第 76 题和第 424 题在「力扣」的官方题解都有视频题解，都是我讲的，准备了很长时间，相信会对大家有所帮助。

- 「力扣」第 76 题：最小覆盖子串（困难）

  - 练习 1：「力扣」第 438 题：找到字符串中所有字母异位词（中等）
  - 练习 2：「力扣」第 567 题：字符串的排列（中等）
  - 练习 3：「力扣」第 30 题：串联所有单词的子串（困难）
  - 练习 4：「力扣」第 395 题：至少有 K 个重复字符的最长子串（中等）
  - 练习 5：「力扣」第 632 题：最小区间（困难）

- 「力扣」第 424 题：替换后的最长重复字符（中等）

  - 练习 1：「力扣」第 1004 题：最大连续 1 的个数 III（中等）
  - 练习 2：「力扣」第 1208 题：尽可能使字符串相等（中等）
  - 练习 3：「力扣」第 1493 题：删掉一个元素以后全为 1 的最长子数组（中等）

# 其它练习

有了以上的解决问题的经验，下面的这些问题大家可以独立完成了。

- 「力扣」第 713 题：乘积小于 K 的子数组（中等）
- 「力扣」第 1838 题：最高频元素的频数（中等）
- 「力扣」第 1839 题：所有元音按顺序排布的最长子字符串（中等）
- 「力扣」第 904 题：水果成篮（中等）
- 「力扣」第 992 题：K 个不同整数的子数组（困难）
- 「力扣」第 995 题：K 连续位的最小翻转次数（困难）

# 固定长度的滑动窗口问题

这些问题比较简单，大家可以尝试做一下。

- 「力扣」第 643 题：子数组最大平均数 I（简单）
- 「力扣」第 1052 题：爱生气的书店老板（中等）
- 「力扣」第 1423 题：可获得的最大点数（中等）
- 「力扣」第 1456 题：定长子串中元音的最大数目（中等）
- 「力扣」第 1658 题：将 x 减到 0 的最小操作数（中等）

# 名字叫做滑动窗口的问题（需要使用数据结构）

这些问题需要用到一些数据结构，以掌握滑动窗口的性质，可以把它们当作例题学习。

- 「力扣」第 220 题：存在重复元素 III（中等）
- 「力扣」第 239 题：滑动窗口最大值（困难）
- 「力扣」第 480 题：滑动窗口中位数（困难）
- 「力扣」第 1438 题：绝对差不超过限制的最长连续子数组（中等）
