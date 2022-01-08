---
title: 「力扣」第 354 题：俄罗斯套娃信封问题（困难）
icon: yongyan
category: 贪心算法
tags:
  - 贪心算法
  - 动态规划
---


+ 题目链接：[354. 俄罗斯套娃信封问题](https://leetcode-cn.com/problems/russian-doll-envelopes/)；
+ 题解链接：[贪心算法、二分查找（Python 代码、Java 代码）](https://leetcode-cn.com/problems/russian-doll-envelopes/solution/tan-xin-suan-fa-er-fen-cha-zhao-python-dai-ma-java/)。

## 题目描述

给你一个二维整数数组 `envelopes` ，其中 `envelopes[i] = [wi, hi]` ，表示第 `i` 个信封的宽度和高度。

当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。

请计算 **最多能有多少个** 信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。

**注意**：不允许旋转信封。

 

**示例 1：**

```
输入：envelopes = [[5,4],[6,4],[6,7],[2,3]]
输出：3
解释：最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
```

**示例 2：**

```
输入：envelopes = [[1,1],[1,1],[1,1]]
输出：1
```

**提示：**

- `1 <= envelopes.length <= 5000`
- `envelopes[i].length == 2`
- `1 <= wi, hi <= 104`

## 思路分析

本题是[「力扣」第 300 题：“最长上升子序列”](https://leetcode-cn.com/problems/longest-increasing-subsequence/)的扩展题。

很容易想到的思路是：将信封数组按照宽“升序”排序以后，信封数组的高的“最长上升子序列”的长度就是题目所求。

说明：

1、事实上，这个描述只有一半正确，我们暂且认为思路“没有多大问题”；

2、这里的“宽”和“高”对等，即将“宽”和“高”同时交换，在逻辑上是等价的。

做过“最长上升子序列”的朋友，就知道这道题有 2 种思路：1、动态规划；2、贪心算法 + 二分查找。

本题基于我为「力扣」第 300 题：“最长上升子序列”写的题解[《动态规划 + 贪心算法（二分法）（Python 代码、Java 代码）》](https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/dong-tai-gui-hua-er-fen-cha-zhao-tan-xin-suan-fa-p/)展开叙述，重复的部分就不在本题解中介绍了。

先尝试“动态规划”，具体编码的时候，就会发现，因为题目要求小信封可以装入大信封的条件是“小信封宽和高分别严格小于大信封的宽和高”，那么在进行状态转移的时候，就得把数组的“宽”考虑进去，如下：

Python 代码：

```python
from typing import List

# 该算法超时，不采用

class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        size = len(envelopes)
        # 特判
        if size < 2:
            return size

        # 对第一列排序，按照宽度排序（按照高度排序亦可，只不过后面定义状态的时候就得定义宽度）
        envelopes.sort(key=lambda x: x[0])
        # print(envelopes)
        # 以 envelopes[i][1] 结尾的上升子序列的长度
        dp = [1 for _ in range(size)]
        for i in range(1, size):
            for j in range(i):
                # 注意宽度也要严格小于
                if envelopes[j][0] < envelopes[i][0] and envelopes[j][1] < envelopes[i][1]:
                    dp[i] = max(dp[i], dp[j] + 1)
        return max(dp)
```

很可惜，提交到在线测评系统以后超时。

![image.png](https://pic.leetcode-cn.com/0d0fd254021b7295c89f1f8059a6690a2ff4d934c61cf45e4d4da3238594e244-image.png)

这是因为动态规划的复杂度太高（$O(N^2)$，这里 $N$ 是数组的长度），因此我们得考虑“贪心法 + 二分查找”的思路。


## 贪心算法 + 二分查找

如果按照之前的分析，原问题等价于“将信封数组按照宽“升序”排序以后，信封数组的高的“最长上升子序列”的长度就是题目所求”，在提交的时候，就会发现出错了。查看错误的测试用例不难发现问题所在，这里我们举例说明问题出在哪里。

事实上，之前我们也已经提到过了：题目要求小信封可以装入大信封的条件是“小信封宽和高分别严格小于大信封的宽和高”。

当“宽”相等的时候，如果“高度”出现“上升子序列”就有可能引入错误的结果。例如：

![image.png](https://pic.leetcode-cn.com/253bead84dbd1558b89dcbe254fcb5f0b5e1040ce6491794f6f4b6708c0e137c-image.png)

此时，左边粉红色宽度按照升序排序，但是第 3 个和第 4 个，在宽相等的时候，`[6, 7] 和 [6, 8]` 会被算法同时选取，就违背了题意（小信封的宽度和高度分别“严格”小于大信封的宽度和高度）。

解决的办法很容易想到，那就是：**在宽度相等的时候，高度不能出现“上升的子序列”，首先按照宽度“升序排序”，在宽度相等的手，高度“降序排序”**，宽度相等的信封，最多只能选一个，这种策略保证了结果的正确性。这就是最开始的说明中的第 1 点缺少的正确性的另一半。

**参考代码**：

Python 代码：


```Python []
from typing import List


class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        size = len(envelopes)
        # 特判
        if size < 2:
            return size

        # 对第一列排序，按照宽度排序
        # 【特别注意】当宽度相等的时候，按照高度降序排序
        # 以避免 [[11, 3], [12, 4], [12, 5], [12, 6], [14, 6]] 这种情况发生
        # 正确排序 [[11, 3], [12, 6], [12, 5], [12, 4], [14, 6]]
        envelopes.sort(key=lambda x: (x[0], -x[1]))

        # print(envelopes)
        tail = [envelopes[0][1]]

        for i in range(1, size):
            target = envelopes[i][1]
            if target > tail[-1]:
                tail.append(target)
                continue

            left = 0
            right = len(tail) - 1

            while left < right:
                mid = (left + right) >> 1
                if tail[mid] > target:
                    left = mid + 1
                else:
                    right = mid
            tail[left] = target
        # print(tail)
        return len(tail)


if __name__ == '__main__':
    envelopes = [[4, 5], [4, 6], [6, 7], [2, 3], [1, 1]]
    envelopes = [[30, 50], [12, 2], [3, 4], [12, 15]]
    envelopes = [[1, 3], [3, 5], [6, 7], [6, 8], [8, 4], [9, 5]]
    solution = Solution()
    res = solution.maxEnvelopes(envelopes)
    print(res)
```

Java 代码：

```Java []
import java.util.Arrays;
import java.util.Comparator;

public class Solution {

    public int maxEnvelopes(int[][] envelopes) {

        int len = envelopes.length;
        if (len < 2) {
            return len;
        }

        Arrays.sort(envelopes, new Comparator<int[]>() {
            @Override
            public int compare(int[] envelope1, int[] envelope2) {
                if (envelope1[0] != envelope2[0]) {
                    return envelope1[0] - envelope2[0];
                }
                return envelope2[1] - envelope1[1];
            }
        });


        int[] tail = new int[len];
        tail[0] = envelopes[0][1];

        // end 表示有序数组 tail 的最后一个已经赋值元素的索引
        int end = 0;

        for (int i = 1; i < len; i++) {
            int target = envelopes[i][1];

            if (target > tail[end]) {
                end++;
                tail[end] = target;
            } else {
                int left = 0;
                int right = end;

                while (left < right) {
                    int mid = (left + right) >>> 1;
                    if (tail[mid] < target) {
                        left = mid + 1;
                    } else {
                        right = mid;
                    }
                }
                tail[left] = target;
            }
        }
        return end + 1;
    }

}
```
**复杂度分析**：

+ 时间复杂度：$O(N \log N)$，遍历数组使用了 $O(N)$，二分查找法使用了 $O(\log N)$。
+ 空间复杂度：$O(N)$，开辟有序数组 `tail` 的空间至多和原始数组一样。


<Vssue title="russian-doll-envelopes"/>