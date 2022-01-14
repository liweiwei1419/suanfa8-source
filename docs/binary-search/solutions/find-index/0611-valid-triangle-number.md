---
title: 「力扣」第 611 题：有效三角形的个数（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

![0611-新](https://tva1.sinaimg.cn/large/008i3skNgy1gx8wdkqf89j30p00anwf0.jpg)

- 题目链接：[611. 有效三角形的个数](https://leetcode-cn.com/problems/valid-triangle-number/)；
- 题解链接：[排序以后找第 1 个大于等于两边之和的下标（Java）](https://leetcode-cn.com/problems/valid-triangle-number/solution/er-fen-cha-zhao-python-dai-ma-java-dai-ma-by-liwei/)。

## 题目描述

给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。

**示例 1**：

```
输入: [2, 2, 3, 4]
输出: 3
解释:
有效的组合是:
2, 3, 4 (使用第一个 2)
2, 3, 4 (使用第二个 2)
2, 2, 3
```

**注意:**

1. 数组长度不超过 `1000`。
2. 数组里整数的范围为 `[0, 1000]`。

**数据范围**：

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`

## 思路分析

这是一个计数问题。计数问题最朴素的做法是一个一个数。加快计数的办法是一下子数出一大片。因此需要对输入数组排序。

我们分析示例：输入数组是 `[2, 2, 3, 4]` ，依次枚举第 1 条边 `num[i]` 和第 2 条边 `nums[j]`，找第 3 条边的范围。

根据能组成三角形三条边的条件：两边之和大于第三边。我们需要在 `[j + 1..len - 1]` 找到 **严格小于两边之和的区间里元素的个数**，这件事情等价于找到「第 1 个大于等于两边之和的下标」。这是因为在排序的前提下，有下面的性质成立：

![image-20210804202442861](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c26162d0d4c147fea3fcaeb919e5c478~tplv-k3u1fbpfcp-zoom-1.image)

即：区间 `[j + 1..len - 1]` 可以划分成两个部分：

- 第 1 部分（图中黄色部分）：可以与 `nums[i]`、`nums[j]` 构成三角形；
- 第 2 部分（图中红色部分）：不可以与 `nums[i]`、`nums[j]` 构成三角形。

我们可以找第 1 个大于等于两边之和的下标 `k`，此时区间 `[j + 1..k)` 的长度 `k - j - 1` 就是此时可以构成三角形的个数。

**编码细节**：

- 初始化的时候 `left = j + 1`，`right = len` ，这是因为如果最后找到了第 1 个大于等于两边之和的下标是 `len` ，说明区间  `[j + 1..len - 1]` 里所有的元素都可以与  `nums[i]`、`nums[j]` 构成三角形；
- 因为找「第 1 个大于等于两边之和的下标」，所以 `if` 语句就写成「如果 `nums[mid]` 小于两边之和」，此时 `mid` 以及 `mid` 的左边都不是我们要找的，接下来应该在 `[mid + 1..right]` 里继续查找，此时设置 `left = mid + 1`。它的反面区间就是 `[left..mid]` 此时设置 `right = mid`。

**参考代码**：

```java
import java.util.Arrays;

public class Solution {

    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        int len = nums.length;
        int count = 0;
        for (int i = 0; i < len - 2; i++) {
            for (int j = i + 1; j < len - 1; j++) {
                // 找到第 1 个大于等于两边之和的下标
                int left = j + 1;
                int right = len;
                while (left < right) {
                    int mid = (left + right) / 2;
                    if (nums[mid] < nums[i] + nums[j]) {
                        left = mid + 1;
                    } else {
                        right = mid;
                    }
                }
                count += (left - j - 1);
            }
        }
        return count;
    }
}
```

**时间复杂度**：$O(N^2 \log N)$，这里 $N$ 是输入数组的长度。对输入数组排序 $O(N \log N)$，枚举第一条边 $O(N)$，枚举第二条边 $O(N)$，二分查找第三条边的边界 $O(\log N)$​，综合以上 $O(N \log N + N^2\log N) = O(N^2 \log N)$。

---

欢迎大家关注我的公众号「算法不好玩」，B 站搜索「liweiwei1419」，我讲解的算法知识特别好懂。
