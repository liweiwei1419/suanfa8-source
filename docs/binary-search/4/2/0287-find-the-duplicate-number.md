# 「力扣」第 287 题：数组中的重复数字

关键字：抽屉原理，二分法。

传送门：[寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number)。

> 给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。
>
> 示例 1:
>
> 输入: [1,3,4,2,2]
> 输出: 2
> 示例 2:
>
> 输入: [3,1,3,4,2]
> 输出: 3
> 说明：
>
> 1、不能更改原数组（假设数组是只读的）。
> 2、只能使用额外的 $O(1)$ 的空间。
> 3、时间复杂度小于 $O(n^2)$ 。
> 4、数组中只有一个重复的数字，但它可能不止重复出现一次。

解题思路：二分法。对“数”做二分，要定位的“数”根据题意在 $1$ 和 $n$ 之间，每一次二分都可以将搜索区间缩小一半。

以 `[1, 2, 2, 3, 4, 5, 6, 7] ` 为例，一共有 $8$ 个数，每个数都在  $1$ 和 $7$ 之间。$1$ 和 $7$ 的中位数是 $4$，**遍历整个数组**，统计小于 $4$ 的整数的个数，至多应该为 $3$ 个，如果超过 $3$ 个就说明重复的数存在于区间 $[1,4)$ （注意：左闭右开）中；否则，重复的数存在于区间 $[4,7]$（注意：左右都是闭）中。这里小于 $4$ 的整数有 $4$ 个（它们是 1, 2, 2, 3），因此砍掉右半区间，连中位数也砍掉。以此类推，最后区间越来越小，直到变成 $1$ 个整数，这个整数就是我们要找的重复的数。

Python 代码：

```python
class Solution:

    def findDuplicate(self, nums):
        left = 1
        right = len(nums) - 1
        while left < right:
            # 取中点有两种方式，偏左和偏右
            mid = left + (right - left + 1) // 2
            count = 0
            for num in nums:
                if num < mid:
                    count += 1
            if count < mid:
                # 因为左边不变，所以取中点的时候，就要偏右
                left = mid
            else:
                # 比 4 小的个数，达到 4 或者更多
                # 重复的就落在 [1, 2, 3]
                right = mid - 1
        # 跳出循环肯定是因为 start = end
        return left
```

说明：1、在 Python 中，整除使用 `//` ，如果使用 `/` ，在不能整除的时候，会返回一个小数；

2、之所以写成 `mid = left + (right - left + 1) // 2` ，是因为下面的分支条件是：`left = mid` 和 `right = mid - 1`，如果写成 `mid = left + (right - left) // 2` 就会陷入死循环。我们还是以具体例子为例。

当一个整数数组（按升序排列）的个数为奇数时，不论 `mid = left + (right - left) // 2` 和  `mid = left + (right - left + 1) // 2`  都落在了相同的一个数，大家不妨拿 `[1,2,3,4,5]` 做验证；

当一个整数数组（按升序排列）的个数为偶数时：

（1） `mid = left + (right - left) // 2`  找到的是中间位置偏左的元素；

（2） `mid = left + (right - left + 1) // 2`  找到的是中间位置偏右的元素。

可以拿 [1,2,3,4] 验证。

因此如果分支是：`left = mid` 和 `right = mid - 1`，说明，当只有 2 个元素的时候，中位数不能取左边，否则会出现死循环，因此中位数的取法是 `mid = left + (right - left + 1) // 2`。


如果分支是：`left = mid + 1` 和 `right = mid`，说明，当只有 2 个元素的时候，中位数不能取右边，否则会出现死循环，因此中位数的取法是 `mid = left + (right - left) // 2`。

3、`while left < right` 一定是严格小于，这样退出循环的时候就一定有 `l==r` 成立，就不必纠结该返回 `l` 还是 `r` 了。

总结一下：`while left < right` 一定是严格小于，最后把一个区间“夹逼”成一个数，二分法先写两个分支，再根据分支的情况，调整如何取中点。

---

分析：


Python 代码1：

```python
class Solution:
    def findDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        left = 1
        right = len(nums) - 1

        # 特别注意：在二分法取中点的算法中，如果有一条分支，不能排除 mid
        # 在写 while 循环的时候，就不能把 = 写进去，否则会出现死循环，
        # 这一点要特别注意

        # 注意，千万不能写 while left <= right，会进入死循环
        # 因为下面有一个分支是 right = mid
        while left < right:
            # 因为在循环过程中，右边界可能不变，就要使用左偏中点
            # [1,2] 时，
            mid = left + (right - left) // 2
            count = 0
            for num in nums:
                if num <= mid:
                    count += 1
            if count <= mid:
                # 在 [left,mid] 这个区间没有重复元素
                # 所以搜索范围在 [mid+1,right]
                left = mid + 1
            else:
                # 在 [left,mid] 这个区间有重复元素
                # 所以搜索范围在 [left,mid]
                right = mid
        # 退出循环的时候 start == end 为 True
        return left


if __name__ == '__main__':
    nums = [1, 3, 4, 2, 2]
    solution = Solution()
    result = solution.findDuplicate(nums)
    print(result)
```

Python 代码2：

```python
# 287. 寻找重复数
# 给定一个包含 n + 1 个整数的数组 nums，
# 其数字都在 1 到 n 之间（包括 1 和 n），
# 可知至少存在一个重复的整数。
# 假设只有一个重复的整数，找出这个重复的数。

class Solution:

    def findDuplicate(self, nums):
        """
        【不修改数组找出重复的数字】
        给定一个包含 n + 1 个整数的数组 nums，
        其数字都在 1 到 n 之间（包括 1 和 n），
        可知至少存在一个重复的整数。
        假设只有一个重复的整数，找出这个重复的数。
        :type nums: List[int]
        :rtype: int
        """
        left = 1
        right = len(nums) - 1

        # 特别注意：在二分法取中点的算法中，如果有一条分支，不能排除 mid
        # 在写 while 循环的时候，就不能把 = 写进去，否则会出现死循环，
        # 这一点要特别注意

        # 注意，千万不能写 while left <= right，会进入死循环
        # 因为下面有一个分支是 left = mid
        while left < right:
            # 取中点有两种方式，偏左和偏右
            mid = left + (right - left + 1) // 2  # 4
            count = 0
            for num in nums:
                if num < mid:
                    count += 1
            if count < mid:
                # 比 4 小的个数，最多就只能是 3
                # 所以重复的肯定不是 [1,2,3]
                # 因为左边不变，所以取中点的时候，就要偏右
                left = mid
            else:
                # 比 4 小的个数，达到 4 或者更多
                # 重复的就落在 [1,2,3]
                right = mid - 1
        # 跳出循环肯定是因为 start = end
        return left


if __name__ == '__main__':
    nums = [3, 1, 3, 4, 2]
    solution = Solution()
    result = solution.findDuplicate(nums)
    print(result)
```

解法3：使用 LeetCode 第 141 题和第 142 题的做法。

```python
class Solution(object):
    def findDuplicate(self, nums):
        # 参考了：https://blog.csdn.net/wr339988/article/details/53617914
        # 参考资料：http://www.cnblogs.com/grandyang/p/4843654.html
        # 看下来，其实就是 LeetCode 141 和 142
        # 会了这两题，其实这道题的这个解法就迎刃而解了
        """
        :type nums: List[int]
        :rtype: int
        """

        fast = 0
        slow = 0

        while True:
            fast = nums[nums[fast]]
            slow = nums[slow]

            if fast == slow:
                break

        point = 0
        while point != slow:
            point = nums[point]
            slow = nums[slow]
        return point
```

# LeetCode 第 287 题：寻找重复数

| 题目地址                                                     | 题解                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [LeetCode 第 287 题：寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/) | [桶排序 + 二分法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/find-the-duplicate-number/solution/er-fen-fa-si-lu-ji-dai-ma-python-by-liweiwei1419/) |

+ 提示：点击上面的题解链接，可以看到我制作的幻灯片轮播图。

### 方法一：桶排序

桶排序的思想是“一个萝卜一个坑”。对于这道题而言，遇到两个萝卜一个坑的，返回那个“萝卜”就好了。以数组 `[1, 3, 4, 2, 2]` 为例。

![LeetCode 第 287 题-1](https://liweiwei1419.gitee.io/images/leetcode-solution/287-1.png)

![LeetCode 第 287 题-2](https://liweiwei1419.gitee.io/images/leetcode-solution/287-2.png)

![LeetCode 第 287 题-3](https://liweiwei1419.gitee.io/images/leetcode-solution/287-3.png)

![LeetCode 第 287 题-4](https://liweiwei1419.gitee.io/images/leetcode-solution/287-4.png)

![LeetCode 第 287 题-5](https://liweiwei1419.gitee.io/images/leetcode-solution/287-5.png)

![LeetCode 第 287 题-6](https://liweiwei1419.gitee.io/images/leetcode-solution/287-6.png)

![LeetCode 第 287 题-7](https://liweiwei1419.gitee.io/images/leetcode-solution/287-7.png)

这里数与要放置的位置的索引有一个偏差，编码的时候要注意这一点。再整理一下思路：**如果数字 `i` 没有放在索引 `i - 1` 上，就要执行交换，把数字 `i` 放在索引 `i - 1` 上，如果索引  `i - 1` 上的那个元素恰好和自己相等，就没有必要交换，说明出现重复了，即找到了这个重复的元素，返回即可**。

Python 代码：

```Python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        # 桶排序，数字 i 应该在索引 i - 1 上，否则交换
        size = len(nums)
        for i in range(size):
            while nums[i] != i + 1:
                if nums[i] == nums[nums[i] - 1]:
                    return nums[i]
                self.__swap(nums, i, nums[i] - 1)

    def __swap(self, nums, index1, index2):
        if index1 == index2:
            return
        nums[index1], nums[index2] = nums[index2], nums[index1]
```

Java 代码：

```Java
public class Solution {

    public int findDuplicate(int[] nums) {
        int len = nums.length;
        for (int i = 0; i < len; i++) {
            while (nums[i] != i + 1) {
                if (nums[i] == nums[nums[i] - 1]) {
                    return nums[i];
                }
                swap(nums, i, nums[i] - 1);
            }
        }
        // 数组中没有重复的整数，测试用例错误
        return 0;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

这里解释一下编码细节，可能有些朋友会比较晕。

1、`nums[i] != i + 1`：想一想正确放置的情况，`nums[0] = 1`、`nums[1] = 2`，依次类推，这一步是在判断，在遍历的时候，当前索引上的放置的元素的值是不是正确的“萝卜”；

2、`if nums[i] == nums[nums[i] - 1]:`：如果不是正确的“萝卜”，就得根据当前索引上的数值，看一看这个数字应该放在哪个位置上。例如数字 4 应该放在索引 3 上，那么就要检查数字 4（这里是 `nums[i]`），与索引 3 （这里是 `nums[i] - 1`）上的数值，即 `nums[nums[i] - 1]` 是否相等，如果相等，返回这个重复数，如果不相等，交换。

3、交换我单独写了一个方法，否则中括号会把自己绕晕。

**复杂度分析：**

+ 时间复杂度：$O(N^2)$，这里需遍历一次整个数组，在遍历的时候还有一个 `for` 循环，因此时间复杂度为 $O(N^2)$。
+ 空间复杂度：$O(1)$，这里无需使用额外的辅助空间，因此空间复杂度为 $O(1)$。

### 方法二：二分法

对“数”做二分，要定位的“数”根据题意在 $1$ 和 $n$ 之间，每一次二分都可以将搜索区间缩小一半。

以 `[1, 2, 2, 3, 4, 5, 6, 7] ` 为例，一共有 $8$ 个数，每个数都在  $1$ 和 $7$ 之间。$1$ 和 $7$ 的中位数是 $4$，**遍历整个数组**，统计小于 $4$ 的整数的个数，至多应该为 $3$ 个，如果超过 $3$ 个就说明重复的数存在于区间 $[1,4)$ （注意：左闭右开）中；否则，重复的数存在于区间 $[4,7]$（注意：左右都是闭）中。这里小于 $4$ 的整数有 $4$ 个（它们是 1, 2, 2, 3），因此砍掉右半区间，连中位数也砍掉。以此类推，最后区间越来越小，直到变成 $1$ 个整数，这个整数就是我们要找的重复的数。

Python 代码：


```Python
class Solution:
    def findDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        left = 1
        right = len(nums) - 1

        # 特别注意：在二分法取中点的算法中，如果有一条分支，不能排除 mid
        # 在写 while 循环的时候，就不能把 = 写进去，否则会出现死循环，
        # 这一点要特别注意

        # 注意，千万不能写 while left <= right，会进入死循环
        # 因为下面有一个分支是 right = mid
        while left < right:
            # 因为在循环过程中，右边界可能不变，就要使用左偏中点
            # [1,2] 时，
            mid = left + (right - left) // 2
            count = 0
            for num in nums:
                if num <= mid:
                    count += 1
            if count <= mid:
                # 在 [left,mid] 这个区间没有重复元素
                # 所以搜索范围在 [mid+1,right]
                left = mid + 1
            else:
                # 在 [left,mid] 这个区间有重复元素
                # 所以搜索范围在 [left,mid]
                right = mid
        # 退出循环的时候 start == end 为 True
        return left
```

Java 代码：
```Java
public class Solution {

    public int findDuplicate(int[] nums) {
        int len = nums.length;
        int l = 1;
        int r = len - 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            int counter = 0;
            for (int num : nums) {
                if (num <= mid) {
                    counter += 1;
                }
            }
            if (counter > mid) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
}
```


说明：1、在 Python 中，整除使用 `//` ，如果使用 `/` ，在不能整除的时候，会返回一个小数；

2、之所以写成 `mid = left + (right - left + 1) // 2` ，是因为下面的分支条件是：`left = mid` 和 `right = mid - 1`，如果写成 `mid = left + (right - left) // 2` 就会陷入死循环。我们还是以具体例子为例。

当一个整数数组（按升序排列）的个数为奇数时，不论 `mid = left + (right - left) // 2` 和  `mid = left + (right - left + 1) // 2`  都落在了相同的一个数，大家不妨拿 `[1,2,3,4,5]` 做验证；

当一个整数数组（按升序排列）的个数为偶数时：

（1） `mid = left + (right - left) // 2`  找到的是中间位置偏左的元素；

（2） `mid = left + (right - left + 1) // 2`  找到的是中间位置偏右的元素。

可以拿 [1,2,3,4] 验证。

因此如果分支是：`left = mid` 和 `right = mid - 1`，说明，当只有 2 个元素的时候，中位数不能取左边，否则会出现死循环，因此中位数的取法是 `mid = left + (right - left + 1) // 2`。


如果分支是：`left = mid + 1` 和 `right = mid`，说明，当只有 2 个元素的时候，中位数不能取右边，否则会出现死循环，因此中位数的取法是 `mid = left + (right - left) // 2`。

3、`while left < right` 一定是严格小于，这样退出循环的时候就一定有 `l==r` 成立，就不必纠结该返回 `l` 还是 `r` 了。

总结一下：`while left < right` 一定是严格小于，最后把一个区间“夹逼”成一个数，二分法先写两个分支，再根据分支的情况，调整如何取中点。

下面再提供等价的二分法写法，供体会这个二分法模板的好处和使用技巧：

Python 代码：

```Python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        size = len(nums)
        l = 1
        r = size - 1

        while l < r:
            mid = l + (r - l + 1) // 2

            counter = 0
            for num in nums:
                if num < mid:
                    counter += 1

            if counter >= mid:
                # 如果小于 4 的个数等于 4 或者更多
                # 那么重复的数一定位于 1、2、3
                r = mid - 1
            else:
                l = mid

        return l
```

Java 代码：

```Java
public class Solution {

    public int findDuplicate(int[] nums) {
        int len = nums.length;
        int l = 1;
        int r = len - 1;
        while (l < r) {
            int mid = l + (r - l + 1) / 2;
            int counter = 0;
            for (int num : nums) {
                if (num < mid) {
                    counter += 1;
                }
            }
            if (counter >= mid) {
                // 如果小于 4 的个数等于 4 或者更多
                // 那么重复的数一定位于 1、2、3
                r = mid - 1;
            } else {
                l = mid;
            }
        }
        return l;
    }
}
```

**复杂度分析：**

+ 时间复杂度：$O(N \log N)$，二分法的时间复杂度为 $O(\log N)$，在二分法的内部，执行了一次 `for` 循环，时间复杂度为 $O(N)$，故时间复杂度为 $O(N \log N)$。
+ 空间复杂度：$O(1)$，使用了一个 `count` 变量，因此空间复杂度为 $O(1)$。

（本节完）

