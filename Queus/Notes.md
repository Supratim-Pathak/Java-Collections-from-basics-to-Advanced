# Java Queue Interface - Revision Notes

## 1. Introduction
- **`Queue`** is an interface in the Java Collections Framework, part of the `java.util` package.
- It extends the `Collection` interface.
- It represents a data structure that follows **FIFO (First-In-First-Out)** order.
- **Key Characteristics:**
  - Elements are inserted at the rear and removed from the front.
  - It supports ordered processing of elements.
  - It is mainly used for task scheduling, buffering, and message processing.
  - It may allow duplicates but does not allow `null` values in most implementations.
    
> **Important**: A `Queue` is not a stack. In a stack, elements are processed in LIFO order, but in a `Queue`, elements are processed in FIFO order.

![Diagram](images/Diagram.png)

## 2. Common Implementations
The most commonly used classes that implement the `Queue` interface are:

1. **`LinkedList`**
   - Implements `Queue` and `Deque`.
   - Best for general-purpose queue operations.
   - Supports insertion and deletion efficiently at both ends.
   - **Not thread-safe.**

2. **`PriorityQueue`**
   - Stores elements based on their natural ordering or a custom comparator.
   - Elements are not processed strictly in insertion order.
   - Uses a heap internally.
   - **Fastest for retrieval of the highest/lowest priority element.**
   - **Not thread-safe.**

3. **`ArrayDeque`**
   - Resizable array-based deque implementation.
   - Faster than `LinkedList` for queue operations in many cases.
   - Supports queue and stack operations efficiently.
   - **Not thread-safe.**

4. **`BlockingQueue`**
   - Used in multi-threading.
   - Supports blocking operations like `put()` and `take()`.
   - Implementations include `ArrayBlockingQueue`, `LinkedBlockingQueue`, and `PriorityBlockingQueue`.

## 3. Queue Methods
The `Queue` interface provides methods that can be grouped into two categories:

### A. Methods that throw exception
These methods throw an exception if the operation fails.

| Method | Description |
| :--- | :--- |
| `add(E e)` | Inserts the element at the end of the queue. Throws exception if fails. |
| `remove()` | Removes and returns the head of the queue. Throws exception if empty. |
| `element()` | Returns the head of the queue without removing it. Throws exception if empty. |

### B. Methods that return special values
These methods return `false` or `null` instead of throwing an exception.

| Method | Description |
| :--- | :--- |
| `offer(E e)` | Inserts the element if possible. Returns `true`/`false`. |
| `poll()` | Removes and returns the head, or returns `null` if empty. |
| `peek()` | Returns the head without removing it, or returns `null` if empty. |

> **Note**: In real-world coding, `offer()`, `poll()`, and `peek()` are preferred because they do not throw exceptions and are safer to use.

## 4. Basic Queue Example
```java
import java.util.*;

public class QueueExample {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();

        queue.offer("A");
        queue.offer("B");
        queue.offer("C");

        System.out.println(queue); // [A, B, C]

        System.out.println(queue.peek()); // A
        System.out.println(queue.poll()); // A

        System.out.println(queue); // [B, C]
    }
}
```

## 5. FIFO Behavior
Queue follows the rule:

- First inserted element is processed first.
- Last inserted element is processed last.

Example:
```java
Queue<Integer> q = new LinkedList<>();
q.offer(10);
q.offer(20);
q.offer(30);

while (!q.isEmpty()) {
    System.out.println(q.poll());
}
```

Output:
```java
10
20
30
```

## 6. PriorityQueue Example
```java
Queue<Integer> queue = new PriorityQueue<>();
queue.offer(30);
queue.offer(10);
queue.offer(20);

while (!queue.isEmpty()) {
    System.out.println(queue.poll());
}
```

Output:
```java
10
20
30
```

> **Important**: `PriorityQueue` does not preserve insertion order. It orders elements according to natural ordering (or custom comparator), so it is useful for priority-based processing.

## 7. Deque and Queue Relationship
- `Deque` is a double-ended queue.
- It extends the `Queue` interface.
- It supports operations from both ends:
  - `addFirst()` / `addLast()`
  - `removeFirst()` / `removeLast()`
  - `peekFirst()` / `peekLast()`

Example:
```java
Deque<String> deque = new ArrayDeque<>();
deque.offer("A");
deque.offer("B");
deque.offerFirst("X");

System.out.println(deque); // [X, A, B]
```

## 8. Difference Between List and Queue
| Feature | `List` | `Queue` |
| :--- | :--- | :--- |
| Access Order | Indexed access | FIFO order |
| Duplicates | Allowed | Allowed |
| Insertion | Anywhere | Mostly at rear |
| Removal | Any index | Front/head |
| Use Case | General storage | Processing order |

## 9. Key Points to Remember
- `Queue` is used when you need to process elements in order of arrival.
- `LinkedList` is the most commonly used queue implementation for beginners.
- `PriorityQueue` is used when priority matters instead of insertion order.
- `ArrayDeque` is a very efficient queue/deque implementation.
- `BlockingQueue` is used in multi-threaded applications.

> **NOTE**: `Queue` is part of the Java Collection hierarchy. It is an interface, so we cannot create an object of `Queue` directly. We must create an instance of a class implementing it such as `LinkedList`, `PriorityQueue`, or `ArrayDeque`.

## 10. Quick Summary
- `Queue` = FIFO data structure
- `offer()` = insert safely
- `poll()` = remove from front safely
- `peek()` = check front without removing
- `PriorityQueue` = priority-based order
- `Deque` = queue that works from both ends

This is the most common revision structure for understanding the `Queue` interface in Java.
