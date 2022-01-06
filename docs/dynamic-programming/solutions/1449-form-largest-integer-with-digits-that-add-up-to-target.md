---
title: 「力扣」第 1449 题：数位成本和为目标值的最大数字
icon: yongyan
category: 动态规划
tags:
  - 动态规划
--- 



1449. 数位成本和为目标值的最大数字（困难、完全背包问题）.md

+ 题目链接：[1449. 数位成本和为目标值的最大数字](https://leetcode-cn.com/problems/form-largest-integer-with-digits-that-add-up-to-target/)。

给你一个整数数组 `cost` 和一个整数 `target` 。请你返回满足如下规则可以得到的 **最大** 整数：

- 给当前结果添加一个数位（`i + 1`）的成本为 `cost[i]` （`cost` 数组下标从 0 开始）。
- 总成本必须恰好等于 `target` 。
- 添加的数位中没有数字 0 。

由于答案可能会很大，请你以字符串形式返回。

如果按照上述要求无法得到任何整数，请你返回 "0" 。

**示例 1：**

```
输入：cost = [4,3,2,5,6,7,2,5,5], target = 9
输出："7772"
解释：添加数位 '7' 的成本为 2 ，添加数位 '2' 的成本为 3 。所以 "7772" 的代价为 2*3+ 3*1 = 9 。 "977" 也是满足要求的数字，但 "7772" 是较大的数字。
 数字     成本
  1  ->   4
  2  ->   3
  3  ->   2
  4  ->   5
  5  ->   6
  6  ->   7
  7  ->   2
  8  ->   5
  9  ->   5
```

**示例 2：**

```
输入：cost = [7,6,5,5,5,6,8,7,8], target = 12
输出："85"
解释：添加数位 '8' 的成本是 7 ，添加数位 '5' 的成本是 5 。"85" 的成本为 7 + 5 = 12 。
```

**示例 3：**

```
输入：cost = [2,4,6,2,4,6,4,4,4], target = 5
输出："0"
解释：总成本是 target 的条件下，无法生成任何整数。
```

**示例 4：**

```
输入：cost = [6,10,15,40,40,40,40,40,40], target = 47
输出："32211"
```

**提示：**

- `cost.length == 9`
- `1 <= cost[i] <= 5000`
- `1 <= target <= 5000`

---



https://leetcode-cn.com/problems/form-largest-integer-with-digits-that-add-up-to-target/solution/xiang-xi-jiang-jie-wan-quan-bei-bao-zhuang-tai-de-/



恰好构成 `target` ，大多与背包有关。并且「每个数字可以无限选」，所以是「完全背包问题」。

每个数字有一个 `cost`，问选择的数字 `cost` 加起来 **恰好等于** `target` 时，数字的最大值.

### 状态定义：


`dp[i][j]`  表示：前 `i` 个元素，恰好构成成本为 `j` 时，构成的最大的整数（整数用字符串表示，无效状态用 '#' 表示。

> 注意「背包问题」里，下标都从 1 开始。



### 状态转移方程：

+ 初级版本：一种自然的转移就是枚举第 `i` 个元素选了多少了，但是对于这个问题有着更加经典且时间复杂度更优的做法。
+ 因为第 `i` 件物品（即本题的第 `i` 个元素）可以无限选，所以可以分为第 `i` 件物品选 $0$ 个和至少选 $1$ 个这两大类；
+  在考虑第 `i` 件物品转移的时候，要把它选的所有的情况都考虑完。状态转移方程如下：

```
dp[i][j] = std::max(dp[i - 1][j], dp[i][j - cost[i]] + value[i])
```

**注意**：

+ 完全背包问题 `dp[i][j - cost[i]]` 这里是 `i` ，「0-1 背包问题」，这里是 `i - 1`。

+ `dp[i - 1][j]` 表示：第 `i` 件物品选 $0$ 个；
+ `dp[i][j - cost[i]] + value[i]` 表示：第 `i` 件物品至少选一个。这样我们就把第 `i` 件物品可以选无限个都考虑到了。

再次解释状态转移方程：

+ 思考 `dp[i][j - cost[i]]` 状态代表了什么？表示前 `i` 个物品，恰好装进容量为 `j - cost[i]` 时能获得的最大值。里面是不是就包含了此时的背包里装了 0 个、或者 1 个、或者2 个、 或者 3 个，第 `i` 件物品，依此类推；
+ 方程后面 `+ value[i]` 表示把第 `i` 件物品放一个进去，此时背包里是不是就包含 1 个、或者 2 个、或者 3 个、等等。即「至少装了 1 个第 `i` 件物品」。这也是背包九讲里说的「加选一件」的概念。这是理解完全背包的关键，希望大家好好理解；
+ 这样我们就把第 `i` 件物品选无限个、不重不漏的都考虑到了。

---

到这里，状态的定义、以及状态的转移都有了，就只剩下状态的初始情况。

### 初始化

+ 初始状态 `dp[0][j]`，因为前面 $0$ 个物品（即没有物品）， 那么可以按「恰好装满」还是「不装满划分」；
+ 比如说 `dp[0][5]`，前面没有物品，你却要我装满背包容量为 $5$ 的体积，这种状态显然是非法的，根据题目要求我们可以设置相应的非法状态即可；
+ 因为 `dp[0][j]` 这个状态可以很好的表示初始时候的状态，所以背包问题里，都是「按下标为 1 开始的」。


## 总结


到这里差不多本题就讲的差不多了，后面还剩下一点细枝末节。

+ 因为本题后面的数字比前面的大，所以是加在「原来的最大的数字的前面以此来构造更大的数字」。 对于非法状态用 `"#"` 表示，初始化时只有 `dp[0][0]` 是合法的；
+ 其他的 `dp[0][j]` 都是非法的，本题求的是字符串的最大值，所以不是直接 `std::max()`， 而是自己写了一个 `string_max` 函数返回较大的那个字符串。

**参考代码 1**：

```cpp
class Solution {
public:
    int cost[9 + 5];
    string dp[9 + 5][5000 + 5];
    // 返回两者较大的一个
    string string_max(const string &lhs, const string &rhs) {
        if (lhs.size() > rhs.size()) return lhs;
        if (rhs.size() > lhs.size()) return rhs;
        // 当两字符串长度相等时
        if (lhs > rhs) return lhs;
        else return rhs;
    }
    string largestNumber(vector<int>& c, int target) {
        int len = c.size();
        for (int i = 0; i < len; ++i) {
            cost[i + 1] = c[i];
        }
        // dp[i][j]表示前i个元素, 恰好构成成本为j时, 构成的最大的整数(整数用字符串表示)
        // 无效状态用'#'表示
        for (int j = 0; j <= target; ++j) {
            dp[0][j] = '#';
        }
        dp[0][0] = "";
        for (int i = 1; i <= 9; ++i) {
            for (int j = 0; j <= target; ++j) {
                string a, b;
                // 不选第i个
                a = dp[i - 1][j];
                // 加选一个
                if (j - cost[i] >= 0 && dp[i][j - cost[i]] != "#")
                    b = std::to_string(i) + dp[i][j - cost[i]];
                dp[i][j] = string_max(a, b);
            }
        }
        if (dp[9][target] == "#") return "0";
        else return dp[9][target];
    }
};
```

---

- 最后说一点题外话, 绝大部分的编程高手都不会怎么详细写题解, 因为写出一篇详细的题解所需要耗的时间通常是解出一道题的4, 5倍或许还要多的时间, 所以绝大部分他们都不愿意花费这些时间(~~有这时间还不如多刷几道题呢~~), 所以如果大家看到好的题解尽量点赞捧场, 算是给予写详细题解人的激励吧, 或许这样更多的编程高手愿意分享他们的解法, 思路, 心得等. (ps本人并不是什么编程高手, 纯属有感而发)

- 最后, 不要脸的打个自己github上的广告, 欢迎star, 感谢捧场哈哈哈哈lol.
[Algorithm-challenger](https://github.com/OFShare/Algorithm-challenger)
[dp专题系统学习](https://github.com/OFShare/Algorithm-challenger/blob/master/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/README.md), 难度基本从易到难再到易, 里面dp题的难度可能并非严格从易到难的, 后续可能会按难度重新排序一下, 或者按照各类dp, 如区间dp, 数位dp这些分一下类, 但是看的人以及反馈的人实属太少了, 没有什么更新的动力, 所以一直被搁浅了. 但我一直是想做好这件事的哈哈哈lol
---

**欢迎下方评论区交流讨论～**





---

Java 代码：下面这段代码的逻辑要好好读一下，在草稿纸上模拟。

```Java []
import java.util.Arrays;

public class Solution {

    public String largestNumber(int[] cost, int target) {
        int[] dp = new int[target + 1];
        // 设置成为 -1 是因为题目的要求是「恰好消费为 `target` 」
      	Arrays.fill(dp, -1);

        dp[0] = 0;
      	// 内外层循环没有搞清楚
      	// 测试下来发现：内外层循环可以交换，原因未知
        for (int i = 1; i <= target; i++) {
            for (int c : cost) {
                if (i >= c && dp[i - c] != -1) {
                    dp[i] = Math.max(dp[i], dp[i - c] + 1);
                }
            }
        }

        if (dp[target] == -1) {
            return "0";
        }

        int t = target;
        StringBuilder res = new StringBuilder();
        while (t > 0) {
            int pre = -1;
            int choose = -1;
            for (int i = 9; i > 0; i--) {
                if (t >= cost[i - 1] && dp[t - cost[i - 1]] > pre) {
                    pre = dp[t - cost[i - 1]];
                    choose = i;
                }
            }
            res.append(choose);
            t -= cost[choose - 1];
        }
        return res.toString();
    }
}
```

Python 代码：

```Python []
class Solution:
    def largestNumber(self, cost: List[int], target: int) -> str:
        dp = [0] + [-1] * (target)
        for t in range(1, target + 1):
            for i, c in enumerate(cost):
                if t - c >= 0:
                    dp[t] = max(dp[t], dp[t - c] * 10 + i + 1)
        return str(max(dp[target], 0))
```

参考资料：

+ https://maxming0.github.io/2020/05/16/Form-Largest-Integer-With-Digits-That-Add-up-to-Target/
+ https://maxming0.github.io/2020/05/16/Form-Largest-Integer-With-Digits-That-Add-up-to-Target/



---

参考资料：https://leetcode-cn.com/problems/form-largest-integer-with-digits-that-add-up-to-target/solution/wan-quan-bei-bao-wan-quan-an-zhao-jie-wa-myqy/

**思路分析**：为什么是「完全背包问题」？因为 **每件物品可以有无限件**。这里完全按照完全背包的模板来写。为了使思路清晰，我先用的二维写法，再用的一维写法。

### 二维写法

`dp[i][j]` 表示：考虑前 `i` 个数位，在总成本为 `j` 的情况下能够得到的最大整数的字符串。

**注意**：
+ 注意初始化：总成本必须恰好等于 `target`，即 **背包恰好要装满**（背包九讲里面有讲这件事情） ；

### 状态转移方程

1. 不选择当前的数位 `i`

```
dp[i][j] = dp[i - 1][j];
```

2. 选择当前的数位 `i`

```
dp[i][j] = dp[i - 1][j - cost[i-1]] + to_string(i);
```

综上，`dp[i][j] = max_str(dp[i - 1][j - cost[i - 1]] + to_string(i), dp[i - 1][j]);`

初始化：
+ 如果成本为 `0`， 则仅前 0 件有合法解 ""（空串），则 `dp[0...N][0] = ""`；
+  `dp[0...N][1...target]`：初始化为 "0" 或者其他能够区分出合法或非法状态的字符串。

+ 返回值：`dp[n][target]`，因为是顺序遍历的，所以将其反序处理后再返回。



**复杂度分析**：
时间复杂度：$O(NV)$ ，这里 $N$ 是数位个数，$V$ 是总成本；
空间复杂度：$O(NV)$。


**二、一维写法**
**复杂度分析**
时间复杂度：O(NV)
空间复杂度：O(V)

**三、代码实现**

```cpp []
class Solution {
public:
    /** 返回较大字符串的函数
    *   因为是顺序遍历的, 所以在a和b这两个字符串的长度相等时, 就从后往前遍历判断a和b各个位置上的大小。
    */
    string max_str(const string& a, const string& b) {
        int flag = 1;
        if (a.size() != b.size()) {
            if (a.size() > b.size())
                return a;
            else
                return b;
        } else {
            for (int i = a.size()-1; i; i--) {
                if (a[i] != b[i]) {
                    flag = a[i] > b[i];
                    break;
                }
            }
        }
        return flag ? a : b;
    }

// 二维写法
    string largestNumber(vector<int>& cost, int target) {
        int n = cost.size();
        vector<vector<string>> dp(n+1, vector<string> (target+1, "0"));
        for (int i = 0; i <= n; i++) {
            dp[i][0] = "";
        }
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                // 因为涉及到是否选择当前数位的问题，需要比较 dp[i][j - cost[i-1]] + to_string(i) 和 dp[i-1][j]
                // 如果这两个要比较字符串都是 "0" 就没有比较的必要了，直接继承 dp[i-1][j] 的结果，否则 dp[i][j] 会得到错误的值
                if (j < cost[i-1] || dp[i][j - cost[i-1]] == "0") {
                    dp[i][j] = dp[i-1][j];
                } else {
                    string temp = dp[i][j - cost[i-1]] + to_string(i);
                    dp[i][j] = max_str(temp, dp[i-1][j]);
                }
            }
        }
        reverse(dp[n][target].begin(), dp[n][target].end());
        return dp[n][target];
    }

// 一维写法
string largestNumber(vector<int>& cost, int target) {
        int n = cost.size();
        vector<string> dp(target+1, "0");
        dp[0] = "";
        for (int i = 1; i <= n; i++) {
            for (int j = cost[i-1]; j <= target; j++) {
                if (dp[j - cost[i-1]] != "0") {
                    string temp = dp[j - cost[i-1]] + to_string(i);
                    dp[j] = max_str(temp, dp[j]);
                }
            }
        }
        reverse(dp[target].begin(), dp[target].end());
        return dp[target];
    }
};
```