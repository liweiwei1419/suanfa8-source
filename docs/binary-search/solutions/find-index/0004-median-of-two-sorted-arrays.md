---
title: 「力扣」第 4 题：寻找两个有序数组的中位数（困难）
icon: shipin
category: 二分查找
tags:
  - 二分查找
---

![0004](https://tva1.sinaimg.cn/large/008i3skNgy1gx80k8s2lhj30p00anwf9.jpg)

- 题目链接：[4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)；
- 题解链接：[二分查找定位短数组的「分割线」（Java ）](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/he-bing-yi-hou-zhao-gui-bing-guo-cheng-zhong-zhao-/)。

::: danger 视频讲解

:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/xun-zhao-liang-ge-you-xu-shu-zu-de-zhong-wei-s-114/) 和 [B 站](https://www.bilibili.com/video/BV1Xv411z76J) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?cid=145147963&aid=243372798&bvid=BV1Xv411z76J&cid=194980805&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

给定两个大小分别为 `m` 和 `n` 的正序（从小到大）数组 `nums1` 和 `nums2`。请你找出并返回这两个正序数组的 **中位数** 。

算法的时间复杂度应该为 `O(log (m+n))` 。

**示例 1：**

```
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
```

**示例 2：**

```
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

**示例 3：**

```
输入：nums1 = [0,0], nums2 = [0,0]
输出：0.00000
```

**示例 4：**

```
输入：nums1 = [], nums2 = [1]
输出：1.00000
```

**示例 5：**

```
输入：nums1 = [2], nums2 = []
输出：2.00000
```

**提示：**

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

---

::: tip 写在前面的话

- 本题解于 2020 年 11 月 14 日重写；
- 本题解是视频题解的文字版，视频题解可以在 [官方题解](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/xun-zhao-liang-ge-you-xu-shu-zu-de-zhong-wei-s-114/) 观看，官解的评论区的置顶评论有时间线说明。
  :::

::: danger 解决这道题的核心思想是

- 使用二分查找确定两个有序数组的「分割线」，中位数就由分割线左右两侧的元素决定；
- 分割线满足这样的性质：左右两边元素个数相等（这里忽略两个数组长度之和奇偶性的差异）；
- 分割线左边所有元素 **小于等于** 分割线右边所有元素；
- 由于分割线两边元素个数相等，挪动分割线就会有「此消彼长」的现象，所以使用二分去定位。
  :::

二分查找简介，请见第 35 题 [题解](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)。

## 题意分析

求出这两个有序数组的中位数合并成一个有序数组以后的中位数。

## 思路分析

### 方法一：暴力解法：合并以、排序、得到中位数

分析和参考代码省略。

**复杂度分析**：

- 时间复杂度：$O((M + N) \log (M + N))$，这里 $M$ 和 $N$ 分别是两个数组的长度。
- 空间复杂度：$O(M + N)$。

### 方法二：实现归并排序、得到中位数

分析和参考代码省略。

**复杂度分析**：

- 时间复杂度：$O(M + N)$，这里 $M$ 和 $N$ 分别是两个数组的长度，代码只看了数组长度之和的一半，常数系数视为 $1$。
- 空间复杂度：$O(1)$，我们没有借助其它的空间，使用到的临时变量也只有常数个。

### 方法三：二分查找

#### 1. 只有一个有序数组的时候中位数的性质

从中位数的定义出发。根据暴力法的分析，在只有一个有序数组的时候：

- 如果数组的元素个数是偶数，此时我们可以想象有一条分界线，把数组分成两个部分，中位数就是介于这个分界线两边的两个元素的平均值；
- 如果数组的元素个数是奇数，此时我们也可以想象有一条分界线，把数组分成两个部分，此时我们让分割线左边多一个元素，此时分割线的左边的那个元素就是这个有序数组的中位数。

![image-20191216154514844](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tov4w1ekj20zq0fi3zb.jpg)

至于为什么把中位数分到这个分割线的左边而不是右边，这是人为规定，前后保持统一即可。

#### 2. 两个有序数组的时候中位数的性质

接下来看两个有序数组的时候，依然可以用这种画分界线的方式来找中位数。**这条分割线的特点是**：

- 当数组的总长度为偶数的时候，分割线左右的数字个数总和相等；当数组的总长度为奇数的时候，分割线左数字个数比右边仅仅多 $1$；
- 分割线左边的所有元素都小于等于（不大于）分割线右边的所有元素。

如果这条分割线可以找到，那么中位数就可以确定下来，同样得分奇偶性：

- 当数组的总长度为偶数的时候，中位数就是分割线左边的最大值与分割线右边的最小值的平均数；
- 当数组的总长度为奇数的时候，中位数就是分割线左边的最大值。因此，在数组长度是奇数的时候，中位数就是分割线左边的所有数的最大值。

这就是我们让分割线左边在整个数组长度是奇数的时候，多 $1$ 个数的原因。即：让引入分割线定义的中位数在 $1$ 个数组和 $2$ 个数组的时候统一起来。

因为两个数组本别是有序数组，因此，我们只需要判定交叉的关系中，是否满足左边依然小于等于右边即可，即

- 第 $1$ 个数组分割线左边的第 $1$ 个数小于等于第 $2$ 个数组分割线右边的第 $1$ 的数；
- 第 $2$ 个数组分割线左边的第 $1$ 个数小于等于第 $1$ 个数组分割线右边的第 $1$ 的数。

#### 3. 通过不断缩减搜索区间确定分割线的位置

接下来，我们就来看一下分割线怎么着，需要在第 1 个数组上划一刀，再在第 2 个数组上划一刀。但事实上，**分割线左边的元素总数是固定的**，我们 **只要能确定 $1$ 个数组上元素的位置，另一个位置自然就可以确定下来**。它们之间的关系其实很简单，我们刚刚也已经分析过了。

把其中一个数组称之为 `nums1` ，另一个数组称之为 `nums2`

- 当数组的总长度为偶数的时候，左边一共有 $\cfrac{len(num1) + len(nums2)}{2}$ 个元素；
- 当数组的总长度为奇数的时候，左边一共有 $\cfrac{len(num1) + len(nums2)}{2} + 1$ 个元素；

我们仔细观察一下这两个表达式，发现奇数的时候，因为除以 $2$ 是下取整，所以计算左边元素总数的时候，就得 $+ 1$。事实上，我们可以修改这个下取整的行为，让它上取整。上面这两种情况就可以统一起来，在计算左边元素个数的时候，**可以用一个统一的式子**，即：

$$
\cfrac{len(num1) + len(nums2) + 1}{2}
$$

这里用到了一个小技巧，把下取整，修改为上取整的时候，只需要在被除数的部分，加上除数减 1 即可，这里除数是 2 ，因此被除数加 1 即可。大家可以自行验证一下，就拿我们上面举出的例子来验证一下这个事实：

- 当 `len(nums1) = 5`、`len(nums2) = 5` 的时候，$\cfrac{len(num1) + len(nums2) + 1}{2} = 5$；
- 当 `len(nums1) = 4`、`len(nums2) = 5` 的时候，$\cfrac{len(num1) + len(nums2) + 1}{2} = 5$，左边比右边多一个元素。

#### 4. 再次提炼问题、细化算法流程

这个问题解决以后，问题就转化为我们在其中一个数组找到 `i` 个元素，则另一个数组的元素个数就一定是 $\cfrac{len(num1) + len(nums2) + 1}{2} - i$。于是怎么找 `i` 的位置，就是我们要解决的问题。

找 `i` 个元素，我们通常的做法是找索引为 `i`的元素，因为下标是从 $0$ 开始编号，因此编号为 `i` 的元素，就刚刚好前面有 `i` 个元素。因此，`i` 就是第 $1$ 个数组分割线的右边的第 $1$ 个元素。

下面我们来看怎么找 `i`，需要分类讨论。

**情况 1**：如下图所示，此时分割线左边的元素总数比右边多 $1$，但是第 $1$ 个数组分割线右边第 $1$ 个数 $6$ 小于第 $2$ 个数组分割线左边第 $1$ 个数 $8$。说明，第 $1$ 个数组左边的数少了，分割线要右移。

![image-20191216164952779](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tov7ol30j20ww0ci3z9.jpg)

**情况 2**：如下图所示，此时分割线左边的元素总数比右边多 $1$，但是第 $1$ 个数组分割线左边第 $1$ 个数 $8$ 大于第 $2$ 个数组分割线左边第 1 个数 7。说明，第 1 个数组左边的数多了，分割线要左移。

![image-20191216165734716](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tov9gdq5j215e0dc757.jpg)

就是在这种不断缩小搜索范围的方法中，定位我们要找的 `i` 是多少。

#### 5. 考虑极端情况

这里要注意一个问题，那就是我们要在一个短的数组上搜索 `i` 。在搜索的过程中，我们会比较分割线左边和右边的数，即 `nums[i]`、 `nums[i - 1]`、 `nums[j]`、 `nums[j - 1]`，因此 **这几个数的下标不能越界**。

一个比较极端的情况如下：

![image-20191216170435095](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tovbs4v7j20iw0cwjrk.jpg)

此时，分割线在第 $2$ 个数组的左边没有值，会导致 `nums2[j - 1]` 的访问越界。因此我们必须在短的数组上搜索 `i` 。`i` 的定义是分割线的右边，而它的左边一定有值。这样就能保证，分割线在第 $2$ 个数组的左右两边一定有元素，即分割线一定可以在第 $2$ 个数组的中间切一刀。

---

下面就是这个题目的最后一个细节，那就是即使我在短数组上搜索边界 `i` ，还真就可能遇到 `i` 或者 `j` 的左边或者右边取不到元素的情况，它们一定出现在退出循环的时候。

![image-20191216170934239](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tovfl370j21ms0j8t9s.jpg)

为此，我们单独做一个判断就可以了。

![image-20191216171333129](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tovh2s1oj216m0f8751.jpg)

最后，我们把关心的「边界线」两旁的 $4$ 个数的极端情况都考虑一下：

- 考虑 `nums1`：
  - 当 `i = 0` 的时候，对应上图右边，此时数组 `nums1` 在红线左边为空，可以设置 `nums1_left_max = 负无穷`。
    这样在最终比较的时候，因为左边粉色部分要选择出最大值，它一定不会被选中，于是能兼容其它情况；
  - 当 `i = m` 的时候，对应上图左边，此时数组 `nums1` 在红线右边为空，可以设置 `nums1_right_min = 正无穷`。
    这样在最终比较的时候，因为右边蓝色部分要选择出最小值，它一定不会被选中，于是能兼容其它情况。
- 考虑 `nums2`：
  - 当 `j = 0` 的时候，对应上图左边，此时数组 `nums2` 在红线左边为空，可以设置 `nums2_left_max = 负无穷`。
    这样在最终比较的时候，因为左边粉色部分要选择出最大值，它一定不会被选中，于是能兼容其它情况；
  - 当 `j = n` 的时候，对应上图右边，此时数组 `nums2` 在红线右边为空，可以设置 `nums2_right_min = 正无穷`。
    这样在最终比较的时候，因为右边蓝色部分要选择出最小值，它一定不会被选中，于是能兼容其它情况。

::: danger 提示
下面的选项卡提供了两版代码。
:::

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            int[] temp = nums1;
            nums1 = nums2;
            nums2 = temp;
        }

        int m = nums1.length;
        int n = nums2.length;

        // 分割线左边的所有元素需要满足的个数 m + (n - m + 1) / 2;
        int totalLeft = (m + n + 1) / 2;

        // 在 nums1 的区间 [0, m] 里查找恰当的分割线，
        // 使得 nums1[i - 1] <= nums2[j] && nums2[j - 1] <= nums1[i]
        int left = 0;
        int right = m;

        while (left < right) {
            int i = left + (right - left + 1) / 2;
            int j = totalLeft - i;
            if (nums1[i - 1] > nums2[j]) {
                // 下一轮搜索的区间 [left, i - 1]
                right = i - 1;
            } else {
                // 下一轮搜索的区间 [i, right]
                left = i;
            }
        }

        int i = left;
        int j = totalLeft - i;

        int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int nums1RightMin = i == m ? Integer.MAX_VALUE : nums1[i];
        int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int nums2RightMin = j == n ? Integer.MAX_VALUE : nums2[j];

        if (((m + n) % 2) == 1) {
            return Math.max(nums1LeftMax, nums2LeftMax);
        } else {
            return (double) ((Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin))) / 2;
        }
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Java">

```java
public class Solution {

    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            int[] temp = nums1;
            nums1 = nums2;
            nums2 = temp;
        }

        int m = nums1.length;
        int n = nums2.length;

        // 分割线左边的所有元素需要满足的个数 m + (n - m + 1) / 2;
        int totalLeft = (m + n + 1) / 2;

        // 在 nums1 的区间 [0, m] 里查找恰当的分割线，
        // 使得 nums1[i - 1] <= nums2[j] && nums2[j - 1] <= nums1[i]
        int left = 0;
        int right = m;

        while (left < right) {
            int i = left + (right - left) / 2;
            int j = totalLeft - i;
            if (nums2[j - 1] > nums1[i]) {
                // 下一轮搜索的区间 [i + 1, right]
                left = i + 1;
            } else {
                // 下一轮搜索的区间 [left, i]
                right = i;
            }
        }

        int i = left;
        int j = totalLeft - i;
        int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int nums1RightMin = i == m ? Integer.MAX_VALUE : nums1[i];
        int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int nums2RightMin = j == n ? Integer.MAX_VALUE : nums2[j];

        if (((m + n) % 2) == 1) {
            return Math.max(nums1LeftMax, nums2LeftMax);
        } else {
            return (double) ((Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin))) / 2;
        }
    }
}
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(\log(\min(M,N)))$，为了使得搜索更快，我们把更短的数组设置为 nums1 ，因为使用二分查找法，在它的长度的对数时间复杂度内完成搜索；
- 空间复杂度：$O(1)$，只使用了常数个的辅助变量。

## 参考资料

主要参考资料为：[LeetCode 的英文版的官方题解第 4 题评论区](https://leetcode.com/problems/median-of-two-sorted-arrays/solution/)。这道题消化了很长时间，搞懂它重启了好几次，写了几页草稿。
