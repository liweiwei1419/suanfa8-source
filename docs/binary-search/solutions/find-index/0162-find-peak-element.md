
+ [题目链接](https://leetcode-cn.com/problems/find-peak-element/)

说明：数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。

Java 代码：

```java
public class Solution {

    public int findPeakElement(int[] nums) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // [left, right]
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[mid + 1]) {
                // 下一轮搜索的区间 [mid + 1, right]
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        // left == right
        return left;
    }
}
```

Java 代码：

```java
public class Solution {

    public int findPeakElement(int[] nums) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // [left, right]
        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            if (nums[mid - 1] < nums[mid]) {
                // 下一轮搜索的区间 [mid, right]
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        // left == right
        return left;
    }
}
```

Java 代码：

```java
public class Solution {

    public int findPeakElement(int[] nums) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // [left, right]
        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            if (nums[mid - 1] > nums[mid]) {
                // 下一轮搜索的区间 [left, mid - 1]
                right = mid - 1;
            } else {
                // 下一轮搜索的区间 [mid, right]
                left = mid;
            }
        }
        // left == right
        return left;
    }
}
```


