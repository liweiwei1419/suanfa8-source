---
title: 「力扣」第 50 题：Pow(x, n)（中等）
icon: yongyan
category: 递归
tags:
  - 分治算法
  - 位运算
---

- 题目链接：[50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)；
- 题解链接：[自顶向下（递归）与自顶向上（递推）](https://leetcode-cn.com/problems/powx-n/solution/ba-zhi-shu-bu-fen-kan-zuo-er-jin-zhi-shu-python-da/)。

今天要和大家分享的是「力扣」第 50 题：Pow(x, n)。这题有一个名称叫「快速幂」，我们这里只分享「递归」和「非递归」的写法，其中 **「递归」对应「当指数为奇数时，把指数分解成偶数 + 1，当指数为偶数时，把指数除以 2」，「非递归」对应把指数转化成二进制**。「快速幂」还有矩阵的求法，感兴趣的朋友可以在网络上自行搜索。

## 题目描述

实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。

**示例 1：**

```
输入：x = 2.00000, n = 10
输出：1024.00000
```

**示例 2：**

```
输入：x = 2.10000, n = 3
输出：9.26100
```

**示例 3：**

```
输入：x = 2.00000, n = -2
输出：0.25000
解释：2-2 = 1/22 = 1/4 = 0.25
```

**提示：**

- $-100.0 < x < 100.0$
- $-2^{31} \le n \le 2^{31}-1$
- $-10^4 \le x^n \le 10^4$​

### 方法一：递归（分治算法）

这个思路关键的地方在于：**不断降低指数**。

例如：$2^7 = 2^{6+1} $​，为什么要把 $1$​ 单独拿出来呢，这是因为 **指数为偶数的时可以让底数变大，而指数变成原来的一半**。$2^6 = 2^{2\times 3} = (2^2)^3$​。把递归树画出来就是下面这个样子，到指数为 $0$​ 或者为 $1$​​ 的时候递归终止。

拆分的规律如下：

- 如果指数为奇数，拆成偶数 + 1；
- 如果指数为偶数，拆成指数除以 2；

下面画一个递归树理解拆分的过程。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae1a18ee6e034b5db2755210cdf10d29~tplv-k3u1fbpfcp-zoom-1.image)

程序在计算的时候，先不停地让指数降低，然后再一层一层向上传递结果的方式计算出 $x^n$，大家可以自行想象程序是如何计算结果的。

**参考代码 1**：

```java
public class Solution {

    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) {
            return 1 / dfs(x, -N);
        }
        return dfs(x, N);
    }

    private double dfs(double x, long n) {
        if (n == 0) {
            return 1;
        }

      	// n % 2 == 1 包含了 n = 1 这种情况
        if (n % 2 == 1) {
            return x * dfs(x, n - 1);
        }
        return dfs(x * x, n / 2);
    }
}
```

**说明**：

- 当指数 `n` 为负数的时候，$x^n = x^{-1 \times (-n)} = (x^{-1})^{-n} =  (\frac{1}{x})^{-n} = \frac{1}{x^{-n}}$；

- 由于 `n` 有可能等于 $-2^{31}$​，因此一开始的时候需要先把 `n` 转换成长整型；

- 递归函数如果实在没有什么好的名字，叫 `dfs` 是比较通用的，这里其实叫 `pow` 也可以，只是为了和主调用函数区分（虽然 Java 有重载），所以叫另外一个名字。

**时间复杂度**：$O(\log n)$，$O(\log_2 n) = O(\log n)$​​。

如果把递归解法看成「自顶向下」解决问题，其实这个问题还可以「自底向上」地解决。

想法是：从 $x^1$​ 开始，依次计算 $x^2$​、$x^4$​、$x^8$​、$x^{16}$​ ……，让指数成倍增加。在自增的过程中，**如果 $x^n$​ 需要其中的数，把它乘到结果集中**。因此拆分的规律是：**把指数拆成 $2$​​ 的方幂的和**。例如：把 $18$​ 看成 $16 + 2$​​。 这个过程其实就是把一个十进制整数转化为二进制的过程。

### 方法二：把指数转换成二进制

例如计算 $x^{18}$​​，其中 $18$​​ 可以看成：

$$
18=1 \times 2^4 + 0 \times 2^3 +  0 \times 2^2  +1 \times 2^1 + 0 \times 2^0
$$

于是 $x^{18} = x^{2^4} \times x^{2^1}$​，$2$​​ 的方幂前的系数是我们需要知道的，把十进制转换为二进制我们都很熟悉了，**不断除以 2，看余数**。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3552d13748c040d5809bebb362b4e542~tplv-k3u1fbpfcp-zoom-1.image)

下面的「参考代码 2」就是上面的运算的模拟。

**参考代码 2**：

```java
public class Solution {

    public double myPow(double x, int n) {
        long N = n;
        if (n < 0) {
            x = 1 / x;
            N = -N;
        }

        double res = 1.0;
        while (N > 0) {
            if (N % 2 == 1) {
                res *= x;
            }
            x *= x;
            N /= 2;
        }
        return res;
    }
}
```

**时间复杂度**：$O(\log n)$，$O(\log_2 n) = O(\log n)$。

这就是今天要和大家分享的内容，感谢大家的收看。

代码：

```java
public class Solution {

    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) {
            return 1 / dfs(x, -N);
        }
        return dfs(x, N);
    }

    private double dfs(double x, long n) {
        if (n == 0) {
            return 1;
        }

      	// n % 2 == 1 包含了 n = 1 这种情况
        if (n % 2 == 1) {
            return x * dfs(x, n - 1);
        }
        return dfs(x * x, n / 2);
    }
}
```

```java
public class Solution {

    public double myPow(double x, int n) {
        long N = n;
        if (n < 0) {
            x = 1 / x;
            N = -N;
        }

        double res = 1.0;
        while (N > 0) {
            if (N % 2 == 1) {
                res *= x;
            }
            x *= x;
            N /= 2;
        }
        return res;
    }
}
```

今天要和大家分享的是「力扣」第 50 题：Pow(x, n)。这题有一个名称叫「快速幂」，我们这里只分享「递归」和「非递归」的写法，其中 **「递归」对应「当指数为奇数时，把指数分解成偶数 + 1，当指数为偶数时，把指数除以 2」，「非递归」对应把指数转化成二进制**。「快速幂」还有矩阵的求法，感兴趣的朋友可以在网络上自行搜索（我也不会）。

下面说正事。

实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。

**示例 1：**

```
输入：x = 2.00000, n = 10
输出：1024.00000
```

**示例 2：**

```
输入：x = 2.10000, n = 3
输出：9.26100
```

**示例 3：**

```
输入：x = 2.00000, n = -2
输出：0.25000
解释：2-2 = 1/22 = 1/4 = 0.25
```

**提示：**

- $-100.0 < x < 100.0$
- $-2^{31} \le n \le 2^{31}-1$
- $-10^4 \le x^n \le 10^4$​

### 方法一：递归（分治算法）

这个思路关键的地方在于：**不断降低指数**。

例如：$2^7 = 2^{6+1} $​，为什么要把 $1$​ 单独拿出来呢，这是因为 **指数为偶数的时可以让底数变大，而指数变成原来的一半**。$2^6 = 2^{2\times 3} = (2^2)^3$​。把递归树画出来就是下面这个样子，到指数为 $0$​ 或者为 $1$​​ 的时候递归终止。

拆分的规律如下：

- 如果指数为奇数，拆成偶数 + 1；
- 如果指数为偶数，拆成指数除以 2；

下面画一个递归树理解拆分的过程。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gt391glcm1j311z0u0dhe.jpg)

程序在计算的时候，先不停地让指数降低，然后再一层一层向上传递结果的方式计算出 $x^n$，大家可以自行想象程序是如何计算结果的。

**参考代码 1**：

```java
public class Solution {

    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) {
            return 1 / dfs(x, -N);
        }
        return dfs(x, N);
    }

    private double dfs(double x, long n) {
        if (n == 0) {
            return 1;
        }

      	// n % 2 == 1 包含了 n = 1 这种情况
        if (n % 2 == 1) {
            return x * dfs(x, n - 1);
        }
        return dfs(x * x, n / 2);
    }
}
```

**说明**：

- 当指数 `n` 为负数的时候，$x^n = x^{-1 \times (-n)} = (x^{-1})^{-n} =  (\frac{1}{x})^{-n} = \frac{1}{x^{-n}}$；

- 由于 `n` 有可能等于 $-2^{31}$​，因此一开始的时候需要先把 `n` 转换成长整型；

- 递归函数如果实在没有什么好的名字，叫 `dfs` 是比较通用的，这里其实叫 `pow` 也可以，只是为了和主调用函数区分（虽然 Java 有重载），所以叫另外一个名字。

**时间复杂度**：$O(\log n)$，$O(\log_2 n) = O(\log n)$​​。

如果把递归解法看成「自顶向下」解决问题，其实这个问题还可以「自底向上」地解决。

想法是：从 $x^1$​ 开始，依次计算 $x^2$​、$x^4$​、$x^8$​、$x^{16}$​ ……，让指数成倍增加。在自增的过程中，**如果 $x^n$​ 需要其中的数，把它乘到结果集中**。因此拆分的规律是：**把指数拆成 $2$​​ 的方幂的和**。例如：把 $18$​ 看成 $16 + 2$​​。 这个过程其实就是把一个十进制整数转化为二进制的过程。

### 方法二：把指数转换成二进制

例如计算 $x^{18}$​​，其中 $18$​​ 可以看成：

$$
18=1 \times 2^4 + 0 \times 2^3 +  0 \times 2^2  +1 \times 2^1 + 0 \times 2^0
$$

于是 $x^{18} = x^{2^4} \times x^{2^1}$​，$2$​​ 的方幂前的系数是我们需要知道的，把十进制转换为二进制我们都很熟悉了，**不断除以 2，看余数**。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gt3b0pktb5j30uc0pqmyo.jpg)

下面的「参考代码 2」就是上面的运算的模拟。

**参考代码 2**：

```java
public class Solution {

    public double myPow(double x, int n) {
        long N = n;
        if (n < 0) {
            x = 1 / x;
            N = -N;
        }

        double res = 1.0;
        while (N > 0) {
            if (N % 2 == 1) {
                res *= x;
            }
            x *= x;
            N /= 2;
        }
        return res;
    }
}
```

**时间复杂度**：$O(\log n)$，$O(\log_2 n) = O(\log n)$。

这就是今天要和大家分享的内容，感谢大家的收看。

---

Python 代码：

```python
class Solution:
    def myPow(self, x, n):
        if n < 0:
            x = 1 / x
            n = - n
        res = 1
        while n:
            if n & 1 == 1:
                res *= x
            x *= x
            n >>= 1
        return res
```

Python 代码：

```python
class Solution:
    def myPow(self, x, n):
        if n == 0:
            return 1
        if n < 0:
            return 1 / self.myPow(x, -n)

        if n & 1:
            return x * self.myPow(x, n - 1)
        return self.myPow(x * x, n // 2)
```

###
