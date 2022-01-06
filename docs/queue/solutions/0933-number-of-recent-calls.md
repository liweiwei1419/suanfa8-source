---
title: 「力扣」第 933 题：最近的请求次数（简单）
icon: yongyan
category: 队列
tags:
  - 队列
---


+ 题目链接：[933. 最近的请求次数](https://leetcode-cn.com/problems/number-of-recent-calls/)；
+ 题解链接：[解释一下题意](https://leetcode-cn.com/problems/number-of-recent-calls/solution/jie-shi-yi-xia-ti-yi-by-liweiwei1419/)。



解释一下示例：

```
示例：

输入：inputs = ["RecentCounter","ping","ping","ping","ping"], 
     inputs = [[],[1],[100],[3001],[3002]]
输出：[null,1,2,3,3]
```



1、输入两个都叫 `inputs` 不用管，上下行是对应的；

2、`RecentCounter`  表示初始化计数器，因此什么都不操作，对应 `[]`；

3、然后底下的 `[1],[100],[3001],[3002]` 表示在 1 毫秒、100 毫秒、3001 毫秒、3002  毫秒这些时刻分别执行了一次 ping 操作；

4、计时从 0 毫秒开始，“任何处于 `[t - 3000, t]` 时间范围之内”这句话的意思是，从当前时刻 `t` 开始算起，3000 毫秒之前到现在执行的 ping 操作总数，要求我们统计出来；

5、`t - 3000 < 0` 的时候怎么办？就返回从 0 时刻到 3000 毫秒时刻执行的 ping 的操作总次数。

**参考代码**：

```C++ []
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

class RecentCounter {
private:
    queue<int> q;
public:
    RecentCounter() {

    }

    int ping(int t) {
        while (!q.empty() && t - q.front() > 3000) {
            q.pop();
        }
        q.push(t);

        return q.size();
    }
};
```
```Java []
import java.util.LinkedList;
import java.util.Queue;

public class RecentCounter {

    private Queue<Integer> queue;

    public RecentCounter() {
        queue = new LinkedList<>();
    }

    public int ping(int t) {
        while (!queue.isEmpty() && t - queue.peek() > 3000) {
            queue.poll();
        }
        queue.offer(t);
        return queue.size();
    }
}
```
```Python []
from collections import deque


class RecentCounter:

    def __init__(self):
        self.queue = deque()

    def ping(self, t: int) -> int:
        while self.queue and t - self.queue[0] > 3000:
            self.queue.popleft()
        self.queue.append(t)
        return len(self.queue)
```