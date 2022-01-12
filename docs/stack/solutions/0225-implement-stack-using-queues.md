---
title: 「力扣」第 225 题：用队列实现栈（简单）
icon: yongyan
category: 栈
tags:
  - 栈
---

- 题目链接：[225. 用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues)；
- 题解链接：[负负得正，peek 和 pop 时，依次将队首元素出队，放到队尾](https://leetcode-cn.com/problems/implement-stack-using-queues/solution/peek-he-pop-shi-yi-ci-jiang-dui-shou-yuan-su-chu-d/)。

## 题目描述

请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（`push`、`top`、`pop` 和 `empty`）。

实现 `MyStack` 类：

- `void push(int x)` 将元素 x 压入栈顶。
- `int pop()` 移除并返回栈顶元素。
- `int top()` 返回栈顶元素。
- `boolean empty()` 如果栈是空的，返回 `true` ；否则，返回 `false` 。

**注意：**

- 你只能使用队列的基本操作 —— 也就是 `push to back`、`peek/pop from front`、`size` 和 `is empty` 这些操作。
- 你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。

**示例：**

```
输入：
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 2, 2, false]

解释：
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // 返回 2
myStack.pop(); // 返回 2
myStack.empty(); // 返回 False
```

**提示：**

- `1 <= x <= 9`
- 最多调用`100` 次 `push`、`pop`、`top` 和 `empty`
- 每次调用 `pop` 和 `top` 都保证栈不为空

**进阶：**你能否实现每种操作的均摊时间复杂度为 `O(1)` 的栈？换句话说，执行 `n` 个操作的总时间复杂度 `O(n)` ，尽管其中某个操作可能需要比其他操作更长的时间。你可以使用两个以上的队列。

## 思路分析

1、可以只使用一个队列来实现栈。

2、引入一个状态变量。

## 方法一：使用两个队列实现栈

**参考代码 1**：

```java
import java.util.LinkedList;
import java.util.Queue;

public class MyStack {

    /**
     * 使用两个队列实现栈
     * queue1 是主要的队列，queue2 只是辅助
     */
    private Queue<Integer> queue1;
    private Queue<Integer> queue2;

    /**
     * Initialize your data structure here.
     */
    public MyStack() {
        queue1 = new LinkedList<>();
        queue2 = new LinkedList<>();
    }

    /**
     * Push element x onto stack.
     */
    public void push(int x) {
        queue1.offer(x);
    }

    /**
     * Removes the element on top of the stack and returns that element.
     */
    public int pop() {
        shift();
        return queue2.poll();
    }

    private void shift() {
        int size = queue1.size();
        for (int i = 0; i < size - 1; i++) {
            queue2.offer(queue1.poll());
        }
        Queue<Integer> temp = queue1;
        queue1 = queue2;
        queue2 = temp;
    }

    /**
     * Get the top element.
     */
    public int top() {
        shift();
        int res = queue2.poll();
        queue1.offer(res);
        return res;
    }

    /**
     * Returns whether the stack is empty.
     */
    public boolean empty() {
        return queue1.isEmpty() && queue2.isEmpty();
    }
}

```

## 方法二：使用一个队列实现栈

**参考代码 2**：

```java
import java.util.LinkedList;
import java.util.Queue;

public class MyStack {

    private Queue<Integer> queue;

    /**
     * Initialize your data structure here.
     */
    public MyStack() {
        queue = new LinkedList<>();
    }

    /**
     * Push element x onto stack.
     */
    public void push(int x) {
        queue.offer(x);
    }

    private void shift() {
        int size = queue.size();
        for (int i = 0; i < size - 1; i++) {
            queue.offer(queue.poll());
        }
    }

    /**
     * Removes the element on top of the stack and returns that element.
     */
    public int pop() {
        shift();
        return queue.poll();
    }

    /**
     * Get the top element.
     */
    public int top() {
        shift();
        int res = queue.poll();
        queue.offer(res);
        return res;
    }

    /**
     * Returns whether the stack is empty.
     */
    public boolean empty() {
        return queue.isEmpty();
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack obj = new MyStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.top();
 * boolean param_4 = obj.empty();
 */
```
