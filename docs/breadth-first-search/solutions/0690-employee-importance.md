---
title: 「力扣」第 690 题：员工的重要性（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
  - 深度优先遍历
---

- 题目链接：[690. 员工的重要性](https://leetcode-cn.com/problems/employee-importance/)；
- 题解链接：[深度优先遍历、广度优先遍历（Java、Python）](https://leetcode-cn.com/problems/employee-importance/solution/shen-du-you-xian-bian-li-yan-du-you-xian-bian-li-j/)。

## 题目描述

给定一个保存员工信息的数据结构，它包含了员工 **唯一的 id** ，**重要度** 和 **直系下属的 id** 。

比如，员工 1 是员工 2 的领导，员工 2 是员工 3 的领导。他们相应的重要度为 15 , 10 , 5 。那么员工 1 的数据结构是 [1, 15, [2]] ，员工 2 的 数据结构是 [2, 10, [3]] ，员工 3 的数据结构是 [3, 5, []] 。注意虽然员工 3 也是员工 1 的一个下属，但是由于 **并不是直系** 下属，因此没有体现在员工 1 的数据结构中。

现在输入一个公司的所有员工信息，以及单个员工 id ，返回这个员工和他所有下属的重要度之和。

**示例：**

![img](https://assets.leetcode.com/uploads/2021/05/31/emp1-tree.jpg)

```
输入：[[1, 5, [2, 3]], [2, 3, []], [3, 3, []]], 1
输出：11
解释：
员工 1 自身的重要度是 5 ，他有两个直系下属 2 和 3 ，而且 2 和 3 的重要度均为 3 。因此员工 1 的总重要度是 5 + 3 + 3 = 11 。
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2021/05/31/emp2-tree.jpg)

```
Input: employees = [[1,2,[5]],[5,-3,[]]], id = 5
Output: -3
Explanation: Employee 5 has an importance value of -3 and has no direct subordinates.
Thus, the total importance value of employee 5 is -3.
```

**Constraints:**

- `1 <= employees.length <= 2000`
- `1 <= employees[i].id <= 2000`
- All `employees[i].id` are **unique**.
- `-100 <= employees[i].importance <= 100`
- One employee has at most one direct leader and may have several subordinates.
- The IDs in `employees[i].subordinates` are valid IDs.

**提示：**

- 一个员工最多有一个 **直系** 领导，但是可以有多个 **直系** 下属
- 员工数量不超过 2000 。

![image.png](https://pic.leetcode-cn.com/b713f4b56ccb1ca9659e5575afd03d7a973a74e23b40463f1eea8af027e79c1a-image.png)

## 方法一：深度优先遍历

分为递归与非递归写法。

**参考代码 1**：使用递归写法。

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Employee {
// It's the unique id of each node;
// unique id of this employee
public int id;
// the importance value of this employee
public int importance;
// the id of direct subordinates
public List<Integer> subordinates;
};

public class Solution {

    private int res = 0;
    private Set<Integer> visited;
    private Map<Integer, Employee> map;

    public int getImportance(List<Employee> employees, int id) {
        int size = employees.size();
        map = new HashMap<>(size);
        visited = new HashSet<>(size);

        for (Employee employee : employees) {
            map.put(employee.id, employee);
        }

        dfs(map.get(id));
        return this.res;
    }

    private void dfs(Employee employee) {
        if (visited.contains(employee.id)) {
            return;
        }
        visited.add(employee.id);
        this.res += employee.importance;

        // 遍历 id 的所有下属
        for (Integer id : employee.subordinates) {
            dfs(map.get(id));
        }
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Employee:
    def __init__(self, id, importance, subordinates):
        # It's the unique id of each node.
        # unique id of this employee
        self.id = id
        # the importance value of this employee
        self.importance = importance
        # the id of direct subordinates
        self.subordinates = subordinates


class Solution:

    def __init__(self):
        self.hash_map = dict()
        self.visited = set()
        self.res = 0

    def getImportance(self, employees, id):
        """
        :type employees: Employee
        :type id: int
        :rtype: int
        """

        for employee in employees:
            self.hash_map[employee.id] = employee
        self.__dfs(self.hash_map[id])
        return self.res

    def __dfs(self, employee):
        if employee.id in self.visited:
            return

        self.visited.add(employee.id)
        self.res += employee.importance

        for id in employee.subordinates:
            self.__dfs(self.hash_map[id])
````

</CodeGroupItem>
</CodeGroup>

**参考代码 2**：使用栈的非递归写法。

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Stack;

public class Solution {

    public int getImportance(List<Employee> employees, int id) {
        int size = employees.size();
        Map<Integer, Employee> map = new HashMap<>(size);
        Set<Integer> visited = new HashSet<>(size);

        for (Employee employee : employees) {
            map.put(employee.id, employee);
        }
        int res = 0;

        Stack<Integer> stack = new Stack<>();
        stack.add(id);

        while (!stack.isEmpty()) {
            Integer topId = stack.pop();
            visited.add(topId);
            res += map.get(topId).importance;

            for (Integer subordinateId : map.get(topId).subordinates) {
                // 如果没有访问过，才添加到 stack 中
                if (visited.contains(subordinateId)) {
                    continue;
                }
                stack.push(subordinateId);
            }
        }
        return res;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Employee:
    def __init__(self, id, importance, subordinates):
        # It's the unique id of each node.
        # unique id of this employee
        self.id = id
        # the importance value of this employee
        self.importance = importance
        # the id of direct subordinates
        self.subordinates = subordinates


class Solution:
    def getImportance(self, employees, id):
        """
        :type employees: Employee
        :type id: int
        :rtype: int
        """

        hash_map = dict()
        for employee in employees:
            hash_map[employee.id] = employee

        res = 0
        visited = set()

        stack = [id]
        while stack:
            top = stack.pop()
            visited.add(top)
            res += hash_map[top].importance

            for subordinate_id in hash_map[top].subordinates:
                # 如果没有访问过，才添加到栈中
                if subordinate_id in visited:
                    continue
                stack.append(subordinate_id)
        return res
````

</CodeGroupItem>
</CodeGroup>

## 方法二：广度优先遍历

广度优先遍历，使用队列。

**参考代码 3**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Solution {

    public int getImportance(List<Employee> employees, int id) {
        int size = employees.size();
        Map<Integer, Employee> map = new HashMap<>(size);
        for (Employee employee : employees) {
            map.put(employee.id, employee);
        }

        Queue<Integer> queue = new LinkedList<>();

        int res = 0;
        // 加入队尾
        queue.offer(id);
        while (!queue.isEmpty()) {
            // 队头拿出
            Integer currentId = queue.poll();

            Employee currentEmployee = map.get(currentId);
            res += currentEmployee.importance;
            for (Integer eid : currentEmployee.subordinates) {
                queue.offer(eid);
            }
        }
        return res;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Employee:
    def __init__(self, id, importance, subordinates):
        # It's the unique id of each node.
        # unique id of this employee
        self.id = id
        # the importance value of this employee
        self.importance = importance
        # the id of direct subordinates
        self.subordinates = subordinates


from collections import deque


class Solution:
    def getImportance(self, employees, id):
        """
        :type employees: Employee
        :type id: int
        :rtype: int
        """

        hash_map = dict()
        for employee in employees:
            hash_map[employee.id] = employee

        res = 0
        queue = deque()
        queue.append(id)
        while queue:
            top = queue.popleft()
            res += hash_map[top].importance

            for subordinate_id in hash_map[top].subordinates:
                queue.append(subordinate_id)
        return res
````

</CodeGroupItem>
</CodeGroup>
