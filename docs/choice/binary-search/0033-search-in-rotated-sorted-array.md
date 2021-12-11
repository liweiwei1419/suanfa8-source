# 「力扣」第 33 题：搜索旋转排序数组（中等）

+ [链接](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

+ [题解链接](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/er-fen-fa-python-dai-ma-java-dai-ma-by-liweiwei141/)

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 `[0, 1, 2, 4, 5, 6, 7]` 可能变为 `[4, 5, 6, 7, 0, 1, 2]` )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 $O(\log n)$ 级别。

示例 1：

```
输入: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
输出: 4
```

示例 2：

```
输入: nums = [4, 5, 6, 7, 0, 1, 2], target = 3
输出: -1
```

## 方法一：暴力法（Brute Force）

无视题目“你的算法时间复杂度必须是 $O(\log n)$ 级别”这项要求，采用线性扫描的方式搜索。

Java 代码：

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

## 方法二：二分查找（Binary Search）

题目中说：“你的算法时间复杂度必须是 $O(\log n)$ 级别”，暗示我们可以使用二分查找算法。题目中还说说：“**你可以假设数组中不存在重复的元素**”。

可以根据示例 `[4, 5, 6, 7, 0, 1, 2]` ，自己手写几个旋转数组。不难发现：将待搜索区间从中间一分为二，**`mid` 位置一定会落在其中一个有序区间里**。

![image-20191128101416746](https://tva1.sinaimg.cn/large/006y8mN6ly1g9dk987cj0j310b0u0div.jpg)

+ 由于题目不允许我们逐个扫描，因此待搜索区间的第 1 个下标、最后一个下标、中间下标就很重要；
+ 事实上，我们很容易能够根据中间下标的元素值和第 1 个下标（或者最后一个下标）的元素的值判断 `mid` 落在哪个有序的区间里。

还可以这样理解：

+ 中间元素把待搜索区间分成了两部分，两部分具有的性质是至少有一部分是有序的；

我们不妨讨论中间元素和右边界的关系（其它情况类似），因为不存在重复元素，所以它们的关系不是大于就是小于。

**情况 1**：`nums[mid] < nums[right]`，当中间元素的数值严格小于右边界的数值时候

1、此时区间  `[mid, right]` （表示左闭右闭，下同）一定是有序的；

2、因为 `target` 要么在有序区间   `[mid, right]` 里，要么在另一个区间   `[left, mid - 1]` 里。

（1）显然在有序区间   `[mid, right]` 里的条件好写，即：  `nums[mid] <= target <= nums[right]`。因为 `target` 落在其中，所以能且只能等于其中的一个元素，当然包括头尾，此时设置 `left = mid`；

（2）落在另一个区间 `[left, mid - 1]` 里的时候，就是上一个情况的反面，这种情况用 `else` 表示即可，此时设置 `right = mid - 1` 是显然的。

> **关键**：把比较好些的判断（`target` 落在有序的那部分）放在 `if` 的开头考虑，把剩下的情况放在 `else` 里面。

同理，讨论 `nums[mid] < nums[right]` 的反面（下面我的描述基本就是反过来讲的）。

**情况 2**：`nums[mid] > nums[right]`，当中间元素的数值严格小于右边界的数值时候，因为没有重复元素，所以是严格大于

1、此时区间  `[left, mid - 1]` 内的元素一定是有序的；

2、因为 `target` 要么在有序区间   `[left, mid - 1]` 里，要么在另一个区间   `[mid, right]` 里。

（1）显然在有序区间   `[left, mid - 1]` 里的条件好写，即：  `nums[left] <= target <= nums[mid - 1]`。因为 `target` 落在其中，所以能且只能等于其中的一个元素，当然包括头尾，此时设置 `right = mid - 1`；

（2）落在另一个区间 `[mid, right]` 里的时候，就是上一个情况的反面，这种情况用 `else` 表示即可，此时设置 `left = mid ` 是显然的。

> 这里特别巧，情况 1 和情况 2 边界的收缩正好吻合。都是 `left = mid` 与 `right = mid - 1`。因此选中间数的时候就得上取整，即  `int mid = (left + right + 1) >>> 1`。
>

![image-20191128103723984](https://tva1.sinaimg.cn/large/006y8mN6ly1g9dk95gjojj30uk0bet9g.jpg)

Java 代码：

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

            int mid = (left + right + 1) >>> 1;

            if (nums[mid] < nums[right]) {

                // 使用上取整的中间数，必须在上面的 mid 表达式的括号里 + 1
                if (nums[mid] <= target && target <= nums[right]) {
                    // 下一轮搜索区间是 [mid, right]
                    left = mid;
                } else {
                    // 只要上面对了，这里不用思考，可以一下子写出来
                    right = mid - 1;
                }

            } else {

                // [left, mid] 有序，但是为了和上一个 if 有同样的收缩行为，
                // 我们故意只认为 [left, mid - 1] 有序
                // 当区间只有 2 个元素的时候 int mid = (left + right + 1) >>> 1; 一定会取到右边
                // 此时 mid - 1 不会越界，就是这么刚刚好

                if (nums[left] <= target && target <= nums[mid - 1]) {
                    // 下一轮搜索区间是 [left, mid - 1]
                    right = mid - 1;
                } else {
                    left = mid;
                }
            }
        }

        // 有可能区间内不存在目标元素，因此还需做一次判断
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
