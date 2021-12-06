

传送门：https://leetcode.com/problems/restore-ip-addresses/description/ 。

leetcode、递归、回溯、树形问题

题目大意：给出一个数字字符串，为这个数字字符串加上三个点（.），使其成为一个合法的IP地址，返回所有的合法的 IP 地址。

补充说明：

- 如给定字符串 "25525511135",
- 返回 ["255.255.11.135", "255.255.111.35"]

思路：

- 使用深度优先遍历、递归回溯的思想来完成；
- IP 地址一共 4 段，每一段最多 3 个数字，所以分为 1 个数字一个 IP 段、2 个数字一个 IP 段、3 个数字一个 IP 段，接下来的一个 IP 段 还可以是 1 个数字或者 2 个数字或者 3 个数字，分析到这里，"树形"的结构已经初现；
- 接下来递归终止的条件就得分析清楚了，但是也不是难事，把握好总共分 4 段，当画上第 4 个点，并且下一个考察的下标已经越界的时候，就是我们找到正确 IP 地址的时候了；
- 这里有尝试的过程，在不满足条件的情况下，应该将状态恢复，实现出来就是我们看到的下面这个代码片段：

```java
splitTime++;
pre.add(currentNum);
splitStringToIp(s, start + i + 1, splitTime, pre);
pre.remove(pre.size() - 1);
splitTime--;
```

我们再想想，我们递归到底，无非就是给一串数字加上三个"."，不管能不能成为 IP ，分割次数增加和之前的 IP 段积累我们都有操作，只不过没有成为 IP 地址的 list 最后没有被 result 收进去，递归走到底之后，我们都应该把分割次数减少，并且把 IP 段积累恢复。

####  Java 代码：

```java
public class Solution {

    private List<String> resInt = new ArrayList<>();
    private List<String> res = new ArrayList<>();

    public List<String> restoreIpAddresses(String s) {
        if (s == null || s.length() > 12 || s.length() <= 0) {
            return res;
        }
        int splitTime = 0;
        splitStringToIp(s, 0, splitTime, resInt);
        return res;
    }


    private void splitStringToIp(String s, int start, int splitTime, List<String> pre) {
        // 这道题我失误在递归终止条件没有想清楚
        if (splitTime == 4) {
            if (start == s.length()) {
                res.add(transformToString(pre));
                return;
            }
        } else {
            for (int i = 0; i < 3 && start + i < s.length(); i++) {
                String currentNum = s.substring(start, start + i + 1);
                if (judgeStringIfIpNum(currentNum)) {
                    splitTime++;
                    pre.add(currentNum);
                    splitStringToIp(s, start + i + 1, splitTime, pre);
                    pre.remove(pre.size() - 1);
                    splitTime--;
                }
            }
        }
    }

    private String transformToString(List<String> list) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            if (i == list.size() - 1) {
                sb.append(list.get(i));
            } else {
                sb.append(list.get(i)).append(".");
            }
        }
        return sb.toString();
    }

    // 这个函数要写清楚
    private boolean judgeStringIfIpNum(String s) {
        int len = s.length();
        if (s == null || len == 0 || len > 3) {
            return false;
        }
        if (len > 1 && s.startsWith("0")) {
            return false;
        }
        return Integer.valueOf(s) <= 255;
    }

    public static void main(String[] args) {
        String num = "010010";
        Solution solution = new Solution();
        List<String> restoreIpAddresses = solution.restoreIpAddresses(num);
        for (String s : restoreIpAddresses) {
            System.out.println(s);
        }
    }
}
```

总结

- 这里要注意一些细节：1、通过完善测试用例的方式来发现一些坑；2、提交给 LeetCode ，就可以发现一些自己可能没有想到的情况；
- 第 1 遍写出来的代码肯定是有诸多问题的，需要一些耐心，打印一些输出语句，来分析程序的走向。
- 树形问题使用回溯算法的一个套路是：在循环中使用递归，状态在递归前后进行恢复。

