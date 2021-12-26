---
title: LeetCode 专题：栈、队列、优先队列
date: 2019-02-16 13:00:00
author: liwei
top: false
mathjax: true
categories: leetcode 专题
tags:
  - 数组
permalink: leetcode-tag/stack-queue-priority-queue
---

# LeetCode 专题：栈、队列、优先队列

---

[TOC]

---

### LeetCode 第 20 题：括号匹配

### LeetCode 第 150 题：逆波兰表达式求值。

### LeetCode 第 150 题： 逆波兰表达式求值

逆波兰表达式求值。运算符放在两个数后面进行运算的表达式。



我的解答：

```java
public class Solution {

    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < tokens.length; i++) {
            String token = tokens[i];
            String pattern = "-?[0-9]+|[\\+\\-\\*/]";
            if (!token.matches(pattern)) {
                throw new RuntimeException("非法的表达式");
            }
            if (token.matches("-?[0-9]+")) {
                int num = Integer.valueOf(token);
                System.out.println(num);
                stack.push(num);
            }
            if (token.matches("[\\+\\-\\*/]")) {
                System.out.println("加减乘除" + token);
                if (stack.size() >= 2) {
                    int num1 = stack.pop();
                    int num2 = stack.pop();
                    int result = 0;
                    switch (token){
                        case "+":
                            result = num2 +num1;
                            break;
                        case "-":
                            result = num2 -num1;
                            break;
                        case "*":
                            result = num2 *num1;
                            break;
                        case "/":
                            result = num2 /num1;
                            break;
                    }
                    stack.push(result);
                }
            }
        }

        return stack.pop();
    }


    public static void main(String[] args) {
        String[] tokens = new String[]{"3", "-4", "+"};

        Solution solution = new Solution();
        int result = solution.evalRPN(tokens);
        System.out.println(result);
    }
}
```

是有问题的：Time Limit Exceeded 。然后我把上面的两个 System.out.println() 语句删除就 A 过了，好神奇，所以做题还是要规范啊。

### LeetCode 第 71 题：简化路径

### LeetCode 第 71 题：Simplify Path

传送门：https://leetcode.com/problems/simplify-path/description/。

第 2 种情况下，要求我们的程序能够有一定的容错处理的能力。



我的解答参考了如下的文章：
http://blog.csdn.net/u012249528/article/details/46705867

Java 代码实现：

```java
public class Solution {

    public String simplifyPath(String path) {
        String result = "";
        String[] pathList = path.split("/");
        if (pathList.length == 0) {
            return "/";
        }

        Stack<String> stack = new Stack<>();
        for (String p : pathList) {
            if ("".equals(p) || ".".equals(p)) {
                continue;
            }
            if ("..".equals(p)) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else { // 是正常的路径字符串的时候，入栈
                stack.push(p);
            }
        }


        // 现在考虑输出字符串
        while (!stack.isEmpty()) {
            result = "/" + stack.pop() + result;
        }
        if ("".equals(result)) {
            result = "/";
        }
        return result;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        String path1 = "/home/";
        String result1 = solution.simplifyPath(path1);
        System.out.println(result1);


        String path2 = "/a/./b/../../c/";
        String result2 = solution.simplifyPath(path2);
        System.out.println(result2);


        String path3 = "/..";
        String result3 = solution.simplifyPath(path3);
        System.out.println(result3);

        String path4 = "/..";
        String result4 = solution.simplifyPath(path4);
        System.out.println(result4);

        String path5 = "/abc/def/.";
        String result5 = solution.simplifyPath(path5);
        System.out.println(result5);
    }
}
```



## 二叉树的三种非递归遍历

栈和递归密不可分：分别可以解决二叉树的前序遍历、中序遍历、后序遍历

###  LeetCode 第144 题：前序遍历

### LeetCode 第 94 题：中序遍历

### LeetCode 第 145 题：后序遍历

### LeetCode 第 145 题： 后序遍历二叉树

递归写法

```java
public class Solution2 {

    private List<Integer> result = new ArrayList<>();

    /**
     * 递归的方式后续遍历二叉树
     * @param root
     * @return
     */
    public List<Integer> postorderTraversal(TreeNode root) {
        postorder(root);
        return result;

    }

    private void postorder(TreeNode root) {
        if(root!=null){
            postorder(root.left);
            postorder(root.right);
            result.add(root.val);
        }
    }
}

```



非递归写法

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

enum UseType {
    RECURSION,
    ADD
}

class Command {
    UseType useType;
    TreeNode treeNode;

    public Command(UseType useType, TreeNode treeNode) {
        this.useType = useType;
        this.treeNode = treeNode;
    }
}


public class Solution {

    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result  =new ArrayList<>();
        if(root==null){
            return result;
        }
        Stack<Command> stack = new Stack<>();
        stack.add(new Command(UseType.RECURSION,root));

        while (!stack.isEmpty()){
            Command command = stack.pop();

            if(UseType.ADD == command.useType){
                result.add(command.treeNode.val);
            }else {
                assert UseType.RECURSION == command.useType;
                stack.push(new Command(UseType.ADD,command.treeNode));
                if(command.treeNode.right!=null){
                    stack.push(new Command(UseType.RECURSION,command.treeNode.right));
                }
                if(command.treeNode.left!=null){
                    stack.push(new Command(UseType.RECURSION,command.treeNode.left));
                }
            }
        }
        return result;
    }

}
```



### LeetCode 第 341 题：类的设计问题，挺有意思的

## 二叉树的层序遍历

### LeetCode 第 102 题：层序遍历

### LeetCode 第 107 题：自底向上的层序遍历

### LeetCode 第 103 题：二叉树的锯齿形层次遍历

### LeetCode 第 199 题：二叉树的右视图

分析：二叉树从右边看，得到的一个数组。

### （一题多解）LeetCode 第 279 题：求最小的完全平方数之和

思路1：广度优先遍历、层序遍历

思路2：动态规划

### （难）LeetCode 第 127 题：

要求：给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。

### （难，据说经常考，要注意）LeetCode 第 126 题：

### LeetCode 第 347 题：前 K 个高频元素

思路：不能用排序，那就用优先队列。

### LeetCode 第 23 题：合并 K 个排序链表 

典型问题，一定要掌握。（1、优先队列；2、**分治归并**）

### LeetCode 第 225 题：用队列实现栈

思想：负负得正。

方法1：干脆就 `push` 的时候麻烦一点，出栈和查看栈顶元素就很简单了；

```python
from collections import deque


class MyStack(object):

    # 用一个栈实现队列，其实就是找规律
    # push 的时候麻烦
    # top 和 pop 的时候简单

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.queue = deque()

    def push(self, x):
        """
        Push element x onto stack.
        :type x: int
        :rtype: void
        """
        self.queue.append(x)
        l = len(self.queue)
        if l > 0:
            for _ in range(l - 1):
                self.queue.append(self.queue.popleft())

    def pop(self):
        """
        Removes the element on top of the stack and returns that element.
        :rtype: int
        """

        return self.queue.popleft()

    def top(self):
        """
        Get the top element.
        :rtype: int
        """
        return self.queue[0]

    def empty(self):
        """
        Returns whether the stack is empty.
        :rtype: bool
        """
        return not self.queue

# Your MyStack object will be instantiated and called as such:
# obj = MyStack()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.top()
# param_4 = obj.empty()
```



方法2：用两个队列实现栈

### LeetCode 第 232 题：用两个栈（stack）实现队列（queue）

设计辅助函数，出队列都从 stack2 出，进队列（push）都从 stack1 进。

自己在纸上画一画就很清楚了。只要涉及出队列和 peek 队列的，都执行一次辅助函数的操作。

**要特别注意的地方：只有当 stack2 为空的时候，才可以一次性把 stack1 倒到 stack2，然后再从 stack 栈顶拿元素。**

```python
class MyQueue(object):

    # 关键：stack1 是主栈
    # stack2 永远是辅助

    def __init__(self):
        self.stack1 = []
        self.stack2 = []

    def push(self, x):
        # 永远只向 stack1 加入元素
        self.stack1.append(x)

    def __shift_stacks(self):
        # 这里不要忘记，只有当 stack2 为空的时候，才可以一次性把 stack1 倒到 stack2  
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())

    def pop(self):
        # 只要是 pop 或者 peek 的时候，表示要从队列首拿出元素
        # 此时就要把 stack1 的元素全部倒入 stack2 ，然后拿出 stack2 的栈顶元素
        self.__shift_stacks()
        return self.stack2.pop()

    def peek(self):
        self.__shift_stacks()
        return self.stack2[-1]

    def empty(self):
        # 两个栈没有元素复制，只有二者都空的时候，才表示队列为空
        return not self.stack1 and not self.stack2

# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()
```

### LeetCode 第 341  题：Flatten Nested List Iterator

传送门：https://leetcode.com/problems/flatten-nested-list-iterator/description/

参考解答： 

<http://blog.csdn.net/jmspan/article/details/51285573>

<http://blog.csdn.net/l294265421/article/details/51203616>

思路: 题目要求用迭代器实现, 所以不能预先把值求出来. 可以利用栈来实现, 也就是用两个栈一个保存当前数组的元素指针, 另一个保存这个数组的结束迭代器. 用栈的目的是可以模拟递归, 也就是可以层层嵌套, 最深的总是在最上面, 当遍历完深层的数组还可以回来继续遍历之前的层. 

https://segmentfault.com/a/1190000008925686>

<https://segmentfault.com/a/1190000008925686>

<https://segmentfault.com/a/1190000008925686>

(这篇文章里面有很多扩展阅读，例如：leetcode 315 Count of Smaller Numbers After Self 以及 BST总结。) 



这道题是拉平层层嵌套的链表，题目难度为Medium。 



这种嵌套的问题很自然想到要用栈来处理，由于要按照先后次序输出，所以要将链表从尾部开始依次进栈，然后判断栈顶元素是数字还是链表，如果是链表，将该链表出栈之后按同样的方法将它自身的元素从尾部开始进栈，直到栈顶元素是数字即可出栈输出了。这里将主要操作放在了hasNext()函数中，没有在next()函数中处理是为了避免空链表干扰hasNext()函数的判断。具体代码： 









解法一： 

参考：<http://blog.csdn.net/zdavb/article/details/51553476> 

```java 
interface NestedInteger {
    boolean isInteger();
    Integer getInteger();
    List<NestedInteger> getList();
}


class NestedIntegerImpl implements NestedInteger {
    private boolean isInteger = false;
    private Integer intData;
    private List<NestedInteger> nestedList = new ArrayList<>();

    public NestedIntegerImpl(boolean isInteger, Integer intData) {
        this.isInteger = isInteger;
        this.intData = intData;
    }

    public NestedIntegerImpl(boolean isInteger, NestedInteger... nestedIntegers) {
        this.isInteger = false;
        for (NestedInteger nestedInteger : nestedIntegers) {
            this.nestedList.add(nestedInteger);
        }
    }

    @Override
    public boolean isInteger() {
        return isInteger;
    }

    @Override
    public Integer getInteger() {
        return intData;
    }

    @Override
    public List<NestedInteger> getList() {
        return nestedList;
    }
}

public class NestedIterator implements Iterator<Integer> {

    List<NestedInteger> nestedList;
    // 把下一个的值放在这个 data 变量里面
    int data;

    public NestedIterator(List<NestedInteger> nestedList) {
        this.nestedList = nestedList;
    }

    @Override
    public Integer next() {
        return data;
    }

    @Override
    public boolean hasNext() {
        while (nestedList != null && nestedList.size() > 0) {
            NestedInteger tmpInt = nestedList.remove(0);
            if (tmpInt.isInteger()) {
                data = tmpInt.getInteger();
                return true;
            } else {
                nestedList.addAll(0, tmpInt.getList());
            }
        }
        return false;
    }
}
```



测试用例一： 

```java 
/**
     * 测试用例 [1,[4,[6,5]]]
     * @param args
     */
public static void main(String[] args) {
    NestedInteger six = new NestedIntegerImpl(true, 6);
    NestedInteger five = new NestedIntegerImpl(true, 5);
    NestedInteger six_1_five = new NestedIntegerImpl(false, six, five);

    NestedInteger four = new NestedIntegerImpl(true, 4);
    NestedInteger four_2_six_1_five = new NestedIntegerImpl(false, four, six_1_five);

    NestedInteger one = new NestedIntegerImpl(true, 1);
    NestedInteger one_3_four_2_six_1_five = new NestedIntegerImpl(false, one, four_2_six_1_five);
    NestedIterator nestedIterator = new NestedIterator(one_3_four_2_six_1_five.getList());
    while (nestedIterator.hasNext()) {
        Integer next = nestedIterator.next();
        System.out.printf("%d \t", next);
    }
}
```

解法二：自己根据一的思路，使用 Stack 来完成的 

心得： 

思考？为什么用栈就可以解决这个问题呢？ 

Java 代码： 

NestedInteger 接口： 

```java 
interface NestedInteger { 
    boolean isInteger(); 
    Integer getInteger(); 
    List<NestedInteger> getList(); 
} 
```

NestedInteger 接口的实现（LeeCode 此题并不要求，我为了测试添加）： 

```java 
class NestedIntegerImpl implements NestedInteger {
    boolean isInteger;
    int intData;
    List<NestedInteger> nestedList = new ArrayList<>();

    public NestedIntegerImpl(boolean isInteger, int intData) {
        this.isInteger = isInteger;
        this.intData = intData;
    }

    public NestedIntegerImpl(boolean isInteger, NestedInteger... nestedIntegers) {
        this.isInteger = isInteger;
        for (NestedInteger nestedInteger : nestedIntegers) {
            nestedList.add(nestedInteger);
        }
    }


    @Override
    public boolean isInteger() {
        return isInteger;
    }

    @Override
    public Integer getInteger() {
        return intData;
    }

    @Override
    public List<NestedInteger> getList() {
        return nestedList;
    }
}
```

NestedIterator 接口的实现（这是 LeetCode 要求我们做的事情）： 

```java 
public class NestedIterator implements Iterator<Integer> {

    private Stack<NestedInteger> stack = new Stack<>();
    private int data;


    public NestedIterator(List<NestedInteger> nestedList) {
        for (int i = nestedList.size() - 1; i >= 0; i--) {
            stack.push(nestedList.get(i));
        }
    }

    @Override
    public boolean hasNext() {
        while (!stack.isEmpty()) {
            NestedInteger top = stack.pop();
            if (top.isInteger()) {
                data = top.getInteger();
                return true;
            } else {
                List<NestedInteger> nestedList = top.getList();
                for (int i = nestedList.size() - 1; i >= 0; i--) {
                    stack.push(nestedList.get(i));
                }
            }
        }
        return false;
    }

    @Override
    public Integer next() {
        return data;
    }

}
```



测试用例： 

```java 
/**
 * 测试用例 [[6,4,5],8,[1,2]]
 *
 * @param args
 */
public static void main(String[] args) {
    NestedInteger six = new NestedIntegerImpl(true, 6);
    NestedInteger four = new NestedIntegerImpl(true, 4);
    NestedInteger five = new NestedIntegerImpl(true, 5);
    NestedInteger six_four_five = new NestedIntegerImpl(false, six, four, five);

    NestedInteger eight = new NestedIntegerImpl(true, 8);

    NestedInteger one = new NestedIntegerImpl(true, 1);
    NestedInteger two = new NestedIntegerImpl(true, 2);
    NestedInteger one_two = new NestedIntegerImpl(false, one,two);


    NestedInteger six_four_five__eight__one_two = new NestedIntegerImpl(false, six_four_five, eight,one_two);


    NestedIterator nestedIterator = new NestedIterator(six_four_five__eight__one_two.getList());
    while (nestedIterator.hasNext()) {
        Integer next = nestedIterator.next();
        System.out.printf("%d \t", next);
    }
}
```

解法三：（同解法二，只不过使用的是双端队列） 

```java 
public class NestedIterator implements Iterator<Integer> {

    private int data;
    private Deque<NestedInteger> deque = new ArrayDeque<>();

    public NestedIterator(List<NestedInteger> nestedList) {
        for (NestedInteger nestedInteger : nestedList) {
            deque.addLast(nestedInteger);
        }
    }

    @Override
    public boolean hasNext() {
        while (!deque.isEmpty()) {
            NestedInteger top = deque.pollFirst();
            if (top.isInteger()) {
                this.data = top.getInteger();
                return true;
            } else {
                List<NestedInteger> nestedList = top.getList();
                for (int i = nestedList.size() - 1; i >= 0; i--) {
                    deque.addFirst(nestedList.get(i));
                }
            }
        }
        return false;
    }

    @Override
    public Integer next() {
        return data;
    }
}
```



（本节完）


