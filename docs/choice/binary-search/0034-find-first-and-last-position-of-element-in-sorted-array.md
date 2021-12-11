---
title: 例 3：在有序数组中查找元素的第一个和最后一个位置
---

# 「力扣」第 34 题：在排序数组中查找元素的第一个和最后一个位置

![0034](https://tva1.sinaimg.cn/large/008i3skNgy1gx928a7ukhj30p00anq3g.jpg)

题目链接：[34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

## :tv: **力扣」第 34 题视频题解**

建议使用 1.5 倍速观看。

+ [B 站](https://www.bilibili.com/video/BV147411i7zu?p=3)


## :notebook_with_decorative_cover: 力扣」第 34 题文字题解

+ [题解链接（含视频题解）](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/si-lu-hen-jian-dan-xi-jie-fei-mo-gui-de-er-fen-cha/)

给定一个按照升序排列的整数数组 `nums`，和一个目标值 `target`。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 $O(\log n)$ 级别。

如果数组中不存在目标值，返回 `[-1, -1]`。

示例 1：

```
输入: nums = [5, 7, 7, 8, 8, 10], target = 8
输出: [3, 4]
```

示例 2：

```
输入: nums = [5, 7, 7, 8, 8, 10], target = 6
输出: [-1, -1]
```

**提示：**

- `0 <= nums.length <= 105`
- `-109 <= nums[i] <= 109`
- `nums` 是一个非递减数组
- `-109 <= target <= 109`

## 解题思路

如果当前看到的中间元素的数值恰好等于目标元素，应该 **继续使用二分查找**，查找它第一次出现和最后一次出现的位置，不可以线性地去扫描。


### 方法一：暴力求解（Brute Force）

> 该方法大家都会，可以跳过。

很容易想到的一个方法是暴力解法，我们只需要从头到尾遍历一次数组，就能够找到目标元素出现的第一个位置和最后一个位置。根据题意，我们想象最一般的那种情况，先遇到的数都是严格小于 `target`，然后遇到的数都等于 `target`，最后遇到的数都严格大于  `target`。

+ 因此，我们可以在遍历的开始，检查遍历到的元素是否等于  `target` ，遇到刚好等于 `target` 的时候，记录当前的位置；
+ 然后接着遍历，检查遍历到的元素是否不等于  `target` ，遇到刚好不等于 `target` 的时候，记录当前位置的前一个位置即可。

这个算法的时间复杂度是 $O(N)$，不符合题目的要求。

Java 代码：

```java
public class Solution {

    public int[] searchRange(int[] nums, int target) {
        int[] targetRange = new int[]{-1, -1};

        int len = nums.length;
        if (len == 0) {
            return targetRange;
        }

        for (int i = 0; i < len; i++) {
            if (nums[i] == target) {
                targetRange[0] = i;
                break;
            }
        }

        // 连第 1 个位置都没有找到，说明已经遍历完整个数组了
        if (targetRange[0] == -1) {
            return targetRange;
        }

        for (int i = targetRange[0] + 1; i < len; i++) {
            if (nums[i] != target) {
                targetRange[1] = i - 1;
                break;
            }
        }

        if (targetRange[1] == -1) {
            targetRange[1] = len - 1;
        }
        return targetRange;
    }
}
```

**代码讲解**：

+ 首先新建一个有两个元素的整型数组 `targetRange`，初始化的值为 `[-1, -1]`，然后把数组的长度赋值成一个变量 `len`，当数组的长度等于 `0` 的时候，直接返回 `targetRange`；
+ 然后从下标为 `0` 的地方开始遍历，只要找到了等于 `target` 的元素，就将 `targetRange` 下标为 `0` 的那个元素赋值为 `i` ，然后退出循环；
+ 这里要注意的一点是：如果在整个遍历的过程中， `targetRange[0]` 都没有被重新赋值，那就说明目标元素 `target` 在有序数组 `nums` 中并不存在，依然将   `targetRange` 返回即可；
+ 接着我们从目标元素第一次出现的位置  `targetRange[0]`  的下一个位置开始遍历，只要检测到元素不等于  `target` ，记录它的前一个位置，即将  `targetRange[1] ` 赋值为 `i - 1` ，然后就可以退出循环；
+ 还要注意的一个细节是，如果目标元素刚好在有序数组的最后一个位置，其实这个循环体是根本没有办法执行的，因此，可以在最后做一个判断，如果  `targetRange[1] `  还没有被赋值，就把它赋值为数组中最后一个位置。

### 方法二：二分查找

下面我们看一下如何使用二分查找，找到目标元素在有序数组中的开始位置和结束位置。

+ 二分查找法的基本思想是：在一个区间范围里看处在中间位置的元素的值 `nums[mid]` 与目标元素 `target` 的大小关系，进而决定目标值落在哪一个部分里；

+ 对于这道题，与常见的二分查找问题最大的不同就在于，目标元素  `target` 在有序数组中很可能存在多个；
+ 而当我们使用二分查找方法看到的处在中间位置的元素的值 `nums[mid]` 恰好等于目标元素  `target` 的时候，还需要继续查找下去，而此时比较容易陷入的误区是线性查找，正确的做法是继续二分查找；
+ 很显然，目标元素第 1 次出现的位置一定不可能是严格小于 `target` 的元素的位置，根据之前暴力解法的分析，目标元素第 1 次出现的位置是严格小于 `target` 的元素的位置的边界，因此，我们可以通过这个思路使用二分法找到这个边界；
+ 对称地，目标元素最后 1 次出现的位置一定不可能是严格大于 `target` 的元素的位置，目标元素最后 1 次出现的位置是严格大于 `target` 的元素的位置的边界，因此，我们可以通过这个思路使用二分法找到这个边界。

Java 代码：

```java
public class Solution {

    public int[] searchRange(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return new int[]{-1, -1};
        }

        int firstPosition = findFirstPosition(nums, target);
        if (firstPosition == -1) {
            return new int[]{-1, -1};
        }

        int lastPosition = findLastPosition(nums, target);
        return new int[]{firstPosition, lastPosition};
    }

    private int findFirstPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = (left + right) >>> 1;
            // 小于一定不是解
            if (nums[mid] < target) {
                // 下一轮搜索区间是 [mid + 1, right]
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        if (nums[left] == target) {
            return left;
        }
        return -1;
    }

    private int findLastPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = (left + right + 1) >>> 1;
            // 大于一定不是解
            if (nums[mid] > target) {
                // 下一轮搜索区间是 [left, mid - 1]
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        return left;
    }
}
```

**代码讲解**：

+ 首先依然是将数组的长度赋值给一个变量 `len`；

+ 然后做一个特判：当数组的长度为 `0` 的时候，直接返回 `[-1 , -1]`；

+ 接下来我们先二分查找 `target` 第 1 次出现的位置，我们把它封装成一个私有方法 `findFirstPosition`：

  + 分别初始化左边界 `left = 0`  和右边界 `right = len - 1` ，表示待搜索区间的左右边界；
  + 接下来不断地二分查找目标元素，我们把循环可以继续的条件写成 `while (left < right)` ，注意这里写成严格小于，这是一种比较常见的写法，它的思路是把符合条件的元素放在最后做判断，好处是在退出循环的时候一定有 `left == right` 成立，我们就不用考虑到底应该返回 `left` 还是返回 `right` 了。但是这种写法有几个要注意的地方，我们马上会提到。
  + 然后是计算中间位置下标的代码 `int mid = left + (right - left) / 2;`
  + 根据刚才的分析，当 `nums[mid] < target` 的时候，`mid` 以及 `mid` 左边的所有元素一定不是 `target` 出现的第 1 个位置，因此下一轮搜索的元素就一定在 `[mid + 1, right]` 中，因此，将左边界设置为 `mid + 1`；
  + 接下来是 `nums[mid] < target` 的反面， `nums[mid] >= target` ，此时搜索的区间是 `if` 这个分支搜索区间的反面，即 `[left, mid]` ，我们来验证一下：如果我们看到一个数严格大于 `target` ， `target` 出现的第 1 个位置一定出现在这个数的左边；如果我们看到一个数恰好等于 `target` ，它有可能就是出现的第 1 个位置，也有可能 `target` 出现的第 1 个位置在它左边，但是一定不会在这个位置右边，因此，下一轮搜索的区间是  `[left, mid]` 是没有问题的，此时需要设置右边界 `right = mid`；
  + 在退出循环的时候，还有一个下标的元素 `left`（或者说是 `right` 此时它们的值相等）没有看到，因为题目中说，目标元素有可能在数组中并不存在，因此，需要单独再做一次判断，这一步叫做后处理。
  + 如果 `nums[left] == target` ，下标位置 `left` 就是 `target` 第 1 次出现的位置，否则返回 `-1`。

+ 对称地，我们来写查找 `target` 最后 1 次出现的位置的代码。

  + 首先可以确定的是，如果在查找 `target` 第 1 次出现的位置的时候，我们都没有找到  `target` ，在查找 `target`  最后一次出现的位置的时候，我们肯定也不会找到这个数，因此可以先做一个特殊的判断；
  + `findLastPosition` 的结构和 `findFirstPosition` 很像，我们直接复制下来，需要更改的是 `if` 和 `else` 的逻辑，根据刚才的分析，当 `nums[mid] > target` 的时候，`mid` 以及 `mid` 右边的所有元素一定不是 `target` 出现的最后 1 个位置，因此下一轮搜索的元素就一定在 `[left, mid - 1]` 中，因此，将右边界设置为 `mid - 1`；
  + 接下来是 `nums[mid] > target` 的反面， `nums[mid] <= target` ，此时搜索的区间是 `if` 这个分支搜索区间的反面，即 `[mid, right]` ，我们来验证一下：如果我们看到一个数严格小于 `target` ， `target` 出现的最后 1 个位置一定出现在这个数的右边；如果我们看到一个数恰好等于 `target` ，它有可能就是出现的最后 1 个位置，也有可能 `target` 出现的最后 1 个位置在它右边，但是一定不会在这个位置左边，因此，下一轮搜索的区间是 `[mid, right]`  是没有问题的，此时需要设置左边界 `left = mid`；

  + 此时要特别注意的一点是：一旦看到  `left = mid` 与 `right = mid - 1` 这种在二分搜索中边界收缩的行为，我们需要在取中间数的时候，做一些小的调整，那就是在这个括号里加 1：`int mid = left + (right - left + 1) / 2;`
  + 原因是这样的：`/` 是整数除法，它默认的取整行为是向下取整，即 `(3 + 4) / 2 = 3`。当我们使用原来写法的时候，`mid` 永远取不到 `right`，而边界收缩是  `left = mid` 与 `right = mid - 1` 的时候，我们画一个示意图，它是这样的，当待搜索区间只有 2 个元素的时候，由于中间数永远取不到右边，我们发现区间分不开，此时，一旦代码执行到这一个分支，无论是左边界还是右边界都不会向中间考虑，此时代码进入死循环；
  + 要想解决这个问题，其实刚刚我已经说了，需要把取中间数时候整数除法的下取整行为改成上取整，即在括号里加 `1`，虽然这种取整行为的改变只需要在最后只剩 2 个元素的时候做出，但是我们全程就让它上取整也是没有问题的；
  + 这一条是一个经验总结，也是人们在使用的过程中逐渐总结出来的，其实这个处理也不难发现，我们只需要在出现死循环的时候，在程序中打印出 `left` 、`right` 和 `mid` 的取值，就很容易发现问题并想到解决的办法；
  + 在退出循环的时候，这里依然是还有一个下标的元素 `left`（或者说是 `right` 此时它们的值相等）没有看到。但是我们注意到，其实代码能够执行到这里，是不是说明，`target` 在 `nums` 中一定存在，看一看我们之前的判断。因此，我们就没有必要在判断  `nums[left]` 是否等于 `target`，此时 `left`的值就一定是 `target` 在有序数组 `nums` 中最后 1 次出现的下标 。


调试代码：

Java 代码：

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return new int[]{-1, -1};
        }

        int firstPosition = findFirstPosition(nums, target, len);
        if (firstPosition == -1) {
            return new int[]{-1, -1};
        }

        int lastPosition = findLastPosition(nums, target, len);
        return new int[]{firstPosition, lastPosition};
    }

    private int findLastPosition(int[] nums, int target, int len) {
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            System.out.println("left = " + left + ", mid = " + mid + ", right = " + right);
            
            // 严格大于 target 的时候不是解
            if (nums[mid] > target) {
                // 下一轮搜索的区间是 [left, mid - 1]
                System.out.println("下一轮搜索的区间是 [left, mid - 1]");
                right = mid - 1;
            } else {
                System.out.println("下一轮搜索的区间是 [mid, right]");
                // [mid, right]
                left = mid;
            }
        }
        return left;
    }

    private int findFirstPosition(int[] nums, int target, int len) {
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            // 严格小于 target 的时候不是解
            if (nums[mid] < target) {
                // 下一轮搜索的区间是 [mid + 1, right]
                left = mid + 1;
            } else {
                right = mid;
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

+ 时间复杂度：$O(\log N)$，这里 $N$ 是数组的长度，两个子问题都是二分查找，因此时间复杂度为对数级别。
+ 空间复杂度：$O(1)$，只使用了常数个数的辅助变量、指针。


<Utterances />
