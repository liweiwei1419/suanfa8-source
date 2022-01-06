---
title: 「力扣」第 448 题：找到所有数组中消失的数字（简单）
icon: yongyan
category: 数组
tags:
  - 数组
  - 原地哈希
---



+ 题目链接：[448. 找到所有数组中消失的数字](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/)；
+ 题解链接：[桶排序 + 基于“异或运算”交换两个变量的值（Python 代码、Java 代码）](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/solution/tong-pai-xu-ji-yu-yi-huo-yun-suan-jiao-huan-liang-/)。


## 题目描述


>给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。
>
>找到所有在 [1, n] 范围之间没有出现在数组中的数字。
>
>您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。
>
>示例:
>
>输入:
>[4,3,2,7,8,2,3,1]
>
>输出:
>[5,6]

## 桶排序 + 基于“异或运算”交换两个变量的值（Python 代码、Java 代码）

**思路分析**：

+ 比较容易想到的思路是“桶排序”，“桶排序”的思想很简单，“一个萝卜一个坑”，但这道题比较让人头疼的是“不使用额外空间”。

“桶排序”的思想，有些地方也把它叫做“抽屉原理”，以下介绍来自“百度百科”之[“抽屉原理”](https://baike.baidu.com/item/%E6%8A%BD%E5%B1%89%E5%8E%9F%E7%90%86/233776?fr=aladdin)词条：


> 抽屉原理的一般含义为：“如果每个抽屉代表一个集合，每一个苹果就可以代表一个元素，假如有 n + 1 个元素放到 n 个集合中去，其中必定有一个集合里至少有两个元素。” 抽屉原理有时也被称为鸽巢原理。它是组合数学中一个重要的原理。

+ “桶排序”的子步骤是“交换数组中两个位置的元素”，**如果不使用额外的空间，可以使用“异或运算”代替**。

### 方法一：桶排序 + 基于“异或运算”交换两个变量的值

交换两个整数，有两种比较 tricky 的做法。下面给出结论。

“基于异或运算”是因为利用了“异或运算”是不进位的二进制加法。它有如下性质：

> 如果 `a ^ b = c` ，那么 `a ^ c = b` 与 `b ^ c = a` 同时成立，利用这一条，可以用于交换两个变量的值。

于是，交换两个变量的值，例如 `a` 和 `b`，不使用第三个变量，有两种不同的方法：

| 基于异或运算                        | 基于加减法                            |
| ----------------------------------- | ------------------------------------- |
| `a = a ^ b`<br>`b = a ^ b`<br>`a = a ^ b` | `a = a + b`<br/>`b = a - b`<br/>`a = a - b` |

我理解的方式就是自己在纸上写几个例子，并且记住这个结论。个人觉得“基于异或运算”交换两个变量的值好记一些，因为右边都一样，左边依次是 `a`、`b`、`a`。

**参考代码 1**：

Python 代码：

```Python []
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        size = len(nums)

        for i in range(size):
            while nums[i] != i + 1:
                if nums[i] != nums[nums[i] - 1]:
                    self.__swap(nums, i, nums[i] - 1)
                else:
                    break

        res = []
        for i in range(size):
            if nums[i] != i + 1:
                res.append(i + 1)
        return res

    def __swap(self, nums, index1, index2):
        nums[index1] = nums[index1] ^ nums[index2]
        nums[index2] = nums[index1] ^ nums[index2]
        nums[index1] = nums[index1] ^ nums[index2]
```

Java 代码：

```Java []
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {

    public List<Integer> findDisappearedNumbers(int[] nums) {
        int len = nums.length;

        for (int i = 0; i < len; i++) {
            while (nums[i] != i + 1 && nums[nums[i] - 1] != nums[i]) {
                swap(nums, i, nums[i] - 1);
            }
        }

        // System.out.println("桶排序以后的数组：" + Arrays.toString(nums));
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != i + 1) {
                res.add(i + 1);
            }
        }
        return res;
    }

    private void swap(int[] nums, int i, int j) {
        nums[i] = nums[i] ^ nums[j];
        nums[j] = nums[i] ^ nums[j];
        nums[i] = nums[i] ^ nums[j];
    }

}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是数组的长度。
+ 空间复杂度：$O(1)$，这里没有使用额外的空间。


说明：同样的思路和技巧，可以解决[「力扣」第 41 题：缺失的第一个正数](https://leetcode-cn.com/problems/first-missing-positive)。


### 方法二：位图（使用了 1 个额外空间，不符合题意，该方法仅作了解）

**参考代码 2**：

Python 代码：

```Python []
from typing import List


class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        size = len(nums)

        # 位图
        map = 1 << (size)
        
        # 调试代码
        # print(bin(map))

        for num in nums:
            map |= 1 << (num - 1)
            # 调试代码
            # print(bin(map))

        res = []

        for index in range(size):
            if (map >> index) & 1 == 0:
                res.append(index + 1)
        return res
```

Java 代码：

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {
    
    public List<Integer> findDisappearedNumbers(int[] nums) {
        int len = nums.length;
        int map = 1 << len;

        // 调试代码
        // System.out.println(Integer.toBinaryString(map));
        for (int num : nums) {
            map |= 1 << (num - 1);
            // 调试代码
            // System.out.println(Integer.toBinaryString(map));
        }

        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < len; i++) {
            if (((map >> i) & 1) == 0) {
                res.add(i + 1);
            }
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是数组的长度。
+ 空间复杂度：$O(1)$，这里使用了 1 个额外的空间。

<Vssue title="find-all-numbers-disappeared-in-an-array"/>
