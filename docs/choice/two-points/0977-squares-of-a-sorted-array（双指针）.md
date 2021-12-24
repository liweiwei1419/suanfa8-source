#### [977. 有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

给你一个按 **非递减顺序** 排序的整数数组 `nums`，返回 **每个数字的平方** 组成的新数组，要求也按 **非递减顺序** 排序。

**示例 1**：

```
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
```

**示例 2：**

```
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
```

**提示：**

- `1 <= nums.length <= 104`
- `-104 <= nums[i] <= 104`
- `nums` 已按 **非递减顺序** 排序

**进阶：**

- 请你设计时间复杂度为 `O(n)` 的算法解决本问题

## 方法一：暴力解法

```Java []
import java.util.Arrays;

public class Solution {

    public int[] sortedSquares(int[] A) {
        int len = A.length;
        int[] res = new int[len];
        for (int i = 0; i < len; i++) {
            res[i] = A[i] * A[i];
        }
        Arrays.sort(res);
        return res;
    }
}
```

## 方法二：双指针

```Java []
public class Solution {

    public int[] sortedSquares(int[] A) {
        int n = A.length;
        int[] ans = new int[n];

        // 从后向前赋值
        int index = n - 1;
        // 双指针
        int left = 0;
        int right = n - 1;
        while (left <= right) {
            if (A[left] * A[left] > A[right] * A[right]) {
                ans[index] = A[left] * A[left];
                left++;
            } else {
                ans[index] = A[right] * A[right];
                right--;
            }
            index--;
        }
        return ans;
    }
}
```