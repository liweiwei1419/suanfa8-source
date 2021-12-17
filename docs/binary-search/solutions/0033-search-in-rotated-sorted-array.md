---
title: 「力扣」第 33 题：搜索旋转排序数组（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---


+ 题目链接：[33. 搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)；
+ 题解链接：[二分查找（Java）](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/er-fen-fa-python-dai-ma-java-dai-ma-by-liweiwei141/)。

## 题目描述

整数数组 `nums` 按升序排列，数组中的值 **互不相同** 。

在传递给函数之前，`nums` 在预先未知的某个下标 `k`（`0 <= k < nums.length`）上进行了 **旋转**，使数组变为 `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` 下标 **从 0 开始** 计数）。例如， `[0,1,2,4,5,6,7]` 在下标 `3` 处经旋转后可能变为 `[4,5,6,7,0,1,2]` 。

给你 **旋转后** 的数组 `nums` 和一个整数 `target` ，如果 `nums` 中存在这个目标值 `target` ，则返回它的下标，否则返回 `-1` 。

**示例 1：**

```
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
```

**示例 2：**

```
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
```

**示例 3：**

```
输入：nums = [1], target = 0
输出：-1
```

**提示：**

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- `nums` 中的每个值都 **独一无二**
- 题目数据保证 `nums` 在预先未知的某个下标上进行了旋转
- `-10^4 <= target <= 10^4`

**进阶：**你可以设计一个时间复杂度为 `O(log n)` 的解决方案吗？

![image.png](https://pic.leetcode-cn.com/1614327694-ZemZgK-image.png)


「二分查找」详解可以参考 [二分查找的两种思路和三种题型](https://leetcode-cn.com/leetbook/read/learning-algorithms-with-leetcode/xsq0b7/)、[写对二分查找不能靠模板，需要理解加练习 （附练习题，持续更新）](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)。

---

### 方法一：遍历（时间复杂度不符合题目要求）

采用线性扫描，一次遍历得到整个数组的最小值。

**存在的问题**：

+ 没有利用到数组「旋转有序」的特点；
+ 不符合题目「你的算法时间复杂度必须是 $O(\log n)$ 级别」这项要求。

**参考代码 1**：

```java
public class Solution {
    
    public int search(int[] nums, int target) {
        int len = nums.length;
        for (int i = 0; i < len; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是数组的长度。
+ 空间复杂度：$O(1)$，使用到的临时变量的个数是常数。

---

### 方法二：二分查找

其实题目中说「你的算法时间复杂度必须是 $O(\log n)$ 级别」。提示我们可以使用二分查找算法。题目中还说「**你可以假设数组中不存在重复的元素**」。

根据示例 `[4, 5, 6, 7, 0, 1, 2]` ，自己手写几个旋转数组。不难发现：将待搜索区间从中间一分为二，**位于中间的元素 `nums[mid]` 一定会落在其中一个有序区间里**。需要分类讨论。

**情况 1**：`mid` 位于后面的有序区间里

<img src="https://pic.leetcode-cn.com/1614329409-AQTEOx-image.png" alt="image.png" style="zoom: 50%;" />

**情况 2**：`mid` 位于前面的有序区间里

<img src="https://pic.leetcode-cn.com/1614329458-MLbuVu-image.png" alt="image.png" style="zoom: 50%;" />

我们以讨论 **中间元素和右边界的关系** 为例，其它情况类似。由于不存在重复元素，**所以它们的关系不是大于就是小于**。

**情况 1**：当中间元素的数值严格小于右边界的数值时，即 `nums[mid] < nums[right]` 时

+ 此时区间 `[mid..right]` （表示左闭右闭区间，下同）一定是有序的；
+ 如果 `target` 在区间 `[left..right]` 里，它或者在有序区间 `[mid..right]` 里，或者在另一个区间 `[left..mid - 1]` 里。
  + **在有序区间 `[mid..right]` 里的条件好写**，即：`nums[mid] <= target <= nums[right]`。因为 `target` 落在其中，所以能且只能等于其中的一个元素，当然包括头尾，此时设置 `left = mid`；
  + 落在另一个区间 `[left..mid - 1]` 里的时候，就是上一个情况的反面，这种情况用 `else` 表示即可，此时设置 `right = mid - 1`。

**关键**：把比较好些的判断（`target` 落在有序的那部分）放在 `if` 的开头考虑，把剩下的情况放在 `else` 里面。

同理，讨论 `nums[mid] < nums[right]` 的反面（下面的描述基本上是反过来讲的，大家可以跳过）。

**情况 2**：当中间元素的数值严格小于右边界的数值时，由于没有重复元素，所以是严格大于，即 `nums[mid] > nums[right]` 

+ 此时区间 `[left..mid]` 内的元素一定是有序的；
+ 如果 `target` 在区间 `[left..right]` 里，它或者在有序区间 `[left..mid]` 里，或者在另一个区间 `[mid + 1..right]` 里。
  + **在有序区间 `[left..mid]` 里的条件好写**，即：`nums[left] <= target <= nums[mid]`。因为 `target` 落在其中，所以能且只能等于其中的一个元素，当然包括头尾，此时设置 `right = mid`；
  + 但是，为了与上一个分支的边界设置行为一致，我们这里认为 `[left..mid - 1]` 内的元素一定是有序的，把 `if` 条件改成 `nums[left] <= target <= nums[mid - 1]`，此时设置 `right = mid - 1`；
  + 落在另一个区间 `[mid..right]` 里的时候，就是上一个情况的反面，这种情况用 `else` 表示即可，此时设置 `left = mid`。

---

这部分是关于二分查找算法本身的叙述，与本题无关：

当看到边界设置行为是 `left = mid` 与 `right = mid - 1` 的时候，需要将 `int mid` 的下取整行为调整为上取整，以避免出现死循环 `int mid = left + (right - left + 1) / 2;`。

---

这样一来，上面的「情况 2」是 `nums[mid] < nums[right]` 的 **反面**，当区间里只有 2 个元素的时候。`mid` 与 `right` 重合，因此 **当区间里只有 2 个元素的时候，会进入这个逻辑**。

我们再看看此时 `if` 的逻辑，`nums[left] <= target && target <= nums[mid - 1]` 等价于「看看 `nums[left] == target` 是否成立」，逻辑上是完整的。感谢 [@oneday-a](/u/oneday-a/) 注意到这一点。


**参考代码 2**：

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return -1;
        }

        int left = 0;
        int right = len - 1;
        while (left < right) {
            // 根据分支的逻辑将中间数改成上取整
            int mid = left + (right - left + 1) / 2;
            if (nums[mid] < nums[right]) {
                // 此时 [mid..right] 有序
                if (nums[mid] <= target && target <= nums[right]) {
                    // 如果 target 的值落在这个区间里，下一轮搜索区间是 [mid..right]，此时设置 left = mid;
                    left = mid;
                } else {
                    // 否则，下一轮搜索区间是 [left..mid - 1]，此时设置 right = mid - 1;
                    right = mid - 1;
                }
            } else {
                // 此时 nums[mid] >= nums[right]，注意此时 mid 可能与 right 重合
                // 数组前半部分有序，即 [left..mid] 有序，为了与上一个分支的逻辑一致，认为 [left..mid - 1] 有序
                if (nums[left] <= target && target <= nums[mid - 1]) {
                    // 如果 target 的值落在区间 [left..mid - 1] 里，设置 right = mid - 1;
                    right = mid - 1;
                } else {
                    // 否则，下一轮搜索区间是 [mid..right]，此时设置 left = mid;
                    left = mid;
                }

                // 补充说明：由于中间数上取整，在区间只剩下两个元素的时候，mid 与 right 重合，逻辑走到 else 分支里
                // 此时恰好 if 这个分支看到的是 left 和 mid - 1 ，用到的都是 == 号，等价于判断 nums[left] == target
                // 因此依然可以缩减区间，注意这里 if 里面的 nums[left] <= target && target <= nums[mid - 1] ，
                // 不可以写成 nums[left] <= target && target < nums[mid]
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

+ 时间复杂度：$O(\log N)$，这里 $N$ 是数组的长度，在循环中一次排除一半，因此时间复杂度是对数级别的；
+ 空间复杂度：$O(1)$，使用到的临时变量的个数是常数。
