---
title: 《算法与数据结构》学习笔记8：二分搜索树
date: 2018-04-23 08:00:00
author: liwei
top: false
category: 算法与数据结构
tags:
  - 二分搜索树
mathjax: true
permalink: data-structure/binary-search-tree
toc: true 
---

# 8. 《算法与数据结构》学习笔记：二分搜索树

## 8.1 基于有序数组的二分查找法

+ 查找问题是计算机中非常重要的一类基础问题；

+ 这个问题可以这样理解，在我们的生活中，要想方便地“找东西”，就要在“存东西”的时候多花点心思。例如：我们在“存东西”的时候，会有意识地“分门别类”放好。在我们的计算机中，文件夹呈现的树形结构，就是一种分类存放的策略，我们想要找张三的资料，肯定不会去李四的文件夹下查找。我们去图书馆要找一本《算法》的书，我们肯定不会去标明“文学”的那个书架上找；

+ 学习过 Java 语言的朋友们一定知道 hash 表，我们可以给放进集合中的对象计算一个 hash 值，以后取出来的时候通过计算 hash 值得到之前放进去的对象，这也是一种存放数据和读取数组的策略的策略；

+ 那么“二分查找法”要求数据是怎么存的呢？很简单，只要数据是顺序摆放的，我们就可以用“二分查找算法”。即二分查找法的使用前提：**对于有序的数列才能使用二分查找法**，如果数组无序，就不能使用二分查找法。

> “二分查找法”能够根据数组的索引大大减少每次查找所需的比较次数。

因为每次查找都能缩短一半的查找区间。

+ 二分查找法的思想在 1946 年就被提出来了。但是第 1 个没有 bug 的二分查找法在 1962 年才出现。这个 bug  就在于查找两个数的中间数，如何避免为了求中间数而导致的整形溢出，避免这个 bug 的方法我们在介绍归并排序时介绍过。

二分查找算法要求数组是顺序数组，但是在我们的生活中，还有这样的场景：我们购买的物品是一件一件买回来的，有时，我们还会丢弃一些物品，那么是不是我们每增加或者丢弃一些物品的时候，都要将他们重新整理一下呢？

可以查阅资料，看看如何使用二分查找实现 `floor` 和 `ceiling` 操作。

## 8.2 二分搜索树（Binary Search Tree）

+ 实现查找表，可以通过“普通数组”、“顺序数组”、“二分搜索树”来实现。其中，最有效的方式就是实现二分搜索树。这是因为：

> BST 是一种能够将链表插入的灵活性和有序数组查找的高效性结合起来的数据结构。

BST 的定义如下：

> 一棵二叉搜索树（BST）首先是一棵二叉树，其中每个结点都含有一个可以比较的键（对于 Java 语言来说，就是实现了 `Comparable` 接口的对象）以及相关联的值，且每个结点的键都大于其左子树中的任意结点的键而小于右子树中任意结点的键。

理解 BST 的定义是理解关于 BST 操作的基础。

+ 二分搜索树很适合用于实现“查找表”或者“字典”这种数据结构。
+ 二分搜索树不一定是一棵完全二叉树。
+ 以左右孩子为根的子树仍为二分搜索树；任一结点的键大于左子树中的**所有**结点的键，小于右子树中的**所有**结点的键；
+ 我个人认为：理解二分搜索树的性质，应该通过二分搜索树的定义，以及接下来我们对二分搜索树的一些操作，看看我们对二分搜索树中的数据进行"增删改查"的时候，是如何去维护"二分搜索树"的性质的。
+ 我一开始在学习"二分搜索树"的时候，有一些混淆的概念如下：

1、"二分搜索树"首先是"二叉树"，有了"搜索"两个字，对结点的键值就有要求了，这个结点的键值要可比较，并且还要按照符合二分搜索树的性质来组织结构，在做 LeetCode 上的问题的时候，一定要看清楚题目中给出的条件包不包含"搜索"两个字；
2、"二分搜索树"和"堆"："最大堆"只要求父结点不小于子结点就可以了，但是"二分搜索树"就完全不一样了；另外，"堆"可以用数组来表示，因为"堆"是"完全二叉树"，而"二分搜索树"是动态的树形结构，这是由它们的性质决定的，"堆"的操作其实比 BST 少（"堆"有自己适用的场合），BST 能够帮助我们完成很多事情。

初始化 BST：
```java
public class BST {

    // 使用内部类来表示结点
    private class Node {

        // 为了说明算法，我们将 key 设置成易于比较的 int 类型，设计成实现了 Comparable 接口的对象是更标准的做法
        private int key;
        private int value;
        private Node left;
        private Node right;

        public Node(int key, int value) {
            this.key = key;
            this.value = value;
            this.left = null;
            this.right = null;
        }

    }

    // 节根点
    private Node root;

    // 二分搜索树中的结点个数
    private int count;

    // 默认构造一棵空的二分搜索树
    public BST() {
        root = null;
        count = 0;
    }

    // 返回二分搜索树的结点个数
    public int size() {
        return count;
    }

    // 返回二分搜索树是否为空
    public boolean isEmpty() {
        return count == 0;
    }
}
```


查阅资料，如何借助二分搜索树实现以下函数：min、max、floor、ceil、rank、select。二分搜索树还可以回答很多数据之间的关系的问题。

## 8.3 二分搜索树的第 1 个操作：向二分搜索树中插入新的结点

+ 我们利用了二分搜索树的递归的性质来完成 `insert` 函数的编写。
+ 应该特别注意的是：**该递归的方法返回了插入了新的结点的二分搜索树的根**，这一点保证了插入新结点以后，它能够被它的父结点的 `left` 或 `right` 指向，这一点要认真体会：

1、`node.left = insert(node.left, key, value);`

2、`node.right = insert(node.right, key, value);`

注意：在递归的实现中，应该把 `insert` 的结果返回给 `node.left` 和 `node.right` ，刚开始接触这个算法的时候，觉得很难理解，写多了就觉得比较自然了。


```java
public void insert(int key, int value) {
    insert(root, key, value);
}

// 向一棵二分搜索树的根结点插入 key 和 value，看看放在左边还是放在右边，然后把插入以后形成的树的根结点返回。
// 注意这里的递归调用实现，初学的时候，不是很好理解。可以尝试从最最简单的情况开始分析。
private Node insert(Node node, int key, int value) {
    if (node == null) {
        count++;
        return new Node(key, value);
    }
    if (key == node.key) {
        // 如果 key 值存在，直接覆盖就好了，即更新
        node.value = value;
    }
    if (key < node.key) {
        // 递归调用结束以后，要把根结点返回回去
        // 因为很可能，node.left 是空，要让新创建的结点接到原来的根，就得执行这步操作
        node.left = insert(node.left, key, value);
    } else {
        // 递归调用结束以后，要把根结点返回回去
        node.right = insert(node.right, key, value);
    }
    return node;
}
```

## 8.4 二分搜索树的第 2 个操作：元素查找和判断是否包含

+ 这一节，我们要实现查找的两个方法：二分查找树的包含 `contain`（返回 `true` 或者 `false`） 和查找 `search`（返回相应的 `vlaue` 值），这两个方法同质。还要考虑查找成功和失败这两种情况。
+ 1、首先实现 `contain` 方法。

```java
public boolean contain(int key) {
    return contain(root, key);
}

private boolean contain(Node node, int key) {
    // 先处理递归到底的情况
    if (node == null) {
        return false;
    }
    if (node.key == key) {
        return true;
    } else if (key < node.key) {
        return contain(node.left, key);
    } else {
        return contain(node.right, key);
    }
}
```

+ 2、再实现 `search` 方法。

```java
public int search(int key) {
    return search(root, key);
}

// 在以 node 为根的二分搜索树中查找 key 所对应的 value
private Integer search(Node node, int key) {
    // 先处理递归到底的情况
    if (node == null) {
        return null;
    }
    if (node.key == key) {
        return node.value;
    } else if (key < node.key) {
        return search(node.left, key);
    } else {
        return search(node.right, key);
    }
}
```

## 8.5 二分搜索树的第 3 个操作：深度优先遍历

+ 二分搜索树的遍历，其实就是挨个把二分搜索树中的元素拿出来，只不过二分搜索树不像数组或者链表那样，有明显的“从头到尾”的性质。但其实**走完一个二分搜索树也是有规律可循的**，其中一种方式就是深度优先遍历。
+ 深度优先遍历的顺序是下面这张图展示的样子。首先尝试走到最深，再回退，再走到另一个分支的最深。

![](https://liweiwei1419.github.io/images/algorithms/bst/二分搜索树的深度优先遍历.jpg)

那么什么是二分搜索树的前序、中序、后序遍历呢？

![](https://liweiwei1419.github.io/images/algorithms/bst/遍历方式的解释.jpg)

+ 把握要点：**通过对深度优先遍历**的遍历路径，我么可以看出，深度优先遍历走完一棵二叉树，每个结点会被访问 3 次，分别对应左边、中间和右边，那么在什么位置进行输出，就对应了深度优先遍历的这三种遍历方式：前序遍历，在访问左边位置的时候，进行操作；中序遍历，在访问中间位置的时候，进行操作；后序遍历，在访问右边位置的时候，进行操作；。
+ 使用递归的方式实现的代码编写是异常简单的！下面的图表多看几遍就明白了，千万不要忘记了对 node 是否为 null 的判断。下面用递归的方式编写前、中、后序遍历是十分简单的。它们的结构是完全相同的。

![](https://liweiwei1419.github.io/images/algorithms/bst/前序中序后序遍历.jpg)

+ 后序遍历与空间释放

![](https://liweiwei1419.github.io/images/algorithms/bst/后序遍历与空间释放.jpg)

可以看到，红色标注的部分是结构一致的。

+ 记忆要点：左右子树都是递归处理，树根是真正要执行的操作。后序遍历的一个重要特点：前序和后序都访问完以后，才做操作。
+ 中序遍历的重要结论：中序遍历可以将数据按照从小到大升序排列。
+ 后序遍历的重要结论：后续遍历在空间释放的时候可以先释放左右结点，再释放自身。

```java
// 二分搜索树的前序遍历
public void preOrder() {
    preOrder(root);
}

private void preOrder(Node node) {
    if (node != null) {
        System.out.printf("%s ", node.value);
        preOrder(node.left);
        preOrder(node.right);
    }
}

// 二分搜索树的中序遍历
public void inOrder() {
    inOrder(root);
}

private void inOrder(Node node) {
    if (node != null) {
        inOrder(node.left);
        System.out.printf("%s ", node.value);
        inOrder(node.right);
    }
}

// 二分搜索树的后序遍历
public void postOrder() {
    postOrder(root);
}

private void postOrder(Node node) {
    if (node != null) {
        postOrder(node.left);
        postOrder(node.right);
        System.out.println(node.value);

    }
}
```

- 补充知识：使用非递归的方法完成二分搜索树的三种深度优先遍历。


## 8.6 二分搜索树的第 4 个操作：广度优先遍历

+ 重点：广度优先遍历区别于深度优先遍历的方式是**我们首先将每一层的结点优先遍历完毕**。
+ 要想完成广度优先遍历，我们要借助队列（先进先出，后进后出）这个数据结构。
+ 具体实现方式 ：当队列中的队首出队的时候，要从二叉搜索树中找到它的两个孩子入队（如果有左边孩子的话，左边先入队）。队列出队为空的时候，就将二叉树遍历完成了。
+ 我们再归纳一下广度优先遍历的步骤：

1. 将根结点入队（入队的时候不做别的操作）；
2. 队列非空，所以接下来就要出队，规则是：依次出队，只要出队的元素有孩子，左右孩子依次入队，如果没有孩子不做任何操作。

代码实现：

```java
// 二分搜索树的广度优先遍历(层序遍历)
public void levelOrder() {
    Queue<Node> queue = new ArrayDeque<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        Node node = queue.poll();
        System.out.println(node.key);
        if (node.left != null) {
            queue.add(node.left);
        }
        if (node.right != null) {
            queue.add(node.right);
        }
    }
}
```

以下的总结是针对深度优先遍历的 3 种方式和广度优先的 1 种方式，总共 4 种遍历方式而言的：整个遍历的复杂度是：$O(n)$。

+ 不论是深度优先遍历还是广度优先遍历，对于二分搜索树来说，每一个结点只访问了常数次；
+ **归并排序和快速排序的本质其实是二叉树的深度优先遍历的过程**；
+ 重点把握思想：1、递归调用；2、使用队列实现一个更加复杂的算法的过程（这种按顺序访问的情况，可以使用队列）。

## 8.7 二分搜索树的结点的删除（这部分有一定难度，不过可以分情况讨论）

### 8.7.1 第 1 种情况：讨论删除二分搜索树中的最小结点和最大结点

+ 我们要删除结点，首先要找到这些结点。因此首先要理解下面的这两个基本且简单的性质：

最小值结点如何查找：从根结点开始，不停地沿着左边结点的方向找，直到再也没有左结点为止；

最大值结点如何查找：从根结点开始，不停地沿着右边结点的方向找，直到再也没有右结点为止。

```java
// 查找二分搜索树 key 的最小值
public int minimum() {
    assert count != 0;
    Node node = minimum(root);
    return node.key;
}

private Node minimum(Node node) {
    if (node.left == null) {
        return node;
    }
    return minimum(node.left);
}


// 查找二分搜索树 key 的最大值
public int maximum() {
    assert count != 0;
    Node node = maximum(root);
    return node.key;
}

private Node maximum(Node node) {
    if (node.right == null) {
        return node;
    }
    return maximum(node.right);
}
```

+ 删除最小值结点分两种情况：
1. 最小值结点没有右孩子（子树），此时直接删除就好；
2. 最小值结点有右孩子（子树），此时让右孩子（子树）代替自己就可以了。

+ 同理分析可以得到：删除最大值结点也分两种情况：
1. 最大值结点没有左孩子（子树），此时直接删除就好；
2. 最大值结点有左孩子（子树），此时让左孩子（子树）代替自己就可以了。

```java
// 从二分搜索树中删除最小 key 所在的结点
public void removeMin() {
    if (root != null) {
        root = removeMin(root);
    }
}

// 特别注意：删除了一个结点以后，根元素很可能会发生变化，因此，算法设计的时候，一定要把根结点返回回去
private Node removeMin(Node node) {
    // 仔细体会这个过程
    if (node.left == null) {
        // 就是删除这个结点
        Node rightNode = node.right;
        node.right = null; // 因为左边已经是空了，再把右边释放掉
        count--;
        return rightNode;

    }
    node.left = removeMin(node.left);
    return node;
}

// 从二分搜索树中删除最大 key 所在的结点
public void removeMax() {
    if (root != null) {
        // 删除了最大元素以后的根结点很有可能不是原来的根结点
        // 所以一定要赋值回去
        root = removeMax(root);
    }
}

// 特别注意：删除了一个结点以后，根元素很可能会发生变化，因此，算法设计的时候，一定要把根结点返回回去
private Node removeMax(Node node) {
    if (node.right == null) {
        Node nodeLeft = node.left;
        node.left = null;
        count--;
        return nodeLeft;
    }
    node.right = removeMax(node.right);
    return node;
}
```


### 8.7.2 第 2 种情况：讨论删除只有左孩子（子树）或者只有右孩子（子树）的结点

处理的方式也很简单，只要让那个非空的左右孩子代替自己就可以了，代码我们合并在下一种情况中展示。

### 8.7.3 第 3 种情况：删除左右都有孩子（子树）的结点

+ 代替的那个结点是右边子树的最小值（即找到要删除的这个结点的后继结点），或者是左边子树的最大值（或者找到要删除的这个结点的前驱）。
+ 重要结论：删除二分搜索树的任意一个结点的时间复杂度是 $O(logn)$。主要消耗的时间都在找到这个结点，删除这个结点的过程虽然很复杂，但是操作都是指针间的交换，是常数级别的，和整棵树有多少个结点是无关的。所以二分搜索树的删除是非常高效的。

```java
// 算法并不难理解，但是在编写的过程中有一些情况需要讨论清楚，并且要注意一写细节，多写几遍就清楚了
public void remove(int key) {
    root = remove(root, key);
}

private Node remove(Node node, int key) {
    if (node == null) {
        return null;
    }
    if (key < node.key) {
        // 这里要想清楚一个问题，删除以后的二分搜索树的根结点很可能不是原来的根结点
        node.left = remove(node.left, key);
        return node;
    } else if (key > node.key) {
        node.right = remove(node.right, key);
        return node;
    } else {
        // key == node.key
        if (node.left == null) {
            Node rightNode = node.right;
            node.right = null;
            count--;
            return rightNode;
        }

        if (node.right == null) {
            Node leftNode = node.left;
            node.left = null;
            count--;
            return leftNode;
        }
        // 当前 node 的后继
        Node successor = minimum(node.right);
        count++;// 下面删除了一个结点，所以要先加一下
        successor.right = removeMin(node.right);
        successor.left = node.left;
        node.left = null;
        node.right = null;
        count--;
        return successor;
    }
}
```

## 8.8 二分搜索树的顺序性

+ 之前我们将二分搜索树当做查找表的一种实现。我们使用二分搜索树的目的是通过查找 key 马上得到 value。
+ 二分搜索树还能回答哪些问题呢？这些问题都和顺序相关。
+ 1、minimum，maximum；
+ 2、successor，predecessor（这两个元素在二分搜索树的 key 中必须存在）；
+ 3、floor（地板），ceil（天花板）（这两个元素在二分搜索树的 key 中可以存在，也可以不存在）；
+ 4、rank（58 是排名第几的元素）、select（排名第10的元素是谁，这个问题与 rank 正好相反）。

![](https://liweiwei1419.github.io/images/algorithms/bst/rank.jpg)

+ 之前，我们的二分搜索树并不支持有重复元素的二分搜索树。在有些情况下，我们须要支持重复元素的二分搜索树。

![](https://liweiwei1419.github.io/images/algorithms/bst/支持重复元素的二分搜索树.jpg)

## 8.9 二分搜索树的局限性

+ 二分查找树的性能。二分查找树在一些极端情况下性能并不好。
+ 我们首先要认识下面一个事实：同样的数据，可以对应不同的二分搜索树。看下面的例子。

![](https://liweiwei1419.github.io/images/algorithms/bst/可以对应不同的二分搜索树.jpg)

此时二分搜索树可以**退化为链表**。此时时间复杂度变成了 $O(n)$。我们可以做一个极端测试：如果把 key 排序好以后，依次插入到二分搜索树中，此时二分搜索树的高度就会变得非常高。

+ 解决方案：改造二叉树的实现，使得二叉树无法成为链表。使用平衡二叉树。
+ 使用红黑树（**红黑树是一种平衡二叉树的实现**，其它平衡二叉树的实现还有 2-3 tree，AVL tree，Splay tree 伸展树，平衡二叉树和堆的结合：Treap）。左右两棵子树的高度差不会超过1。
+ 一个很有意思的数据结构：trie（设计巧妙，实现不难）。使用 trie 统计词频。

![](https://liweiwei1419.github.io/images/algorithms/bst/前缀树 trie.jpg)

## 8.10 树形问题和更多树

+ 虽然没有创建树。递归方法天然地具有递归的性质。归并排序法和快速排序法的思想它们像极了对一棵树进行后序遍历和前序遍历。
+ **递归的思想**大量应用于搜索问题：一条龙游戏、8 数码、8皇后、数独、搬运工、人工智能：搬运工，**树形搜索**、机器学习。
+ 更多的树还有：KD 树，区间树，哈夫曼树。
+ 这一节的最后，老师介绍了很多开放的问题，帮助我们培养对算法的兴趣。

## 8.11 二分搜索树的代码实现

### 代码实现（Java）

https://gist.github.com/liweiwei1419/490d6fa4a92b88b166e5680978858034

![](https://liweiwei1419.github.io/images/algorithms/bst/二分搜索树实现.jpg)

+ 注意：这里查找 key 的最小值，查找 key 的最大值，删除 key 的最小值，删除 key 的最大值，删除任意结点的操作还比较生疏，希望多加练习（BST6.java、BST7.java）！
+ 另外，使用非递归的方式实现递归的效果，用在遍历和查找最小最大、删除最小最大上，也要自己实现一遍。



---

补充内容：

+ 堆是二叉树结构，但不是二分搜索树结构。
+ 二分查找的思想在 LeetCode 中有很多应用，希望引起重视。
+ 分别使用递归和非递归实现二分查找算法，以及相应的练习。
+ 查找相关的问题：min、max、rank、select、floor、ceiling
+ 什么是完全二叉树、什么是满二叉树
+ 注意为 BST 增加（insert） 结点，使用递归方法将结点挂接到原来的结点上，那么如何写非递归的实现呢？
+ 使用 BST 还可以解决一些例如逆序对这类的问题
+ 删除二分搜索树的结点（**其实就是分类讨论**），应该要做一下总结，否则每次都忘记
+ BST 更一般地，二叉树的 4 种遍历方式、广度优先遍历，要设置一个队列，深度优先遍历不论是递归还是非递归都和栈有关系


## BST 的 floor 与 ceiling

+ floor(key) 函数返回比 key 小的数的最大值，如果 BST 中没有比 key 小的数，则返回 null
+ ceiling(key) 函数返回比 key 大的数的最小值，如果 BST 中没有比 key 大的数，则返回 null

### floor 函数的实现

```java
// 返回以 node 为根的二分搜索树中，小于等于 key 的最大值
private Integer floor(Node node, int key) {
    if (node == null) {
        return null;
    }
    if (node.key == key) {
        return node.value;
    }
    if (key < node.key) {
        return floor(node.left, key);
    }
    Integer tempValue = floor(node.right, key);
    if (tempValue != null) {
        return tempValue;
    }
    return node.value;
}
```

说明：
+ 如果给定的键 key 小于二分搜索树的根结点的键，那么小于等于 key 的最大键 floor(key) 一定位于根结点的左子树中；
+ 如果给定的键 key 大于二分搜索树的根结点的键，分两种情况：
1. 当根结点的右子树中存在小于等于 key 的结点的时候，小于等于 key 的最大键才会出现在右子树中；
2. 否则根结点就是小于等于 key 的最大键。

我们可以举出一个具体的例子来说明：

<img src="https://liweiwei1419.github.io/images/algorithms/bst/floor.png">

实现 `floor(int key)` 函数的关键：

1. 利用 BST 的 key 具有顺序性和 BST 的递归性质；
2. 写好递归函数，就要处理好递归到底的条件，这里 `node == null` 和 `node.key = key` 就是递归终止条件，**`node == null` 直接影响了后续的逻辑**。


### ceiling 函数的实现

```java
// 返回以 node 为根的二分搜索树中，小于等于 key 的最大值
private Integer ceiling(Node node, int key) {
    if (node == null) {
        return null;
    }
    if (key == node.key) {
        return node.value;
    }
    if (key > node.key) {
        return ceiling(node.right, key);
    }
    Integer tempValue = ceiling(node.left, key);
    if (tempValue != null) {
        return tempValue;
    }
    return node.value;
}
```

（本节完）



---
title: 【算法日积月累】13-二分搜索树
date: 2019-01-14 08:00:00
author: liwei
top: false
mathjax: true
summary: 本文介绍了二分搜索树。
category: 算法与数据结构
tags:
  - binary-search-tree
permalink: algorithms-and-data-structures/binary-search-tree
---

# 【算法日积月累】13-二分搜索树

## 如何查找

我们先从二分查找法开始说起，生活中，如果我们摆放物品是按照一定规律的话，那么查找起来就会非常快，如果我们杂乱无章的摆放我们的物品，那么找起来就非常费劲，我们几乎要看看我们所有可能放置物品的地方，这样的操作无异于计算机中的遍历操作，于是乎，如何摆放以使得我们高效地查找，就是一个值得研究的话题。

1、二分查找法的时间复杂度是 $O(\log n) $，与“递归”相关的算法（呈现树形结构的算法）一般复杂度都是对数阶的复杂度。

2、通过递归来思考一个问题通常更加容易，但递归在性能上会略差（稍差但不意味着我们不会去使用它），因为我们要通过栈来保存层层递归的中间变量。

# 二分搜索树（Binary Search Tree）

二分搜索树（Binary Search Tree），简称为 BST。二分搜索树这个数据结构的提出，是自来于“查找表”和“字典”这种数据结构。

在“哈希表”没有出现之前，可以通过“普通数组”、“顺序数组”、“二分搜索树”实现查找表。三者之中，最有效的方式是“二分搜索树”。这是因为，BST 是一种能够将链表插入的灵活性和有序数组查找的高效性结合起来的数据结构。下面我们比较一下这三个数据结构。

|                | **查找元素** | **插入元素** | **删除元素** |
| -------------- | ------------ | ------------ | ------------ |
| **普通数组**   | $O(n)$       | $O(n)$       | $O(n)$       |
| **顺序数组**   | $O(\log n) $ | $O(n)$       | $O(n)$       |
| **二分搜索树** | $O(\log n) $ | $O(\log n) $ | $O(\log n) $ |

对于上表的说明：

普通数组的插入操作：要先查找有没有这个元素，然后插入或者覆盖。

普通数组的删除操作：要先查找有没有这个元素，然后删除或者什么都不做。

顺序数组的查找操作：可以使用二分查找法，二分查找法的时间复杂度是 $O(\log n)$。

二分搜索树的定义如下：

> 一棵二叉搜索树（BST）首先是一棵二叉树，其中每个结点都含有一个可以比较的键（对于 Java 语言来说，就是实现了 `Comparable` 接口的对象）以及相关联的值，且每个结点的键都大于其左子树中的任意结点的键而小于右子树中任意结点的键。

理解 BST 的定义是理解关于 BST 操作的基础。

1、二分搜索树很适合用于实现“查找表”或者“字典”这种数据结构；

2、二分搜索树不一定是一棵完全二叉树。

3、以左右孩子为根的子树仍为二分搜索树；任一结点的键大于左子树中的**所有**结点的键，小于右子树中的**所有**结点的键。

理解二分搜索树的性质，应该通过定义，以及二分搜索树的操作，看看我们对二分搜索树中的数据进行“增删改查”的时候，是如何去维护“二分搜索树”的性质。

我一开始在学习“二分搜索树”的时候，有一些混淆的概念如下：

1、“二分搜索树”首先是“二叉树”，有了“搜索”两个字，对结点的 `key` 就有要求了，这个结点的键值要可比较，并且还要按照符合二分搜索树的性质来组织结构，在做 LeetCode 上的问题的时候，一定要看清楚题目中给出的条件包不包含“搜索”两个字；
2、“二分搜索树”和“堆”的比较：“最大堆”只要求父结点不小于子结点就可以了，但是“二分搜索树”就完全不一样了；另外，“堆”可以用数组来表示，因为“堆”是“完全二叉树”，而“二分搜索树”是动态的树形结构，这是由它们的性质决定的，“堆”的操作其实比 “二分搜索树” 少（“堆”有自己适用的场合），“二分搜索树” 能够帮助我们完成很多事情。

## 初始化 BST

Java 代码：

```java
public class BST {

    // 使用内部类来表示结点
    private class Node {

        // 为了说明算法，我们将 key 设置成易于比较的 int 类型，设计成实现了 Comparable 接口的对象是更标准的做法
        private int key;
        private int value;
        private Node left;
        private Node right;

        public Node(int key, int value) {
            this.key = key;
            this.value = value;
            this.left = null;
            this.right = null;
        }

    }

    // 根结点
    private Node root;

    // 二分搜索树中的结点个数
    private int count;

    // 默认构造一棵空的二分搜索树
    public BST() {
        root = null;
        count = 0;
    }

    // 返回二分搜索树的结点个数
    public int size() {
        return count;
    }

    // 返回二分搜索树是否为空
    public boolean isEmpty() {
        return count == 0;
    }
}
```

## 二分搜索树的操作：增

我们利用二分搜索树的递归的性质来完成 `insert` 函数的编写。

应该特别注意的是：**该递归的方法返回了插入了新的结点的二分搜索树的根**，这一点保证了插入新结点以后，它能够被它的父结点的 `left` 或 `right` 指向，这一点要认真体会：

1、`node.left = insert(node.left, key, value);`

2、`node.right = insert(node.right, key, value);`

注意：在递归的实现中，应该把 `insert` 的结果返回给 `node.left` 和 `node.right` ，刚开始接触这个算法的时候，觉得很难理解，写多了就觉得比较自然了。

Java 代码：

```java
public void insert(int key, int value) {
    insert(root, key, value);
}

// 向一棵二分搜索树的根结点插入 key 和 value，看看放在左边还是放在右边，然后把插入以后形成的树的根结点返回。
// 注意这里的递归调用实现，初学的时候，不是很好理解。可以尝试从最最简单的情况开始分析。
private Node insert(Node node, int key, int value) {
    if (node == null) {
        count++;
        return new Node(key, value);
    }
    if (key == node.key) {
        // 如果 key 值存在，直接覆盖就好了，即更新
        node.value = value;
    }
    if (key < node.key) {
        // 递归调用结束以后，要把根结点返回回去
        // 因为很可能，node.left 是空，要让新创建的结点接到原来的根，就得执行这步操作
        node.left = insert(node.left, key, value);
    } else {
        // 递归调用结束以后，要把根结点返回回去
        node.right = insert(node.right, key, value);
    }
    return node;
}
```

## 二分搜索树的操作：查、改

这一部分，我们要实现查找的两个方法：二分查找树的包含 `contain`（返回 `true` 或者 `false`） 和查找 `search`（返回相应的 `vlaue` 值），这两个方法同质。还要考虑查找成功和失败这两种情况。

1、首先实现 `contain` 方法。

Java 代码：

```java
public boolean contain(int key) {
    return contain(root, key);
}

private boolean contain(Node node, int key) {
    // 先处理递归到底的情况
    if (node == null) {
        return false;
    }
    if (node.key == key) {
        return true;
    } else if (key < node.key) {
        return contain(node.left, key);
    } else {
        return contain(node.right, key);
    }
}
```

2、再实现 `search` 方法。

Java 代码：

```java
public int search(int key) {
    return search(root, key);
}

// 在以 node 为根的二分搜索树中查找 key 所对应的 value
private Integer search(Node node, int key) {
    // 先处理递归到底的情况
    if (node == null) {
        return null;
    }
    if (node.key == key) {
        return node.value;
    } else if (key < node.key) {
        return search(node.left, key);
    } else {
        return search(node.right, key);
    }
}
```

## 二分搜索树的操作：删

下面考虑最难的情况：删除左右都有孩子的结点。

思路：拿一个已经有的结点代替这个被删除的结点，同时保持二分搜索树的性质不变。

1962年，由 Hibbard 提出，即 Hibbard Deletion（Hibbard 删除法），即：代替的那个结点是右边子树的最小值（即找到要删除的这个结点的后继结点），或者是左边子树的最大值（或者找到要删除的这个结点的前驱）。

1、删除二分搜索树的任意一个结点的时间复杂度是 $O(\log n)$；

2、主要消耗的时间都在找到这个结点，删除这个结点的过程虽然很复杂，但是操作都是指针间的交换，是常数级别的。


### 第 1 种情况：删除二分搜索树中的最小结点和最大结点

我们要删除结点，首先要找到这些结点。因此首先要理解下面的这两个基本且简单的性质：

最小值结点如何查找：从根结点开始，不停地沿着左边结点的方向找，直到再也没有左结点为止；

最大值结点如何查找：从根结点开始，不停地沿着右边结点的方向找，直到再也没有右结点为止。

Java 代码：

```java
// 查找二分搜索树 key 的最小值
public int minimum() {
    assert count != 0;
    Node node = minimum(root);
    return node.key;
}

private Node minimum(Node node) {
    if (node.left == null) {
        return node;
    }
    return minimum(node.left);
}


// 查找二分搜索树 key 的最大值
public int maximum() {
    assert count != 0;
    Node node = maximum(root);
    return node.key;
}

private Node maximum(Node node) {
    if (node.right == null) {
        return node;
    }
    return maximum(node.right);
}
```

删除最小值结点分两种情况：

1、最小值结点没有右孩子（子树），此时直接删除就好；

2、最小值结点有右孩子（子树），此时让右孩子（子树）代替自己就可以了。

同理分析可以得到：删除最大值结点也分两种情况：

1、最大值结点没有左孩子（子树），此时直接删除就好；

2、最大值结点有左孩子（子树），此时让左孩子（子树）代替自己就可以了。

Java 代码：

```java
// 从二分搜索树中删除最小 key 所在的结点
public void removeMin() {
    if (root != null) {
        root = removeMin(root);
    }
}

// 特别注意：删除了一个结点以后，根元素很可能会发生变化，因此，算法设计的时候，一定要把根结点返回回去
private Node removeMin(Node node) {
    // 仔细体会这个过程
    if (node.left == null) {
        // 就是删除这个结点
        Node rightNode = node.right;
        node.right = null; // 因为左边已经是空了，再把右边释放掉
        count--;
        return rightNode;

    }
    node.left = removeMin(node.left);
    return node;
}

// 从二分搜索树中删除最大 key 所在的结点
public void removeMax() {
    if (root != null) {
        // 删除了最大元素以后的根结点很有可能不是原来的根结点
        // 所以一定要赋值回去
        root = removeMax(root);
    }
}

// 特别注意：删除了一个结点以后，根元素很可能会发生变化，因此，算法设计的时候，一定要把根结点返回回去
private Node removeMax(Node node) {
    if (node.right == null) {
        Node nodeLeft = node.left;
        node.left = null;
        count--;
        return nodeLeft;
    }
    node.right = removeMax(node.right);
    return node;
}
```

### 第 2 种情况：删除只有左孩子（子树）或者只有右孩子（子树）的结点

处理的方式也很简单，只要让那个非空的左右孩子代替自己就可以了，代码我们合并在下一种情况中展示。


![二分搜索树的删除-1](https://liweiwei1419.github.io/images/leetcode-solution/450-1.png)


![二分搜索树的删除-2](https://liweiwei1419.github.io/images/leetcode-solution/450-2.png)

### 第 3 种情况：删除左右都有孩子（子树）的结点

代替的那个结点是右边子树的最小值（即找到要删除的这个结点的后继结点），或者是左边子树的最大值（或者找到要删除的这个结点的前驱）。

![二分搜索树的删除-3](https://liweiwei1419.github.io/images/leetcode-solution/450-3.png)

![二分搜索树的删除-4](https://liweiwei1419.github.io/images/leetcode-solution/450-4.png)

重要结论：删除二分搜索树的任意一个结点的时间复杂度是 $O(\log n)$。主要消耗的时间都在找到这个结点，删除这个结点的过程虽然很复杂，但是操作都是指针间的交换，是常数级别的，和整棵树有多少个结点是无关的。所以二分搜索树的删除是非常高效的。

Java 代码：

```java
// 算法并不难理解，但是在编写的过程中有一些情况需要讨论清楚，并且要注意一写细节，多写几遍就清楚了
public void remove(int key) {
    root = remove(root, key);
}

private Node remove(Node node, int key) {
    if (node == null) {
        return null;
    }
    if (key < node.key) {
        // 这里要想清楚一个问题，删除以后的二分搜索树的根结点很可能不是原来的根结点
        node.left = remove(node.left, key);
        return node;
    } else if (key > node.key) {
        node.right = remove(node.right, key);
        return node;
    } else {
        // key == node.key
        if (node.left == null) {
            Node rightNode = node.right;
            node.right = null;
            count--;
            return rightNode;
        }

        if (node.right == null) {
            Node leftNode = node.left;
            node.left = null;
            count--;
            return leftNode;
        }
        // 当前 node 的后继
        Node successor = minimum(node.right);
        count++;// 下面删除了一个结点，所以要先加一下
        successor.right = removeMin(node.right);
        successor.left = node.left;
        node.left = null;
        node.right = null;
        count--;
        return successor;
    }
}
```

## 二分搜索树的 floor 与 ceiling

对于二分查找法来说：`floor` 地板函数和 `ceiling `天花板函数是这样定义的：

1、在有很多 `target` 相同元素的数组中，`floor` 返回第 1 个出现 `target` 的元素的索引，`ceiling` 返回最后一个出现这个元素的索引；

2、在没有 `target` 元素的数组中，`floor` 返回的是最后一个比 `target` 小的元素的索引，`ceil` 返回的是第 1 个比 `target` 大的元素的索引。

对于二分搜索树来说：

`floor(key)` 函数返回比 `key` 小的数的最大值，如果 BST 中没有比 `key` 小的数，则返回 `null`。

`ceiling(key)` 函数返回比 `key` 大的数的最小值，如果 BST 中没有比 `key` 大的数，则返回 `null`。

### floor 函数的实现

```java
// 返回以 node 为根的二分搜索树中，小于等于 key 的最大值
private Integer floor(Node node, int key) {
    if (node == null) {
        return null;
    }
    if (node.key == key) {
        return node.value;
    }
    if (key < node.key) {
        return floor(node.left, key);
    }
    Integer tempValue = floor(node.right, key);
    if (tempValue != null) {
        return tempValue;
    }
    return node.value;
}
```

说明：如果给定的键 key 小于二分搜索树的根结点的键，那么小于等于 key 的最大键 floor(key) 一定位于根结点的左子树中；

如果给定的键 key 大于二分搜索树的根结点的键，分两种情况：

1、当根结点的右子树中存在小于等于 key 的结点的时候，小于等于 key 的最大键才会出现在右子树中；

2、否则根结点就是小于等于 key 的最大键。

我们可以举出一个具体的例子来说明：

![二分搜索树的 floor 操作](https://liweiwei1419.github.io/images/algorithms/bst/floor.png)


实现 `floor(int key)` 函数的关键：

1、利用 BST 的 key 具有顺序性和 BST 的递归性质；

2、写好递归函数，就要处理好递归到底的条件，这里 `node == null` 和 `node.key = key` 就是递归终止条件，**`node == null` 直接影响了后续的逻辑**。

### ceiling 函数的实现

```java
// 返回以 node 为根的二分搜索树中，小于等于 key 的最大值
private Integer ceiling(Node node, int key) {
    if (node == null) {
        return null;
    }
    if (key == node.key) {
        return node.value;
    }
    if (key > node.key) {
        return ceiling(node.right, key);
    }
    Integer tempValue = ceiling(node.left, key);
    if (tempValue != null) {
        return tempValue;
    }
    return node.value;
}
```

## 二分搜索树的深度优先遍历

首先强调一点：深度优先遍历是一个重要的遍历方法，不是只在二分搜索树中才有。更一般地，我们要掌握二叉树的深度优先遍历和图中的深度优先遍历。

二分搜索树的遍历，其实就是挨个把二分搜索树中的元素拿出来，只不过二分搜索树不像数组或者链表那样，有明显的“从头到尾”的性质。但其实**走完一个二分搜索树也是有规律可循的**，其中一种方式就是深度优先遍历。

深度优先遍历的顺序是下面这张图展示的样子。首先尝试走到最深，再回退，再走到另一个分支的最深。

![二分搜索树的深度优先遍历](https://liweiwei1419.github.io/images/algorithms/bst/二分搜索树的深度优先遍历.jpg)

那么什么是二分搜索树的前序、中序、后序遍历呢？

![二分搜索树的遍历方式的解释](https://liweiwei1419.github.io/images/algorithms/bst/遍历方式的解释.jpg)

把握要点：**通过对深度优先遍历**的遍历路径，我么可以看出，深度优先遍历走完一棵二叉树，每个结点会被访问 $3$ 次，分别对应左边、中间和右边，那么在什么位置进行输出，就对应了深度优先遍历的这三种遍历方式：前序遍历，在访问左边位置的时候，进行操作；中序遍历，在访问中间位置的时候，进行操作；后序遍历，在访问右边位置的时候，进行操作；。

使用递归的方式实现的代码编写是异常简单的！下面的图表多看几遍就明白了，千万不要忘记了对 `node` 是否为 `null` 的判断。下面用递归的方式编写前、中、后序遍历是十分简单的。它们的结构是完全相同的。

![二分搜索树的前序、中序、后序遍历](https://liweiwei1419.github.io/images/algorithms/bst/前序中序后序遍历.jpg)

后序遍历与空间释放

![二分搜索树的后序遍历与空间释放](https://liweiwei1419.github.io/images/algorithms/bst/后序遍历与空间释放.jpg)

可以看到，红色标注的部分是结构一致的。

记忆要点：左右子树都是递归处理，树根是真正要执行的操作。后序遍历的一个重要特点：前序和后序都访问完以后，才做操作。

中序遍历的重要结论：中序遍历可以将数据按照从小到大升序排列。

后序遍历的重要结论：后续遍历在空间释放的时候可以先释放左右结点，再释放自身。

Java 代码：

```java
// 二分搜索树的前序遍历
public void preOrder() {
    preOrder(root);
}

private void preOrder(Node node) {
    if (node != null) {
        System.out.printf("%s ", node.value);
        preOrder(node.left);
        preOrder(node.right);
    }
}

// 二分搜索树的中序遍历
public void inOrder() {
    inOrder(root);
}

private void inOrder(Node node) {
    if (node != null) {
        inOrder(node.left);
        System.out.printf("%s ", node.value);
        inOrder(node.right);
    }
}

// 二分搜索树的后序遍历
public void postOrder() {
    postOrder(root);
}

private void postOrder(Node node) {
    if (node != null) {
        postOrder(node.left);
        postOrder(node.right);
        System.out.println(node.value);

    }
}
```

补充知识：使用非递归的方法完成二叉树树的三种深度优先遍历。

## 二分搜索树的广度优先遍历

重点：广度优先遍历区别于深度优先遍历的方式是**我们首先将每一层的结点优先遍历完毕**。

要想完成广度优先遍历，我们要借助队列（先进先出，后进后出）这个数据结构。

具体实现方式 ：当队列中的队首出队的时候，要从二叉搜索树中找到它的两个孩子入队（如果有左边孩子的话，左边先入队）。队列出队为空的时候，就将二叉树遍历完成了。

我们再归纳一下广度优先遍历的步骤：

1、将根结点入队（入队的时候不做别的操作）；

2、队列非空，所以接下来就要出队，规则是：依次出队，只要出队的元素有孩子，左右孩子依次入队，如果没有孩子不做任何操作。

Java 代码：

```java
// 二分搜索树的广度优先遍历(层序遍历)
public void levelOrder() {
    Queue<Node> queue = new ArrayDeque<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        Node node = queue.poll();
        System.out.println(node.key);
        if (node.left != null) {
            queue.add(node.left);
        }
        if (node.right != null) {
            queue.add(node.right);
        }
    }
}
```

以下的总结是针对深度优先遍历的 3 种方式和广度优先的 1 种方式，总共 4 种遍历方式而言的：整个遍历的复杂度是：$O(n)$。

不论是深度优先遍历还是广度优先遍历，对于二分搜索树来说，每一个结点只访问了常数次；

> **归并排序和快速排序的本质其实是二叉树的深度优先遍历的过程**。

重点把握思想：1、递归调用；2、使用队列实现一个更加复杂的算法的过程（这种按顺序访问的情况，可以使用队列）。

## 二分搜索树的代码实现

Python 代码：

```python
class BST:
    class Node:
        def __init__(self, key, val, N):
            self.key = key
            self.val = val
            # 以该结点为根的子树中的结点总数
            self.N = N
            # 指向子树的链接
            self.left = None
            self.right = None

    def __init__(self):
        self.root = None

    def size(self):
        return self.get_size(self.root)

    def get_size(self, node):
        if node is None:
            return 0
        else:
            return node.N

    def get(self, key):
        return self.__get_from_node(self.root, key)

    def __get_from_node(self, node, key):
        if node is None:
            return None
        if key < node.key:
            return self.__get_from_node(node.left, key)
        elif key > node.key:
            return self.__get_from_node(node.right, key)
        else:
            return node.val

    def put(self, key, val):
        # 注意：这里是赋值的关系
        self.root = self.__put_to_bst(self.root, key, val)

    def __put_to_bst(self, node, key, val):
        if node is None:
            # 注意：这里叶子结点要把 1 传进去
            return BST.Node(key, val, 1)
        # 此时 node 不为空
        if key < node.key:
            node.left = self.__put_to_bst(node.left, key, val)
        elif key > node.key:
            node.right = self.__put_to_bst(node.right, key, val)
        else:
            # 更新
            node.val = val

        # 注意这一行代码
        node.N = self.get_size(node.left) + self.get_size(node.right) + 1
        # 注意：最后都要将 node 返回回去
        return node


if __name__ == '__main__':
    bst = BST()
    bst.put(1, 100)
    bst.put(2, 200)
    bst.put(3, 300)
    bst.put(4, 400)

    print(bst.size())
```

Java 代码：[这里](https://gist.github.com/liweiwei1419/490d6fa4a92b88b166e5680978858034)。

| 代码      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| BST1.java | 二分搜索树树的框架。                                         |
| BST2.java | 在上一版基础上添加了 insert 操作。                           |
| BST3.java | 在上一版基础上添加了 contain 和 search 操作。                |
| BST4.java | 在上一版基础上添加了三种深度优先遍历操作（递归实现）。       |
| BST5.java | 在上一版基础上添加了广度优先遍历（层序遍历）的操作。         |
| BST6.java | 在上一版基础上添加了删除以某个结点为根的二分搜索树的操作（**特别注意的一点是：删除了一个结点以后，根元素很可能会发生变化，因此，算法设计的时候，一定要把根结点返回回去**）。 |
| BST7.java | 在上一版基础上添加了删除一个结点的操作。直接让我们操作可能会有很多种情况以及一些细节没有考虑到。不过好在计算机科学家为我们解决了这个问题。这里用到的是  Hibbard Deletion 删除法。**算法设计思路**如下：（1）如果要删除的结点是最小值、最大值结点，很容易就删除了（即使最小值结点有右孩子，最大值结点有左孩子），此时删除了以后一定记得把新的二分搜索树的根结点返回回去；（2）如果要删除的结点是非叶子结点，我们可以使用这个结点的直接前驱或者直接后继来代替这个结点，这样就完成了结点的删除操作。 |

### 小结

1、堆是二叉树结构，但不是二分搜索树结构；

2、查找相关的问题：min、max、rank、select、floor、ceiling；

3、什么是完全二叉树、什么是满二叉树；

4、注意为 BST 增加（insert） 结点，使用递归方法将结点挂接到原来的结点上，那么如何写非递归的实现呢？

5、使用 BST 还可以解决一些例如逆序对这类的问题；

6、删除二分搜索树的结点（**其实就是分类讨论**），应该要做一下总结，否则每次都忘记；

7、BST 更一般地，二叉树的 4 种遍历方式、广度优先遍历，要设置一个队列，深度优先遍历不论是递归还是非递归都和栈有关系。

LeetCode 第 220 题。


## 二分搜索树的顺序性

之前我们将二分搜索树当做查找表的一种实现。我们使用二分搜索树的目的是通过查找 key 马上得到 value。

二分搜索树还能回答哪些问题呢？这些问题都和顺序相关。

1、minimum，maximum；

2、successor，predecessor（这两个元素在二分搜索树的 key 中必须存在）；

3、floor（地板），ceil（天花板）（这两个元素在二分搜索树的 key 中可以存在，也可以不存在）；

4、rank（58 是排名第几的元素）、select（排名第10的元素是谁，这个问题与 rank 正好相反）。

![二分搜索树的 rank 操作](https://liweiwei1419.github.io/images/algorithms/bst/rank.jpg)

之前，我们的二分搜索树并不支持有重复元素的二分搜索树。在有些情况下，我们须要支持重复元素的二分搜索树。

![支持重复元素的二分搜索树](https://liweiwei1419.github.io/images/algorithms/bst/支持重复元素的二分搜索树.jpg)

## 二分搜索树的局限性

二分查找树的性能。二分查找树在一些极端情况下性能并不好。我们首先要认识下面一个事实：同样的数据，可以对应不同的二分搜索树。看下面的例子。

![可以对应不同的二分搜索树](https://liweiwei1419.github.io/images/algorithms/bst/可以对应不同的二分搜索树.jpg)

此时二分搜索树可以**退化为链表**。此时时间复杂度变成了 $O(n)$。我们可以做一个极端测试：如果把 key 排序好以后，依次插入到二分搜索树中，此时二分搜索树的高度就会变得非常高。

解决方案：改造二叉树的实现，使得二叉树无法成为链表。1、使用平衡二叉树；2、使用红黑树（**红黑树是一种平衡二叉树的实现**，其它平衡二叉树的实现还有 2-3 tree，AVL tree，Splay tree 伸展树，平衡二叉树和堆的结合：Treap）。左右两棵子树的高度差不会超过1。

一个很有意思的数据结构：Trie，其设计巧妙，实现并不难。

![前缀树](https://liweiwei1419.github.io/images/algorithms/bst/前缀树 trie.jpg)

## 树形问题和更多树

虽然没有创建树。递归方法天然地具有递归的性质。归并排序法和快速排序法的思想它们像极了对一棵树进行后序遍历和前序遍历。**递归的思想**大量应用于搜索问题：一条龙游戏、8 数码、8皇后、数独、搬运工、人工智能：搬运工，**树形搜索**、机器学习。更多的树还有：KD 树，区间树，哈夫曼树。这一节的最后，老师介绍了很多开放的问题，帮助我们培养对算法的兴趣。

### 本文源代码

Python：[代码文件夹](https://github.com/liweiwei1419/Algorithms-Learning-Python/tree/master/bst)，Java：[代码文件夹](https://github.com/liweiwei1419/Algorithms-Learning-Java/tree/master/08-Binary-Search-Tree/src)。

（本节完）





## 二分搜索树



---
title: 「树」专题 6：二分搜索树中的问题
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

## 「树」专题 6：二分搜索树中的问题

### 回顾二分搜索树的定义

### 二分搜索树的重要性质

二分搜索树的重要性质如下，初学的时候经常会被忽略或者错误地理解：
+ 左子树中所有的结点**都小于**当前结点；
+ 右子树中所有的结点**都大于**当前结点。
+ 以左右孩子为根的子树仍为二分搜索树。

### 回顾二分搜索树中的基本操作

既然学习到这个专题，我们就有必要来复习巩固之前在学习《二分搜索树》的时候所进行的一些基本操作，这些操作都是十分重要而且基础的。由于二分搜索树的性质，我们总能以 $O(logn)$ 时间复杂度来完成上面的操作。

1、插入 insert

2、查找 find

3、删除 delete

4、最大值，最小值 minimum, maximum

5、前驱，后继 successor, predecessor

6、上界，下界 floor, ceil

7、某个元素的排名 rank

8、寻找第 k大（小）元素 select

9、如何将二分搜索树改造成平衡搜索树，平衡搜索树的一个重要应用就是红黑树。

## 例题