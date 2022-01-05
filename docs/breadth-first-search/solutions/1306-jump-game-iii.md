---
title: 「力扣」第 1306 题：跳跃游戏 III（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
---


+ 题目链接：[1306. 跳跃游戏 III](https://leetcode-cn.com/problems/jump-game-iii/)；
+ 题解链接：[广度优先遍历](https://leetcode-cn.com/problems/jump-game-iii/solution/yan-du-you-xian-bian-li-by-liweiwei1419/)。

## 题目描述

这里有一个非负整数数组 `arr`，你最开始位于该数组的起始下标 `start` 处。当你位于下标 `i` 处时，你可以跳到 `i + arr[i]` 或者 `i - arr[i]`。

请你判断自己是否能够跳到对应元素值为 0 的 **任一** 下标处。

注意，不管是什么情况下，你都无法跳到数组之外。

**示例 1：**

```
输入：arr = [4,2,3,0,3,1,2], start = 5
输出：true
解释：
到达值为 0 的下标 3 有以下可能方案： 
下标 5 -> 下标 4 -> 下标 1 -> 下标 3 
下标 5 -> 下标 6 -> 下标 4 -> 下标 1 -> 下标 3 
```

**示例 2：**

```
输入：arr = [4,2,3,0,3,1,2], start = 0
输出：true 
解释：
到达值为 0 的下标 3 有以下可能方案： 
下标 0 -> 下标 4 -> 下标 1 -> 下标 3
```

**示例 3：**

```
输入：arr = [3,0,2,1,2], start = 2
输出：false
解释：无法到达值为 0 的下标 1 处。 
```



**提示：**

+ $1 \le arr.length \le 5 * 10^4$
+ $0 \le arr[i] < arr.length$
+ $0 \le start < arr.length$

---

思路：

1、模拟题目中描述的过程；

2、每个索引位置只用考虑一次，因为只能向左走或者向右走；这个过程可以用一棵二叉树描述。因此，使用广度优先遍历或者深度优先遍历均可，这里使用广度优先遍历，借助一个队列；

3、使用 `visited` 数组记录访问过的索引，这一点是很自然的；

4、在索引元素入队的时候，直接判断这个索引上的值是不是 $0$；

5、如果回到一个已经访问过的索引，说明一定会循环下去（一直找不到 $0$），因此只需要关心没有访问过的索引。

**参考代码**：

```Java []
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    public boolean canReach(int[] arr, int start) {
        if (arr[start] == 0) {
            return true;
        }

        int len = arr.length;
        boolean[] visited = new boolean[len];

        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        visited[start] = true;

        while (!queue.isEmpty()) {
            Integer top = queue.poll();

            int right = top + arr[top];
            int left = top - arr[top];

            if (right < len && !visited[right]) {
                visited[right] = true;
                queue.offer(right);
                if (arr[right] == 0) {
                    return true;
                }
            }

            if (left >= 0 && !visited[left]) {
                visited[left] = true;
                queue.offer(left);
                if (arr[left] == 0) {
                    return true;
                }
            }
        }
        return false;
    }
}
```