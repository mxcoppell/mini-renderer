Certainly! Below is a Python implementation of the Bubble Sort algorithm:

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Track whether a swap was made in this iteration
        swapped = False
        # Perform a single pass
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if they are in the wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no swaps occurred, the array is sorted
        if not swapped:
            break

# Example usage:
data = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(data)
print("Sorted array is:", data)
```

### How Bubble Sort Works:
1. The algorithm repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
2. This process is repeated until the list is sorted.
3. After each pass through the list, the next largest element is moved to its correct position.
4. The algorithm keeps track of whether any swaps were made during a pass. If no swaps were made, the list is already sorted, and the process can be stopped early. This is an optimization to improve performance on already sorted or nearly sorted lists.

Bubble sort has a time complexity of \(O(n^2)\) in the worst and average cases, where \(n\) is the number of items being sorted. It is not efficient for large datasets but can be useful for educational purposes to understand sorting algorithms.
