# Java List Interface - Revision Notes

## 1. Introduction
- **`List`** is an interface in the Java Collections Framework (part of `java.util` package).
- It extends the `Collection` interface.
- **Key Characteristics:**
  - **Ordered Collection:** Maintains the insertion order of elements.
  - **Duplicates Allowed:** It can contain duplicate elements and `null` values.
  - **Positional Access:** Elements can be accessed, inserted, or removed using an integer index (0-based).

![Diagram](images/ListHierarchy.png)

## 2. Common Implementations
The most widely used classes that implement the `List` interface are:

1. **`ArrayList`**
   - Resizable-array implementation.
   - **Fast for:** Random access and retrieval (using index). `O(1)` time complexity.
   - **Slow for:** Insertions and deletions (especially in the middle), as it requires shifting elements.
   - **Not Thread-Safe.**
    
> **Note** : The size of a arraylist is resizable. Initially it is 10 and for 10 elements it will take 8 bytes of space. Now if the 10 size is full, a new array list will be created with increased size (50% of current size) and the old array list will be garbage collected. This is the main reason for slow performance of arraylist during insertion and deletion.Arraylist implements both serializable and clonable interfaces. This can be shown in the diagram.

![alt text](images/Interface.png)
![alt text](images/image.png)

- **How to create an `ArrayList`:**
```java
// 1. Using default constructor (Initial capacity is 10)
List<String> list1 = new ArrayList<>();

// 2. Specifying initial capacity (Useful if you know the approximate size)
List<Integer> list2 = new ArrayList<>(50);

// 3. Creating from another existing collection
List<String> list3 = new ArrayList<>(list1);

// 4. Using Arrays.asList (pre-Java 9)
List<String> list4 = new ArrayList<>(Arrays.asList("A", "B", "C"));

// 5. Using List.of (Java 9+)
List<String> list5 = new ArrayList<String>(List.of("X", "Y", "Z"));
```

2. **`LinkedList`**
   - Doubly-linked list implementation.
   - **Fast for:** Insertions and deletions, as it only requires updating pointers. `O(1)` time complexity if the node is known.
   - **Slow for:** Random access, as it must traverse the list from the beginning or end. `O(n)` time complexity.
   - **Not Thread-Safe.**
   - Also implements the `Deque` interface.

3. **`Vector`**
   - Similar to `ArrayList` (resizable array).
   - **Thread-Safe (Synchronized):** Safe for use in multi-threaded environments, but performance is slower due to synchronization overhead.
   - Considered a legacy class.

4. **`Stack`**
   - Subclass of `Vector`.
   - Represents a Last-In-First-Out (LIFO) stack of objects.
   - Key methods: `push()`, `pop()`, `peek()`.

## 3. Key Methods in `List` Interface

| Method | Description |
| :--- | :--- |
| `add(E e)` | Appends the element to the end of the list. |
| `add(int index, E element)` | Inserts the element at the specified position. |
| `get(int index)` | Returns the element at the specified position. |
| `set(int index, E element)` | Replaces the element at the specified position. |
| `remove(Object o)` | Removes the first occurrence of the specified element. |
| `remove(int index)` | Removes the element at the specified position. |
| `size()` | Returns the number of elements in the list. |
| `contains(Object o)` | Returns `true` if the list contains the specified element. |
| `indexOf(Object o)` | Returns the index of the first occurrence of the element, or -1 if not found. |
| `clear()` | Removes all elements from the list. |

> **NOTE** :
 List is an interface and it extends the Collection interface and this Collection interface extends the Iterable interface and this Iterable interface has an method iterator() which is used to iterate over the collection .so every List is an Iterable. and List is an interface so we can't create an object of List directly we have to create an object of any class that implements the List interface. eg:- ArrayList, LinkedList, Vector, Stack, etc.

![alt text](images/image.png)

## 4. Iterating over a List
There are several ways to iterate through a List:

1. **Enhanced `for` loop (for-each):**
```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
for (String item : list) {
    System.out.println(item);
}
```

2. **Standard `for` loop (using index):**
```java
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
```

3. **Using `Iterator`:**
```java
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

4. **Using `ListIterator` (Allows bidirectional traversal):**
```java
ListIterator<String> listIterator = list.listIterator();
while (listIterator.hasNext()) { // Forward
    System.out.println(listIterator.next());
}
while (listIterator.hasPrevious()) { // Backward
    System.out.println(listIterator.previous());
}
```

5. **Java 8 `forEach` (Lambda):**
```java
list.forEach(item -> System.out.println(item));
// or method reference
list.forEach(System.out::println);
```

## 5. Quick Comparisons

### `ArrayList` vs `LinkedList`
| Feature | `ArrayList` | `LinkedList` |
| :--- | :--- | :--- |
| **Data Structure** | Dynamic Array | Doubly Linked List |
| **Access (get)** | Fast `O(1)` | Slow `O(n)` |
| **Insertion/Deletion** | Slow `O(n)` (shifting) | Fast `O(1)` |
| **Memory Overhead** | Lower | Higher (stores node pointers) |

### `ArrayList` vs `Vector`
| Feature | `ArrayList` | `Vector` |
| :--- | :--- | :--- |
| **Synchronization** | Not synchronized | Synchronized |
| **Thread Safety** | Not Thread-safe | Thread-safe |
| **Performance** | Faster | Slower |
| **Growth Rate** | Increases size by 50% | Doubles its size (100%) |
