---
title: 「力扣」第 622 题：设计循环队列（中等）
icon: yongyan
category: 队列
tags:
  - 队列
---

+ 题目链接：[622. 设计循环队列](https://leetcode-cn.com/problems/design-circular-queue/)；
+ 题解链接：[数组实现的循环队列](https://leetcode-cn.com/problems/design-circular-queue/solution/shu-zu-shi-xian-de-xun-huan-dui-lie-by-liweiwei141/)。

## 题目描述

设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

你的实现应该支持如下操作：

- `MyCircularQueue(k)`: 构造器，设置队列长度为 k 。
- `Front`: 从队首获取元素。如果队列为空，返回 -1 。
- `Rear`: 获取队尾元素。如果队列为空，返回 -1 。
- `enQueue(value)`: 向循环队列插入一个元素。如果成功插入则返回真。
- `deQueue()`: 从循环队列中删除一个元素。如果成功删除则返回真。
- `isEmpty()`: 检查循环队列是否为空。
- `isFull()`: 检查循环队列是否已满。



**示例：**

```
MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
circularQueue.enQueue(1);  // 返回 true
circularQueue.enQueue(2);  // 返回 true
circularQueue.enQueue(3);  // 返回 true
circularQueue.enQueue(4);  // 返回 false，队列已满
circularQueue.Rear();  // 返回 3
circularQueue.isFull();  // 返回 true
circularQueue.deQueue();  // 返回 true
circularQueue.enQueue(4);  // 返回 true
circularQueue.Rear();  // 返回 4
```

**提示：**

- 所有的值都在 0 至 1000 的范围内；
- 操作数将在 1 至 1000 的范围内；
- 请不要使用内置的队列库。

## 思路分析

这道题说「循环」的意思是要求我们在数组里实现。使用链表的实现，创建结点和删除结点都是动态的，也就不存在需要循环利用的问题了。

在数组里的操作，我们参考「动态数组」的实现，是为了让每一步的操作复杂度都最低。

「`MyCircularQueue(k)`: 构造器，设置队列长度为 `k` 」，这句话说明：题目 **不要求我们实现动态扩容与动态缩容**。

---


**需要注意的地方**：

1. 定义循环变量 `front` 和 `rear` 。一直保持这个定义，到底是先赋值还是先移动指针就很容易想清楚了。

`front`：指向队列头部第 1 个有效数据的位置；
`rear`：指向队列尾部（即最后 1 个有效数据）的下一个位置，即下一个从队尾入队元素的位置。

（说明：这个定义是依据“动态数组”的定义模仿而来。）

2. **为了避免「队列为空」和「队列为满」的判别条件冲突，我们有意浪费了一个位置。**

浪费一个位置是指：循环数组中任何时刻一定至少有一个位置不存放有效元素。

+ 判别队列为空的条件是：`front == rear;`
+ 判别队列为满的条件是：`(rear + 1) % capacity == front;`。可以这样理解，当 `rear` 循环到数组的前面，要从后面追上 `front`，还差一格的时候，判定队列为满。

3. 因为有循环的出现，要特别注意处理数组下标可能越界的情况。指针后移的时候，下标 $+ 1$，并且为了防止数组下标越界要取模。


@slidestart

![622-1.png](https://pic.leetcode-cn.com/97e132e91a9db2ea1d6312f2bd996a100118604aa5efbf0e5c5c3c5a8a1b1c67-622-1.png)

---

![622-2.png](https://pic.leetcode-cn.com/8b716e72ad320ec867b174ceee042938db0159037ba06856b559acba415ae23b-622-2.png)

---

![622-3.png](https://pic.leetcode-cn.com/8c6f3aa490dd1252fec2432872427480bb6cdf6af43aca1d2f7f725616e56621-622-3.png)

---

![622-4.png](https://pic.leetcode-cn.com/d321064db6a8a0330cf859b8a978ef2ac635c1b0e9966095f50241737820ccef-622-4.png)

---

![622-5.png](https://pic.leetcode-cn.com/c306546646991bab8cb72d3cb30791b2f86df0ba46682d70b1cd083f5da31a95-622-5.png)

---

![622-6.png](https://pic.leetcode-cn.com/a6e70d6116d32806d74d5f70fc77caedf488473b7d68680c9dd7281334fa7b62-622-6.png)

---

![622-7.png](https://pic.leetcode-cn.com/cc20c68a7ad2b7a51e719d9c039b0380e68215d4a7d86867b1a17ee87af240ec-622-7.png)

---

![622-8.png](https://pic.leetcode-cn.com/46ca7de89cc94295ff692eca246558dd31134fbe92d02adaac28b0a7b8e2041c-622-8.png)

---

![622-9.png](https://pic.leetcode-cn.com/6a03091f66c4555b26aa5e8e0dca59618aa465381c96fda11cee27c0872d5a0a-622-9.png)

---

![622-10.png](https://pic.leetcode-cn.com/3e060bfce0e82ebd1f81e0b2974cf00523180e5b5d3f73b10a38cd24a307e4c0-622-10.png)

---

![622-11.png](https://pic.leetcode-cn.com/9aa511407d8d5a11df28b8d0321c722f164dd49b35b883ca5fcdbad508a67f01-622-11.png)

---

![622-12.png](https://pic.leetcode-cn.com/3d09cbe788369460e49daf5c7f6d10f62416d4b50a3debef916c3b903045bdaa-622-12.png)

---

![622-13.png](https://pic.leetcode-cn.com/908f818978673a7bf2ee24c67cddaa5bc20ed080de9eda0f88f9d5d14d1866fb-622-13.png)

---

![622-14.png](https://pic.leetcode-cn.com/877f22165e8849663fd066aa2668e07d3e159e644ef11ee817f0235a4cad742c-622-14.png)

@slideend


同类问题「力扣」第 641 题：[设计循环双端队列](https://leetcode-cn.com/problems/design-circular-deque/) 可以顺便做一下。

**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class MyCircularQueue {

    private int front;
    private int rear;
    private int capacity;
    private int[] arr;

    /**
     * Initialize your data structure here. Set the size of the queue to be k.
     */
    public MyCircularQueue(int k) {
        capacity = k + 1;
        arr = new int[capacity];

        // 在 front 出队，故设计在数组的头部，方便删除元素
        // 删除元素的时候，只索引 +1（注意取模）


        // 在 rear 入队，故设计在数组的尾部，方便插入元素
        // 插入元素的时候，先赋值，后索引 +1（注意取模）
        front = 0;
        rear = 0;
    }

    /**
     * Insert an element into the circular queue. Return true if the operation is successful.
     */
    public boolean enQueue(int value) {
        if (isFull()) {
            return false;
        }
        arr[rear] = value;
        rear = (rear + 1) % capacity;
        return true;
    }

    /**
     * Delete an element from the circular queue. Return true if the operation is successful.
     */
    public boolean deQueue() {
        if (isEmpty()) {
            return false;
        }
        front = (front + 1) % capacity;
        return true;
    }

    /**
     * Get the front item from the queue.
     */
    public int Front() {
        if (isEmpty()) {
            return -1;
        }
        return arr[front];
    }

    /**
     * Get the last item from the queue.
     */
    public int Rear() {
        if (isEmpty()) {
            return -1;
        }
        return arr[(rear - 1 + capacity) % capacity];
    }

    /**
     * Checks whether the circular queue is empty or not.
     */
    public boolean isEmpty() {
        return front == rear;
    }

    /**
     * Checks whether the circular queue is full or not.
     */
    public boolean isFull() {
        // 注意：这是这个经典设计的原因
        return (rear + 1) % capacity == front;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class MyCircularQueue:

    def __init__(self, k: int):
        """
        Initialize your data structure here. Set the size of the queue to be k.
        """
        self.front = 0
        self.rear = 0
        self.capacity = k + 1
        self.arr = [0 for _ in range(self.capacity)]

    def enQueue(self, value: int) -> bool:
        """
        Insert an element into the circular queue. Return true if the operation is successful.
        """
        if self.isFull():
            return False
        self.arr[self.rear] = value
        self.rear = (self.rear + 1) % self.capacity
        return True

    def deQueue(self) -> bool:
        """
        Delete an element from the circular queue. Return true if the operation is successful.
        """
        if self.isEmpty():
            return False

        self.front = (self.front + 1) % self.capacity
        return True

    def Front(self) -> int:
        """
        Get the front item from the queue.
        """
        if self.isEmpty():
            return -1
        return self.arr[self.front]

    def Rear(self) -> int:
        """
        Get the last item from the queue.
        """
        if self.isEmpty():
            return -1
        return self.arr[(self.rear - 1 + self.capacity) % self.capacity]

    def isEmpty(self) -> bool:
        """
        Checks whether the circular queue is empty or not.
        """
        return self.front == self.rear

    def isFull(self) -> bool:
        """
        Checks whether the circular queue is full or not.
        """
        return (self.rear + 1) % self.capacity == self.front
```
</CodeGroupItem>

<CodeGroupItem title="C++">
```C++
#include <vector>

using namespace std;

class MyCircularQueue {

private:
    vector<int> arr;
    int front;
    int rear;
    int capacity;


public:
    /** Initialize your data structure here. Set the size of the queue to be k. */
    MyCircularQueue(int k) {
        capacity = k + 1;
        arr.assign(capacity, 0);

        front = 0;
        rear = 0;
    }

    /** Insert an element into the circular queue. Return true if the operation is successful. */
    bool enQueue(int value) {
        if (isFull()) {
            return false;
        }
        arr[rear] = value;
        rear = (rear + 1) % capacity;
        return true;
    }

    /** Delete an element from the circular queue. Return true if the operation is successful. */
    bool deQueue() {
        if (isEmpty()) {
            return false;
        }
        front = (front + 1) % capacity;
        return true;
    }

    /** Get the front item from the queue. */
    int Front() {
        if (isEmpty()) {
            return -1;
        }
        return arr[front];
    }

    /** Get the last item from the queue. */
    int Rear() {
        if (isEmpty()) {
            return -1;
        }
        return arr[(rear - 1 + capacity) % capacity];
    }

    /** Checks whether the circular queue is empty or not. */
    bool isEmpty() {
        return front == rear;
    }

    /** Checks whether the circular queue is full or not. */
    bool isFull() {
        // 注意：这是这个经典设计的原因
        return (rear + 1) % capacity == front;
    }
};
```
</CodeGroupItem>
</CodeGroup>