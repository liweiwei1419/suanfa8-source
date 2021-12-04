# 「力扣」第 1095 题：山脉数组中查找目标值（困难）

题解地址：[十分好用的二分查找法模板（Python 代码、Java 代码）](https://leetcode-cn.com/problems/find-in-mountain-array/solution/shi-yong-chao-hao-yong-de-er-fen-fa-mo-ban-python-/)。

说明：文本首发在力扣的题解版块，更新也会在第 1 时间在上面的网站中更新，这篇文章只是上面的文章的一个快照，您可以点击上面的链接看到其他网友对本文的评论。

传送门：[1095. 山脉数组中查找目标值](https://leetcode-cn.com/problems/find-in-mountain-array/)。

> （这是一个 交互式问题 ）
>
> 给你一个 山脉数组 `mountainArr`，请你返回能够使得 `mountainArr.get(index)` 等于 target 最小 的下标 index 值。
>
> 如果不存在这样的下标 `index`，就请返回 `-1`。
>
> 
>
> 所谓山脉数组，即数组 `A` 假如是一个山脉数组的话，需要满足如下条件：
>
> 首先，`A.length >= 3`
>
> 其次，在 `0 < i < A.length - 1` 条件下，存在 i 使得：
>
> + `A[0] < A[1] < ... A[i-1] < A[i]`
> + `A[i] > A[i+1] > ... > A[A.length - 1]`
>
> 
>
> 你将 不能直接访问该山脉数组，必须通过 MountainArray 接口来获取数据：
>
> + `MountainArray.get(k)` - 会返回数组中索引为k 的元素（下标从 0 开始）
> + `MountainArray.length()` - 会返回该数组的长度
>
> **注意**：
>
> 对 `MountainArray.get` 发起超过 `100` 次调用的提交将被视为错误答案。此外，任何试图规避判题系统的解决方案都将会导致比赛资格被取消。
>
> 为了帮助大家更好地理解交互式问题，我们准备了一个样例 “答案”：https://leetcode-cn.com/playground/RKhe3ave，请注意这 不是一个正确答案。
>
> 
>
> 示例 1：
>
> ```
> 输入：array = [1,2,3,4,5,3,1], target = 3
> 输出：2
> 解释：3 在数组中出现了两次，下标分别为 2 和 5，我们返回最小的下标 2。
> ```
>
> 示例 2：
>
> ```
> 输入：array = [0,1,2,4,2,1], target = 3
> 输出：-1
> 解释：3 在数组中没有出现，返回 -1。
> ```
>
> 
>
> 提示：
>
> + `3 <= mountain_arr.length() <= 10000`
> + `0 <= target <= 10^9`
> + `0 <= mountain_arr.get(index) <= 10^9`

## 十分好用的二分查找法模板（Python 代码、Java 代码）

根据题意，分析如下：

1、理解“山脉数组”，“山脉数组”可以分为两部分，一部分是“前有序数组”，另一部分是“后有序数组”，“前有序数组”是升序数组，“后有序数组”是降序数组。

2、题目还告诉我们“对 `MountainArray.get` 发起超过 `100` 次调用的提交将被视为错误答案”，就在疯狂暗示你使用时间复杂度低的算法，对于有序数组当然使用“二分查找法”。

### 方法：二分查找法

自然地，求解这道题可以分为 3 步：

第 1 步：先找到山顶元素 mountaintop 所在的索引。

> 说到 mountaintop，你是不是跟我一样，很想唱起来：“mountaintop，就我一起来”，嘻嘻嘻 ^_^ ，调皮一下。

第 2 步：在前有序且升序数组中找 target 所在的索引，如果找到了，就返回，如果没有找到，就执行第 3 步；

第 3 步：如果步骤 2 找不到，就在后有序且降序数组中找 target 所在的索引。

> **注意：** 具体编码实现的时候，每一步写一个辅助方法就可以了。这 3 个辅助方法都是二分查找法。

在这里我要向你强烈推荐我使用了很久的二分查找法模板。我专门把这个二分法模板好用的地方、使用它的技巧和注意事项整理在了「力扣 」第 35 题：搜索插入位置的题解[《特别好用的二分查找法模板（Python 代码、Java 代码）》](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)，希望能对大家有所帮助。

如果你会了这个模板，你就会发现使用这个模板，写出来的 3 个辅助方法的分支逻辑出奇地一样，在取中位数的时候，都取左中位数，才不会发生死循环。

下面给出的参考代码包括了抽象类（接口）和我的简单实现类，还有一些调试的代码。

**参考代码**：

Java 代码：

```java
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 */

interface MountainArray {
    public int get(int index);

    public int length();
}


class MountainArrayImpl implements MountainArray {
    private int[] arr;
    private int size;

    public MountainArrayImpl(int[] arr) {
        this.arr = arr;
        this.size = this.arr.length;
    }

    @Override
    public int get(int index) {
        return this.arr[index];
    }

    @Override
    public int length() {
        return this.size;
    }

}

class Solution {

    // 特别注意：3 个辅助方法的分支出奇地一样，因此选中位数均选左中位数，才不会发生死循环

    public int findInMountainArray(int target, MountainArray mountainArr) {
        int size = mountainArr.length();
        // 步骤 1：先找到山顶元素所在的索引
        int mountaintop = findMountaintop(mountainArr, 0, size - 1);
        // 步骤 2：在前有序且升序数组中找 target 所在的索引
        int res = findFromSortedArr(mountainArr, 0, mountaintop, target);
        if (res != -1) {
            return res;
        }
        // 步骤 3：如果步骤 2 找不到，就在后有序且降序数组中找 target 所在的索引
        return findFromInversedArr(mountainArr, mountaintop + 1, size - 1, target);
    }

    private int findMountaintop(MountainArray mountainArr, int l, int r) {
        // 返回山顶元素
        while (l < r) {
            int mid = l + (r - l) / 2;
            // 取左中位数，因为进入循环，数组一定至少有 2 个元素
            // 因此，左中位数一定有右边元素，数组下标不会发生越界
            if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
                // 如果当前的数比右边的数小，它一定不是山顶
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        // 根据题意，山顶元素一定存在，因此退出 while 循环的时候，不用再单独作判断
        return l;
    }

    private int findFromSortedArr(MountainArray mountainArr, int l, int r, int target) {
        // 在前有序且升序数组中找 target 所在的索引
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (mountainArr.get(mid) < target) {
                l = mid + 1;
            } else {
                r = mid;
            }

        }
        // 因为不确定区间收缩成 1个数以后，这个数是不是要找的数，因此单独做一次判断
        if (mountainArr.get(l) == target) {
            return l;
        }
        return -1;
    }

    private int findFromInversedArr(MountainArray mountainArr, int l, int r, int target) {
        // 在后有序且降序数组中找 target 所在的索引
        while (l < r) {
            int mid = l + (r - l) / 2;
            // 与 findFromSortedArr 方法不同的地方仅仅在于由原来的小于号改成大于好
            if (mountainArr.get(mid) > target) {
                l = mid + 1;
            } else {
                r = mid;
            }

        }
        // 因为不确定区间收缩成 1个数以后，这个数是不是要找的数，因此单独做一次判断
        if (mountainArr.get(l) == target) {
            return l;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 3, 1};
        int target = 3;
        MountainArray mountainArray = new MountainArrayImpl(arr);

        Solution solution = new Solution();
        int res = solution.findInMountainArray(target, mountainArray);
        System.out.println(res);
    }
}
```

Python 代码：

```python
# """
# This is MountainArray's API interface.
# You should not implement it, or speculate about its implementation
# """
class MountainArray:
    def __init__(self, arr):
        self.arr = arr
        self.size = len(arr)

    def get(self, index: int) -> int:
        return self.arr[index]

    def length(self) -> int:
        return self.size


class Solution:

    # 特别注意：3 个辅助方法的分支出奇地一样，因此选中位数均选左中位数，才不会发生死循环

    def findInMountainArray(self, target: int, mountain_arr: 'MountainArray') -> int:
        size = mountain_arr.length()
        # 步骤 1：先找到山顶元素所在的索引
        mountaintop = self.__find_mountaintop(mountain_arr, 0, size - 1)
        # 步骤 2：在前有序且升序数组中找 target 所在的索引
        res = self.__find_from_sorted_arr(mountain_arr, 0, mountaintop, target)
        if res != -1:
            return res
        # 步骤 3：如果步骤 2 找不到，就在后有序且降序数组中找 target 所在的索引
        return self.__find_from_inversed_arr(mountain_arr, mountaintop + 1, size - 1, target)

    def __find_mountaintop(self, mountain_arr: 'MountainArray', l: int, r: int):
        # 返回山顶元素
        while l < r:
            mid = l + (r - l) // 2
            # 取左中位数，因为进入循环，数组一定至少有 2 个元素
            # 因此，左中位数一定有右边元素，数组下标不会发生越界
            if mountain_arr.get(mid) < mountain_arr.get(mid + 1):
                # 如果当前的数比右边的数小，它一定不是山顶
                l = mid + 1
            else:
                r = mid
        # 根据题意，山顶元素一定存在，因此退出 while 循环的时候，不用再单独作判断
        return l

    def __find_from_sorted_arr(self, mountain_arr: 'MountainArray', l: int, r: int, target: int):
        # 在前有序且升序数组中找 target 所在的索引
        while l < r:
            mid = l + (r - l) // 2
            if mountain_arr.get(mid) < target:
                l = mid + 1
            else:
                r = mid
        # 因为不确定区间收缩成 1 个数以后，这个数是不是要找的数，因此单独做一次判断
        if mountain_arr.get(l) == target:
            return l
        return -1

    def __find_from_inversed_arr(self, mountain_arr: 'MountainArray', l: int, r: int, target: int):
        # 在后有序且降序数组中找 target 所在的索引
        while l < r:
            mid = l + (r - l) // 2
            # 与 __find_from_sorted_arr 方法不同的地方仅仅在于由原来的小于号改成大于号
            if mountain_arr.get(mid) > target:
                l = mid + 1
            else:
                r = mid
        if mountain_arr.get(l) == target:
            return l
        return -1


if __name__ == '__main__':
    arr = [1, 2, 3, 4, 5, 3, 1]
    mountain_array = MountainArray(arr)
    target = 3
    solution = Solution()
    res = solution.findInMountainArray(target, mountain_array)
    print('res', res)
```

**复杂度分析：**

+ 时间复杂度：$O(\log N)$，二分查找法的时间复杂度是对数级别的，这里使用了 $3$ 次二分查找法，是常数倍数，因此可以忽略这个常数系数。
+ 空间复杂度：$O(1)$，这里使用的额外的辅助空间仅仅是 `mountaintop`、中位数索引 `mid` 等，是常数级别，因此空间复杂度为 $O(1)$。

（本节完）

