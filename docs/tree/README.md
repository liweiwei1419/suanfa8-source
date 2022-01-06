---
title: 二叉树
icon: yongyan
category: 二叉树
tags:
  - 二叉树
---

树的问题很多都可以使用「深度优先遍历」或者「广度优先遍历」去做。

| 题目链接                                                     | 力扣                                                         | B 站                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| [105. 从前序与中序遍历序列构造二叉树（中等）](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | [力扣](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/cong-qian-xu-yu-zhong-xu-bian-li-xu-lie-gou-zao-9/) | [B 站](https://www.bilibili.com/video/BV14A411q7Nv) |


## 「树」专题 1：树与递归

+ 树是理解「递归」和「分治」算法的很好的数据结构；
+ 很多高级数据结构都是从「树」来的。

我们开始介绍「二叉树和递归」。递归，是使用计算机解决问题的一种重要的思考方式。而二叉树由于其天然的递归结构，使得基于二叉树的算法，均拥有着递归性质。使用二叉树，是研究学习递归算法的最佳入门方式。在这一章里，我们就来看一看二叉树中的递归算法。

在前面知识的学习中，我们看到了在基础算法以及系统设计中都用到了递归。深度优先遍历中也用到了递归。从这一部分开始，我们从另一个视角看递归。

### 从二叉树的角度看递归
二叉树天然具有递归的性质。二叉树的定义就是用二叉树定义二叉树。对于二叉树的定义来说，应该补充一点：空是一棵二叉树。

下面，我们来观察一个二叉树的前序遍历的递归方法。

Java 代码：

```java
public void preorder(TreeNode node){
    if(node != null){
        System.out.print(node.val);
        preorder(node.left);
        preorder(node.right);
    } 
}
```

注意：这里 `System.out.print(node.val);` 这一行代码表示“处理这个结点的逻辑”。

在这里，我们先强调编写递归函数的第 1 个注意事项：首先明确这个函数要表达的任务（逻辑），明确参数的定义和返回值的意义。

接下来，我们将上面的代码改造一下。

Java 代码：

```java
public void preorder(TreeNode node){
    
    // 先写递归终止条件
    if(node == null){
        return;
    } 
    
    // 再写递归过程
    System.out.print(node.val);
    preorder(node.left);
    preorder(node.right);
}
```

其实这样的写法更像递归结构，因为对于我们定义的每一个递归函数来说，应该包含下面两个部分：1、**递归终止条件**；2、设立**递归过程**，定义清楚函数的语义。

这就是我们编写一个递归函数应该注意的第 2 件事情。

接下来，我们再看一个方法：在一个二叉树中查看是否存在一个键值。写这个递归方法的步骤：想想（1）递归终止条件是什么？（2）递归过程是什么？参数 Node node 是什么意思？我们这里定义的参数 Node 对象，是在以 node 为根结点的二叉树中寻找指定的 key。于是，我们的逻辑是：如果 node 本身不是我们要找的结点的话，我们继续在 node 的左孩子和右孩子中继续查找。

Java 代码：

```java
public boolean contain(Node node, int key) {
    // 首先我们要处理递归到底的情况
    if (node == null) {
        return false;
    }
    
    if (key == node.key) {
        return true;
    } 
    
    if (contain(node.left, key) || contain(node.right, key) {
        return true;
    } 
    return false;
}
```

那么，我们可以再想想如何释放以 Node 为根结点的二叉树？

# 总览
## 树的概念
- 应用背景
- 定义

## 二叉树
- 定义
- 实现：顺序，链接，三叉链表
- 遍历
- - 递归, 非递归
- - 前序，中序，后序
- - 层序

## N 叉树
- N 叉树与二叉树: 儿子兄弟链
- 遍历：只有前序和后序

---

# $1 树的概念
## 应用背景
现实中的数据，数据之间的关系很复杂，很多关系无法使用简单的线性结构，例如数组、链表，表示清楚。这样的非线性的数据关系里面
很大一部分是层次关系：数据之间存在上下级关系、包含关系。例如比赛对阵表，公司的组织结构图，商品分类体系，祖先与后代，整体与部分等
都具有层次关系。树这种数据结构是从现实世界中的这种层次关系中抽象出来的。

一句话描述树结构：体现层次关系的非线性结构。

## 定义
树是体现层次关系的非线性结构，这种层次关系用节点的父子关系描述：一棵树由若干节点组成，这些节点之间总是会有一些一对多的映射关系，即一个节点
有多个子节点，但是每个节点只有一个父节点。在这样的映射关系的基础上，树的定义如下：
树是由 n 个节点组成的有限集合 T, 其中 $n \geq 0$。若 $n = 0$，则为空树，若 $n > 0$，则 T 需要满足以下条件形成树结构
1. 有一个节点，它没有父节点，称为根
2. 除根以外的节点被分为若干不相交的有限子集合，$T_{1}, T_{2}, ..., T_{m}$, 其中 $m \geq 0$。每个子集又是一棵树。称为根的子树，每个子树有且只有
一个父节点，就是根节点

以上树的定义有一个关键的特性：递归性。树上的很多算法都用到了树的递归性。

数据结构中一些常见的层次关系例如  
1. 按照插入的先后次序和大小关系得到的层次关系  
2. 博弈过程按照每一步棋的先后顺序得到的层次关系  
3. 按照单词中字母出现顺序得到的层次关系  
4. 在递归过程中按照执行顺序得到的层次关系  

## 一些概念
叶子节点：子节点数目为零的节点  
兄弟节点：父节点相同的节点  
节点的层：从根节点开始，根节点的层为0，其余节点的层为它的父节点的层 + 1  
树的高度：所有节点中层数的最大值，空树高度为 -1

# $2 二叉树
## 应用背景
树形结构的具体形式很多，最常见的就是二叉树。它在树的基础上限制了每个节点的子节点最多为两个，且兄弟节点之间区分左右。

一些特殊的二叉树及其特性
- 完全二叉树: 一颗二叉树，它只有最下面两层节点的度可以小于2，其余各层节点的度都等于2，并且最下面一层上的节点都集中在最下面一层最左边的若干位置上，则此二叉树称为完全二叉树。
- - 叶子节点仅在最后两层出现
- - 对任意节点，其右子树高度为 h, 则其左子树高度只能是 h 或 h + 1
- 满二叉树: 深度为 k 且有 $2^{k+1}$ 个节点的二叉树
- - 满二叉树不存在子节点个数为1的节点
- - 满二叉树每一层的节点数都达到最大值

由于二叉树对子节点数量的限制，因此它有比较好的数学性质，例如：
1. 对于非空二叉树，第 i 层上的最大节点数目为 $2^{i}$
2. 深度为 k 的二叉树最多有 $2^{k+1} - 1$ 个节点，其中 $k \geq -1$。
3. 有 n 个节点的完全二叉树，深度为 k = \lfloor log_{2}(n + 1) \rfloor - 1

## 定义
与树的定义类似，二叉树也是递归地定义的，即一颗二叉树要么为空，要么由根节点和两颗二叉子树组成。

## 实现
二叉树有两种常见的实现方式，顺序实现和链接实现，分别基于数组和链表。

如果树的形态和规模在使用过程中是固定的，可以考虑顺序实现，但是必须按照一定次序存储节点数据，这种特定顺序也是为了维护树中数据的层次关系。
数组存储二叉树的优点是实现简单，但是缺点是可能造成空间浪费，且数组空间因为是静态分配因此大小需要提前设定。

链接实现类似于链表的思想：首先以一个结构体表示节点，节点之间以指针相连。此时，每个节点都有指向所有后代节点的指针，即指向左子节点和指向
右子节点。

C++ 结构体表示二叉树树节点的示例
```c++
struct TreeNode {
    int val;
    TreeNode *left, *right;
};
```

此外还有三叉链表的表示方式，即在节点原有的指向左右子节点的指针之外再增加一个指向父节点的指针。

## 遍历
树的遍历是指按照某种顺序将树中所有节点的数据访问一遍。这个过程类似于搜索，比如要在树中判断某个值是否存在，
需要把树的所有节点值访问一遍。  

但是由于树是非线性的数据结构，并没有固定的访问顺序，要解决这个问题需要用到树定义时使用的递归属性。所有的树都能分成
根和各个子节点，而子节点在子树中是作为根存在的。因此设计一个函数，在给出树根节点时，访问根节点以后以递归的方式
访问搜有剩余子树，就可以遍历所有节点。C++ 示例代码如下。

```c++
void traverse(TreeNode* root)
{
    // 访问 root -> val
    traverse(root -> left);
    traverse(root -> right);
}
```

上述代码中，按照访问 root -> val 的位置不同，遍历方式可以分成前序，中序，后序。

### 1. 前序遍历
前序遍历也称为先根遍历，即：
如果二叉树为空则返回，否则先访问根节点，然后前序遍历左子树，再前序遍历右子树。
```c++
void preOrder(TreeNode* root)
{
    if(!root) return;
    // 访问 root -> val
    preOrder(root -> left);
    preOrder(root -> right);
}
```

前序遍历常用在序列化以及建树过程中。其中每个序列化都对应一个反序列化，反序列化是根据序列化的规则进行建树。
关于序列化和建树，见后面内容。

### 2. 中序遍历
中序遍历的访问规则是如果二叉树为空则返回，否则先中序遍历访问左子树，再访问根节点，再中序遍历访问右子树
```c++
void inOrder(TreeNode* root)
{
    if(!root) return;
    inOrder(root -> left);
    // 访问 root -> val
    inOrder(root -> right);
}
```

中序遍历常用在二叉搜索树中，因为二叉搜索树有个很好的性质是它的中序遍历是有序的。所有很多二叉搜索树的算法
都是在中序遍历的基础上做的。关于二叉搜索树的内容，可以参考相应的卡片。

### 3. 后序遍历
后序遍历的访问规则是如果二叉树为空则返回，否则先后序遍历访问左子树，再后序遍历访问右子树，再访问根节点
```c++
void postOrder(TreeNode* root)
{
    if(!root) return;
    postOrder(root -> left);
    postOrder(root -> right);
    // 访问 root -> val
}
```

后序遍历经常用在树形 DP 中。即：根节点的计算结果需要使用到左右子树的计算结果，因此需要先计算左右两个子节点，返回结果后才能计算当前节点。
关于树形 DP，可以参考相应的卡片。

#### 题目 -- 基础遍历方式
[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)  
[144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)  
[145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)  

### 层序遍历
由于树形结构维护了数据之间的层次关系，也就是节点之间的层次关系，因此天然地有一种按照层次关系的顺序访问节点的方法。
这就是层序遍历。层序遍历首先访问根节点，然后访问根节点的所有第一层子节点，然后访问所有第二层子节点，以此类推。
同一层之间以及不同层之间访问的先后顺序用队列维护。每次出队一个节点作为当前节点，它的两个左右子节点分别进队，队列中
的数据顺序就是层序遍历的顺序。

二叉树层序遍历C++代码
```c++
void levelOrder(TreeNode* root)
{
    if(!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while(q.empty())
    {
        TreeNode *node = q.front();
        q.pop();
        // 访问当前节点 node
        q.push(root -> left);
        q.push(root -> right);
    }
}
```

#### 题目 -- 基础遍历方式
[107. 二叉树的层次遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)  
[637. 二叉树的层平均值](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/)  
[103. 二叉树的锯齿形层次遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)  
[993. 二叉树的堂兄弟节点](https://leetcode-cn.com/problems/cousins-in-binary-tree/)  

### 树的遍历最常见的应用:   
1. 很多上下游的程序之间需要传递某些参数，变量。这些参数或者变量经常是用 xml 或 json 形式存储的，xml 和 json。例如上游将一些信息写成 json 之后通过某些渠道(例如 Redis 等)，打给下游。下游接到 json 之后需要把信息解析出来，这个过程是树的遍历。
2. 很多代码的部署需要一些配置文件，例如 yaml，里面的字段和值也是树形结构组织的。代码要跑起来需要先解析这些参数和值，这个过程就是树的遍历。

### Morris 遍历
前序，中序，后序遍历都有对应的 Morris 遍历，也称为线索化遍历，线索指向的节点涉及到前/中/后序遍历时，当前节点的前驱节点和后继节点的概念，关于前驱和后继节点，参考后面的题目。
Morris 遍历在前序，中序，后序遍历中充分利用了 null 指针的空间，空间性能较好，但是比较复杂，也不像递归和迭代那样是通用的算法思想，有很多延伸的问题，可以选择性掌握，力扣上的题目也很少，可以参考[99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/) 的 follow up。 

#### 题目 -- 树遍历的应用场景
- 前驱和后继的概念，以下三道题都是中序遍历的前驱和后继。
[285. 二叉搜索树中的顺序后继](https://leetcode-cn.com/problems/inorder-successor-in-bst/)  
[510. 二叉搜索树中的中序后继 II](https://leetcode-cn.com/problems/inorder-successor-in-bst-ii/)  
[173. 二叉搜索树迭代器](https://leetcode-cn.com/problems/binary-search-tree-iterator/)  

- 中序遍历与二叉搜索树
[98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)  
[501. 二叉搜索树中的众数](https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/)  
[230. 二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)  
[272. 最接近的二叉搜索树值 II](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)  
[530. 二叉搜索树的最小绝对差](https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/) / [783. 二叉搜索树节点最小距离](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/)  
[99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/)(follow up 是 morris 中序遍历)  
[783. 二叉搜索树节点最小距离](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/submissions/) (用引用维护 prev)

- 后序遍历与树形DP
[979. 在二叉树中分配硬币](https://leetcode-cn.com/problems/distribute-coins-in-binary-tree/)  
[968. 监控二叉树](https://leetcode-cn.com/problems/binary-tree-cameras/)  
[508. 出现次数最多的子树元素和](https://leetcode-cn.com/problems/most-frequent-subtree-sum/)  
[250. 统计同值子树](https://leetcode-cn.com/problems/count-univalue-subtrees/)  
[549. 二叉树中最长的连续序列](https://leetcode-cn.com/problems/binary-tree-longest-consecutive-sequence-ii/)  
[563. 二叉树的坡度](https://leetcode-cn.com/problems/binary-tree-tilt/)  
[124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)  
[742. 二叉树最近的叶节点](https://leetcode-cn.com/problems/closest-leaf-in-a-binary-tree/)  

## 序列化与反序列化

序列化是指将内存中的数据结构转化成字符串，然后写入到文件，以便于存储和传输。

对于二叉树结构，序列化的过程是选定一种遍历方式，一般就选择前序遍历，因为反序列化建树时前序遍历比较方便，然后遍历整棵树的各个节点，如果是非空节点，将节点值转成字符串加到序列化字符串中；
如果是空节点，则用一个特殊符号表示，然后加到序列化字符串中，同时还需要一个分隔符分隔不同节点的值。所有节点遍历完之后形成结果字符串。

对于二叉树结构，反序列化的过程就是建树的过程：根据分隔符，得到各个节点值，按照前序遍历的方式建树，即先建根节点，再递归地建立左子树，右子树

例如上下游的程序之间可以用 json 传递信息。上游的信息经常是内存中的数据结构(也就是对象)，把它先转换成字符串也就是序列化，然后在传输，下游接到 json 后先反序列化，也就是把字符串在变回内存中的对象，在进行后续的业务逻辑。

### 题目 -- 序列化和建树
- 基础序列化过程
[297. 二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)  
[606. 根据二叉树创建字符串](https://leetcode-cn.com/problems/construct-string-from-binary-tree/)  
[536. 从字符串生成二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-string/)  

- 依赖序列化的算法
[652. 寻找重复的子树](https://leetcode-cn.com/problems/find-duplicate-subtrees/)  

- 其它建树过程
[105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)  
[106. 从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)  
[1028. 从前序遍历还原二叉树](https://leetcode-cn.com/problems/recover-a-tree-from-preorder-traversal/)  
[889. 根据前序和后序遍历构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)  
[1008. 先序遍历构造二叉树](https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal/)  

# $3 N 叉树
## 应用背景
N 叉树是指每个节点最多可以有 N 个子节点的树形结构。实现起来比 2 叉树难度大一些，但是可以解决二叉树高度比较高的不足。

一些基于 N 叉树的数据结构和场景
1. B 树是 N 叉树  
2. Trie 树是 N 叉树  
3. 归并排序过程也对应这一个树形结构，称为归并树，可以解决查询区间上大于 x 的元素个数问题。如果归并路数 N > 2，对应的是一个 N 路归并树，它是一个 N 叉树，主要用于外排序中归并的步骤，减少磁盘读写次数。

## 定义

与二叉树的定义类似，N 叉树也是递归地定义的，即一颗 N 叉树要么为空，要么由根节点和 N 颗 N 叉子树组成。

## 实现

N 叉树的实现方式也有很多种，最常见的是用结构体表示节点，然后以指针相连，与二叉树不同的是，链接子节点的指针维护在数组或链表中。

C++ 结构体表示N叉树树节点的示例
```c++
struct TreeNode {
    int val;
    vector<>TreeNode*> chilren;
};
```

此外还有儿子兄弟链的表示法，利用儿子兄弟链可以在二叉树和 N 叉树之间建立一一对应关系。

#### 题目
[431. 将 N 叉树编码为二叉树](https://leetcode-cn.com/problems/encode-n-ary-tree-to-binary-tree/)  

## 遍历
N 叉树的遍历方式只有前序，后序，层序，没有中序。

### 题目
[589. N叉树的前序遍历](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)  
[590. N叉树的后序遍历](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/)  
[429. N叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)  

## 序列化与反序列化
对于 N 叉树的序列化和反序列化，思想和算法过程与二叉树完全相同。  
序列化过程：前序遍历，以字符串记录访问到的节点值，其中空值用特殊符号记录，同时用分隔符分隔不同节点的值。  
反序列化过程：利用分隔符依次得到各个节点值，按照前序遍历的方式建树  

### 题目
[428. 序列化和反序列化 N 叉树](https://leetcode-cn.com/problems/serialize-and-deserialize-n-ary-tree/)  

