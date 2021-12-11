# 「力扣」第 410 题：分割数组的最大值（困难）

+ 链接：https://leetcode-cn.com/problems/split-array-largest-sum
+ 题解：https://leetcode-cn.com/problems/split-array-largest-sum/solution/er-fen-cha-zhao-by-liweiwei1419-4/

> 给定一个非负整数数组和一个整数 `m`，你需要将这个数组分成 `m` 个非空的连续子数组。设计一个算法使得这 `m` 个子数组各自和的最大值最小。
>
> 注意：
> 数组长度 `n` 满足以下条件:
>
> + `1 ≤ n ≤ 1000`
> + `1 ≤ m ≤ min(50, n)`
>
> 示例：
>
> ```
> 输入:
> nums = [7, 2, 5, 10, 8]
> m = 2
> 
> 输出:
> 18
> 
> 解释:
> 一共有四种方法将 nums 分割为 2 个子数组。
> 其中最好的方式是将其分为 [7,2,5] 和 [10,8]，
> 因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。
> ```
>
> 
>
> 

注意题目中给出的这 3 个条件：

+ 数组中的元素均是「非负整数」；

+ 子数组的特点是：「非空」且「连续」；
+ 恰好分成 `m` 个非空「非空连续子数组」。

题目中还给出了一个概念：「连续子数组各自和的最大值」，我们用一个变量 `maxIntervalSum` 表示。不难知道：

+ 每一个「非空连续子数组」如果包含的元素个数越多，那么 `maxIntervalSum`  就可能越大；
+ **一个 `maxIntervalSum`的数值就唯一对应了一个分出的「非空连续子数组」的组数 `M` ，它们是一一对应的函数关系， `maxIntervalSum` 是自变量，`M` 是因变量，可以写成：**

$$
M = function(maxIntervalSum)
$$

这里最难掌握的是：**如何找到一个  `maxIntervalSum`，使得它对应的 `M` 恰好等于题目给出的 `m`**。但是我们容易分析出，**这个函数是一个单调递减的函数**：

+ 如果  `maxIntervalSum`  越小，分出的「非空连续子数组」的组数 `M` 就越大；
+ 如果  `maxIntervalSum`  越大，分出的「非空连续子数组」的组数 `M` 就越小；

原因就在于上面强调的题目中给出的 2 个条件：非负整数和非空连续子数组，**由于这种单调性，可以使用二分查找，找到与 `m` 对应的  `maxIntervalSum`**  。

**参考代码**：

下面是一些细节：

+ **只要连续加起来的数值超过了  `maxIntervalSum`，就新产生一个新的连续子数组**；
+ `maxIntervalSum`  的最小值是这个数组中的最大值，这是因为 `max(nums)` 一定会被分到其中一组；
+ `maxIntervalSum`  的最大值是这个数组中所有元素的和，极端情况就是题目中给出 $m = 1$ 的时候。

Java 代码：

```java
public class Solution {

    public int splitArray(int[] nums, int m) {
        int max = 0;
        int sum = 0;

        // 计算「子数组各自的和的最大值」的上下界
        for (int num : nums) {
            max = Math.max(max, num);
            sum += num;
        }

        // 使用「二分查找」确定一个恰当的「子数组各自的和的最大值」，
        // 使得它对应的「子数组的分割数」恰好等于 m
        int left = max;
        int right = sum;
        while (left < right) {
            int mid = left + (right - left) / 2;

            int splits = split(nums, mid);
            if (splits > m) {
                // 如果分割数太多，说明「子数组各自的和的最大值」太小，此时需要将「子数组各自的和的最大值」调大
                // 下一轮搜索的区间是 [mid + 1, right]
                left = mid + 1;
            } else {
                // 下一轮搜索的区间是上一轮的反面区间 [left, mid]
                right = mid;
            }
        }
        return left;
    }

    /***
     *
     * @param nums 原始数组
     * @param maxIntervalSum 子数组各自的和的最大值
     * @return 满足不超过「子数组各自的和的最大值」的分割数
     */
    private int split(int[] nums, int maxIntervalSum) {
        // 至少是一个分割
        int splits = 1;
        // 当前区间的和
        int curIntervalSum = 0;
        for (int num : nums) {
            // 尝试加上当前遍历的这个数，如果加上去超过了「子数组各自的和的最大值」，就不加这个数，另起炉灶
            if (curIntervalSum + num > maxIntervalSum) {
                curIntervalSum = 0;
                splits++;
            }
            curIntervalSum += num;
        }
        return splits;
    }

    public static void main(String[] args) {
        int[] nums = new int[]{7, 2, 5, 10, 8};
        int m = 2;
        Solution solution = new Solution();
        int res = solution.splitArray(nums, m);
        System.out.println(res);
    }
}
```

## 总结

### 理解单调性

+ 一个重要的性质：分割数越大，「子数组各自的和的最大值」就越小（非递增，满足单调性），因此可以使用二分查找，定位分割数；
+ 一种「分割方案（分成几个子数组）」对应了一个「子数组各自的和的最大值」；

+ 反过来，一个「子数组各自的和的最大值」对应了一种「分割方案（分成几个子数组）」；
+ 它们是一一对应的关系（关键）。

### 思路整理（绕了个弯子去逼近）

+ 先找「子数组各自的和的最大值」的中间数（尝试得到的一个值），看看它对应的「分割方案（分成几个子数组）」是多少；
+ 如果「分割方案（分成几个子数组）」比题目要求的 `m` 还多，说明「子数组各自的和的最大值」还太小，所以下一次搜索应该至少是中位数 `+ 1`（`left = mid + 1`），它的反面即至多是中位数（`right = mid`）。

---

我在网上查了一下资料，这道题属于「最大化最小值」，这一类问题通常是竞赛类的问题。事实上在今年（2020 年）的「力扣」春季团队赛中就出现过这样的问题，这道题是 [LCP 12. 小张刷题计划](https://leetcode-cn.com/problems/xiao-zhang-shua-ti-ji-hua/)，这道题与「力扣」第 410 题的区别就只在于这个问题的场景，要求我们用贪心算法，贪心的点是「每一天把耗时最多的问题交给小杨去做」。

Java 代码：

```java
public class Solution {

    public int minTime(int[] time, int m) {
        int sum = 0;
        for (int num : time) {
            sum += num;
        }

        int left = 0;
        int right = sum;

        while (left < right) {
            int mid = left + (right - left) >>> 1;
            // mid 是 T 值的意思
            int splits = split(time, mid);
            if (splits > m) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    private int split(int[] nums, long maxSum) {
        int splits = 1;

        int len = nums.length;
        int curMax = nums[0];
        int tempSum = nums[0];

        for (int i = 1; i < len; i++) {
            curMax = Math.max(curMax, nums[i]);
            // 每一天把耗时最多的问题交给小杨去做，这是贪心的思想
            if (tempSum + nums[i] - curMax > maxSum) {
                tempSum = 0;
                curMax = nums[i];
                splits++;
            }
            tempSum += nums[i];
        }
        return splits;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
//        int[] time = {1, 2, 3, 3};
//        int m = 2;

//        int[] time = {999,999,999};
//        int m = 4;

        int[] time = {999, 999, 999, 1000};
        int m = 2;

        int res = solution.minTime(time, m);
        System.out.println(res);
    }
}
```



