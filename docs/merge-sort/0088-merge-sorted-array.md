---
title: 「力扣」第 88 题：合并两个有序数组（简单）
icon: yongyan
category: 归并排序
tags:
  - 数组
---

- 题目链接：[88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)；
- 题解链接：[归并排序子步骤（Java）](https://leetcode-cn.com/problems/merge-sorted-array/solution/si-xiang-mei-you-chuang-xin-de-di-fang-zhu-yao-ti-/)。

## 题目描述

给你两个按 **非递减顺序** 排列的整数数组 `nums1` 和 `nums2`，另有两个整数 `m` 和 `n` ，分别表示 `nums1` 和 `nums2` 中的元素数目。

请你 **合并** `nums2` 到 `nums1` 中，使合并后的数组同样按 **非递减顺序** 排列。

**注意：**最终，合并后数组不应由函数返回，而是存储在数组 `nums1` 中。为了应对这种情况，`nums1` 的初始长度为 `m + n`，其中前 `m` 个元素表示应合并的元素，后 `n` 个元素为 `0` ，应忽略。`nums2` 的长度为 `n` 。

**示例 1：**

```
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
```

**示例 2：**

```
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。
```

**示例 3：**

```
输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
```

**提示：**

- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
- `-10^9 <= nums1[i], nums2[j] <= 10^9`

**进阶：**你可以设计实现一个时间复杂度为 `O(m + n)` 的算法解决此问题吗？

## 归并排序子步骤（Java）

**思路分析**：

合并两个有序数组是归并排序的子过程。学习过归并排序的朋友们，解决这个问题一定不在话下。

![0088-from-left-to-right.gif](https://pic.leetcode-cn.com/a5e5b52070e7fb4aaef2a7f4eff293590fca47a5728dff3ffa0fcaa9803cca0b-0088-from-left-to-right.gif)

这道题的说明：

> 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

就暗示我们其实可以从后向前归并。

![0088-from-right-to-left.gif](https://pic.leetcode-cn.com/a31928e6a54cb8593e5a652a5abd96ca1f3f2d89358eaa146c4eb7a3aee4ef4e-0088-from-right-to-left.gif)

思想并不难，主要在编码上要注意一些细节。

**编码细节**：

- 下面的代码使用 `for` 循环表示我们一个一个确定归并以后的数；
- 在 `for` 循环内用 `if elseif else` 结构，保证一次只会执行一个分支；
- 为保证逻辑清晰，个人不建议写 `nums[i++]` 这样的代码，一行代码只执行一个逻辑，另外我看到 `i++` 或者 `++i` 脑子里还要先想一想，位于数组索引位置的时候到底是先加还是后加，我们不应该且没有必要给别人阅读代码造成理解上的一点点小麻烦，不过本人尊重任何个人的编码风格和习惯；
- 分支里面先写其中一个指针遍历完成的逻辑，否则会发生数组下标越界：**把 `i` 先用完，`j` 先用完的逻辑写在开头是为了防止数组下标越界，这一点不论是从前向后归并还是从后向前归并来说都是一致的**；
- **从后向前归并的时候，如果 nums2 数组用完了，可以直接结束算法，因为算法如果执行下去，也是数组 nums1 自己给自己赋值，还要执行相应的判断**，**没有必要**。

### 方法一：从头到尾归并

**参考代码 1**：

Python 代码：

```Python []
from typing import List


class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        # 只需要把 nums1 的有效个元素复制到 nums3 就可以了
        nums3 = nums1[:m]

        i = 0
        j = 0
        # 从前向后归并，比较 nums3 和 nums2 前端的元素哪个小，谁小谁出列，覆盖 nums1
        for k in range(m + n):
            # 注意：要把 nums3 和 nums2 归并完成的逻辑写在前面，否则会出现数组下标越界异常
            if i == m:
                nums1[k] = nums2[j]
                j += 1
            elif j == n:
                nums1[k] = nums3[i]
                i += 1
            elif nums3[i] < nums2[j]:
                nums1[k] = nums3[i]
                i += 1
            else:
                nums1[k] = nums2[j]
                j += 1
```

Java 代码：

```Java []
public class Solution {

    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int[] nums3 = new int[m];
        // 只需要把 nums1 的有效个元素复制到 nums3 就可以了
        System.arraycopy(nums1, 0, nums3, 0, m);
        // 数组3
        int i = 0;
        // 数组2
        int j = 0;
        int length = m + n;
        // 从前向后归并，比较 nums3 和 nums2 前端的元素哪个小，谁小谁出列，覆盖 nums1
        for (int k = 0; k < length; k++) {
            // 注意：要把 nums3 和 nums2 归并完成的逻辑写在前面，否则会出现数组下标越界异常
            if (i == m) {
                nums1[k] = nums2[j];
                j++;
            } else if (j == n) {
                nums1[k] = nums3[i];
                i++;
            } else if (nums3[i] < nums2[j]) {
                nums1[k] = nums3[i];
                i++;
            } else {
                nums1[k] = nums2[j];
                j++;
            }
        }
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(M + N)$，这里 $M$ 是数组 nums1 的长度，$N$ 是数组 nums2 的长度。
- 空间复杂度：$O(M)$，这里 $M$ 是 nums1 的长度。

### 方法二：从尾到头归并（更省空间，并且可以提前终止归并）

注意 1：从后向前归并，先写数组下标用完的逻辑，否则会出现数组下标异常；

注意 2：当 nums2 数组所有的数都看完的时候，算法终止。

**参考代码 2**：

Python 代码：

```Python []
from typing import List


class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        i = m - 1
        j = n - 1
        # 从后向前归并，比较 nums1 和 nums2 末尾的元素哪个大，谁大谁出列，覆盖 nums1
        for k in range(m + n - 1, -1, -1):
            # 注意：同样要把 nums1 和 nums2 归并完成的逻辑写在前面，否则会出现数组下标越界异常
            if i == -1:
                # 这里直接把 nuns2 还没看的元素复制到 nums1 即可
                # 我们可以在循环中完成，在 Java 中有更好的方法
                nums1[k] = nums2[j]
                j -= 1
            elif j == -1:
                # 注意：这里直接 break 掉就可以了
                # 因为 nums2 遍历完成以后，nums1 剩下的元素虽然还没有看，但一定是排定以后的那个样子
                break
            elif nums1[i] > nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
```

Java 代码：

```Java []
import java.util.Arrays;

/**
 * 题目中说了，nums1 够用，我可以从后向前归并
 * 这道题真正想考查的应该是这种实现方式，我们不能太死板，按照教科书的方式从头归并
 * https://leetcode-cn.com/problems/merge-sorted-array/description/
 *
 * @author liwei
 */
public class Solution {

    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int len = m + n;
        int i = m - 1;
        int j = n - 1;
        // 从后向前归并，比较 nums1 和 nums2 末尾的元素哪个大，谁大谁出列，覆盖 nums1
        for (int k = len - 1; k >= 0; k--) {
            if (i == -1) {
                // 注意：同样要把 nums1 和 nums2 归并完成的逻辑写在前面，否则会出现数组下标越界异常
                // 此时 j 位于数组 nums2 的末尾索引位置，还未看的数组 nums2 的长度为 j + 1
                // 复制完 break 掉即可
                System.arraycopy(nums2, 0, nums1, 0, j + 1);
                break;
            } else if (j == -1) {
                // 注意：这里直接 break 掉就可以了
                // 因为 nums2 遍历完成以后，nums1 剩下的元素虽然还没有看，但一定是排定以后的那个样子
                break;
            } else if (nums1[i] >= nums2[j]) {
                // 谁大谁出列
                nums1[k] = nums1[i];
                i--;
            } else {
                assert nums1[i] < nums2[j];
                nums1[k] = nums2[j];
                j--;
            }
        }
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 2, 3, 0, 0, 0};
        int m = 3;
        int[] nums2 = {2, 5, 6};
        int n = 3;
        Solution solution = new Solution();
        solution.merge(nums1, m, nums2, n);
        System.out.println(Arrays.toString(nums1));
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(M + N)$，这里 $M$ 是数组 nums1 的长度，$N$ 是数组 nums2 的长度。
- 空间复杂度：$O(1)$，该算法没有使用额外的存储空间，仅使用了常数个临时变量用于比较。

---

### 参考资料

- [从后向前归并（Java、Python）](https://leetcode-cn.com/problems/merge-sorted-array/solution/si-xiang-mei-you-chuang-xin-de-di-fang-zhu-yao-ti-/)

### 「力扣」第 88 题：合并两个有序数组

传送门：英文网址：[88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/description/) ，中文网址：[88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/description/) 。

> 给定两个有序整数数组 _nums1_ 和 _nums2_，将 _nums2_ 合并到 _nums1_ 中*，*使得 _num1_ 成为一个有序数组。
>
> **说明:**
>
> - 初始化 _nums1_ 和 _nums2_ 的元素数量分别为 _m_ 和 _n_。
> - 你可以假设 _nums1_ 有足够的空间（空间大小大于或等于 _m + n_）来保存 _nums2_ 中的元素。
>
> **示例:**
>
> ```
> 输入:
> nums1 = [1,2,3,0,0,0], m = 3
> nums2 = [2,5,6],       n = 3
>
> 输出: [1,2,2,3,5,6]
> ```

分析：其实就是归并排序，不过从后向前归并是这道题的考点。注意分 4 种情况，代码的写法其实是相对固定的。

### 方法一：可以使用标准的归并排序来做

Python 代码：从前向后写

```python
class Solution:
    def merge(self, nums1, m, nums2, n):
        """
        :type nums1: List[int]
        :type m: int
        :type nums2: List[int]
        :type n: int
        :rtype: void Do not return anything, modify nums1 in-place instead.
        """
        nums3 = nums1.copy()

        i = 0
        j = 0

        for k in range(m + n):
            if i == m:  # i 用完了
                nums1[k] = nums2[j]
                j += 1
            elif j == n:
                nums1[k] = nums3[i]
                i += 1
            elif nums3[i] < nums2[j]:
                nums1[k] = nums3[i]
                i += 1
            else:
                nums1[k] = nums2[j]
                j += 1
```

### 方法二：从后向前归并两个有序数组

考虑到这道题的特殊性，即 `nums1` 有足够的空间，因此，我们可以从后向前归并，每次从两个数组的末尾选出最大的元素放在 nums1 的末尾，而不使用额外的数组空间。

你可能会担心，nums1 之前有效的元素会不会被覆盖掉，但在这题中，这种情况是不可能出现的。在实现的时候，还是要特别注意一些边界条件。

Python 代码：从后向前写

```python
class Solution:
    def merge(self, nums1, m, nums2, n):
        """
        :type nums1: List[int]
        :type m: int
        :type nums2: List[int]
        :type n: int
        :rtype: void Do not return anything, modify nums1 in-place instead.
        """

        i = m - 1
        j = n - 1

        for k in range(m + n - 1, -1, -1):
            if i == -1:
                nums1[k] = nums2[j]
                j -= 1
            elif j == -1:
                nums1[k] = nums1[i]
                i -= 1
            elif nums1[i] > nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
```

说明：`range(m + n - 1, -1, -1)` 表示索引的最大值是 `m + n - 1` ，最小值是 `0`。

## 「力扣」第 88 题：从后向前归并两个有序数组

传送门：英文网址：[88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/description/) ，中文网址：[88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/description/) 。

> 给定两个有序整数数组 _nums1_ 和 _nums2_，将 _nums2_ 合并到 _nums1_ 中*，*使得 _num1_ 成为一个有序数组。
>
> **说明:**
>
> - 初始化 _nums1_ 和 _nums2_ 的元素数量分别为 _m_ 和 _n_。
> - 你可以假设 _nums1_ 有足够的空间（空间大小大于或等于 _m + n_）来保存 _nums2_ 中的元素。
>
> **示例:**
>
> ```
> 输入:
> nums1 = [1,2,3,0,0,0], m = 3
> nums2 = [2,5,6],       n = 3
>
> 输出: [1,2,2,3,5,6]
> ```

分析：其实就是归并排序，不过从后向前归并是这道题的考点。注意分 4 种情况，代码的写法其实是相对固定的。

思路 1：可以使用标准的归并排序来做。

Python 代码：从前向后写

```python
class Solution:
    def merge(self, nums1, m, nums2, n):
        """
        :type nums1: List[int]
        :type m: int
        :type nums2: List[int]
        :type n: int
        :rtype: void Do not return anything, modify nums1 in-place instead.
        """
        nums3 = nums1.copy()

        i = 0
        j = 0

        for k in range(m + n):
            if i == m:  # i 用完了
                nums1[k] = nums2[j]
                j += 1
            elif j == n:
                nums1[k] = nums3[i]
                i += 1
            elif nums3[i] < nums2[j]:
                nums1[k] = nums3[i]
                i += 1
            else:
                nums1[k] = nums2[j]
                j += 1
```

思路 2：考虑到这道题的特殊性，即 `nums1` 有足够的空间，因此，我们可以从后向前归并，每次从两个数组的末尾选出最大的元素放在 nums1 的末尾，而不使用额外的数组空间。

你可能会担心，nums1 之前有效的元素会不会被覆盖掉，但在这题中，这种情况是不可能出现的。在实现的时候，还是要特别注意一些边界条件。

Python 代码：从后向前写

```python
class Solution:
    def merge(self, nums1, m, nums2, n):
        """
        :type nums1: List[int]
        :type m: int
        :type nums2: List[int]
        :type n: int
        :rtype: void Do not return anything, modify nums1 in-place instead.
        """

        i = m - 1
        j = n - 1

        for k in range(m + n - 1, -1, -1):
            if i == -1:
                nums1[k] = nums2[j]
                j -= 1
            elif j == -1:
                nums1[k] = nums1[i]
                i -= 1
            elif nums1[i] > nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
```

说明：`range(m + n - 1, -1, -1)` 表示索引的最大值是 `m + n - 1` ，最小值是 `0`。

---

- [题目链接](https://leetcode-cn.com/problems/merge-sorted-array)

**关键**：从后向前归并排序。

其实就是归并排序，从后面向前面归并排序，扩展：字符串替换空格。

**参考代码**：

```java
public class Solution {

    /**
     * @param nums1 一个排好序的数组1
     * @param m
     * @param nums2 一个排好序的数组2
     * @param n     结果放在 nums1 中
     */
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int[] temp = new int[m + n];
        for (int i = 0; i < m; i++) {
            temp[i] = nums1[i];
        }
        for (int i = 0; i < n; i++) {
            temp[m + i] = nums2[i];
        }


        int left = 0; // 数组1的第1个元素
        int right = m; // 数组2的第1个元素

        // 这种特殊情况要考虑进去
        if (m > 0 && n > 0 && temp[m - 1] <= temp[m]) {
            for (int i = 0; i < m + n; i++) {
                nums1[i] = temp[i];
            }
            return;
        }

        // 要赋值完 m+n 个元素，就要遍历 m+n 个元素
        for (int i = 0; i < m + n; i++) {
            if (left >= m) { // 如果左边用完了，就一直拿右边的元素
                nums1[i] = temp[right];
                right++;
            } else if (right >= m + n) {
                nums1[i] = temp[left];
                left++;
            } else if (temp[left] < temp[right]) {
                nums1[i] = temp[left];
                left++;
            } else { // temp[left] >= temp[right]
                nums1[i] = temp[right];
                right++;
            }
        }
    }
}
```
