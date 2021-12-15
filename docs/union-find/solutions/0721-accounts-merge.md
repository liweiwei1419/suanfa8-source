---
title: 「力扣」第 721 题：账户合并（中等）
icon: yongyan
categories: 并查集
tags:
  - 并查集
---

这题就是题目有点长，但是是相对容易的。这题有点麻烦，不是一个好的问题，以后把它删除吧。

+ [链接](https://leetcode-cn.com/problems/accounts-merge/)

给定一个列表 `accounts`，每个元素 `accounts[i]` 是一个字符串列表，其中第一个元素 `accounts[i][0]` 是 *名称 (name)*，其余元素是 *emails* 表示该帐户的邮箱地址。

现在，我们想合并这些帐户。如果两个帐户都有一些共同的邮件地址，则两个帐户必定属于同一个人。请注意，即使两个帐户具有相同的名称，它们也可能属于不同的人，因为人们可能具有相同的名称。一个人最初可以拥有任意数量的帐户，但其所有帐户都具有相同的名称。

合并帐户后，按以下格式返回帐户：每个帐户的第一个元素是名称，其余元素是按顺序排列的邮箱地址。accounts 本身可以以任意顺序返回。

**例子 1:**

```
Input: 
accounts = [["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]]
Output: [["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],  ["John", "johnnybravo@mail.com"], ["Mary", "mary@mail.com"]]
Explanation: 
第一个和第三个 John 是同一个人，因为他们有共同的电子邮件 "johnsmith@mail.com"。 
第二个 John 和 Mary 是不同的人，因为他们的电子邮件地址没有被其他帐户使用。
我们可以以任何顺序返回这些列表，例如答案[['Mary'，'mary@mail.com']，['John'，'johnnybravo@mail.com']，
['John'，'john00@mail.com'，'john_newyork@mail.com'，'johnsmith@mail.com']]仍然会被接受。
```

**注意：**

- `accounts`的长度将在`[1，1000]`的范围内。
- `accounts[i]`的长度将在`[1，10]`的范围内。
- `accounts[i][j]`的长度将在`[1，30]`的范围内。

Java 代码：
```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {

    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        int len = accounts.size();
        List<List<String>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        UnionFind unionFind = new UnionFind(len);
        // 邮箱：用户的编号
        Map<String, Integer> hashMap = new HashMap<>();
        for (int i = 0; i < len; i++) {
            // 拿到这个用户的名字和邮箱列表
            List<String> account = accounts.get(i);
            int currentSize = account.size();

            for (int j = 1; j < currentSize; j++) {
                String email = account.get(j);
                Integer personId = hashMap.get(email);
                if (personId == null) {
                    hashMap.put(email, i);
                } else {
                    unionFind.union(i, personId);
                }
            }
        }

        // 用户编号：邮件列表
        Map<Integer, List<String>> emailList = new HashMap<>(len);
        for (Map.Entry<String, Integer> entry : hashMap.entrySet()) {

            String email = entry.getKey();
            Integer personId = entry.getValue();

            // 找到这个人的代表元
            int rootPerson = unionFind.find(personId);
            List<String> rootEmailList = emailList.get(rootPerson);

            if (rootEmailList == null) {
                List<String> temp = new ArrayList<>();
                temp.add(email);
                emailList.put(rootPerson, temp);
            } else {
                rootEmailList.add(email);
            }
        }

        for (int personId : emailList.keySet()) {
            List<String> temp = emailList.get(personId);
            Collections.sort(temp);

            List<String> account = new ArrayList<>();
            account.add(accounts.get(personId).get(0));
            account.addAll(temp);
            res.add(account);
        }
        return res;
    }

    private class UnionFind {
        private int[] parent;

        public UnionFind(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public int find(int x) {
            while (x != parent[x]) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        public void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            if (rootX == rootY) {
                return;
            }
            parent[rootX] = rootY;
        }
    }

    public static void main(String[] args) {
        List<List<String>> accounts = new ArrayList<>();

        List<String> account1 = new ArrayList<>();
        account1.add("John");
        account1.add("johnsmith@mail.com");
        account1.add("john00@mail.com");

        List<String> account2 = new ArrayList<>();
        account2.add("John");
        account2.add("johnnybravo@mail.com");

        List<String> account3 = new ArrayList<>();
        account3.add("John");
        account3.add("johnsmith@mail.com");
        account3.add("john_newyork@mail.com");

        List<String> account4 = new ArrayList<>();
        account4.add("Mary");
        account4.add("mary@mail.com");

        accounts.add(account1);
        accounts.add(account2);
        accounts.add(account3);
        accounts.add(account4);

        Solution solution = new Solution();
        List<List<String>> res = solution.accountsMerge(accounts);
        System.out.println(res);
    }
}
```