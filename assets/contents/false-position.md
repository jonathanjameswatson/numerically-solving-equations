# False position

In the method of false position, linear interpolation is used to approximate a function as a straight line through two coordinates. The root of this straight line can be used as an approximation to the root of the actual function.

$$\text{One root of } f(x) = x^6 + 4x - 3 \text{ is } \alpha \text{.}$$

$$\text{Find } \alpha \text{ where } 0 < \alpha < 1 \text{.}$$

The root of the line through two starting values, $a$ and $b$, is known as $c$.

```sketch
falseposition1
```

To find $c$, two similiar triangles can be drawn.

In the above sketch, the line from the x-axis to the curve at $x = a$ has a height of $\lvert f(a) \rvert = -f(a)$. The line from the x-axis to the curve at $x = b$ has a height of $\lvert f(b) \rvert = f(b)$. The width of the left triangle is $c - a$ while the width of the right triangle is $b - c$. As the two triangles are similiar, the following equations can be formed:

$$\frac{f(b)}{-f(a)} = \frac{b - c}{c - a}$$

$$f(b)(c - a) = -f(a)(b - c)$$

$$cf(b) - af(b) = cf(a) - bf(a)$$

$$cf(b) - cf(a) = af(b) - bf(a)$$

$$c(f(b) - f(a)) = af(b) - bf(a)$$

$$c = \frac{af(b) - bf(a)}{f(b) - f(a)}$$

Using the above formula, $c$ can be found and used in a table like in the bisection method. The approximation to $c$ is likely to be more accurate while using false position rather than bisection method.

```sketch
falseposition2
```

Click the example above to play.

$$\begin{array}{|c|c|c|c|c|c|}
\hline
a & f(a) & b & f(b) & c & f(c) \\ \hline
0 & -3 & 1 & 2 & 0.6 & -0.55334 \\ \hline
0.6 & -0.55334 & 1 & 2 & 0.68669 & -0.14841 \\ \hline
0.68669 & -0.14841 & 1 & 2 & 0.70833 & -0.04038 \\ \hline
\end{array}$$

In the above table, c converges to a value much faster than in the bisection method.
