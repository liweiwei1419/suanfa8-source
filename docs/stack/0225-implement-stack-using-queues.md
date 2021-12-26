---
title: 「力扣」第 225 题：用队列实现栈（简单）
date: 2017-09-12 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 7：栈
tags:
  - 栈
permalink: leetcode-algo/0225-implement-stack-using-queues
---

## 「力扣」第 225 题：用队列实现栈（简单）

+ 链接：https://leetcode-cn.com/problems/implement-stack-using-queues

+ [题解地址](https://leetcode-cn.com/problems/implement-stack-using-queues/solution/peek-he-pop-shi-yi-ci-jiang-dui-shou-yuan-su-chu-d/)

>使用队列实现栈的下列操作：
>
>+ push(x) -- 元素 x 入栈
>+ pop() -- 移除栈顶元素
>+ top() -- 获取栈顶元素
>+ empty() -- 返回栈是否为空
>
>注意:
>
>+ 你只能使用队列的基本操作-- 也就是 push to back, peek/pop from front, size, 和 is empty 这些操作是合法的。
>+ 你所使用的语言也许不支持队列。 你可以使用 list 或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
>+ 你可以假设所有操作都是有效的（例如, 对一个空的栈不会调用 pop 或者 top 操作）。

来源：力扣（LeetCode）

著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

> 1、可以只使用一个队列来实现栈。
>
> 2、引入一个状态变量。

### 方法一：使用两个队列实现栈

Java 代码：

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

### 方法二：使用一个队列实现栈

Java 代码：

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



## 参考资料

Java 代码：

```java
import java.util.LinkedList;

public class MyStack {

    private LinkedList<Integer> list1;
    private LinkedList<Integer> list2;

    /**
     * Initialize your data structure here.
     */
    public MyStack() {
        list1 = new LinkedList<>();
        list2 = new LinkedList<>();
    }

    /**
     * Push element x onto stack.
     */
    public void push(int x) {
        // 这里很关键
        if (!list1.isEmpty()) {
            list1.addLast(x);
        } else {
            list2.addLast(x);
        }
    }

    /**
     * Removes the element on top of the stack and returns that element.
     */
    public int pop() {
        // 直接交换指针！
        if (list1.isEmpty()) {
            LinkedList<Integer> temp = list1;
            list1 = list2;
            list2 = temp;
        }
        while (list1.size() > 1) {
            list2.addLast(list1.removeFirst());
        }
        return list1.removeFirst();
    }

    /**
     * Get the top element.
     */
    public int top() {
        if (list1.isEmpty()) {
            LinkedList<Integer> temp = list1;
            list1 = list2;
            list2 = temp;
        }
        while (list1.size() > 1) {
            list2.addLast(list1.removeFirst());
        }
        list2.addLast(list1.get(0));
        return list1.removeFirst();
    }

    /**
     * Returns whether the stack is empty.
     */
    public boolean empty() {
        return list1.isEmpty() && list2.isEmpty();
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





## 参考资料

1、https://leetcode-cn.com/problems/implement-stack-using-queues/description/

2、https://blog.csdn.net/derrantcm/article/details/48084069

