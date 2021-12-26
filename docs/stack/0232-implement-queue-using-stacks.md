---
title: 「力扣」第 232 题：用栈实现队列（简单）
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[232. 用栈实现队列]()；
+ 题解链接：[](https://leetcode-cn.com/problems/implement-queue-using-stacks/solution/shi-yong-liang-ge-zhan-yi-ge-zhuan-men-ru-dui-yi-g/)。


## 题目描述



> 使用栈实现队列的下列操作：
>
> + push(x) -- 将一个元素放入队列的尾部。
>
> + pop() -- 从队列首部移除元素。
>
> + peek() -- 返回队列首部的元素。
>
> + empty() -- 返回队列是否为空。
>
> 示例:
>
> ```
> MyQueue queue = new MyQueue();
> 
> queue.push(1);
> queue.push(2);  
> queue.peek();  // 返回 1
> queue.pop();   // 返回 1
> queue.empty(); // 返回 false
> ```
>
>
> 说明:
>
> + 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
> + 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
> + 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-queue-using-stacks
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 使用两个栈，一个专门入队，一个专门出队


思路：**画图帮助思考，关键还是思考清楚细节。**

1、使用两个栈，一个栈（`stackPush`）用于元素进栈，一个栈（`stackPop`）用于元素出栈；

2、`pop()` 或者 `peek()` 的时候：

（1）如果 `stackPop` 里面有元素，直接从 `stackPop` 里弹出或者 `peek` 元素；

（2）如果 `stackPop` 里面没有元素，一次性将 `stackPush` 里面的所有元素倒入 `stackPop`。


为此，可以写一个 `shift` 辅助方法，一次性将 `stackPush` 里的元素倒入 `stackPop`。

**注意**：

> **一定要保证 `stackPop` 为空的时候，才能把元素从 `stackPush` 里拿到 `stackPop` 中。**

**参考代码**：

```Java []
import java.util.Stack;

/**
 * 用两个栈实现队列
 */
public class MyQueue {

    private Stack<Integer> stackPush;
    private Stack<Integer> stackPop;

    /**
     * Initialize your data structure here.
     */
    public MyQueue() {
        stackPush = new Stack<>();
        stackPop = new Stack<>();
    }

    /**
     * Push element x to the back of queue.
     */
    public void push(int x) {
        stackPush.push(x);
    }

    private void shift() {
        if (stackPop.isEmpty()) {
            while (!stackPush.isEmpty()) {
                stackPop.push(stackPush.pop());
            }
        }
    }

    /**
     * Removes the element from in front of queue and returns that element.
     */
    public int pop() {
        shift();
        if (!stackPop.isEmpty()) {
            return stackPop.pop();
        }
        throw new RuntimeException("队列里没有元素");
    }

    /**
     * Get the front element.
     */
    public int peek() {
        shift();
        if (!stackPop.isEmpty()) {
            return stackPop.peek();
        }
        throw new RuntimeException("队列里没有元素");
    }

    /**
     * Returns whether the queue is empty.
     */
    public boolean empty() {
        return stackPush.isEmpty() && stackPop.isEmpty();
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
```
