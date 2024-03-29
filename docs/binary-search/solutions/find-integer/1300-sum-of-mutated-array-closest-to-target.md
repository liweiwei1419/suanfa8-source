---
title: 「力扣」第 1300 题：转变数组后最接近目标值的数组和（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

- 题目链接：[1300. 转变数组后最接近目标值的数组和](https://leetcode-cn.com/problems/sum-of-mutated-array-closest-to-target/)；
- 题解链接：[二分查找（附相关练习）](https://leetcode-cn.com/problems/sum-of-mutated-array-closest-to-target/solution/er-fen-cha-zhao-by-liweiwei1419-2/)。

## 题目描述

给你一个整数数组 `arr` 和一个目标值 `target` ，请你返回一个整数 `value` ，使得将数组中所有大于 `value` 的值变成 `value` 后，数组的和最接近 `target` （最接近表示两者之差的绝对值最小）。

如果有多种使得和最接近 `target` 的方案，请你返回这些整数中的最小值。

请注意，答案不一定是 `arr` 中的数字。

**示例 1：**

```
输入：arr = [4,9,3], target = 10
输出：3
解释：当选择 value 为 3 时，数组会变成 [3, 3, 3]，和为 9 ，这是最接近 target 的方案。
```

**示例 2：**

```
输入：arr = [2,3,5], target = 10
输出：5
```

**示例 3：**

```
输入：arr = [60864,25176,27249,21296,20204], target = 56803
输出：11361
```

**提示：**

- `1 <= arr.length <= 10^4`
- `1 <= arr[i], target <= 10^5`

## 思路分析

一句话题解：

- 使用二分法确定一个整数 `threshold`（就是题目中说的 `value`），使得这个 `threshold` 下，「转变后的数组」的和最接近目标值 `target`；
- 「转变」的规则是：严格大于 `threshold` 的元素变成 `threshold`，那么 `threshold` 越大，「转变后的数组」的和越大，这是「单调性」（注意说得具体一点是：单调不减，因为有些情况下，阈值扩大以后，和可能不变）。

---

思路：

- 这道题比较麻烦的是求和以后可能不等于 `target` ，所以让我们求「最接近的方案」。而这个烦人的根源是 `value` 的取值一定得是整数。正是因为题目说 `value` 是整数，并且「答案不一定是 `arr` 中的数字」，因此依然可以使用二分查找法确定这个整数值。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tp7zyrruj20ze0mk400.jpg){:width="550px"}

- 做题的时候，会发现判别条件很不好写，因为「怎么衡量接近」，度量这个「最接近」的量不好选。因此需要考虑别的方案；
- 最接近的情况是：选定了一个 `value` 求和以后，恰恰好等于 `target`。不过更有可能出现的情况是：`value` 选得小了，「接近程度」变大，而 `value` 选得大了，「接近程度」变小，反过来也是有可能的。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tp82eyd8j21g40saac3.jpg){:width="550px"}

- 解决方案是：**把边界的上下方的可能的 `value` 值（一共就两个）都拿出来进行一次比较即可**。

**参考代码 1**：

如果选择一个阈值 `value` ，使得它对应的 `sum` 是第 1 个大于等于 `target` 的，那么目标值可能在 `value` 也可能在 `value - 1`。

```Java []
public class Solution {

    public int findBestValue(int[] arr, int target) {
        int left = 0;
        int right = 0;
        // 注意：
        for (int num : arr) {
            right = Math.max(right, num);
        }

        while (left < right) {
            int mid = left + (right - left) / 2;
            int sum = calculateSum(arr, mid);
            // 计算第 1 个使得转变后数组的和大于等于 target 的阈值 threshold
            if (sum < target) {
                // 严格小于的一定不是解
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // 比较阈值线分别定在 left - 1 和 left 的时候与 target 的接近程度
        int sum1 = calculateSum(arr, left - 1);
        int sum2 = calculateSum(arr, left);
        if (target - sum1 <= sum2 - target) {
            return left - 1;
        }
        return left;
    }

    private int calculateSum(int[] arr, int threshold) {
        int sum = 0;
        for (int num : arr) {
            sum += Math.min(num, threshold);
        }
        return sum;
    }

    public static void main(String[] args) {
        int[] arr = new int[]{2, 3, 5};
        int target = 11;
        Solution solution = new Solution();
        int res = solution.findBestValue(arr, target);
        System.out.println(res);
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N \log N)$，这里 $N$ 是输入数组的长度，二分的时间复杂度是 $O(\log N)$，每一次 `calculateSum` 的时间复杂度是 $O(N)$；
- 空间复杂度：$O(1)$。

**参考代码 2**：

如果选择一个阈值 `value` ，使得它对应的 `sum` 是最后 1 个小于等于 `target` 的阈值，那么目标值可能在 `value` 也可能在 `value + 1`。

```Java []
public class Solution {

    public int findBestValue(int[] arr, int target) {
        int left = 0;
        int right = 0;
        // 注意：
        for (int num : arr) {
            right = Math.max(right, num);
        }

        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            int sum = calculateSum(arr, mid);
            // 计算最后 1 个使得转变以后数组的和小于等于 target 的阈值 threshold
            if (sum > target) {
                // 大于等于的就不是解，threshold 太大了，下一轮搜索区间是 [left, mid - 1]
                right = mid - 1;
            } else {
                // 下一轮搜索区间是 [mid, right]
                left = mid;
            }
        }

        // 比较阈值线分别定在 left 和 left + 1 的时候与 target 的接近程度
        int sum1 = calculateSum(arr, left);
        int sum2 = calculateSum(arr, left + 1);
        // 注意：这里必须加绝对值，因为有可能出现 sum1 == sum2 < target 的情况
        if (Math.abs(target - sum1) <= Math.abs(sum2 - target)) {
            return left;
        }
        return left + 1;
    }

    private int calculateSum(int[] arr, int threshold) {
        int sum = 0;
        for (int num : arr) {
            sum += Math.min(num, threshold);
        }
        return sum;
    }

    public static void main(String[] args) {
        int[] arr = new int[]{2, 3, 5};
        int target = 11;
        Solution solution = new Solution();
        int res = solution.findBestValue(arr, target);
        System.out.println(res);
    }
}
```

**复杂度分析**：（同上）

## 练习

### 知识点 1：如果题目要我们找一个整数，这个整数我们明确知道范围，可以用二分查找

- 「力扣」第 69 题：[x 的平方根](https://leetcode-cn.com/problems/sqrtx)
- 「力扣」第 287 题：[寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)

### 知识点 2：判别函数得写一个函数去做的问题

- 「力扣」第 287 题：[寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)
- 「力扣」第 875 题：[爱吃香蕉的珂珂](https://leetcode-cn.com/problems/koko-eating-bananas/)

注意：下面的这三道问题属于同一个类型，已经出现 3 回了，希望朋友们能够趁机掌握写对二分查找算法的思路。

- 「力扣」第 410 题：[分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/)
- 「力扣」2020 年春季赛团体赛第 2 题：[LCP 12. 小张刷题计划](https://leetcode-cn.com/problems/xiao-zhang-shua-ti-ji-hua/)
- [第 193 场周赛（北京时间 2020 年 6 月 14 日 10:30 开始）](https://leetcode-cn.com/contest/weekly-contest-193/) 第 3 题：[制作 m 束花所需的最少天数](https://leetcode-cn.com/contest/weekly-contest-193/problems/minimum-number-of-days-to-make-m-bouquets/)

## 二分查找问题的视频题解

我在以下 4 个题目里讲解了我是如何使用二分查找的，希望能够对朋友们有所帮助。

| 问题                                                                                                                                        | 视频题解                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1095. 山脉数组中查找目标值](https://leetcode-cn.com/problems/find-in-mountain-array/)                                                      | [讲解两个二分查找的思路](https://leetcode-cn.com/problems/find-in-mountain-array/solution/shan-mai-shu-zu-zhong-cha-zhao-mu-biao-zhi-by-leet/)                                      |
| [35. 搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)                                                                | [详解第 2 种思路：在循环体中排除元素](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)                         |
| [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/) | [示例：讲解如何缩小搜索范围](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/si-lu-hen-jian-dan-xi-jie-fei-mo-gui-de-er-fen-cha/) |
| [4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)                                                | [示例：讲解如何应用在复杂的问题上](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/xun-zhao-liang-ge-you-xu-shu-zu-de-zhong-wei-s-114/)                       |
