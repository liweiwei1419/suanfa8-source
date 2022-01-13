---
title: 「力扣」第 641 题：设计循环双端队列（中等）
icon: yongyan
category: 队列
tags:
  - 队列
---

- 题目链接：[641. 设计循环双端队列](https://leetcode-cn.com/problems/design-circular-deque/)；
- 题解链接：[数组实现的循环双端队列](https://leetcode-cn.com/problems/design-circular-deque/solution/shu-zu-shi-xian-de-xun-huan-shuang-duan-dui-lie-by/)。

## 题目描述

设计实现双端队列。
你的实现需要支持以下操作：

- MyCircularDeque(k)：构造函数,双端队列的大小为 k。
- insertFront()：将一个元素添加到双端队列头部。 如果操作成功返回 true。
- insertLast()：将一个元素添加到双端队列尾部。如果操作成功返回 true。
- deleteFront()：从双端队列头部删除一个元素。 如果操作成功返回 true。
- deleteLast()：从双端队列尾部删除一个元素。如果操作成功返回 true。
- getFront()：从双端队列头部获得一个元素。如果双端队列为空，返回 -1。
- getRear()：获得双端队列的最后一个元素。 如果双端队列为空，返回 -1。
- isEmpty()：检查双端队列是否为空。
- isFull()：检查双端队列是否满了。

**示例：**

```
MyCircularDeque circularDeque = new MycircularDeque(3); // 设置容量大小为3
circularDeque.insertLast(1);			        // 返回 true
circularDeque.insertLast(2);			        // 返回 true
circularDeque.insertFront(3);			        // 返回 true
circularDeque.insertFront(4);			        // 已经满了，返回 false
circularDeque.getRear();  				// 返回 2
circularDeque.isFull();				        // 返回 true
circularDeque.deleteLast();			        // 返回 true
circularDeque.insertFront(4);			        // 返回 true
circularDeque.getFront();				// 返回 4
```

**提示：**

- 所有值的范围为 [1, 1000]
- 操作次数的范围为 [1, 1000]
- 请不要使用内置的双端队列库。

## 思路分析

这道题的前导问题是「力扣」第 622 题：[设计循环队列](https://leetcode-cn.com/problems/design-circular-queue/)。

在实现上几乎是一模一样的，要注意的地方有：

1. 定义循环变量 `front` 和 `rear` 。一直保持这个定义，到底是先赋值还是先移动指针就很容易想清楚了。

- `front`：指向队列头部第 $1$ 个有效数据的位置；
- `rear`：指向队列尾部（即最后 $1$ 个有效数据）的 **下一个位置**，即下一个从队尾入队元素的位置。

**说明**：这个定义是依据「动态数组」的定义模仿而来。

2. **为了避免「队列为空」和「队列为满」的判别条件冲突，我们有意浪费了一个位置**；

浪费一个位置是指：循环数组中任何时刻一定至少有一个位置不存放有效元素。

- 判别队列为空的条件是：`front == rear;`；
- 判别队列为满的条件是：`(rear + 1) % capacity == front;`。可以这样理解，当 `rear` 循环到数组的前面，要从后面追上 `front`，还差一格的时候，判定队列为满。

3. 因为有循环的出现，要特别注意处理数组下标可能越界的情况。

- 指针后移的时候，下标 $+ 1$，要取模；
- 指针前移的时候，为了循环到数组的末尾，需要先加上数组的长度，然后再对数组长度取模。

@slidestart

![幻灯片1.png](https://pic.leetcode-cn.com/1608007455-ARtfWP-%E5%B9%BB%E7%81%AF%E7%89%871.png)

---

![幻灯片2.png](https://pic.leetcode-cn.com/1608007455-NICWfH-%E5%B9%BB%E7%81%AF%E7%89%872.png)

---

![幻灯片3.png](https://pic.leetcode-cn.com/1608007455-tNIADj-%E5%B9%BB%E7%81%AF%E7%89%873.png)

---

![幻灯片4.png](https://pic.leetcode-cn.com/1608007455-sYopKa-%E5%B9%BB%E7%81%AF%E7%89%874.png)

---

![幻灯片5.png](https://pic.leetcode-cn.com/1608007455-yNAqJF-%E5%B9%BB%E7%81%AF%E7%89%875.png)

---

![幻灯片6.png](https://pic.leetcode-cn.com/1608007455-XhxXkp-%E5%B9%BB%E7%81%AF%E7%89%876.png)

---

![幻灯片7.png](https://pic.leetcode-cn.com/1608007455-EYVuUX-%E5%B9%BB%E7%81%AF%E7%89%877.png)

---

![幻灯片8.png](https://pic.leetcode-cn.com/1608007455-wVOHYx-%E5%B9%BB%E7%81%AF%E7%89%878.png)

---

![幻灯片9.png](https://pic.leetcode-cn.com/1608007455-yWeAuy-%E5%B9%BB%E7%81%AF%E7%89%879.png)

---

![幻灯片10.png](https://pic.leetcode-cn.com/1608007455-dlaMTI-%E5%B9%BB%E7%81%AF%E7%89%8710.png)

---

![幻灯片11.png](https://pic.leetcode-cn.com/1608007455-XzUgOO-%E5%B9%BB%E7%81%AF%E7%89%8711.png)

---

![幻灯片12.png](https://pic.leetcode-cn.com/1608007455-wGqQuD-%E5%B9%BB%E7%81%AF%E7%89%8712.png)

---

![幻灯片13.png](https://pic.leetcode-cn.com/1608007455-nHFtan-%E5%B9%BB%E7%81%AF%E7%89%8713.png)

---

![幻灯片14.png](https://pic.leetcode-cn.com/1608007455-POFCwU-%E5%B9%BB%E7%81%AF%E7%89%8714.png)

---

![幻灯片15.png](https://pic.leetcode-cn.com/1608007455-BwNcsi-%E5%B9%BB%E7%81%AF%E7%89%8715.png)

---

![幻灯片16.png](https://pic.leetcode-cn.com/1608007455-ZbWxyF-%E5%B9%BB%E7%81%AF%E7%89%8716.png)

---

![幻灯片17.png](https://pic.leetcode-cn.com/1608007455-EAfGwZ-%E5%B9%BB%E7%81%AF%E7%89%8717.png)

@slideend

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class MyCircularDeque {

    // 1、不用设计成动态数组，使用静态数组即可
    // 2、设计 head 和 tail 指针变量
    // 3、head == tail 成立的时候表示队列为空
    // 4、tail + 1 == head

    private int capacity;
    private int[] arr;
    private int front;
    private int rear;

    /**
     * Initialize your data structure here. Set the size of the deque to be k.
     */
    public MyCircularDeque(int k) {
        capacity = k + 1;
        arr = new int[capacity];

        // 头部指向第 1 个存放元素的位置
        // 插入时，先减，再赋值
        // 删除时，索引 +1（注意取模）
        front = 0;
        // 尾部指向下一个插入元素的位置
        // 插入时，先赋值，再加
        // 删除时，索引 -1（注意取模）
        rear = 0;
    }

    /**
     * Adds an item at the front of Deque. Return true if the operation is successful.
     */
    public boolean insertFront(int value) {
        if (isFull()) {
            return false;
        }
        front = (front - 1 + capacity) % capacity;
        arr[front] = value;
        return true;
    }

    /**
     * Adds an item at the rear of Deque. Return true if the operation is successful.
     */
    public boolean insertLast(int value) {
        if (isFull()) {
            return false;
        }
        arr[rear] = value;
        rear = (rear + 1) % capacity;
        return true;
    }

    /**
     * Deletes an item from the front of Deque. Return true if the operation is successful.
     */
    public boolean deleteFront() {
        if (isEmpty()) {
            return false;
        }
        // front 被设计在数组的开头，所以是 +1
        front = (front + 1) % capacity;
        return true;
    }

    /**
     * Deletes an item from the rear of Deque. Return true if the operation is successful.
     */
    public boolean deleteLast() {
        if (isEmpty()) {
            return false;
        }
        // rear 被设计在数组的末尾，所以是 -1
        rear = (rear - 1 + capacity) % capacity;
        return true;
    }

    /**
     * Get the front item from the deque.
     */
    public int getFront() {
        if (isEmpty()) {
            return -1;
        }
        return arr[front];
    }

    /**
     * Get the last item from the deque.
     */
    public int getRear() {
        if (isEmpty()) {
            return -1;
        }
        // 当 rear 为 0 时防止数组越界
        return arr[(rear - 1 + capacity) % capacity];
    }

    /**
     * Checks whether the circular deque is empty or not.
     */
    public boolean isEmpty() {
        return front == rear;
    }

    /**
     * Checks whether the circular deque is full or not.
     */
    public boolean isFull() {
        // 注意：这个设计是非常经典的做法
        return (rear + 1) % capacity == front;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class MyCircularDeque:

    def __init__(self, k: int):
        """
        Initialize your data structure here. Set the size of the deque to be k.
        """
        self.front = 0
        self.rear = 0
        self.capacity = k + 1
        self.arr = [0 for _ in range(self.capacity)]

    def insertFront(self, value: int) -> bool:
        """
        Adds an item at the front of Deque. Return true if the operation is successful.
        """
        if self.isFull():
            return False
        self.front = (self.front - 1 + self.capacity) % self.capacity
        self.arr[self.front] = value
        return True

    def insertLast(self, value: int) -> bool:
        """
        Adds an item at the rear of Deque. Return true if the operation is successful.
        """
        if self.isFull():
            return False
        self.arr[self.rear] = value
        self.rear = (self.rear + 1) % self.capacity
        return True

    def deleteFront(self) -> bool:
        """
        Deletes an item from the front of Deque. Return true if the operation is successful.
        """
        if self.isEmpty():
            return False
        self.front = (self.front + 1) % self.capacity
        return True

    def deleteLast(self) -> bool:
        """
        Deletes an item from the rear of Deque. Return true if the operation is successful.
        """
        if self.isEmpty():
            return False
        self.rear = (self.rear - 1 + self.capacity) % self.capacity;
        return True

    def getFront(self) -> int:
        """
        Get the front item from the deque.
        """
        if self.isEmpty():
            return -1
        return self.arr[self.front]

    def getRear(self) -> int:
        """
        Get the last item from the deque.
        """
        if self.isEmpty():
            return -1
        return self.arr[(self.rear - 1 + self.capacity) % self.capacity]

    def isEmpty(self) -> bool:
        """
        Checks whether the circular deque is empty or not.
        """
        return self.front == self.rear

    def isFull(self) -> bool:
        """
        Checks whether the circular deque is full or not.
        """
        return (self.rear + 1) % self.capacity == self.front
````

</CodeGroupItem>
<CodeGroupItem title="C++">
```C++
#include <iostream>
#include <vector>

using namespace std;

class MyCircularDeque {

private:
vector<int> arr;
int front;
int rear;
int capacity;

public:
/\*_ Initialize your data structure here. Set the size of the deque to be k. _/
MyCircularDeque(int k) {
capacity = k + 1;
arr.assign(capacity, 0);

        front = 0;
        rear = 0;
    }

    /** Adds an item at the front of Deque. Return true if the operation is successful. */
    bool insertFront(int value) {
        if (isFull()) {
            return false;
        }
        front = (front - 1 + capacity) % capacity;
        arr[front] = value;
        return true;
    }

    /** Adds an item at the rear of Deque. Return true if the operation is successful. */
    bool insertLast(int value) {
        if (isFull()) {
            return false;
        }
        arr[rear] = value;
        rear = (rear + 1) % capacity;
        return true;
    }

    /** Deletes an item from the front of Deque. Return true if the operation is successful. */
    bool deleteFront() {
        if (isEmpty()) {
            return false;
        }
        // front 被设计在数组的开头，所以是 +1
        front = (front + 1) % capacity;
        return true;
    }

    /** Deletes an item from the rear of Deque. Return true if the operation is successful. */
    bool deleteLast() {
        if (isEmpty()) {
            return false;
        }
        // rear 被设计在数组的末尾，所以是 -1
        rear = (rear - 1 + capacity) % capacity;
        return true;
    }

    /** Get the front item from the deque. */
    int getFront() {
        if (isEmpty()) {
            return -1;
        }
        return arr[front];
    }

    /** Get the last item from the deque. */
    int getRear() {
        if (isEmpty()) {
            return -1;
        }
        // 当 rear 为 0 时防止数组越界
        return arr[(rear - 1 + capacity) % capacity];
    }

    /** Checks whether the circular deque is empty or not. */
    bool isEmpty() {
        return front == rear;
    }

    /** Checks whether the circular deque is full or not. */
    bool isFull() {
        // 注意：这个设计是非常经典的做法
        return (rear + 1) % capacity == front;
    }

};

/\*\*

- Your MyCircularDeque object will be instantiated and called as such:
- MyCircularDeque\* obj = new MyCircularDeque(k);
- bool param_1 = obj->insertFront(value);
- bool param_2 = obj->insertLast(value);
- bool param_3 = obj->deleteFront();
- bool param_4 = obj->deleteLast();
- int param_5 = obj->getFront();
- int param_6 = obj->getRear();
- bool param_7 = obj->isEmpty();
- bool param_8 = obj->isFull();
  \*/

```
</CodeGroupItem>
</CodeGroup>


```
