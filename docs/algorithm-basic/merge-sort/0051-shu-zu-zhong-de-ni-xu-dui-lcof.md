---
title: 4.4 例 1：逆序对
icon: shipin
category: 排序算法
tags:
  - 排序算法
  - 分而治之
  - 归并排序
---




# 《剑指 Offer》（第 2 版）第 51 题：计算数组的逆序对

这里给出的例题的解题思路如果对于初学者来说可能不是很容易想到，不过其实你只要熟悉归并排序，按照归并排序的套路，是不难写出下面的代码。反正不过我是写不出的，不过我会看别人写的代码，理解之后，自己写出来。如果觉得理解这些代码比较吃力的话，可以暂时跳过，我写出来还是费了很大力气，并且也是调试和一段时间才把代码写正确的。

## :tv: **视频教程**

建议使用 1.5 倍速观看。

+ 在「力扣」的官方题解里可以观看视频：[数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/shu-zu-zhong-de-ni-xu-dui-by-leetcode-solution/)；
+ [B 站视频](https://www.bilibili.com/video/BV1Qk4y1r7u5?from=search&seid=16040119783228718204&spm_id_from=333.337.0.0)。

---

以下内容来自文字题解：[暴力解法、分治思想、树状数组](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/bao-li-jie-fa-fen-zhi-si-xiang-shu-zhuang-shu-zu-b/)。


首先最容易想到的是暴力解法。

### 方法一：暴力解法（超时）

使用两层 `for` 循环枚举所有的数对，逐一判断是否构成逆序关系。

**参考代码 1**：

<CodeGroup>
<CodeGroupItem title="Java">

```java
public class Solution {

    public int reversePairs(int[] nums) {
        int cnt = 0;
        int len = nums.length;
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                if (nums[i] > nums[j]) {
                    cnt++;
                }
            }
        }
        return cnt;
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python
from typing import List


class Solution:

    def reversePairs(self, nums: List[int]) -> int:
        size = len(nums)
        if size < 2:
            return 0
        res = 0
        for i in range(0, size - 1):
            for j in range(i + 1, size):
                if nums[i] > nums[j]:
                    res += 1
        return res
```

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

+ 时间复杂度：$O(N^2)$，这里 $N$ 是数组的长度；
+ 空间复杂度：$O(1)$。


### 方法二：分治思想（借助归并排序统计逆序数）

说明：理解这个算法需要对「归并排序」比较熟悉。掌握如果编写递归函数，每一次都一分为二拆分数组的子区间，然后在方法栈弹出的时候，一步一步合并两个有序数组，最后完成排序工作。

而计算逆序数就发生在排序的过程中，利用了「排序」以后数组的有序性。


+ 利用「归并排序」计算逆序对，是非常经典的做法；
+ **关键在于「合并两个有序数组」的步骤，利用数组的部分有序性**，一下子计算出一个数之前或者之后元素的逆序的个数；
+ **前面「分」的时候什么都不做，「合」的过程中计算「逆序对」的个数**；
+ 「排序」的工作是必要的，正是因为「排序」才能在下一轮利用顺序关系加快逆序数的计算，也能避免重复计算；
+ 在代码实现上，只需要在「归并排序」代码的基础上，加上「逆序对」个数的计算，计算公式需要自己在草稿纸上推导。


思想是「分治算法」，所有的「逆序对」来源于 3 个部分：

+ 左边区间的逆序对；
+ 右边区间的逆序对；
+ 横跨两个区间的逆序对。

下面提供两种写法：

1、在第 2 个子区间元素归并回去的时候，计算逆序对的个数（参考代码 2）；
2、在第 1 个子区间元素归并回去的时候，计算逆序对的个数（参考代码 3）。

注意：两者不能同时计算，否则会计算重复。


**参考代码 2**：在第 2 个子区间元素归并回去的时候，计算逆序对的个数。

![image.png](https://pic.leetcode-cn.com/0adb9d76f0f2a8efccaa1c3d340003e91e2a9eb9dc490280460acae0c8850a24-image.png)

---

![image.png](https://pic.leetcode-cn.com/a13af31b7f9e12f6d8588d95dd71c94aa0117bc8c819899e7806a5695e237f78-image.png)


即在 `j` 指向的元素赋值回去的时候，给计数器加上 `mid - i + 1`。


<CodeGroup>
<CodeGroupItem title="Java">

```java
public class Solution {

    public int reversePairs(int[] nums) {
        int len = nums.length;

        if (len < 2) {
            return 0;
        }

        int[] copy = new int[len];
        for (int i = 0; i < len; i++) {
            copy[i] = nums[i];
        }

        int[] temp = new int[len];
        return reversePairs(copy, 0, len - 1, temp);
    }

    /**
     * nums[left..right] 计算逆序对个数并且排序
     *
     * @param nums
     * @param left
     * @param right
     * @param temp
     * @return
     */
    private int reversePairs(int[] nums, int left, int right, int[] temp) {
        if (left == right) {
            return 0;
        }

        int mid = left + (right - left) / 2;
        int leftPairs = reversePairs(nums, left, mid, temp);
        int rightPairs = reversePairs(nums, mid + 1, right, temp);

        // 如果整个数组已经有序，则无需合并，注意这里使用小于等于
        if (nums[mid] <= nums[mid + 1]) {
            return leftPairs + rightPairs;
        }

        int crossPairs = mergeAndCount(nums, left, mid, right, temp);
        return leftPairs + rightPairs + crossPairs;
    }

    /**
     * nums[left..mid] 有序，nums[mid + 1..right] 有序
     *
     * @param nums
     * @param left
     * @param mid
     * @param right
     * @param temp
     * @return
     */
    private int mergeAndCount(int[] nums, int left, int mid, int right, int[] temp) {
        for (int i = left; i <= right; i++) {
            temp[i] = nums[i];
        }

        int i = left;
        int j = mid + 1;

        int count = 0;
        for (int k = left; k <= right; k++) {
            // 有下标访问，得先判断是否越界
            if (i == mid + 1) {
                nums[k] = temp[j];
                j++;
            } else if (j == right + 1) {
                nums[k] = temp[i];
                i++;
            } else if (temp[i] <= temp[j]) {
                // 注意：这里是 <= ，写成 < 就不对，请思考原因
                nums[k] = temp[i];
                i++;
            } else {
                nums[k] = temp[j];
                j++;
                
                // 在 j 指向的元素归并回去的时候，计算逆序对的个数，只多了这一行代码
                count += (mid - i + 1);
            }
        }
        return count;
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python
# 后有序数组中元素出列的时候，计算逆序个数

from typing import List


class Solution:

    def reversePairs(self, nums: List[int]) -> int:
        size = len(nums)
        if size < 2:
            return 0

        # 用于归并的辅助数组
        temp = [0 for _ in range(size)]
        return self.count_reverse_pairs(nums, 0, size - 1, temp)

    def count_reverse_pairs(self, nums, left, right, temp):
        # 在数组 nums 的区间 [left, right] 统计逆序对
        if left == right:
            return 0
        mid = (left + right) >> 1
        left_pairs = self.count_reverse_pairs(nums, left, mid, temp)
        right_pairs = self.count_reverse_pairs(nums, mid + 1, right, temp)

        reverse_pairs = left_pairs + right_pairs
        # 代码走到这里的时候，[left, mid] 和 [mid + 1, right] 已经完成了排序并且计算好逆序对

        if nums[mid] <= nums[mid + 1]:
            # 此时不用计算横跨两个区间的逆序对，直接返回 reverse_pairs
            return reverse_pairs

        reverse_cross_pairs = self.merge_and_count(nums, left, mid, right, temp)
        return reverse_pairs + reverse_cross_pairs

    def merge_and_count(self, nums, left, mid, right, temp):
        """
        [left, mid] 有序，[mid + 1, right] 有序

        前：[2, 3, 5, 8]，后：[4, 6, 7, 12]
        只在后面数组元素出列的时候，数一数前面这个数组还剩下多少个数字，
        由于"前"数组和"后"数组都有序，
        此时"前"数组剩下的元素个数 mid - i + 1 就是与"后"数组元素出列的这个元素构成的逆序对个数

        """
        for i in range(left, right + 1):
            temp[i] = nums[i]

        i = left
        j = mid + 1
        res = 0
        for k in range(left, right + 1):
            if i > mid:
                nums[k] = temp[j]
                j += 1
            elif j > right:
                nums[k] = temp[i]
                i += 1
            elif temp[i] <= temp[j]:
                # 此时前数组元素出列，不统计逆序对
                nums[k] = temp[i]
                i += 1
            else:
                # assert temp[i] > temp[j]
                # 此时后数组元素出列，统计逆序对，快就快在这里，一次可以统计出一个区间的个数的逆序对
                nums[k] = temp[j]
                j += 1
                # 例：[7, 8, 9][4, 6, 9]，4 与 7 以及 7 后面所有的数都构成逆序对
                res += (mid - i + 1)
        return res
```

</CodeGroupItem>
</CodeGroup>




**参考代码 3**：在第 1 个子区间元素归并回去的时候，计算逆序对的个数。

即在 `i` 指向的元素赋值回去的时候，给计数器加上 `j - mid - 1`。

<CodeGroup>
<CodeGroupItem title="Java">

```java
public class Solution {

    public int reversePairs(int[] nums) {
        int len = nums.length;

        if (len < 2) {
            return 0;
        }

        int[] copy = new int[len];
        for (int i = 0; i < len; i++) {
            copy[i] = nums[i];
        }

        int[] temp = new int[len];
        return reversePairs(copy, 0, len - 1, temp);
    }

    /**
     * nums[left..right] 计算逆序对个数并且排序
     *
     * @param nums
     * @param left
     * @param right
     * @param temp
     * @return
     */
    private int reversePairs(int[] nums, int left, int right, int[] temp) {
        if (left == right) {
            return 0;
        }

        int mid = left + (right - left) / 2;
        int leftPairs = reversePairs(nums, left, mid, temp);
        int rightPairs = reversePairs(nums, mid + 1, right, temp);

        if (nums[mid] <= nums[mid + 1]) {
            return leftPairs + rightPairs;
        }

        int crossPairs = mergeAndCount(nums, left, mid, right, temp);
        return leftPairs + rightPairs + crossPairs;
    }

    /**
     * nums[left..mid] 有序，nums[mid + 1..right] 有序
     *
     * @param nums
     * @param left
     * @param mid
     * @param right
     * @param temp
     * @return
     */
    private int mergeAndCount(int[] nums, int left, int mid, int right, int[] temp) {
        for (int i = left; i <= right; i++) {
            temp[i] = nums[i];
        }

        int i = left;
        int j = mid + 1;

        int count = 0;
        for (int k = left; k <= right; k++) {

            if (i == mid + 1) {
                nums[k] = temp[j];
                j++;
            } else if (j == right + 1) {
                nums[k] = temp[i];
                i++;

                count += (right - mid);
            } else if (temp[i] <= temp[j]) {
                nums[k] = temp[i];
                i++;

                count += (j - mid - 1);
            } else {
                nums[k] = temp[j];
                j++;
            }
        }
        return count;
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python
# 前有序数组中元素出列的时候，计算逆序个数

from typing import List


class Solution:

    def reversePairs(self, nums: List[int]) -> int:
        size = len(nums)
        if size < 2:
            return 0

        temp = [0 for _ in range(size)]
        return self.reverse_pairs(nums, 0, size - 1, temp)

    def reverse_pairs(self, nums, left, right, temp):
        """
        在数组 nums 的区间 [l,r] 统计逆序对
        :param nums:
        :param left: 待统计数组的左边界，可以取到
        :param right: 待统计数组的右边界，可以取到
        :param temp:
        :return:
        """
        if left == right:
            return 0
        mid = (left + right) >> 1
        left_pairs = self.reverse_pairs(nums, left, mid, temp)
        right_pairs = self.reverse_pairs(nums, mid + 1, right, temp)

        reverse_pairs = left_pairs + right_pairs
        if nums[mid] <= nums[mid + 1]:
            return reverse_pairs

        reverse_cross_pairs = self.merge_and_count(nums, left, mid, right, temp)
        return reverse_pairs + reverse_cross_pairs

    def merge_and_count(self, nums, left, mid, right, temp):
        """
        [left, mid] 有序，[mid + 1, right] 有序

        前：[2, 3, 5, 8]，后：[4, 6, 7, 12]
        我们只需要在后面数组元素出列的时候，数一数前面这个数组还剩下多少个数字，
        因为"前"数组和"后"数组都有序，
        因此，"前"数组剩下的元素个数 mid - i + 1 就是与"后"数组元素出列的这个元素构成的逆序对个数

        """
        for i in range(left, right + 1):
            temp[i] = nums[i]

        i = left
        j = mid + 1

        res = 0
        for k in range(left, right + 1):
            if i > mid:
                nums[k] = temp[j]
                j += 1
            elif j > right:
                nums[k] = temp[i]
                i += 1

                res += (right - mid)
            elif temp[i] <= temp[j]:
                nums[k] = temp[i]
                i += 1

                res += (j - mid - 1)
            else:
                assert temp[i] > temp[j]
                nums[k] = temp[j]
                j += 1
        return res
```

</CodeGroupItem>
</CodeGroup>


类似问题：[315. 计算右侧小于当前元素的个数](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/)。

**复杂度分析**：

+ 时间复杂度：$O(N \log N)$，这里 $N$ 是数组的长度。复杂度是归并排序的时间复杂度，直接看递归树的结点个数或者使用主定理分析，归并的回收每一步计算逆序对的个数是 $O(1)$ 的；
+ 空间复杂度：$O(N)$。

主定理分析：数据列均分为两部分，分别排序，之后以 $O(N)$ 的复杂度进行合并。根据主定理（递归函数的时间复杂度分析工具）：

$$
T(N) = 2 T(\frac{N}{2}) + O(N)
$$

这里 $a = 2$，$b = 2$，$N^{\log_b{a}} = N^{\log_2{2}} = N$，于是得到 $T(N) = O(N \log N)$。

至于为什么是这样，不在我能解释的范围内，大家可以在互联网上搜索「主定理」、「归并排序」获得相关的知识。

### 方法三：树状数组

这部分内容如果是准备普通公司的算法面试，不建议花时间掌握。写在这里是为了知识的完整性和知识点的科普。

+ 用树状数组解决逆序数问题，也是一个经典的做法。
+ 树状数组是一种实现了高效查询「前缀和」与「单点更新」操作的数据结构，在「力扣」第 315 题：[计算右侧小于当前元素的个数](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/) 的 [题解](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/solution/shu-zhuang-shu-zu-by-liweiwei1419/) 里有介绍，这两题的解法可以说是一模一样。


具体的做法是：

+ 先离散化，将所有的数组元素映射到 `0、1、2、3...` ，这是为了节约树状数组的空间；
+ 从后向前扫描，边统计边往树状数组里面添加元素，这个过程是「动态的」，需要动手计算才能明白思想。

**参考代码 4**：

<CodeGroup>
<CodeGroupItem title="Java">

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

public class Solution {

    public int reversePairs(int[] nums) {
        int len = nums.length;

        if (len < 2) {
            return 0;
        }

        // 离散化：使得数字更紧凑，节约树状数组的空间
        // 1、使用二分搜索树是为了去掉重复元素
        Set<Integer> treeSet = new TreeSet<>();
        for (int i = 0; i < len; i++) {
            treeSet.add(nums[i]);
        }

        // 2、把排名存在哈希表里方便查询
        Map<Integer, Integer> rankMap = new HashMap<>();
        int rankIndex = 1;
        for (Integer num : treeSet) {
            rankMap.put(num, rankIndex);
            rankIndex++;
        }

        int count = 0;
        // 在树状数组内部完成前缀和的计算
        // 规则是：从后向前，先给对应的排名 + 1，再查询前缀和
        FenwickTree fenwickTree = new FenwickTree(rankMap.size());

        for (int i = len - 1; i >= 0; i--) {
            int rank = rankMap.get(nums[i]);
            fenwickTree.update(rank, 1);
            count += fenwickTree.query(rank - 1);
        }
        return count;
    }

    private class FenwickTree {
        private int[] tree;
        private int len;

        public FenwickTree(int n) {
            this.len = n;
            tree = new int[n + 1];
        }

        /**
         * 单点更新：将 index 这个位置 + delta
         *
         * @param i
         * @param delta
         */
        public void update(int i, int delta) {
            // 从下到上，最多到 size，可以等于 size
            while (i <= this.len) {
                tree[i] += delta;
                i += lowbit(i);
            }
        }


        // 区间查询：查询小于等于 tree[index] 的元素个数
        // 查询的语义是「前缀和」
        public int query(int i) {
            // 从右到左查询
            int sum = 0;
            while (i > 0) {
                sum += tree[i];
                i -= lowbit(i);
            }
            return sum;
        }

        public int lowbit(int x) {
            return x & (-x);
        }
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python
from typing import List


class Solution:

    def reversePairs(self, nums: List[int]) -> int:

        class FenwickTree:
            def __init__(self, n):
                self.size = n
                self.tree = [0 for _ in range(n + 1)]

            def __lowbit(self, index):
                return index & (-index)

            # 单点更新：从下到上，最多到 len，可以取等
            def update(self, index, delta):
                while index <= self.size:
                    self.tree[index] += delta
                    index += self.__lowbit(index)

            # 区间查询：从上到下，最少到 1，可以取等
            def query(self, index):
                res = 0
                while index > 0:
                    res += self.tree[index]
                    index -= self.__lowbit(index)
                return res

        # 特判
        size = len(nums)
        if size < 2:
            return 0

        # 原始数组去除重复以后从小到大排序，这一步叫做离散化
        s = list(set(nums))

        # 构建最小堆，因为从小到大一个一个拿出来，用堆比较合适
        import heapq
        heapq.heapify(s)

        # 由数字查排名
        rank_map = dict()
        rank = 1
        # 不重复数字的个数
        rank_map_size = len(s)
        for _ in range(rank_map_size):
            num = heapq.heappop(s)
            rank_map[num] = rank
            rank += 1

        res = 0
        # 树状数组只要不重复数字个数这么多空间就够了
        ft = FenwickTree(rank_map_size)

        # 从后向前看，拿出一个数字来，就更新一下，然后向前查询比它小的个数
        for i in range(size - 1, -1, -1):
            rank = rank_map[nums[i]]
            ft.update(rank, 1)
            res += ft.query(rank - 1)
        return res
```

</CodeGroupItem>
</CodeGroup>



**复杂度分析**：

+ 时间复杂度：$O(N \log N)$，这里 $N$ 是数组的长度，树的高度近似计算为 $O(\log N)$；
+ 空间复杂度：$O(N)$。