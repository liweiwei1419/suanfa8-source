---
title: 2.4 冒泡排序的优化
icon: shipin
category: 排序算法
tags:
  - 排序算法  
  - 减治思想
---

::: danger 优化的点
如果在一次循环中，都没有「冒泡」行为发生，整个排序任务就可以 **提前终止**。
:::

+ 可以设置布尔变量 `sorted`，假设每一轮循环开始假设数组是有序的；
+ 一旦在比较的过程中执行了交换，说明数组不是有序的，将 `sorted` 设置为 `false`；
+ 如果在一次循环中，都没有「冒泡」行为发生，才可以认为剩下的部分是有序的。

**参考代码**：

> 说明：该代码在「力扣」运行超时。

```java
public class Solution {

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        for (int i = len - 1; i >= 0; i--) {
            // 先默认数组是有序的，只要发生一次交换，就必须进行下一轮比较
            boolean sorted = true;
            for (int j = 0; j < i; j++) {
                if (nums[j] > nums[j + 1]) {
                    swap(nums, j, j + 1);
                    sorted = false;
                }
            }

            // 如果在内层循环中，都没有执行一次交换操作，说明此时数组已经是升序数组
            if (sorted) {
                break;
            }
        }
        return nums;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

补充说明：下面这份代码是讲课的时候写的代码，区别仅在于内层循环中对 `j` 的定义不同。

```java
public class Solution {

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        for (int i = 0; i < len - 1; i++) {
            boolean sorted = true;
            for (int j = 1; j < len - i; j++) {
                if (nums[j - 1] > nums[j]) {
                    swap(nums, j - 1, j);
                    sorted = false;
                }
            }
            if (sorted) {
                return nums;
            }
        }
        return nums;
    }
    
    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```





**复杂度分析**：

- 时间复杂度：$O(N^2)$，这里 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$。



## 调试代码

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gwxg2vdammj312a0budhq.jpg)

使用一个极端的例子来理解冒泡排序：

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gwxg32pop8j312k0h60v5.jpg)

控制台输出：

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gwxg3enwrlj30qi090jtc.jpg)