---
title: 「力扣」第 374 题：猜数字大小（简单）
icon: jingxuan
category: 二分查找
tags: 
  - 二分查找
---

+ 题目地址：[374. 猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)；
+ 题解地址：[借本题说一说取中位数的写法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/guess-number-higher-or-lower/solution/shi-fen-hao-yong-de-er-fen-cha-zhao-fa-mo-ban-pyth/)。

## 题目描述

猜数字游戏的规则如下：

- 每轮游戏，我都会从 **1** 到 ***n*** 随机选择一个数字。 请你猜选出的是哪个数字。
- 如果你猜错了，我会告诉你，你猜测的数字比我选出的数字是大了还是小了。

你可以通过调用一个预先定义好的接口 `int guess(int num)` 来获取猜测结果，返回值一共有 3 种可能的情况（`-1`，`1` 或 `0`）：

- -1：我选出的数字比你猜的数字小 `pick < num`
- 1：我选出的数字比你猜的数字大 `pick > num`
- 0：我选出的数字和你猜的数字一样。恭喜！你猜对了！`pick == num`

返回我选出的数字。

**示例 1：**

```
输入：n = 10, pick = 6
输出：6
```

**示例 2：**

```
输入：n = 1, pick = 1
输出：1
```

**示例 3：**

```
输入：n = 2, pick = 1
输出：1
```

**示例 4：**

```
输入：n = 2, pick = 2
输出：2
```

 **提示：**

- `1 <= n <= 231 - 1`
- `1 <= pick <= n`

## 借本题说一说取中间数的写法（Python 代码、Java 代码）

**参考代码**：

注意：以下虽然我用两种语言作答，但是它们的逻辑上还有一点点区别，那就是在取中间数的时候。

<CodeGroup>
<CodeGroupItem title="Java">

```java
class GuessGame {

    private static final int NUM = 6;

    int guess(int num) {
        if (num == NUM) {
            return 0;
        } else if (num < NUM) {
            return -1;
        }
        return 1;
    }
}


public class Solution extends GuessGame {

    public int guessNumber(int n) {
        int left = 1;
        int right = n;
        while (left < right) {
            // int mid = left + (right - left + 1) / 2;
            int mid = (left + right + 1) >>> 1;
            int guessNum = guess(mid);
            if (guessNum == -1) {
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        // 最后剩下的数一定是所求，无需后处理
        return left;
    }


    public static void main(String[] args) {
        Solution solution = new Solution();
        int n = 10;
        int guessNumber = solution.guessNumber(n);
        System.out.println(guessNumber);
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python
def guess(num):
    pass


class Solution(object):
    def guessNumber(self, n):
        left = 1
        right = n
        while left < right:
            # mid = left + (right - left) // 2
            mid = (left + right) >> 1
            if guess(mid) == 1:
                left = mid + 1
            else:
                right = mid
        # 最后剩下的数一定是所求，无需后处理
        return left
```

</CodeGroupItem>
</CodeGroup>


以上是本题题解，以下才是本文真正想说的，你应该已经注意到了，上面的示例代码中，`mid = left + (right - left) // 2` 和 `int mid = left + (right - left + 1) / 2;` 都被我注释掉了，不是因为它们不正确，而是因为它们不够好，下面就来具体说说。

1、最早学习二分法的时候，写中间数的下标是这样的：


<CodeGroup>
<CodeGroupItem title="Java">

```java
int mid = (left + right) / 2;
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python
mid = (left + right) // 2
```

</CodeGroupItem>
</CodeGroup>

2、后来被告知在 `left` 和  `right` 很大的时候，`left + right` 会发生整型溢出，变成负数，这是一个 bug 得改！

于是我们写成：

<CodeGroup>
<CodeGroupItem title="Java">

```java
int mid = left + (right - left) / 2;
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python
mid = left + (right - left) // 2
```

</CodeGroupItem>
</CodeGroup>

然后又被告知 `mid = left + (right - left) // 2` 在 `right` 很大、 `left` 是负数且很小的时候， `right - left` 也有可能超过 int 类型能表示的最大值，只不过一般情况下 `left` 和 `right` 表示的是数组索引值，`left` 是非负数，因此 `right - left` 溢出的可能性很小。

3、最后，在 Java 的 JDK 的 `Collections` 和 `Arrays` 提供的 `binarySearch` 方法里看到了，中位数是这样取的：

```java
int mid = (low + high) >>> 1;
```

怎么又变成“+”了，一头雾水啊，会整型溢出吗？后来查了查资料，有可能会整型溢出的，不过结果依然正确。下面是原因：

> `left + right` 在发生整型溢出以后，会变成负数，此时如果除以 2 ，`mid` 是一个负数，但是经过**无符号右移**，可以得到在不溢出的情况下正确的结果。

首先解释“无符号右移”，在 Java 中，无符号右移运算符 `>>>` 和右移运算符 `>>` 有区别：

+ 右移运算符 `>>` 在右移时，丢弃右边指定位数，左边补上符号位；

+ 无符号右移运算符 `>>>` 在右移时，丢弃右边指定位数，左边补上 $0$，也就是说，对于正数来说，二者一样，而负数通过 `>>>` 后能变成正数。

了解了这一点，就能够理解 Java 中用 `int mid = (low + high) >>> 1;` 的原因了，关键不在 “+” ，而是“无符号右移”，在 Java 的 `Collections` 和 `Arrays` 提供的 `binarySearch` 方法里，`low` 和 `high` 都表示索引值，它们都是非负数，即使相加以后整型溢出，结果还是正确的，“位运算”本身就比其它运算符快，因此使用“+”和“无符号右移”是既快又好的做法。

如果你用 Java 写的话，不妨做下面的试验：

用“+”和除法，不能通过，提示也很清楚了。

![image.png](https://pic.leetcode-cn.com/049e64ded6739e8bd6955a1d5e3ef76acc0aac0ad12909bdd58772dd6d465240-image.png)

如果你用 Python 的话，就可以过，这是因为：当 `left + right` 很大的时候，Python 就自动帮你转成 long 类型了，因此结果也不会错。 

![image.png](https://pic.leetcode-cn.com/46e50c5802c6b28bafe78c7b3ca88872139844177e929259ab5d0117ba61d52d-image.png)

## 总结

+ `int mid = (left + right) / 2;` 是初级写法，是有 bug 的；

+ `int mid = left + (right - left) / 2;` 是正确的写法，说明你考虑到了整型溢出的风险；

+ `int mid = (low + high) >>> 1;` 首先肯定是正确的写法，其实也是一个装 ❌ 的写法，理由上面已经叙述过了。
