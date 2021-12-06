---
title: partition 几种写法比较
---

# partition 几种写法比较

## partition 1：把等于切分元素的所有元素分到了数组的同一侧

可能会造成递归树倾斜。

**参考代码**：

```java
import java.util.Arrays;
import java.util.Random;

public class Solution {

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;

        int target = len - k;

        int left = 0;
        int right = len - 1;
        while (true) {
            int pIndex = partition(nums, left, right);

            if (pIndex == target) {
                return nums[pIndex];
            } else if (pIndex < target) {
                // 下一轮搜索区间 [pIndex + 1, right]
                left = pIndex + 1;
            } else {
                // pIndex > target
                // 下一轮搜索区间 [left, pIndex - 1]
                right = pIndex - 1;
            }
        }

    }

    private int partition(int[] nums, int left, int right) {
        int pivot = nums[left];

        // [left + 1 .. le] <= pivot
        // (le, i] > pivot
        // 注意点 1：一定要设置成 left ，否则交换会出错
        int le = left;
        for (int i = left + 1; i <= right; i++) {
            // 这里写 < 或者 <= 都可以
            if (nums[i] <= pivot) {
                le++;
                swap(nums, le, i);
            }
        }

        swap(nums, left, le);
        return le;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```
```java
import java.util.Arrays;
import java.util.Random;

public class Solution {

    private static Random random = new Random(System.currentTimeMillis());

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;

        int target = len - k;

        int left = 0;
        int right = len - 1;
        while (true) {
            int pIndex = partition(nums, left, right);

            if (pIndex == target) {
                return nums[pIndex];
            } else if (pIndex < target) {
                // 下一轮搜索区间 [pIndex + 1, right]
                left = pIndex + 1;
            } else {
                // pIndex > target
                // 下一轮搜索区间 [left, pIndex - 1]
                right = pIndex - 1;
            }
        }

    }

    private int partition(int[] nums, int left, int right) {
        // 注意点 2：必须随机化
        int randomIndex = left + random.nextInt(right - left + 1);
        swap(nums, left, randomIndex);

        int pivot = nums[left];
        // [left + 1 .. le] <= pivot
        // (le, i] > pivot
        // 注意点 1：一定要设置成 left ，否则交换会出错
        int le = left;
        for (int i = left + 1; i <= right; i++) {
            // 这里写 < 或者 <= 都可以
            if (nums[i] <= pivot) {
                le++;
                swap(nums, le, i);
            }
        }

        swap(nums, left, le);
        return le;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

**注意**：必须随机化 pivot 元素。

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gx1n2h60pwj30qa06o3yx.jpg)

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gx1n2xdlplj30q206umxl.jpg)

## partition 2：把等于切分元素的所有元素等概率地分到了数组的两侧

避免了递归树倾斜，递归树相对平衡。

**参考代码**：

```java
import java.util.Random;

public class Solution {

    private static Random random = new Random(System.currentTimeMillis());

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;

        // 转换一下，第 k 大元素的索引是 len - k
        int target = len - k;

        while (true) {
            int index = partition(nums, left, right);
            if (index == target) {
                return nums[index];
            } else if (index < target) {
                left = index + 1;
            } else {
                right = index - 1;
            }
        }
    }

    public int partition(int[] nums, int left, int right) {
        // 在区间随机选择一个元素作为标定点
        int randomIndex = left + random.nextInt(right - left + 1 );
        swap(nums, left, randomIndex);
        

        int pivot = nums[left];

        // 将等于 pivot 的元素分散到两边
        // [left, le) <= pivot
        // (ge, right] >= pivot

        int le = left + 1;
        int ge = right;

        while (true) {
            // 遇到 nums[le] >= pivot 的时候停下来
            // 遇到与 pivot 相等的元素，是通过交换被等概率分到两边的
            while (le <= ge && nums[le] < pivot) {
                le++;
            }
            while (le <= ge && nums[ge] > pivot) {
                ge--;
            }

            if (le > ge) {
                break;
            }
            swap(nums, le, ge);
            le++;
            ge--;
        }

        // 这里还要交换，注意是 ge
        swap(nums, left, ge);
        return ge;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gx1n35tvwdj30qw06sgm0.jpg)

## partition 3：把等于切分元素的所有元素挤到了数组的中间

在有很多元素和切分元素相等的情况下，递归区间大大减少

```java
import java.util.Random;

public class Solution {

    private static Random RANDOM = new Random(System.currentTimeMillis());

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        int target = len - k;

        int left = 0;
        int right = len - 1;
        while (true) {
            int[] pIndex = partition(nums, left, right);

            int index1 = pIndex[0];
            int index2 = pIndex[1];

            if (target < index1) {
                // 下一轮搜索区间 [left, index1 - 1]
                right = index1 - 1;
            } else if (target == index1) {
                return nums[index1];
            } else if (target < index2) {
                left = index1 + 1;
                right = index2 - 1;
            } else if (target == index2) {
                return nums[index2];
            } else {
                // pIndex > target
                // 下一轮搜索区间 [index2 + 1, right]
                left = index2 + 1;
            }
        }
    }

    private int[] partition(int[] nums, int left, int right) {
        int randomIndex = left + RANDOM.nextInt(right - left + 1);
        swap(nums, randomIndex, left);

        // 循环不变量：
        // all in [left + 1, lt] < pivot
        // all in [lt + 1, i) = pivot
        // all in [gt, right] > pivot
        int pivot = nums[left];
        int lt = left;
        int gt = right + 1;

        int i = left + 1;
        while (i < gt) {
            if (nums[i] < pivot) {
                lt++;
                swap(nums, i, lt);
                i++;
            } else if (nums[i] == pivot) {
                i++;
            } else {
                gt--;
                swap(nums, i, gt);
            }
        }
        swap(nums, left, lt);
        // 这里要特别小心
        return new int[]{lt, gt - 1};
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gx1n3d4cf2j30ra06ymxk.jpg)

## 补：优先队列写法

思路：看 `k` 是在前面还是后面。

+ 前面，就用最小堆；
+ 后面，就用最大堆。

```java
import java.util.PriorityQueue;

public class Solution {

    // 根据 k 的不同，选最大堆和最小堆，目的是让堆中的元素更小
    // 思路 1：k 要是更靠近 0 的话，此时 k 是一个较大的数，用最大堆
    // 例如在一个有 6 个元素的数组里找第 5 大的元素
    // 思路 2：k 要是更靠近 len 的话，用最小堆

    // 所以分界点就是 k = len - k

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        if (k <= len - k) {
            // System.out.println("使用最小堆");
            // 特例：k = 1，用容量为 k 的最小堆
            // 使用一个含有 k 个元素的最小堆
            PriorityQueue<Integer> minHeap = new PriorityQueue<>(k, (a, b) -> a - b);
            for (int i = 0; i < k; i++) {
                minHeap.add(nums[i]);
            }
            for (int i = k; i < len; i++) {
                // 看一眼，不拿出，因为有可能没有必要替换
                Integer topEle = minHeap.peek();
                // 只要当前遍历的元素比堆顶元素大，堆顶弹出，遍历的元素进去
                if (nums[i] > topEle) {
                    minHeap.poll();
                    minHeap.add(nums[i]);
                }
            }
            return minHeap.peek();

        } else {
            // System.out.println("使用最大堆");
            assert k > len - k;
            // 特例：k = 100，用容量为 len - k + 1 的最大堆
            int capacity = len - k + 1;
            PriorityQueue<Integer> maxHeap = new PriorityQueue<>(capacity, (a, b) -> b - a);
            for (int i = 0; i < capacity; i++) {
                maxHeap.add(nums[i]);
            }
            for (int i = capacity; i < len; i++) {
                // 看一眼，不拿出，因为有可能没有必要替换
                Integer topEle = maxHeap.peek();
                // 只要当前遍历的元素比堆顶元素严格小，堆顶弹出，遍历的元素进去
                if (nums[i] < topEle) {
                    maxHeap.poll();
                    maxHeap.add(nums[i]);
                }
            }
            return maxHeap.peek();
        }

    }
}
```