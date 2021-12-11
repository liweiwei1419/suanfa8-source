# 「力扣」第 153 题：旋转排序数组的最小值（中等）

+ 题目地址：[153. 寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)。

+ 题解地址：[二分法 + 分治法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/solution/er-fen-fa-fen-zhi-fa-python-dai-ma-java-dai-ma-by-/)。

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

请找出其中最小的元素。

你可以假设数组中不存在重复元素。

示例 1:

输入: [3,4,5,1,2]
输出: 1
示例 2:

输入: [4,5,6,7,0,1,2]
输出: 0

## 方法一：二分法

分类讨论的依据我已经写在了「力扣」第 154 题：寻找旋转排序数组中的最小值 II 的题解[《二分法 + 分治法（Python 代码、Java 代码）》](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/solution/er-fen-fa-fen-zhi-fa-python-dai-ma-by-liweiwei1419/)，第 154 题其实并不难，它解决了以后，第 153 题不在话下，请大家出门左转观看。

以下代码是根据我在刷题过程中总结出来的最好用的二分法模板写成。我专门把这个二分法模板好用的地方、使用它的技巧和注意事项整理在了「力扣」第 35 题：搜索插入位置的题解[《特别好用的二分查找法模板（Python 代码、Java 代码）》]()，希望能对大家有所帮助。

1、`nums[mid] > nums[right]`：例子：`[7, 8, 9, 10, 1, 2]`，`mid` 肯定不是最小；

2、否则，`nums[mid] < nums[right]`：例子：`[8, 9, 1, 2, 3, 4, 5, 6]`，此时 `mid` 有可能是最小。

**参考代码 1**：

```Python []
from typing import List


class Solution:
    def findMin(self, nums: List[int]) -> int:
        size = len(nums)
        if size == 0:
            raise Exception('程序出错')
        if size == 1:
            return nums[0]
        left = 0
        right = size - 1
        while left < right:
            # mid = left + (right - left) // 2
            mid = (left + right) >> 1
            # [7, 8, 1, 2, 3, 4, 5, 6]
            if nums[mid] > nums[right]:
                # [3, 4, 5, 6, 7, 8, 1, 2]
                # 此时 mid 肯定不是最小元素
                left = mid + 1
            else:
                # mid 有可能是最小元素，所以，不能排除它
                assert nums[mid] < nums[right]
                right = mid
        # 一定存在最小元素，因此无需再做判断
        return nums[left]
```
```Java []
public class Solution {

    public int findMin(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            throw new IllegalArgumentException("数组为空，无最小元素");
        }
        int left = 0;
        int right = len - 1;
        while (left < right) {
            // int mid = left + (right - left) / 2;
            int mid = (left + right) >>> 1;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                // 因为题目中说：你可以假设数组中不存在重复元素。
                // 此时一定有 nums[mid] < nums[right]
                right = mid;
            }
        }
        // 一定存在最小元素，因此无需再做判断
        return nums[left];
    }
}
```

## 方法二：分治法

分治法同样适用于 LeetCode 第 154 题。

**参考代码 2**：

```Python []
from typing import List


class Solution:
    def findMin(self, nums: List[int]) -> int:
        size = len(nums)
        if size == 0:
            raise Exception('程序出错')
        if size == 1:
            return nums[0]
        return self.__findMin(nums, 0, size - 1)

    def __findMin(self, nums, left, right):
        if left == right:
            return nums[left]
        if left + 1 == right:
            return min(nums[left], nums[right])
        # mid = left + (right - left) // 2
        mid = (left + right) >> 1
        return min(self.__findMin(nums, left, mid),
                   self.__findMin(nums, mid + 1, right))
```
```Java []
public class Solution {

    // 虽然可以通过，但是时间复杂度是 O(n)

    public int findMin(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            throw new IllegalArgumentException("数组为空");
        }
        return findMin(nums, 0, len - 1);
    }

    private int findMin(int[] nums, int left, int right) {
        // 思考：这个临界条件是为什么?
        // 或者写成 left + 1 >= right
        if (left == right || left + 1 == right) {
            return Math.min(nums[left], nums[right]);
        }
        // int mid = left + (right - left) / 2;
        int mid = (left + right) >>> 1;
        // 8 9 1 2 3 4 5 6 7
        if (nums[mid] < nums[right]) {
            // 右边是顺序数组
            return Math.min(findMin(nums, left, mid - 1), nums[mid]);
        } else {
            // 左边是顺序数组
            // nums[mid] > nums[right]
            // 3 4 5 6 7 8 1 2
            return Math.min(nums[left], findMin(nums, mid + 1, right));
        }
    }

    public static void main(String[] args) {
        Solution2 solution2 = new Solution2();
        int[] nums = {1, 2};
        int solution2Min = solution2.findMin(nums);
        System.out.println(solution2Min);
    }

}
```
