---
title: 「力扣」第 658 题：找到 K 个最接近的元素（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---


+ 题目链接：[658. 找到 K 个最接近的元素](https://leetcode-cn.com/problems/find-k-closest-elements/)；
+ 题解链接：[排除法（双指针） + 二分法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/find-k-closest-elements/solution/pai-chu-fa-shuang-zhi-zhen-er-fen-fa-python-dai-ma/)。

## 题目描述

给定一个排序好的数组 `arr` ，两个整数 `k` 和 `x` ，从数组中找到最靠近 `x`（两数之差最小）的 `k` 个数。返回的结果必须要是按升序排好的。

整数 `a` 比整数 `b` 更接近 `x` 需要满足：

- `|a - x| < |b - x|` 或者
- `|a - x| == |b - x|` 且 `a < b`

**示例 1：**

```
输入：arr = [1,2,3,4,5], k = 4, x = 3
输出：[1,2,3,4]
```

**示例 2：**

```
输入：arr = [1,2,3,4,5], k = 4, x = -1
输出：[1,2,3,4]
```



**提示：**

- `1 <= k <= arr.length`
- `1 <= arr.length <= 10^4`
- 数组里的每个元素与 `x` 的绝对值不超过 `10^4`

## 排除法（双指针） + 二分法（Python 代码、Java 代码）

做这一类题目的思路往往来自于对具体例子的研究，多举几个例子，在草稿纸上写写画画，也有助于我们对边界问题的讨论。

以下介绍的两种方法，排除法比较容易想到，而**二分法基于排除法的思想**，希望读者能够认真体会，代码虽然简单，但是要做一些分类讨论才能解释得清楚。

### 方法一：排除法（双指针）


以 `arr = [1, 2, 3, 4, 5, 6, 7]` , `x = 5`, `k = 3` 为例。 

**思路分析**：

1、一个一个删，因为是有序数组，且返回的是连续升序子数组，**所以每一次删除的元素一定是位于边界**；

2、一共 $7$ 个元素，要保留 $3$ 个元素，因此要删除 $4$ 个元素；

3、因为要删除的元素都位于边界，于是可以使用**双指针**对撞的方式确定保留区间，即“最优区间”。

（温馨提示：下面的幻灯片中，有几页上有较多的文字，可能需要您停留一下，可以点击右下角的后退 “|◀” 或者前进 “▶|” 按钮控制幻灯片的播放。）

![658-1.png](https://pic.leetcode-cn.com/7cac52f799ba654e9483f47cd17533706a380dbc15fbb6dbc93a83bce11c45db-658-1.png),![658-2.png](https://pic.leetcode-cn.com/ab9c789d3c7fc18cdb1dd7d383c3fa984033f4420412ffe91d747cdfe3623994-658-2.png),![658-3.png](https://pic.leetcode-cn.com/0ae58bb7d22e120a900c8eb7a5735ef5e777373885d17f8f90fe0a172579716a-658-3.png),![658-4.png](https://pic.leetcode-cn.com/3b003257d123fe2e944f0f06f94d88d1b35cc0f071748dc5ca2f77362c69621e-658-4.png),![658-5.png](https://pic.leetcode-cn.com/9b971313fa81e97893a9321769478375dac74fa92d8cdc75563386949f18731d-658-5.png)

**参考代码**：

Java 代码：

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int size = arr.length;

        int left = 0;
        int right = size - 1;

        int removeNums = size - k;
        while (removeNums > 0) {
            if (x - arr[left] <= arr[right] - x) {
                right--;
            } else {
                left++;
            }
            removeNums--;
        }

        List<Integer> res = new ArrayList<>();
        for (int i = left; i < left + k; i++) {
            res.add(arr[i]);
        }
        return res;
    }

    public static void main(String[] args) {
        int[] arr = {0, 0, 1, 2, 3, 3, 4, 7, 7, 8};
        int k = 3;
        int x = 5;
        Solution solution = new Solution();
        List<Integer> res = solution.findClosestElements(arr, k, x);
        System.out.println(res);
    }
}
```

Python 代码：

```python
from typing import List


class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        # 排除法（双指针）
        size = len(arr)
        left = 0
        right = size - 1

        # 我们要排除掉 size - k 这么多元素
        remove_nums = size - k
        while remove_nums:
            # 调试语句
            # print(left, right, k)
            # 注意：这里等于号的含义，题目中说，距离相等的时候取小的
            # 所以，相等的时候，尽量缩小右边界
            if x - arr[left] <= arr[right] - x:
                right -= 1
            else:
                left += 1
            remove_nums -= 1
        return arr[left:left + k]
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是数组的长度。
+ 空间复杂度：$O(1)$，只使用了常数个额外的辅助空间。

---

题目中说有序数组，又易知：  

1、题目要求返回的是区间，并且是连续区间；  

2、区间长度是固定的，并且 `k` 的值为正数，且总是小于给定排序数组的长度，即 `k` 的值“不违规”；  

因此，只要我们找到了左边界的索引，从左边界开始数 `k` 个数，返回就好了。我们把这件事情定义为“寻找最优区间”，“寻找最优区间”等价于“寻找最优区间的左边界”。因此本题使用二分查找法在有序数组中**定位含有 `k` 个元素的连续子区间的左边界**，即使用二分法找“最优区间的左边界”。

### 方法二：二分查找最优区间的左边界

由排除法，我们知道：

**“排除法”的结论**：（这个结论对于这道问题来说非常重要，可以说是解题的关键）

> 如果 `x` 的值就在长度为 size 区间内（不一定相等），要得到 size - 1 个符合题意的最接近的元素，此时看左右边界：
> 
> 1、如果左边界距离 `x` 较近，删除右边界；  
> 2、如果右边界距离 `x` 较近，删除左边界；  
> 3、如果左、右边界距离 `x` 的长度相等，删除右边界。

**讨论“最优区间的左边界”的取值范围**：

首先我们讨论左区间的取值范围，使用具体的例子，就很很清楚地找到规律：  

1、假设一共有 5 个数，`[0,1,2,3,4]`，找 3 个数，左边界最多到 2；  

2、假设一共有 8 个数，`[0,1,2,3,4,5,6,7]`，找 5 个数，左边界最多到 3。

因此，“最优区间的左边界”的索引的搜索区间为 `[0, size - k]`，注意，这个区间的左右都是闭区间，都能取到。

定位左区间的索引，有一点技巧性，但并不难理解。由排除法的结论，我们先从 `[0, size - k]` 这个区间的任意一个位置（用二分法就是当前候选区间的中位数）开始，**定位一个长度为 `(k + 1)` 的区间**，根据这个区间是否包含 `x` 开展讨论。

1、如果区间包含 `x`，我们尝试删除 1 个元素，好让区间发生移动，便于定位“最优区间的左边界”的索引；  
2、如果区间不包含 `x`，就更简单了，我们尝试把区间进行移动，以试图包含 `x`，但也有可能区间移动不了（极端情况下）。


以下的讨论，对于记号 `left`、`right` 和 `mid` 说明如下：

1、`left`、`right` 是候选区间的左右边界的索引，根据上面的分析，初始时，`left = 0`，`right = size - k`；  
2、而 `mid` 是候选区间的中位数的索引，它的取值可能是

```
mid = left + (right - left) // 2
```

也可能是

```
mid = left + (right - left + 1) // 2
```

之所以我们选择 `mid = left + (right - left) // 2` ，请参考我在「力扣」第 35 题：搜索插入位置的题解[《特别好用的二分查找法模板（Python 代码、Java 代码）》](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)中的叙述。

> 后面的文字可能会非常绕，在这里建议读者通读，前后来回看，不太清楚的地方先跳过，且不一定全看我的叙述，看明白一小段，在草稿纸上写写画画一点，卡壳了再看我的叙述，这样就不会太晕。


我们先从最简单的情况开始讨论：

1、如果区间不包含 `x`：

（1） 区间的右端点在 `x` 的左边，即 `x` 比 `arr` 中最大的元素还要大，**因为要去掉 1 个元素，显然去掉左端点**，因此“最优区间的左边界”的索引至少是 `mid + 1`，即 `left = mid + 1`，**因为区间不可能再往左边走了**，如图；

![image.png](https://pic.leetcode-cn.com/002e341fa376ece19580704839a5a8bad78b50c6c93a148a928b840ea8cd0272-image.png)

说明：极端情况是此时中位数位于索引 `size - k`，区间不能右移。


（2）区间的左端点在 `x` 的左边，即 `x` 比 `arr` 中最小的元素还要小，当前的区间左端点的索引至多是 `mid`，此时 `right = mid`，**因为区间不可能再往右偏了**，如图；

![image.png](https://pic.leetcode-cn.com/4fe43ad19083c07fb72771892f36cb1d5b0dba01533e522f075ef0a153a1267a-image.png)

说明：极端情况是此时 `mid` 位于索引 `0`，区间不能左移。

2、如果区间包含 `x`，我们尝试删掉一个元素，以便让区间发生移动，缩小搜索范围：

易知，我们要比较长度为 `k + 1` 的区间的左右端点的数值与 `x` 的距离。此时这个区间的左边界的索引是 `mid`，右边界的索引是 `mid + k`。根据“排除法”的结论，分类讨论如下：

（1）如果右边界距离 `x` 较近，左边界收缩，可以肯定的是“最优区间的左边界”的索引 `left` 至少是 `mid + 1`，即 `left = mid + 1`，如图；

![image.png](https://pic.leetcode-cn.com/0a8fe24c6abcad7ae2d774506b4b0abccd5eb95b953be9c367f49c633fed9343-image.png)

说明：“右边界距离 `x` 较近”同样适用于 1、（1）情况，因此它们二者可以合并；

（2）如果左边界距离 `x` 较近，右边界收缩，此时区间不移动，注意：此时有可能收缩以后的区间就是待求的区间，也有可能整个区间向左移动，这件事情叫做，`right = mid` 不能排除 `mid`，如图；

![image.png](https://pic.leetcode-cn.com/6dfea16f88fd03e10c95c2e2d216711ed1489a58a173ac4cd1d2e1a9de583de0-image.png)

说明1：这一点比较难想，但实际上也可以不想，根据 2、（1）的结论，左区间收缩的反面即是右区间不收缩，因此，这一分支的逻辑一定是 `right = mid`。

> “实际上也可以不想”的具体原因，同样参考我在「力扣」第 35 题：搜索插入位置的题解[《特别好用的二分查找法模板（Python 代码、Java 代码）》](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)中的叙述，我专门把如何写好二分法，使用二分法模板好用的地方、使用它的技巧和注意事项整理在这篇题解中，希望能对大家有所帮助。

说明2：“左边界距离 `x` 较近”同样适用于 1、（2）情况，因此它们二者可以合并。

（3）如果左、右边界距离 `x` 的长度相等，删除右边界，结论同 2、（2），也有 `right = mid`，可以合并到 2、（2）。

以上看晕的朋友们，建议你在草稿纸上写写画画，思路就非常清晰了，并且写出的代码也很简洁。这个代码也不是我原创的，在网上搜了一下，刚开始的时候，一直不能理解下面这段代码的意思。

```
if x - arr[mid] > arr[mid + k] - x:
    left = mid + 1
else:
    right = mid
```

写个草稿就清楚多了，原来是并不困难，只是稍显复杂。


![image.png](https://pic.leetcode-cn.com/1505e8c19730133b6bc9c2b6088fd9f0ff376f9539dcf0932214b77415e542b6-image.png)

![image.png](https://pic.leetcode-cn.com/1ff7a2c278f3624bae64e29bc4e3a7aeb2f1fb3835baaeb444f5d4c5df1e4c7d-image.png)

**参考代码**：

Python 代码：

```Python []
from typing import List


class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        size = len(arr)
        left = 0
        right = size - k

        while left < right:
            # mid = left + (right - left) // 2
            mid = (left + right) >> 1
            # 尝试从长度为 k + 1 的连续子区间删除一个元素
            # 从而定位左区间端点的边界值
            if x - arr[mid] > arr[mid + k] - x:
                left = mid + 1
            else:
                right = mid
        return arr[left:left + k]
```

Java 代码：

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int size = arr.length;

        int left = 0;
        int right = size - k;

        while (left < right) {
            // int mid = left + (right - left) / 2;
            int mid = (left + right) >>> 1;
            // 尝试从长度为 k + 1 的连续子区间删除一个元素
            // 从而定位左区间端点的边界值
            if (x - arr[mid] > arr[mid + k] - x) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        List<Integer> res = new ArrayList<>();
        for (int i = left; i < left + k; i++) {
            res.add(arr[i]);
        }
        return res;
    }

    public static void main(String[] args) {
        int[] arr = {0, 0, 1, 2, 3, 3, 4, 7, 7, 8};
        int k = 3;
        int x = 5;
        Solution2 solution = new Solution2();
        List<Integer> res = solution.findClosestElements(arr, k, x);
        System.out.println(res);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(\log N)$，这里 $N$ 是数组的长度，使用二分法的时间复杂度是对数级别的。
+ 空间复杂度：$O(1)$，只使用了常数个额外的辅助空间。

（本节完）



