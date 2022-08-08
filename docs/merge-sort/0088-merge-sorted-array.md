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

**注意：** 最终，合并后数组不应由函数返回，而是存储在数组 `nums1` 中。为了应对这种情况，`nums1` 的初始长度为 `m + n`，其中前 `m` 个元素表示应合并的元素，后 `n` 个元素为 `0` ，应忽略。`nums2` 的长度为 `n` 。

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

**进阶**：你可以设计实现一个时间复杂度为 $O(m + n)$ 的算法解决此问题吗？

## 归并排序子步骤（Java）

**思路分析**：

合并两个有序数组是归并排序的子过程。学习过归并排序的朋友们，解决这个问题一定不在话下。

@slidestart

![幻灯片1.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yavby2yj21hc0u0mzw.jpg)

---

![幻灯片2.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yax2ww9j21hc0u042p.jpg)

---

![幻灯片3.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yb2499zj21hc0u0tcl.jpg)

---

![幻灯片4.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yazfdtrj21hc0u0jvg.jpg)

---

![幻灯片5.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yb44ioej21hc0u00wr.jpg)

---

![幻灯片6.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yb5yaedj21hc0u0ae2.jpg)

---

![幻灯片7.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37ybvhcrij21hc0u042i.jpg)

---

![幻灯片8.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yba47npj21hc0u0djv.jpg)

---

![幻灯片9.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37ybea7v7j21hc0u0q72.jpg)

---

![幻灯片10.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37ygokybrj21hc0u042j.jpg)

---

![幻灯片11.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37ybky953j21hc0u0n0w.jpg)

@slideend

这道题的说明：

::: info 说明

你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

:::


就暗示我们其实可以从后向前归并。

@slidestart

![幻灯片1.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yi7tb1sj21hc0u0whd.jpg)

---

![幻灯片2.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yi9l8qfj21hc0u0gqq.jpg)

---

![幻灯片3.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yjvu7k5j21hc0u0aeb.jpg)

---

![幻灯片4.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yjyhtm1j21hc0u0n1h.jpg)

---

![幻灯片5.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yidqrtoj21hc0u0q79.jpg)

---

![幻灯片6.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yihkgbuj21hc0u0dk6.jpg)

---

![幻灯片7.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yilqnk5j21hc0u042w.jpg)

---

![幻灯片8.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h37yijcjrlj21hc0u0jy9.jpg)

@slideend



思想并不难，主要在编码上要注意一些细节。

**编码细节**：

- 下面的代码使用 `for` 循环表示我们一个一个确定归并以后的数；
- 在 `for` 循环内用 `if elseif else` 结构，保证一次只会执行一个分支；
- 为保证逻辑清晰，个人不建议写 `nums[i++]` 这样的代码，一行代码只执行一个逻辑，另外我看到 `i++` 或者 `++i` 脑子里还要先想一想，位于数组索引位置的时候到底是先加还是后加，我们不应该且没有必要给别人阅读代码造成理解上的一点点小麻烦，不过本人尊重任何个人的编码风格和习惯；
- 分支里面先写其中一个指针遍历完成的逻辑，否则会发生数组下标越界：**把 `i` 先用完，`j` 先用完的逻辑写在开头是为了防止数组下标越界，这一点不论是从前向后归并还是从后向前归并来说都是一致的**；
- **从后向前归并的时候，如果 nums2 数组用完了，可以直接结束算法，因为算法如果执行下去，也是数组 nums1 自己给自己赋值，还要执行相应的判断**，**没有必要**。

### 方法一：从头到尾归并（习惯上会先这样做）

**参考代码 1**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
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
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
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

</CodeGroupItem>
</CodeGroup>


**复杂度分析**：

- 时间复杂度：$O(M + N)$，这里 $M$ 是数组 nums1 的长度，$N$ 是数组 nums2 的长度。
- 空间复杂度：$O(M)$，这里 $M$ 是 nums1 的长度。

### 方法二：从尾到头归并（符合题目要求，并且可以提前终止归并）

+ 注意 1：从后向前归并，先写数组下标用完的逻辑，否则会出现数组下标异常；
+ 注意 2：当 nums2 数组所有的数都看完的时候，算法终止。

**参考代码 2**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.Arrays;

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
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
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
</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(M + N)$，这里 $M$ 是数组 nums1 的长度，$N$ 是数组 nums2 的长度。
- 空间复杂度：$O(1)$，该算法没有使用额外的存储空间，仅使用了常数个临时变量用于比较。



