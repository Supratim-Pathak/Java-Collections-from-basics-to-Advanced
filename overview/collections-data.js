/**
 * Java Collections Framework Comprehensive Knowledge Base & Hierarchy Model
 * Includes exhaustive methods, signatures, complexities, data structures, and examples.
 */

const COLLECTIONS_DATA = {
  // --- ROOT INTERFACES ---
  "Iterable": {
    id: "Iterable",
    name: "Iterable<T>",
    category: "interface",
    parent: null,
    group: "Collection Hierarchy",
    javaVersion: "Java 1.5+",
    summary: "The root interface of the Java Collections Framework (except Map). Enables objects to be the target of the enhanced for-loop statement.",
    structure: "Abstract sequence supporting forward iteration.",
    ordering: "Depends on implementation",
    duplicates: "Depends on implementation",
    nullAllowed: "Depends on implementation",
    threadSafe: "Depends on implementation",
    complexity: { access: "N/A", search: "N/A", insertion: "N/A", deletion: "N/A" },
    methods: [
      { name: "iterator()", returnType: "Iterator<T>", category: "iteration", desc: "Returns an iterator over elements of type T in proper sequence." },
      { name: "forEach(Consumer<? super T> action)", returnType: "void", category: "functional", desc: "Performs the given action for each element until all elements have been processed or an exception is thrown (Java 8+)." },
      { name: "spliterator()", returnType: "Spliterator<T>", category: "functional", desc: "Creates a Spliterator over the elements described by this Iterable for parallel traversal (Java 8+)." }
    ],
    codeExample: `Iterable<String> list = List.of("Java", "Collections", "Framework");
for (String item : list) {
    System.out.println(item);
}
list.forEach(item -> System.out.println("Processing: " + item));`,
    whenToUse: "Use as parameter type when a method only needs to iterate over elements and doesn't need collection size or modification.",
    whenToAvoid: "Avoid when index-based access, modification, or querying collection size is required."
  },

  "Collection": {
    id: "Collection",
    name: "Collection<E>",
    category: "interface",
    parent: "Iterable",
    group: "Collection Hierarchy",
    javaVersion: "Java 1.2+",
    summary: "The root interface in the collection hierarchy. Represents a group of objects known as elements.",
    structure: "Generic container interface.",
    ordering: "Depends on sub-interface (List vs Set)",
    duplicates: "Allowed in List/Queue; Disallowed in Set",
    nullAllowed: "Varies by implementation",
    threadSafe: "Not thread-safe by default",
    complexity: { access: "Depends on sub-type", search: "O(n) generally", insertion: "O(1) amortized", deletion: "O(n) generally" },
    methods: [
      { name: "add(E e)", returnType: "boolean", category: "modification", desc: "Ensures that this collection contains the specified element." },
      { name: "addAll(Collection<? extends E> c)", returnType: "boolean", category: "bulk", desc: "Adds all elements in the specified collection to this collection." },
      { name: "clear()", returnType: "void", category: "modification", desc: "Removes all of the elements from this collection." },
      { name: "contains(Object o)", returnType: "boolean", category: "search", desc: "Returns true if this collection contains the specified element." },
      { name: "containsAll(Collection<?> c)", returnType: "boolean", category: "bulk", desc: "Returns true if this collection contains all of the elements in the specified collection." },
      { name: "equals(Object o)", returnType: "boolean", category: "core", desc: "Compares the specified object with this collection for equality." },
      { name: "hashCode()", returnType: "int", category: "core", desc: "Returns the hash code value for this collection." },
      { name: "isEmpty()", returnType: "boolean", category: "search", desc: "Returns true if this collection contains no elements." },
      { name: "iterator()", returnType: "Iterator<E>", category: "iteration", desc: "Returns an iterator over the elements in this collection." },
      { name: "parallelStream()", returnType: "Stream<E>", category: "functional", desc: "Returns a possibly parallel Stream with this collection as its source." },
      { name: "remove(Object o)", returnType: "boolean", category: "modification", desc: "Removes a single instance of the specified element from this collection." },
      { name: "removeAll(Collection<?> c)", returnType: "boolean", category: "bulk", desc: "Removes all of this collection's elements that are also contained in the specified collection." },
      { name: "removeIf(Predicate<? super E> filter)", returnType: "boolean", category: "functional", desc: "Removes all elements of this collection that satisfy the given predicate (Java 8+)." },
      { name: "retainAll(Collection<?> c)", returnType: "boolean", category: "bulk", desc: "Retains only elements in this collection that are contained in the specified collection." },
      { name: "size()", returnType: "int", category: "core", desc: "Returns the number of elements in this collection." },
      { name: "spliterator()", returnType: "Spliterator<E>", category: "functional", desc: "Creates a Spliterator over the elements in this collection." },
      { name: "stream()", returnType: "Stream<E>", category: "functional", desc: "Returns a sequential Stream with this collection as its source." },
      { name: "toArray()", returnType: "Object[]", category: "core", desc: "Returns an array containing all of the elements in this collection." },
      { name: "toArray(T[] a)", returnType: "<T> T[]", category: "core", desc: "Returns an array containing all elements in this collection; runtime type is that of specified array." },
      { name: "toArray(IntFunction<T[]> generator)", returnType: "<T> T[]", category: "functional", desc: "Returns an array containing all elements using provided generator function (Java 11+)." }
    ],
    codeExample: `Collection<Integer> numbers = new ArrayList<>();
numbers.add(10);
numbers.add(20);
numbers.removeIf(n -> n < 15);
System.out.println("Size: " + numbers.size()); // 1`,
    whenToUse: "Use as high-level parameter type for methods operating generically on any group of objects.",
    whenToAvoid: "Direct instantiation impossible (interface); instantiate concrete sub-types."
  },

  // --- LIST FAMILY ---
  "List": {
    id: "List",
    name: "List<E>",
    category: "interface",
    parent: "Collection",
    group: "List",
    javaVersion: "Java 1.2+",
    summary: "An ordered collection (sequence). Precise control over element insertion index and positional access.",
    structure: "Indexed Sequence (0 to size-1)",
    ordering: "Insertion-ordered",
    duplicates: "Allowed",
    nullAllowed: "Allowed in most implementations",
    threadSafe: "Not thread-safe (except Vector & CopyOnWriteArrayList)",
    complexity: { access: "O(1) in ArrayList / O(n) in LinkedList", search: "O(n)", insertion: "O(1) end, O(n) index", deletion: "O(n)" },
    methods: [
      { name: "add(E e)", returnType: "boolean", category: "modification", desc: "Appends element to end of list." },
      { name: "add(int index, E element)", returnType: "void", category: "modification", desc: "Inserts element at specified index position." },
      { name: "addAll(Collection<? extends E> c)", returnType: "boolean", category: "bulk", desc: "Appends all elements in specified collection to end of list." },
      { name: "addAll(int index, Collection<? extends E> c)", returnType: "boolean", category: "bulk", desc: "Inserts all elements in specified collection into list starting at index." },
      { name: "clear()", returnType: "void", category: "modification", desc: "Removes all elements from this list." },
      { name: "contains(Object o)", returnType: "boolean", category: "search", desc: "Returns true if list contains specified element." },
      { name: "get(int index)", returnType: "E", category: "search", desc: "Returns the element at the specified position in this list." },
      { name: "indexOf(Object o)", returnType: "int", category: "search", desc: "Returns index of first occurrence of element, or -1." },
      { name: "isEmpty()", returnType: "boolean", category: "search", desc: "Returns true if list contains no elements." },
      { name: "iterator()", returnType: "Iterator<E>", category: "iteration", desc: "Returns iterator over elements in proper sequence." },
      { name: "lastIndexOf(Object o)", returnType: "int", category: "search", desc: "Returns index of last occurrence of element, or -1." },
      { name: "listIterator()", returnType: "ListIterator<E>", category: "iteration", desc: "Returns list iterator over elements in list." },
      { name: "listIterator(int index)", returnType: "ListIterator<E>", category: "iteration", desc: "Returns list iterator starting at specified index." },
      { name: "of(E... elements)", returnType: "List<E>", category: "core", desc: "Returns an unmodifiable list containing given elements (Java 9+)." },
      { name: "remove(int index)", returnType: "E", category: "modification", desc: "Removes element at specified index position." },
      { name: "remove(Object o)", returnType: "boolean", category: "modification", desc: "Removes first occurrence of specified element." },
      { name: "replaceAll(UnaryOperator<E> operator)", returnType: "void", category: "functional", desc: "Replaces each element of this list with result of applying operator (Java 8+)." },
      { name: "set(int index, E element)", returnType: "E", category: "modification", desc: "Replaces element at specified position with specified element." },
      { name: "size()", returnType: "int", category: "core", desc: "Returns number of elements in list." },
      { name: "sort(Comparator<? super E> c)", returnType: "void", category: "functional", desc: "Sorts this list according to order induced by specified Comparator (Java 8+)." },
      { name: "subList(int fromIndex, int toIndex)", returnType: "List<E>", category: "search", desc: "Returns view of portion of this list between specified fromIndex inclusive and toIndex exclusive." }
    ],
    codeExample: `List<String> names = new ArrayList<>(List.of("Alice", "Bob"));
names.add(1, "Charlie");
names.replaceAll(String::toUpperCase);
System.out.println(names); // [ALICE, CHARLIE, BOB]`,
    whenToUse: "Use when you need an ordered sequence allowing duplicate elements and index access.",
    whenToAvoid: "Avoid when duplicate prevention is mandatory (use Set)."
  },

  "ArrayList": {
    id: "ArrayList",
    name: "ArrayList<E>",
    category: "concrete",
    parent: "List",
    group: "List",
    javaVersion: "Java 1.2+",
    summary: "Resizable-array implementation of the List interface. Fast random access O(1) and dynamic capacity growth by 50%.",
    structure: "Dynamic Resizable Contiguous Array (`Object[]`)",
    ordering: "Insertion-ordered",
    duplicates: "Allowed",
    nullAllowed: "Allowed",
    threadSafe: "No (Use Collections.synchronizedList or CopyOnWriteArrayList)",
    complexity: { access: "O(1)", search: "O(n)", insertion: "O(1) amortized end, O(n) middle", deletion: "O(n) shift overhead" },
    methods: [
      { name: "add(E e)", returnType: "boolean", category: "modification", desc: "Appends specified element to end of array list." },
      { name: "add(int index, E element)", returnType: "void", category: "modification", desc: "Inserts element shifting subsequent elements right." },
      { name: "clone()", returnType: "Object", category: "core", desc: "Returns a shallow copy of this ArrayList instance." },
      { name: "ensureCapacity(int minCapacity)", returnType: "void", category: "core", desc: "Increases internal array buffer capacity if needed to minimize reallocations." },
      { name: "forEach(Consumer<? super E> action)", returnType: "void", category: "functional", desc: "Direct optimized array traversal iteration." },
      { name: "get(int index)", returnType: "E", category: "search", desc: "Direct O(1) array index access." },
      { name: "indexOf(Object o)", returnType: "int", category: "search", desc: "Searches forward through array for matching element." },
      { name: "lastIndexOf(Object o)", returnType: "int", category: "search", desc: "Searches backward through array for matching element." },
      { name: "remove(int index)", returnType: "E", category: "modification", desc: "Removes element shifting subsequent elements left." },
      { name: "removeRange(int fromIndex, int toIndex)", returnType: "protected void", category: "modification", desc: "Removes elements within index range." },
      { name: "set(int index, E element)", returnType: "E", category: "modification", desc: "Replaces array element at index." },
      { name: "trimToSize()", returnType: "void", category: "core", desc: "Trims internal array capacity to current list size." }
    ],
    codeExample: `List<Integer> list = new ArrayList<>(100);
list.add(10);
list.add(20);
int item = list.get(0); // O(1) fast random access`,
    whenToUse: "Default general-purpose List. Excellent for read-heavy workloads and appending at the end.",
    whenToAvoid: "Avoid for frequent insertions/deletions in the middle of large lists."
  },

  "LinkedList": {
    id: "LinkedList",
    name: "LinkedList<E>",
    category: "concrete",
    parent: "List",
    group: "List",
    javaVersion: "Java 1.2+",
    summary: "Doubly-linked list implementing List and Deque interfaces. Efficient O(1) head/tail insertions and removals.",
    structure: "Doubly-Linked List (`Node<E>` with `next` & `prev` pointers)",
    ordering: "Insertion-ordered",
    duplicates: "Allowed",
    nullAllowed: "Allowed",
    threadSafe: "No",
    complexity: { access: "O(n)", search: "O(n)", insertion: "O(1) head/tail, O(n) index", deletion: "O(1) head/tail" },
    methods: [
      { name: "addFirst(E e)", returnType: "void", category: "modification", desc: "Inserts element at front of list O(1)." },
      { name: "addLast(E e)", returnType: "void", category: "modification", desc: "Appends element at end of list O(1)." },
      { name: "getFirst()", returnType: "E", category: "search", desc: "Returns first element without removing O(1)." },
      { name: "getLast()", returnType: "E", category: "search", desc: "Returns last element without removing O(1)." },
      { name: "removeFirst()", returnType: "E", category: "modification", desc: "Removes and returns first element O(1)." },
      { name: "removeLast()", returnType: "E", category: "modification", desc: "Removes and returns last element O(1)." },
      { name: "offer(E e)", returnType: "boolean", category: "modification", desc: "Adds specified element as tail (Queue operation)." },
      { name: "poll()", returnType: "E", category: "modification", desc: "Retrieves and removes head (Queue operation)." },
      { name: "push(E e)", returnType: "void", category: "modification", desc: "Pushes element onto stack (Stack operation)." },
      { name: "pop()", returnType: "E", category: "modification", desc: "Pops element off stack (Stack operation)." }
    ],
    codeExample: `LinkedList<String> list = new LinkedList<>();
list.addFirst("Head");
list.addLast("Tail");
System.out.println(list.removeFirst()); // "Head"`,
    whenToUse: "Use when frequent head/tail queue/deque operations are needed.",
    whenToAvoid: "Avoid for indexed access (`get(i)` is O(n)). ArrayDeque is usually faster."
  },

  "Vector": {
    id: "Vector",
    name: "Vector<E>",
    category: "legacy",
    parent: "List",
    group: "List",
    javaVersion: "Java 1.0 (Legacy)",
    summary: "Legacy synchronized dynamic array. Grows capacity by 100% (doubles) when full.",
    structure: "Synchronized Resizable Dynamic Array",
    ordering: "Insertion-ordered",
    duplicates: "Allowed",
    nullAllowed: "Allowed",
    threadSafe: "Yes (Method-level synchronized lock)",
    complexity: { access: "O(1)", search: "O(n)", insertion: "O(1) amortized end", deletion: "O(n)" },
    methods: [
      { name: "addElement(E obj)", returnType: "void", category: "modification", desc: "Legacy method to add element." },
      { name: "capacity()", returnType: "int", category: "core", desc: "Returns current capacity of internal buffer." },
      { name: "copyInto(Object[] anArray)", returnType: "void", category: "core", desc: "Copies vector components into array." },
      { name: "elementAt(int index)", returnType: "E", category: "search", desc: "Legacy indexed element access." },
      { name: "elements()", returnType: "Enumeration<E>", category: "iteration", desc: "Returns legacy Enumeration view." },
      { name: "firstElement()", returnType: "E", category: "search", desc: "Returns first element." },
      { name: "lastElement()", returnType: "E", category: "search", desc: "Returns last element." },
      { name: "setSize(int newSize)", returnType: "void", category: "core", desc: "Sets size of vector." }
    ],
    codeExample: `Vector<String> vec = new Vector<>();
vec.add("Synchronized");
vec.addElement("Legacy");`,
    whenToUse: "Backwards compatibility with old Java 1.0 code.",
    whenToAvoid: "Avoid in modern code; use ArrayList or CopyOnWriteArrayList."
  },

  "Stack": {
    id: "Stack",
    name: "Stack<E>",
    category: "legacy",
    parent: "Vector",
    group: "List",
    javaVersion: "Java 1.0 (Legacy)",
    summary: "Legacy LIFO stack extending Vector. Synchronized method-level operations.",
    structure: "Synchronized LIFO Stack",
    ordering: "LIFO (Last-In-First-Out)",
    duplicates: "Allowed",
    nullAllowed: "Allowed",
    threadSafe: "Yes",
    complexity: { access: "O(n)", search: "O(n)", insertion: "O(1) push", deletion: "O(1) pop" },
    methods: [
      { name: "empty()", returnType: "boolean", category: "search", desc: "Tests if this stack is empty." },
      { name: "peek()", returnType: "E", category: "search", desc: "Looks at top object without removing." },
      { name: "pop()", returnType: "E", category: "modification", desc: "Removes and returns top object." },
      { name: "push(E item)", returnType: "E", category: "modification", desc: "Pushes item onto top of stack." },
      { name: "search(Object o)", returnType: "int", category: "search", desc: "Returns 1-based distance from top of stack." }
    ],
    codeExample: `Stack<String> s = new Stack<>();
s.push("Bottom");
s.push("Top");
System.out.println(s.pop()); // "Top"`,
    whenToUse: "Legacy application support.",
    whenToAvoid: "Avoid! Use `Deque<E> stack = new ArrayDeque<>()` instead."
  },

  "CopyOnWriteArrayList": {
    id: "CopyOnWriteArrayList",
    name: "CopyOnWriteArrayList<E>",
    category: "concurrent",
    parent: "List",
    group: "List",
    javaVersion: "Java 1.5+",
    summary: "Thread-safe variant of ArrayList where all mutative operations make a fresh copy of array.",
    structure: "Copy-on-Write Array Buffer",
    ordering: "Insertion-ordered",
    duplicates: "Allowed",
    nullAllowed: "Allowed",
    threadSafe: "Yes (Lock-free reads)",
    complexity: { access: "O(1)", search: "O(n)", insertion: "O(n) copy cost", deletion: "O(n) copy cost" },
    methods: [
      { name: "addIfAbsent(E e)", returnType: "boolean", category: "modification", desc: "Appends element if not already present." },
      { name: "addAllAbsent(Collection<? extends E> c)", returnType: "int", category: "bulk", desc: "Appends elements not already present." }
    ],
    codeExample: `List<String> list = new CopyOnWriteArrayList<>();
list.add("Safe");
for (String s : list) {
    list.add("No-ConcurrentModException");
}`,
    whenToUse: "Read-heavy, write-infrequent multithreaded scenarios (e.g. event listener lists).",
    whenToAvoid: "Avoid for write-heavy workloads due to full array copying overhead."
  },

  // --- SET FAMILY ---
  "Set": {
    id: "Set",
    name: "Set<E>",
    category: "interface",
    parent: "Collection",
    group: "Set",
    javaVersion: "Java 1.2+",
    summary: "Collection containing no duplicate elements. Models mathematical set abstraction.",
    structure: "Unique Element Container",
    ordering: "Unordered (HashSet), Insertion-ordered (LinkedHashSet), or Sorted (TreeSet)",
    duplicates: "Disallowed",
    nullAllowed: "At most one null (HashSet)",
    threadSafe: "Not thread-safe",
    complexity: { access: "N/A", search: "O(1) / O(log n)", insertion: "O(1) / O(log n)", deletion: "O(1) / O(log n)" },
    methods: [
      { name: "add(E e)", returnType: "boolean", category: "modification", desc: "Adds element if not already present." },
      { name: "contains(Object o)", returnType: "boolean", category: "search", desc: "Returns true if set contains specified element." },
      { name: "copyOf(Collection<? extends E> coll)", returnType: "Set<E>", category: "core", desc: "Returns unmodifiable copy of given collection (Java 10+)." },
      { name: "of(E... elements)", returnType: "Set<E>", category: "core", desc: "Returns unmodifiable set containing given elements (Java 9+)." },
      { name: "remove(Object o)", returnType: "boolean", category: "modification", desc: "Removes specified element from set." }
    ],
    codeExample: `Set<String> set = Set.of("A", "B", "C");
System.out.println(set.contains("A")); // true`,
    whenToUse: "Use whenever uniqueness of elements is required.",
    whenToAvoid: "Avoid when duplicate items or indexed access are required."
  },

  "HashSet": {
    id: "HashSet",
    name: "HashSet<E>",
    category: "concrete",
    parent: "Set",
    group: "Set",
    javaVersion: "Java 1.2+",
    summary: "Hash table backed by HashMap. Offers constant-time performance O(1) for basic operations.",
    structure: "Hash Table (Backed by internal HashMap)",
    ordering: "Unordered",
    duplicates: "Disallowed",
    nullAllowed: "Allows one null element",
    threadSafe: "No",
    complexity: { access: "N/A", search: "O(1) avg", insertion: "O(1) avg", deletion: "O(1) avg" },
    methods: [
      { name: "add(E e)", returnType: "boolean", category: "modification", desc: "Inserts element into set hash bucket." },
      { name: "clear()", returnType: "void", category: "modification", desc: "Removes all elements from set." },
      { name: "clone()", returnType: "Object", category: "core", desc: "Returns shallow copy of HashSet instance." },
      { name: "contains(Object o)", returnType: "boolean", category: "search", desc: "Checks hash bucket location." },
      { name: "isEmpty()", returnType: "boolean", category: "search", desc: "Returns true if set contains no elements." },
      { name: "iterator()", returnType: "Iterator<E>", category: "iteration", desc: "Returns iterator over elements." },
      { name: "remove(Object o)", returnType: "boolean", category: "modification", desc: "Removes element from hash bucket." },
      { name: "size()", returnType: "int", category: "core", desc: "Returns number of elements in set." }
    ],
    codeExample: `Set<Integer> set = new HashSet<>(Set.of(1, 2, 3));
set.add(4);
set.add(1); // Duplicate ignored`,
    whenToUse: "Standard default Set choice for high-speed uniqueness checks.",
    whenToAvoid: "Avoid when element ordering matters."
  },

  "LinkedHashSet": {
    id: "LinkedHashSet",
    name: "LinkedHashSet<E>",
    category: "concrete",
    parent: "HashSet",
    group: "Set",
    javaVersion: "Java 1.4+",
    summary: "Hash table and doubly-linked list set implementation. Maintains insertion order.",
    structure: "Hash Table + Doubly-Linked List across elements",
    ordering: "Insertion-ordered",
    duplicates: "Disallowed",
    nullAllowed: "Allows one null element",
    threadSafe: "No",
    complexity: { access: "N/A", search: "O(1)", insertion: "O(1)", deletion: "O(1)" },
    methods: [
      { name: "spliterator()", returnType: "Spliterator<E>", category: "functional", desc: "Creates Spliterator over insertion-ordered elements." }
    ],
    codeExample: `Set<String> set = new LinkedHashSet<>();
set.add("Z"); set.add("A");
System.out.println(set); // [Z, A]`,
    whenToUse: "Use when unique elements must preserve insertion order.",
    whenToAvoid: "Avoid if minimal memory consumption is critical."
  },

  "SortedSet": {
    id: "SortedSet",
    name: "SortedSet<E>",
    category: "interface",
    parent: "Set",
    group: "Set",
    javaVersion: "Java 1.2+",
    summary: "A Set providing total ordering on its elements (natural or via Comparator).",
    structure: "Sorted Unique Container",
    ordering: "Sorted (Natural or Comparator)",
    duplicates: "Disallowed",
    nullAllowed: "Disallowed in natural sorting",
    threadSafe: "No",
    complexity: { access: "N/A", search: "O(log n)", insertion: "O(log n)", deletion: "O(log n)" },
    methods: [
      { name: "comparator()", returnType: "Comparator<? super E>", category: "core", desc: "Returns comparator used to order elements, or null." },
      { name: "first()", returnType: "E", category: "search", desc: "Returns first (lowest) element." },
      { name: "headSet(E toElement)", returnType: "SortedSet<E>", category: "search", desc: "Returns view of portion strictly less than toElement." },
      { name: "last()", returnType: "E", category: "search", desc: "Returns last (highest) element." },
      { name: "subSet(E fromElement, E toElement)", returnType: "SortedSet<E>", category: "search", desc: "Returns portion view from fromElement to toElement." },
      { name: "tailSet(E fromElement)", returnType: "SortedSet<E>", category: "search", desc: "Returns view of portion greater than or equal to fromElement." }
    ],
    codeExample: `SortedSet<Integer> set = new TreeSet<>(Set.of(30, 10, 20));
System.out.println(set.first()); // 10`,
    whenToUse: "Use when unique items must always remain automatically sorted.",
    whenToAvoid: "Avoid if sorting is unnecessary (HashSet O(1) is faster)."
  },

  "NavigableSet": {
    id: "NavigableSet",
    name: "NavigableSet<E>",
    category: "interface",
    parent: "SortedSet",
    group: "Set",
    javaVersion: "Java 1.6+",
    summary: "A SortedSet with navigation methods reporting closest matches for search targets.",
    structure: "Navigable Sorted Tree Container",
    ordering: "Sorted",
    duplicates: "Disallowed",
    nullAllowed: "Disallowed",
    threadSafe: "No",
    complexity: { access: "N/A", search: "O(log n)", insertion: "O(log n)", deletion: "O(log n)" },
    methods: [
      { name: "ceiling(E e)", returnType: "E", category: "search", desc: "Least element greater than or equal to e." },
      { name: "descendingIterator()", returnType: "Iterator<E>", category: "iteration", desc: "Returns iterator over elements in descending order." },
      { name: "descendingSet()", returnType: "NavigableSet<E>", category: "search", desc: "Returns reverse-order view of elements." },
      { name: "floor(E e)", returnType: "E", category: "search", desc: "Greatest element less than or equal to e." },
      { name: "higher(E e)", returnType: "E", category: "search", desc: "Least element strictly greater than e." },
      { name: "lower(E e)", returnType: "E", category: "search", desc: "Greatest element strictly less than e." },
      { name: "pollFirst()", returnType: "E", category: "modification", desc: "Retrieves and removes lowest element." },
      { name: "pollLast()", returnType: "E", category: "modification", desc: "Retrieves and removes highest element." }
    ],
    codeExample: `NavigableSet<Integer> set = new TreeSet<>(Set.of(10, 20, 30));
System.out.println(set.floor(25)); // 20`,
    whenToUse: "Proximity range searches and reversing sorted collections.",
    whenToAvoid: "Avoid for basic lookup."
  },

  "TreeSet": {
    id: "TreeSet",
    name: "TreeSet<E>",
    category: "concrete",
    parent: "NavigableSet",
    group: "Set",
    javaVersion: "Java 1.2+",
    summary: "Self-balancing Red-Black tree NavigableSet implementation. Logarithmic time O(log n).",
    structure: "Red-Black Tree (Backed by TreeMap)",
    ordering: "Sorted (Natural or Comparator)",
    duplicates: "Disallowed",
    nullAllowed: "No (Throws NullPointerException for natural order)",
    threadSafe: "No",
    complexity: { access: "N/A", search: "O(log n)", insertion: "O(log n)", deletion: "O(log n)" },
    methods: [
      { name: "add(E e)", returnType: "boolean", category: "modification", desc: "Inserts element into Red-Black Tree maintaining balance." },
      { name: "clear()", returnType: "void", category: "modification", desc: "Clears all elements." }
    ],
    codeExample: `TreeSet<String> tree = new TreeSet<>(List.of("b", "a", "c"));
System.out.println(tree); // [a, b, c]`,
    whenToUse: "Continuously sorted unique set requirement.",
    whenToAvoid: "Avoid if fast O(1) performance is preferred over sorting."
  },

  "EnumSet": {
    id: "EnumSet",
    name: "EnumSet<E extends Enum<E>>",
    category: "concrete",
    parent: "Set",
    group: "Set",
    javaVersion: "Java 1.5+",
    summary: "Ultra-fast Set for enum types represented internally as bit vectors.",
    structure: "Bit Vector (`long` bitmask integer)",
    ordering: "Enum declaration order",
    duplicates: "Disallowed",
    nullAllowed: "No",
    threadSafe: "No",
    complexity: { access: "N/A", search: "O(1) bitwise", insertion: "O(1) bitwise", deletion: "O(1) bitwise" },
    methods: [
      { name: "allOf(Class<E> elementType)", returnType: "EnumSet<E>", category: "core", desc: "Creates set containing all enum elements." },
      { name: "noneOf(Class<E> elementType)", returnType: "EnumSet<E>", category: "core", desc: "Creates empty set for specified enum type." },
      { name: "of(E e1, E... rest)", returnType: "EnumSet<E>", category: "core", desc: "Creates set initially containing specified enums." }
    ],
    codeExample: `enum Level { LOW, MED, HIGH }
EnumSet<Level> set = EnumSet.of(Level.MED, Level.HIGH);`,
    whenToUse: "Always use for enum element sets.",
    whenToAvoid: "Cannot be used for non-enum classes."
  },

  // --- QUEUE & DEQUE FAMILY ---
  "Queue": {
    id: "Queue",
    name: "Queue<E>",
    category: "interface",
    parent: "Collection",
    group: "Queue",
    javaVersion: "Java 1.5+",
    summary: "Collection designed for holding elements prior to processing in FIFO or Priority order.",
    structure: "Queue (Head / Tail)",
    ordering: "FIFO or Priority-based",
    duplicates: "Allowed",
    nullAllowed: "Disallowed in most implementations",
    threadSafe: "Varies",
    complexity: { access: "O(1) peek", search: "O(n)", insertion: "O(1) offer", deletion: "O(1) poll" },
    methods: [
      { name: "add(E e)", returnType: "boolean", category: "modification", desc: "Inserts element (throws exception if full)." },
      { name: "element()", returnType: "E", category: "search", desc: "Retrieves head without removing (throws exception if empty)." },
      { name: "offer(E e)", returnType: "boolean", category: "modification", desc: "Inserts element (returns false if full)." },
      { name: "peek()", returnType: "E", category: "search", desc: "Retrieves head without removing (returns null if empty)." },
      { name: "poll()", returnType: "E", category: "modification", desc: "Retrieves and removes head (returns null if empty)." },
      { name: "remove()", returnType: "E", category: "modification", desc: "Retrieves and removes head (throws exception if empty)." }
    ],
    codeExample: `Queue<String> q = new ArrayDeque<>();
q.offer("Task 1");
System.out.println(q.poll()); // "Task 1"`,
    whenToUse: "Producer-consumer queues, task scheduling, message buffering.",
    whenToAvoid: "Avoid when random index access is needed."
  },

  "Deque": {
    id: "Deque",
    name: "Deque<E>",
    category: "interface",
    parent: "Queue",
    group: "Queue",
    javaVersion: "Java 1.6+",
    summary: "Double-ended queue ('Deck'). Supports element insertion and removal at both ends.",
    structure: "Double-Ended Queue",
    ordering: "FIFO or LIFO",
    duplicates: "Allowed",
    nullAllowed: "Disallowed in ArrayDeque",
    threadSafe: "No",
    complexity: { access: "O(1) head/tail", search: "O(n)", insertion: "O(1) head/tail", deletion: "O(1) head/tail" },
    methods: [
      { name: "addFirst(E e)", returnType: "void", category: "modification", desc: "Inserts element at front." },
      { name: "addLast(E e)", returnType: "void", category: "modification", desc: "Inserts element at end." },
      { name: "offerFirst(E e)", returnType: "boolean", category: "modification", desc: "Inserts at front returning boolean." },
      { name: "offerLast(E e)", returnType: "boolean", category: "modification", desc: "Inserts at end returning boolean." },
      { name: "peekFirst()", returnType: "E", category: "search", desc: "Inspects first element." },
      { name: "peekLast()", returnType: "E", category: "search", desc: "Inspects last element." },
      { name: "pollFirst()", returnType: "E", category: "modification", desc: "Removes from front." },
      { name: "pollLast()", returnType: "E", category: "modification", desc: "Removes from back." },
      { name: "pop()", returnType: "E", category: "modification", desc: "Pops element off stack (equivalent to removeFirst)." },
      { name: "push(E e)", returnType: "void", category: "modification", desc: "Pushes element onto stack (equivalent to addFirst)." }
    ],
    codeExample: `Deque<String> d = new ArrayDeque<>();
d.push("A"); d.push("B");
System.out.println(d.pop()); // "B" (LIFO)`,
    whenToUse: "Modern Queue and Stack replacement.",
    whenToAvoid: "Avoid for concurrent thread access without concurrent wrappers."
  },

  "PriorityQueue": {
    id: "PriorityQueue",
    name: "PriorityQueue<E>",
    category: "concrete",
    parent: "Queue",
    group: "Queue",
    javaVersion: "Java 1.5+",
    summary: "Unbounded priority queue based on Binary Min-Heap array.",
    structure: "Binary Min-Heap Array",
    ordering: "Priority-ordered (Heap)",
    duplicates: "Allowed",
    nullAllowed: "No",
    threadSafe: "No",
    complexity: { access: "O(1) peek", search: "O(n)", insertion: "O(log n)", deletion: "O(log n)" },
    methods: [
      { name: "comparator()", returnType: "Comparator<? super E>", category: "core", desc: "Returns comparator used to order elements." },
      { name: "offer(E e)", returnType: "boolean", category: "modification", desc: "Inserts into binary min-heap and heapifies up." },
      { name: "peek()", returnType: "E", category: "search", desc: "Retrieves top priority element O(1)." },
      { name: "poll()", returnType: "E", category: "modification", desc: "Removes top element and heapifies down." }
    ],
    codeExample: `PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
pq.offer(10); pq.offer(50);
System.out.println(pq.poll()); // 50`,
    whenToUse: "Top-K elements, priority scheduling, Dijkstra algorithm.",
    whenToAvoid: "Avoid if FIFO order is expected."
  },

  "ArrayDeque": {
    id: "ArrayDeque",
    name: "ArrayDeque<E>",
    category: "concrete",
    parent: "Deque",
    group: "Queue",
    javaVersion: "Java 1.6+",
    summary: "Resizable-array Deque. Faster than Stack & LinkedList for Queue/Stack usages.",
    structure: "Circular Array Buffer",
    ordering: "FIFO or LIFO",
    duplicates: "Allowed",
    nullAllowed: "No",
    threadSafe: "No",
    complexity: { access: "O(1) head/tail", search: "O(n)", insertion: "O(1)", deletion: "O(1)" },
    methods: [
      { name: "addFirst(E e)", returnType: "void", category: "modification", desc: "Inserts at head circularly." },
      { name: "addLast(E e)", returnType: "void", category: "modification", desc: "Inserts at tail circularly." },
      { name: "pollFirst()", returnType: "E", category: "modification", desc: "Retrieves & removes head index." },
      { name: "pollLast()", returnType: "E", category: "modification", desc: "Retrieves & removes tail index." }
    ],
    codeExample: `Deque<String> stack = new ArrayDeque<>();
stack.push("Page A");
stack.push("Page B");
System.out.println(stack.pop()); // "Page B"`,
    whenToUse: "Preferred standard implementation for Stacks and Queues.",
    whenToAvoid: "Avoid if storing null values is required."
  },

  // --- MAP FAMILY ---
  "Map": {
    id: "Map",
    name: "Map<K,V>",
    category: "interface",
    parent: null,
    group: "Map",
    javaVersion: "Java 1.2+",
    summary: "Maps keys to values. Unique keys, each mapping to at most one value. Distinct root interface.",
    structure: "Key-Value Pairs (`Map.Entry<K,V>`)",
    ordering: "Unordered (HashMap), Insertion-ordered (LinkedHashMap), or Sorted (TreeMap)",
    duplicates: "Keys: Unique; Values: Duplicates Allowed",
    nullAllowed: "Depends on implementation",
    threadSafe: "Not thread-safe (except ConcurrentHashMap)",
    complexity: { access: "O(1) / O(log n)", search: "O(1) key", insertion: "O(1) key", deletion: "O(1) key" },
    methods: [
      { name: "clear()", returnType: "void", category: "modification", desc: "Removes all mappings from map." },
      { name: "compute(K key, BiFunction remappingFn)", returnType: "V", category: "functional", desc: "Computes mapping for specified key and current value (Java 8+)." },
      { name: "computeIfAbsent(K key, Function mappingFn)", returnType: "V", category: "functional", desc: "Computes value if key not present (Java 8+)." },
      { name: "computeIfPresent(K key, BiFunction remappingFn)", returnType: "V", category: "functional", desc: "Computes new mapping if key present (Java 8+)." },
      { name: "containsKey(Object key)", returnType: "boolean", category: "search", desc: "Returns true if map contains mapping for key." },
      { name: "containsValue(Object value)", returnType: "boolean", category: "search", desc: "Returns true if map maps one or more keys to value." },
      { name: "entrySet()", returnType: "Set<Map.Entry<K,V>>", category: "core", desc: "Returns Set view of key-value entry mappings." },
      { name: "equals(Object o)", returnType: "boolean", category: "core", desc: "Compares specified object with map for equality." },
      { name: "forEach(BiConsumer action)", returnType: "void", category: "functional", desc: "Performs action for each key-value pair (Java 8+)." },
      { name: "get(Object key)", returnType: "V", category: "search", desc: "Returns value mapped to key, or null." },
      { name: "getOrDefault(Object key, V defaultValue)", returnType: "V", category: "search", desc: "Returns value mapped to key, or defaultValue (Java 8+)." },
      { name: "hashCode()", returnType: "int", category: "core", desc: "Returns hash code value for map." },
      { name: "isEmpty()", returnType: "boolean", category: "search", desc: "Returns true if map contains no mappings." },
      { name: "keySet()", returnType: "Set<K>", category: "core", desc: "Returns Set view of keys contained in map." },
      { name: "merge(K key, V value, BiFunction remappingFn)", returnType: "V", category: "functional", desc: "Merges key value with existing mapping (Java 8+)." },
      { name: "of(K k1, V v1)", returnType: "Map<K,V>", category: "core", desc: "Returns unmodifiable map containing given key-value (Java 9+)." },
      { name: "put(K key, V value)", returnType: "V", category: "modification", desc: "Associates specified value with specified key in map." },
      { name: "putAll(Map<? extends K, ? extends V> m)", returnType: "void", category: "bulk", desc: "Copies all mappings from specified map to this map." },
      { name: "putIfAbsent(K key, V value)", returnType: "V", category: "modification", desc: "Associates value if key not already mapped (Java 8+)." },
      { name: "remove(Object key)", returnType: "V", category: "modification", desc: "Removes mapping for key from map." },
      { name: "remove(Object key, Object value)", returnType: "boolean", category: "modification", desc: "Removes entry only if mapped to specified value (Java 8+)." },
      { name: "replace(K key, V value)", returnType: "V", category: "modification", desc: "Replaces entry for key only if currently mapped (Java 8+)." },
      { name: "replace(K key, V oldValue, V newValue)", returnType: "boolean", category: "modification", desc: "Replaces entry only if currently mapped to oldValue (Java 8+)." },
      { name: "replaceAll(BiFunction function)", returnType: "void", category: "functional", desc: "Replaces each entry's value with result of function (Java 8+)." },
      { name: "size()", returnType: "int", category: "core", desc: "Returns number of key-value mappings." },
      { name: "values()", returnType: "Collection<V>", category: "core", desc: "Returns Collection view of values contained in map." }
    ],
    codeExample: `Map<String, Integer> map = new HashMap<>();
map.put("Key", 100);
map.merge("Key", 1, Integer::sum);
System.out.println(map.get("Key")); // 101`,
    whenToUse: "Key-based lookups, dictionaries, caching, indexing.",
    whenToAvoid: "Not for single unmapped element storage."
  },

  "HashMap": {
    id: "HashMap",
    name: "HashMap<K,V>",
    category: "concrete",
    parent: "Map",
    group: "Map",
    javaVersion: "Java 1.2+",
    summary: "Hash table based Map. Converts collision lists to Red-Black trees when bucket size exceeds 8 (Java 8+).",
    structure: "Hash Table Buckets (`Node<K,V>[]` + Red-Black Trees)",
    ordering: "Unordered",
    duplicates: "Unique keys",
    nullAllowed: "Allows one null key and multiple null values",
    threadSafe: "No",
    complexity: { access: "O(1) avg", search: "O(1) avg", insertion: "O(1) avg", deletion: "O(1) avg" },
    methods: [
      { name: "clear()", returnType: "void", category: "modification", desc: "Removes all mappings." },
      { name: "clone()", returnType: "Object", category: "core", desc: "Returns shallow copy of HashMap." },
      { name: "get(Object key)", returnType: "V", category: "search", desc: "Hashes key, searches bucket node or tree." },
      { name: "put(K key, V value)", returnType: "V", category: "modification", desc: "Hashes key, inserts/updates node in bucket." }
    ],
    codeExample: `Map<String, String> map = new HashMap<>();
map.put("id", "101");
System.out.println(map.get("id"));`,
    whenToUse: "Default general-purpose Map implementation.",
    whenToAvoid: "Avoid when key order matters or multithreaded lock-free operations are needed."
  },

  "LinkedHashMap": {
    id: "LinkedHashMap",
    name: "LinkedHashMap<K,V>",
    category: "concrete",
    parent: "HashMap",
    group: "Map",
    javaVersion: "Java 1.4+",
    summary: "Hash table and doubly-linked list Map. Preserves insertion-order or LRU access-order.",
    structure: "HashMap Buckets + Doubly-Linked List across entries",
    ordering: "Insertion-ordered or Access-ordered",
    duplicates: "Unique keys",
    nullAllowed: "Allows one null key",
    threadSafe: "No",
    complexity: { access: "O(1)", search: "O(1)", insertion: "O(1)", deletion: "O(1)" },
    methods: [
      { name: "removeEldestEntry(Map.Entry<K,V> eldest)", returnType: "protected boolean", category: "core", desc: "Override to build LRU cache automatically upon insertion." }
    ],
    codeExample: `Map<String, Integer> lru = new LinkedHashMap<>(16, 0.75f, true) {
    protected boolean removeEldestEntry(Map.Entry eldest) { return size() > 3; }
};`,
    whenToUse: "LRU cache building, predictable iteration order.",
    whenToAvoid: "Avoid if minor extra pointer memory is unacceptable."
  },

  "SortedMap": {
    id: "SortedMap",
    name: "SortedMap<K,V>",
    category: "interface",
    parent: "Map",
    group: "Map",
    javaVersion: "Java 1.2+",
    summary: "Map providing total ordering on keys.",
    structure: "Sorted Key Map",
    ordering: "Sorted by key",
    duplicates: "Unique keys",
    nullAllowed: "Disallowed keys in natural order",
    threadSafe: "No",
    complexity: { access: "O(log n)", search: "O(log n)", insertion: "O(log n)", deletion: "O(log n)" },
    methods: [
      { name: "comparator()", returnType: "Comparator<? super K>", category: "core", desc: "Returns comparator used to order keys." },
      { name: "firstKey()", returnType: "K", category: "search", desc: "Returns lowest key currently in map." },
      { name: "headMap(K toKey)", returnType: "SortedMap<K,V>", category: "search", desc: "Returns view of portion whose keys are strictly less than toKey." },
      { name: "lastKey()", returnType: "K", category: "search", desc: "Returns highest key currently in map." },
      { name: "subMap(K fromKey, K toKey)", returnType: "SortedMap<K,V>", category: "search", desc: "Returns view portion [fromKey, toKey)." },
      { name: "tailMap(K fromKey)", returnType: "SortedMap<K,V>", category: "search", desc: "Returns view portion greater than or equal to fromKey." }
    ],
    codeExample: `SortedMap<Integer, String> map = new TreeMap<>();
map.put(100, "A"); map.put(50, "B");
System.out.println(map.firstKey()); // 50`,
    whenToUse: "Keys must be kept sorted continuously.",
    whenToAvoid: "Avoid when sorting is not required."
  },

  "NavigableMap": {
    id: "NavigableMap",
    name: "NavigableMap<K,V>",
    category: "interface",
    parent: "SortedMap",
    group: "Map",
    javaVersion: "Java 1.6+",
    summary: "SortedMap extended with navigation closest-match query methods.",
    structure: "Navigable Sorted Tree Map",
    ordering: "Sorted by key",
    duplicates: "Unique keys",
    nullAllowed: "No null keys",
    threadSafe: "No",
    complexity: { access: "O(log n)", search: "O(log n)", insertion: "O(log n)", deletion: "O(log n)" },
    methods: [
      { name: "ceilingEntry(K key)", returnType: "Map.Entry<K,V>", category: "search", desc: "Entry with least key greater than or equal to key." },
      { name: "ceilingKey(K key)", returnType: "K", category: "search", desc: "Least key greater than or equal to key." },
      { name: "descendingMap()", returnType: "NavigableMap<K,V>", category: "search", desc: "Returns reverse-order view of map." },
      { name: "floorEntry(K key)", returnType: "Map.Entry<K,V>", category: "search", desc: "Entry with greatest key less than or equal to key." },
      { name: "floorKey(K key)", returnType: "K", category: "search", desc: "Greatest key less than or equal to key." },
      { name: "lowerEntry(K key)", returnType: "Map.Entry<K,V>", category: "search", desc: "Entry with greatest key strictly less than key." },
      { name: "lowerKey(K key)", returnType: "K", category: "search", desc: "Greatest key strictly less than key." },
      { name: "pollFirstEntry()", returnType: "Map.Entry<K,V>", category: "modification", desc: "Removes and returns entry with lowest key." },
      { name: "pollLastEntry()", returnType: "Map.Entry<K,V>", category: "modification", desc: "Removes and returns entry with highest key." }
    ],
    codeExample: `NavigableMap<Integer, String> nav = new TreeMap<>();
nav.put(10, "Ten"); nav.put(20, "Twenty");
System.out.println(nav.floorKey(15)); // 10`,
    whenToUse: "Closest match key queries and range lookups.",
    whenToAvoid: "Standard simple lookups."
  },

  "TreeMap": {
    id: "TreeMap",
    name: "TreeMap<K,V>",
    category: "concrete",
    parent: "NavigableMap",
    group: "Map",
    javaVersion: "Java 1.2+",
    summary: "Red-Black tree implementation of NavigableMap. O(log n) performance.",
    structure: "Red-Black Tree",
    ordering: "Sorted by key",
    duplicates: "Unique keys",
    nullAllowed: "Null values allowed; Null key disallowed in natural order",
    threadSafe: "No",
    complexity: { access: "O(log n)", search: "O(log n)", insertion: "O(log n)", deletion: "O(log n)" },
    methods: [
      { name: "clear()", returnType: "void", category: "modification", desc: "Clears all mappings." },
      { name: "put(K key, V value)", returnType: "V", category: "modification", desc: "Inserts into Red-Black Tree maintaining balance." }
    ],
    codeExample: `TreeMap<String, Integer> map = new TreeMap<>();
map.put("B", 2); map.put("A", 1);
System.out.println(map); // {A=1, B=2}`,
    whenToUse: "Sorted key-value mappings requirement.",
    whenToAvoid: "Avoid if O(1) performance is preferred."
  },

  "ConcurrentHashMap": {
    id: "ConcurrentHashMap",
    name: "ConcurrentHashMap<K,V>",
    category: "concurrent",
    parent: "Map",
    group: "Map",
    javaVersion: "Java 1.5+",
    summary: "High-performance, lock-free read and bucket-level write concurrent hash table.",
    structure: "Bucket Array with CAS & Synchronized bucket heads",
    ordering: "Unordered",
    duplicates: "Unique keys",
    nullAllowed: "No null keys or null values allowed",
    threadSafe: "Yes (High concurrency)",
    complexity: { access: "O(1) lock-free", search: "O(1)", insertion: "O(1) CAS", deletion: "O(1)" },
    methods: [
      { name: "mappingCount()", returnType: "long", category: "core", desc: "Returns long mapping count for large concurrent maps." },
      { name: "putIfAbsent(K key, V value)", returnType: "V", category: "modification", desc: "Atomic put if key not already mapped." }
    ],
    codeExample: `ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.merge("counter", 1, Integer::sum);`,
    whenToUse: "High-throughput multithreaded concurrent maps.",
    whenToAvoid: "Single-threaded apps where HashMap suffices."
  },

  "Hashtable": {
    id: "Hashtable",
    name: "Hashtable<K,V>",
    category: "legacy",
    parent: "Map",
    group: "Map",
    javaVersion: "Java 1.0 (Legacy)",
    summary: "Legacy synchronized hash table. Synchronizes every method on instance level.",
    structure: "Synchronized Hash Table",
    ordering: "Unordered",
    duplicates: "Unique keys",
    nullAllowed: "No null keys or values",
    threadSafe: "Yes",
    complexity: { access: "O(1)", search: "O(1)", insertion: "O(1)", deletion: "O(1)" },
    methods: [
      { name: "elements()", returnType: "Enumeration<V>", category: "iteration", desc: "Returns legacy Enumeration of values." },
      { name: "keys()", returnType: "Enumeration<K>", category: "iteration", desc: "Returns legacy Enumeration of keys." }
    ],
    codeExample: `Hashtable<String, String> table = new Hashtable<>();
table.put("Key", "Value");`,
    whenToUse: "Legacy application code.",
    whenToAvoid: "Obsolete! Use ConcurrentHashMap instead."
  },

  "SequencedCollection": {
    id: "SequencedCollection",
    name: "SequencedCollection<E>",
    category: "interface",
    parent: "Collection",
    group: "Collection Hierarchy",
    javaVersion: "Java 21+",
    summary: "Interface representing a collection with a defined encounter order, first/last elements, and reverse iteration view.",
    structure: "Sequenced Container",
    ordering: "Defined Encounter Order",
    duplicates: "Depends on implementation",
    nullAllowed: "Depends on implementation",
    threadSafe: "No",
    complexity: { access: "O(1) first/last", search: "O(n)", insertion: "O(1) head/tail", deletion: "O(1) head/tail" },
    methods: [
      { name: "addFirst(E e)", returnType: "void", category: "modification", desc: "Adds element as first element." },
      { name: "addLast(E e)", returnType: "void", category: "modification", desc: "Adds element as last element." },
      { name: "getFirst()", returnType: "E", category: "search", desc: "Gets first element." },
      { name: "getLast()", returnType: "E", category: "search", desc: "Gets last element." },
      { name: "removeFirst()", returnType: "E", category: "modification", desc: "Removes and returns first element." },
      { name: "removeLast()", returnType: "E", category: "modification", desc: "Removes and returns last element." },
      { name: "reversed()", returnType: "SequencedCollection<E>", category: "search", desc: "Returns a reverse-ordered view of this collection (Java 21+)." }
    ],
    codeExample: `SequencedCollection<String> seq = new ArrayList<>(List.of("A", "B", "C"));
System.out.println(seq.getFirst()); // "A"
System.out.println(seq.reversed()); // ["C", "B", "A"]`,
    whenToUse: "Java 21+ uniform API for head/tail and reversed operations.",
    whenToAvoid: "Unordered collections like HashSet cannot implement this."
  }
};

// Hierarchy Tree Node Layout Configuration for Visual Brain Map Rendering
const HIERARCHY_TREE_NODES = [
  // --- COLUMN 0: ROOT INTERFACE ---
  { id: "Iterable", x: 60, y: 190, category: "interface" },

  // --- COLUMN 1: TOP LEVEL CONTAINERS ---
  { id: "Collection", x: 320, y: 190, category: "interface" },
  { id: "Map", x: 320, y: 940, category: "interface" },

  // --- COLUMN 2: MAIN FRAMEWORK INTERFACES ---
  { id: "SequencedCollection", x: 600, y: 60, category: "interface" },
  { id: "List", x: 600, y: 190, category: "interface" },
  { id: "Set", x: 600, y: 510, category: "interface" },
  { id: "Queue", x: 600, y: 795, category: "interface" },

  { id: "SortedMap", x: 600, y: 940, category: "interface" },
  { id: "ConcurrentHashMap", x: 600, y: 1120, category: "concurrent" },

  // --- COLUMN 3: CORE IMPLEMENTATIONS & SUB-INTERFACES ---
  // List Branch
  { id: "ArrayList", x: 880, y: 100, category: "concrete" },
  { id: "LinkedList", x: 880, y: 190, category: "concrete" },
  { id: "CopyOnWriteArrayList", x: 880, y: 280, category: "concurrent" },
  { id: "Vector", x: 880, y: 370, category: "legacy" },

  // Set Branch
  { id: "HashSet", x: 880, y: 470, category: "concrete" },
  { id: "SortedSet", x: 880, y: 560, category: "interface" },
  { id: "EnumSet", x: 880, y: 650, category: "concrete" },

  // Queue / Deque Branch
  { id: "Deque", x: 880, y: 750, category: "interface" },
  { id: "PriorityQueue", x: 880, y: 840, category: "concrete" },

  // Map Branch
  { id: "NavigableMap", x: 880, y: 940, category: "interface" },
  { id: "HashMap", x: 880, y: 1030, category: "concrete" },
  { id: "Hashtable", x: 880, y: 1120, category: "legacy" },

  // --- COLUMN 4: SPECIALIZED IMPLEMENTATIONS ---
  { id: "Stack", x: 1160, y: 370, category: "legacy" },
  { id: "LinkedHashSet", x: 1160, y: 470, category: "concrete" },
  { id: "NavigableSet", x: 1160, y: 560, category: "interface" },
  { id: "ArrayDeque", x: 1160, y: 750, category: "concrete" },
  { id: "TreeMap", x: 1160, y: 940, category: "concrete" },
  { id: "LinkedHashMap", x: 1160, y: 1030, category: "concrete" },

  // --- COLUMN 5: DEEPEST LEAF NODES ---
  { id: "TreeSet", x: 1440, y: 560, category: "concrete" }
];

// CONNECTIONS (Parent -> Child relationships)
const HIERARCHY_CONNECTIONS = [
  { parent: "Iterable", child: "Collection", type: "extends" },
  { parent: "Collection", child: "SequencedCollection", type: "extends" },
  { parent: "Collection", child: "List", type: "extends" },
  { parent: "Collection", child: "Set", type: "extends" },
  { parent: "Collection", child: "Queue", type: "extends" },

  { parent: "List", child: "ArrayList", type: "implements" },
  { parent: "List", child: "LinkedList", type: "implements" },
  { parent: "List", child: "CopyOnWriteArrayList", type: "implements" },
  { parent: "List", child: "Vector", type: "implements" },
  { parent: "Vector", child: "Stack", type: "extends" },

  { parent: "Set", child: "HashSet", type: "implements" },
  { parent: "HashSet", child: "LinkedHashSet", type: "extends" },
  { parent: "Set", child: "SortedSet", type: "extends" },
  { parent: "SortedSet", child: "NavigableSet", type: "extends" },
  { parent: "NavigableSet", child: "TreeSet", type: "implements" },
  { parent: "Set", child: "EnumSet", type: "implements" },

  { parent: "Queue", child: "Deque", type: "extends" },
  { parent: "Queue", child: "PriorityQueue", type: "implements" },
  { parent: "Deque", child: "ArrayDeque", type: "implements" },
  { parent: "Deque", child: "LinkedList", type: "implements" },

  { parent: "Map", child: "HashMap", type: "implements" },
  { parent: "HashMap", child: "LinkedHashMap", type: "extends" },
  { parent: "Map", child: "SortedMap", type: "extends" },
  { parent: "SortedMap", child: "NavigableMap", type: "extends" },
  { parent: "NavigableMap", child: "TreeMap", type: "implements" },
  { parent: "Map", child: "ConcurrentHashMap", type: "implements" },
  { parent: "Map", child: "Hashtable", type: "implements" }
];
