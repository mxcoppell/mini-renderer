# Math and Markdown Rendering Example

## 1. Markdown Features

### Lists
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

### Emphasis
This is *italic* and this is **bold**.

### Code
Inline code: `console.log('Hello, world!');`

Python code block:
```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
```

Markdown code block:
```markdown
# Rendered Markdown

This is a **markdown** code block that will be *rendered*.

1. First item
2. Second item

`inline code`

> Blockquote
```

---

## 2. Inline Math

The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

The area of a circle is $A = \pi r^2$.

---

## 3. Block Math

The matrix multiplication formula:

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix} =
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}
$$

The Gaussian integral:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

---

## 4. Mixed Content

1. First, calculate the **determinant**: $\det(A) = ad - bc$.
2. Then, find the *inverse* using:

   $$
   A^{-1} = \frac{1}{\det(A)} \begin{pmatrix} 
   d & -b \\
   -c & a
   \end{pmatrix}
   $$

3. Finally, verify that $AA^{-1} = I$.

---

## 5. LaTeX Environments

A matrix equation:

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix} =
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}
$$

An aligned equation:

$$
\begin{aligned}
f(x) &= x^2 + 3x + 2 \\
     &= (x + 1)(x + 2)
\end{aligned}
$$

---

This example demonstrates various markdown features, LaTeX math rendering, inline math, block math, and rendered markdown within code blocks.
