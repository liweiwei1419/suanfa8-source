---
title: 4 自底向上的归并排序（选学）
icon: yongyan
category: 排序算法
tags:
  - 分而治之
  - 归并排序
---

本节讲解了：自底向上的归并排序，选学、面试基本不考。

以上我们使用的是「自顶向下」的归并排序，下面我们介绍「自底向上」的归并排序算法。我们并不须要递归，只须要迭代就可以了。

假设待排序的数组为：`[8, 6, 2, 3, 1, 5, 7, 4]`。

首先对这个数组每隔 $2$ 个元素进行一个划分，得到：

![image-20211223042040849](https://tva1.sinaimg.cn/large/008i3skNgy1gxn9ie3y8cj30sg04674j.jpg)

对每一个划分内的元素进行排序，得到：

![image-20211223042105349](https://tva1.sinaimg.cn/large/008i3skNgy1gxn9itgc5bj30ri044wes.jpg)

将上一步的结果，每隔 $4$ 个元素进行一次划分，得到

![image-20211223042126614](https://tva1.sinaimg.cn/large/008i3skNgy1gxn9j6j0igj30to04ywev.jpg)

这两个数组都满足归并排序的条件：前半部分与后半部分已经排好序。

所以可以分别进行归并排序，得到：

![image-20211223042152884](https://tva1.sinaimg.cn/large/008i3skNgy1gxn9jmxg2mj30s403yaaa.jpg)

将上一步的结果，每隔 $8$ 个元素进行一次划分，

![image-20211223042218049](https://tva1.sinaimg.cn/large/008i3skNgy1gxn9k2tarej30rq02waa9.jpg)



这个数组满足归并排序的条件，所以可以进行归并排序，得到：

![image-20211223042238698](https://tva1.sinaimg.cn/large/008i3skNgy1gxn9kfjmmzj30r603gt8y.jpg)

```java
for(int size = 1; size < n;size+=size){
    // 1 个元素，2 个元素，4 个元素，8 个元素
}
```

```java
/**
 * 自底向上的归并排序，使用迭代就可以完成
 */
@Test
public void test07() {
    int[] randomArray = ArrayUtil.generateRandomArray(100, 1, 100000);
    int n = randomArray.length;
    for (int size = 1; size <= n; size += size) {
        for (int k = 0; k + size < n; k += size + size) {
            mergeTwoSortedArray(randomArray, k, k + size - 1, Integer.min(k + size + size - 1, n - 1));
        }
    }
    System.out.println(Arrays.toString(randomArray));
    Boolean judgeArraySorted = ArrayUtil.judgeArraySorted(randomArray);
    System.out.println(judgeArraySorted);
}
```

小结：自底向上的归并排序的过程。

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gx493lu9nuj315i0k2jtx.jpg)