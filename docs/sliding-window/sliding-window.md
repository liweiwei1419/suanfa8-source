# 滑动窗口是什么

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwyeqkv8npj31120gmwfz.jpg)

这一部分我们要和大家分享的内容是「滑动窗口」。翻开《算法（第 4 版）》《算法导论》，都没有看到「滑动窗口」的定义。唯一有点儿沾边的是《算法导论》讲到「滚动哈希」，其实就是固定长度的滑动窗口。

在我看来「滑动窗口」更像是一种 **技巧**，还不是编程思想，它的应用没有那么广泛，也就是说：使用「滑动窗口」解决的问题很有局限性，并不像分治思想、减治思想、（深度优先、广度优先）遍历、枚举那样具有普遍意义。

> 如果大家感兴趣，可以在网上搜索「算法思想」「编程思想」，或者平时在做题的过程中，自己思考和总结一些算法思想，相信是比做算法问题更有意义的事情。

知道「滑动窗口」这个名词还是在「力扣」上刷题，刷到了「Sliding Window」标签的问题。

解决这一类问题的特点是：
+ 用于解决在 **数组** 上的问题；
+ 使用两个变量，称为左指针、右指针（或者快指针、慢指针）；
+ 右指针先向右移动、左指针再向右边移动，**交替进行**；
+ 直到右指针移动到数组的末尾。

下面的动画展示了这样的过程，它像极了一个窗口在数组上滑动，因此称为「滑动窗口」。

![图片](https://tva1.sinaimg.cn/large/008i3skNgy1gwyercvpv3g30pj04ek2u.gif)

## 理解「滑动窗口」需要先理解「暴力解法」

下面这 2 道问题是使用「滑动窗口」解决的基本问题，它们非常重要。

+ 「力扣」第 3 题：无重复字符的最长子串（中等）
+ 「力扣」第 209 题：长度最小的子数组（中等）

掌握这些问题的方式就是先思考暴力解法，然后再思考如何优化。

「滑动窗口」问题是典型的应用「循环不变量」解决的问题，比较考验我们编码和调试的能力。

| 题目链接                                                     | 力扣                                                         | B 站                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| [76. 最小覆盖子串（困难）](https://leetcode-cn.com/problems/minimum-window-substring/) | [力扣](https://leetcode-cn.com/problems/minimum-window-substring/solution/zui-xiao-fu-gai-zi-chuan-by-leetcode-solution/) | [B 站](https://www.bilibili.com/video/BV1aK4y1t7Qd) |
| [424. 替换后的最长重复字符（中等）](https://leetcode-cn.com/problems/longest-repeating-character-replacement/) | [力扣](https://leetcode-cn.com/problems/longest-repeating-character-replacement/solution/ti-huan-hou-de-zui-chang-zhong-fu-zi-fu-eaacp/) | [B 站](https://www.bilibili.com/video/BV14r4y1K7rN) |
| [567. 字符串的排列（中等）](https://leetcode-cn.com/problems/permutation-in-string/) | [力扣](https://leetcode-cn.com/problems/permutation-in-string/solution/zi-fu-chuan-de-pai-lie-by-leetcode-q6tp/) | [B 站](https://www.bilibili.com/video/BV175411E761) |
| [978. 最长湍流子数组（中等）](https://leetcode-cn.com/problems/longest-turbulent-subarray/) | [力扣](https://leetcode-cn.com/problems/longest-turbulent-subarray/solution/zui-chang-tuan-liu-zi-shu-zu-by-leetcode-zqoq/) | [B 站](https://www.bilibili.com/video/BV1PV411i73Y) |
| [992. K 个不同整数的子数组（困难）](https://leetcode-cn.com/problems/subarrays-with-k-different-integers/) | [力扣](https://leetcode-cn.com/problems/subarrays-with-k-different-integers/solution/k-ge-bu-tong-zheng-shu-de-zi-shu-zu-by-l-ud34/) | [B 站](https://www.bilibili.com/video/BV1xy4y1Y7GL) |

滑动窗口与双指针是基于暴力解法的优化，少考虑很多暴力解法要考虑的子问题，将时间复杂度降到线性。解题时需要考虑的细节较多，定义好「循环不变量」是关键。

---



滑动窗口的时间复杂度是线性的。

解决数组里的「**连续」子区间问题，「连续」是重要的关键字；**

## 解决特定问题

「滑动窗口」是一种解决在 **数组** 里的 **特定问题** 的算法技巧，我们甚至都不能在一些经典的算法教程里看到「滑动窗口」的准确定义。

可以使用滑动窗口解决的问题通常是这样的：

- 右指针先向右移动一段距离；
- 左指针再向右移动一段距离。

二者交替进行，这样的过程看起来像极了一个窗口在平面上滑动，所以称为「滑动窗口」。直到右指针到达了数组的末尾，程序结束。

和绝大多数算法和数据结构一样，「滑动窗口」算法只适用于部分问题，或者我们可以这样说：**可以使用「滑动窗口」算法的问题需要满足一定的前提**。

## **暴力解法的优化**

充分理解「滑动窗口」技巧的算法思想，我们 **首先需要理解这些问题的「暴力解法」**，「滑动窗口」技巧是针对这些特定问题的「暴力解法」的优化，使得解决这些问题的时间复杂度降到线性级别。

## 总结

1、连续；

2、`right` 主动、`left` 被动；

3、用循环不变量解题。

可以使用滑动窗口的问题中会有两个指针。一个用于延伸窗口的 `right` 指针，和一个用于收缩窗口的 `left` 指针。在任意时刻，只有一个指针运动，而另一个保持静止。

「滑动窗口」的问题其实思想并不难，但是有一定的编码量，如果不小心很可能出错。

我在写「滑动窗口」的问题的时候，会使用到一个解决边界问题的小技巧，就是所谓的「循环不变量」，在这里为和大家总结如下：

#### 这里「循环不变量」的定义是一个空区间（如果不是空区间，也要满足定义）；

- 这个区间一开始的时候是一个空区间；

- 在遍历的过程中，维持循环不变量的定义；

- 在遍历完成以后，滑动窗口完成了所有可能的情况而不会错过最优解。

需要使用一些变量去描述「滑动窗口」内元素的性质，这里需要根据具体问题具体设计。

对于一个固定的左端点，满足条件的右端点的集合是连续的，但是题目只要我们求最值。

右端点主动，左端点被动。



# **「滑动窗口」总结**

来自知乎：

滑动窗口本质上来源于单调性，一般可以理解为，随着左端点位置的增加，其最优决策的右端点位置单调不减。

事实上是利用决策单调性来实现复杂度优化。

参考资料：

1、雪菜；

2、刘宇波；
![输入图片说明](https://images.gitee.com/uploads/images/2021/0906/080755_c8dc5722_426516.png "屏幕截图.png")

## **从具体例子理解「滑动窗口」算法**

## 例 1：「力扣」第 3 题：[无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)（中等）

给定一个字符串，请你找出其中不含有重复字符的 **最长子串** 的长度。

**一句话题解**：

> 如果一个子串有重复字符，那么左端点固定，长度更长的子串，一定有重复子串，而不必枚举。此时需要将左边界右移。

方法一：滑动窗口

最基本的滑动窗口写法。

**细节**：声明频数数组，这个技巧在很多地方都会用到。

右边界滑动到刚刚好有重复的时候停下，左边界滑动到刚刚好没有重复的时候停下。

```java
public class Solution {

    public int lengthOfLongestSubstring(String s) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        // 当 window 中某个字符的频数为 2 时，表示滑动窗口内有重复字符
        // 频数数组，128 由测试数据的范围决定
        int[] freq = new int[128];
        // 转换为字符数组，避免每一次 s.charAt() 方法检查下标越界
        char[] charArray = s.toCharArray();
        int left = 0;
        int right = 0;
        int res = 1;
        // 循环不变量：区间[left..right] 内没有重复元素
        while (right < len) {
            freq[charArray[right]]++;
            // 此时 [left..right) 内如果没有重复元素，就尝试扩张 right
            // 否则缩小左边界，while 循环体内不断缩小边界
            if (freq[charArray[right]] == 2) {
                while (freq[charArray[right]] == 2) {
                    freq[charArray[left]]--;
                    left++;
                }
            }

            // 此时 [left..right] 内没有重复元素
            res = Math.max(res, right - left + 1);
            right++;
        }
        return res;
    }
}
```

```java
public class Solution {

    public int lengthOfLongestSubstring(String s) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        // 当 window 中某个字符的频数为 2 时，表示滑动窗口内有重复字符
        // 频数数组，128 由测试数据的范围决定
        int[] freq = new int[128];
        // 转换为字符数组，避免每一次 s.charAt() 方法检查下标越界
        char[] charArray = s.toCharArray();
        int left = 0;
        int right = 0;
        int res = 1;
        // 循环不变量：区间[left..right] 内没有重复元素
        while (right < len) {
            freq[charArray[right]]++;
            // 此时 [left..right) 内如果没有重复元素，就尝试扩张 right
            // 否则缩小左边界，while 循环体内不断缩小边界
            if (freq[charArray[right]] == 2) {
                while (freq[charArray[right]] == 2) {
                    freq[charArray[left]]--;
                    left++;
                }
            }
            
            // 此时 [left..right] 内没有重复元素
            res = Math.max(res, right - left + 1);
            right++;
        }
        return res;
    }
}
```

```go
package main

func lengthOfLongestSubstring(s string) int {
        n := len(s)
        if n < 2 {
                return n
        }

        var freq = [128]int{}
        res := 1
        left := 0
        right := 0
        // 循环不变量：区间 [left, right) 里没有重复字符
        for right < n {
                freq[s[right]]++

                if freq[s[right]] == 2 {
                        for freq[s[right]] == 2 {
                                freq[s[left]]--
                                left++
                        }
                }
                right++
                res = max(res, right-left)
        }
        return res
}

func max(x, y int) int {
        if x < y {
                return y
        }
        return x
}
```

方法二：哈希表

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int lengthOfLongestSubstring(String s) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        int res = 1;
        // key：数值，value：最新的下标
        Map<Character, Integer> map = new HashMap<>(len);
        char[] charArray = s.toCharArray();

        int left = 0;
        int right = 0;
        // [left..right] 没有重复元素
        while (right < len) {
            Character c = charArray[right];
            if (map.containsKey(c)) {
                left = Math.max(left, map.get(c) + 1);
            }
            map.put(c, right);
            res = Math.max(res, right - left + 1);
            right++;
        }
        return res;
    }
}
```

https://mp.weixin.qq.com/s/6YeZUCYj5ft-OGa85sQegw
