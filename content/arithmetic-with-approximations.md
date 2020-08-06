---
title: Arithmetic with approximations
order: 2
---

When doing arithmetic with approximate values, you may need to find the range of possible results in order to give your result to a suitable degree of accuracy.

In the below example, accuracy is lost as two numbers are added.

$$
x = 0.5 \text{ (to 1 d.p.)}
$$

$$
y = 0.25 \text{ (to 2 d.p.)}
$$

$$
0.45 \leq x < 0.55
$$

$$
0.245 \leq y < 0.255
$$

$$
0.45 + 0.245 \leq x + y < 0.55 + 0.255
$$

$$
0.695 \leq x + y < 0.805
$$

$$
x + y = 1 \text{ (to 0 d.p.)}
$$

In the below example, a lot of accuracy is lost as two nearly equal approximations are subtracted.

$$
x = 1.55556 \text{ (to 6 s.f.)}
$$

$$
y = 1.55544 \text{ (to 6 s.f.)}
$$

$$
1.555555 \leq x < 1.555565
$$

$$
1.555435 \leq y < 1.555445
$$

$$
1.555555 - 1.555445 \leq x - y < 1.555565 - 1.555435
$$

$$
0.00011 \leq x - y < 0.00013
$$

$$
x - y = 0.0001 \text{ (to 1 s.f.)}
$$

The below example shows how to find errors in approximate values being added.

$$
\text{For the exact value } x = 0.123\text{, } X = 0.1 \text{ is an approximation which is correct to 1 decimal place.}
$$

$$
\text{For the exact value } y = 0.456 \text{, } Y = 0.5 \text{ is an approximation which is correct to 1 decimal place.}
$$

$$
x + y = 0.579
$$

$$
X + Y = 0.6
$$

$$
\text{Absolute error in }X + Y = 0.021
$$

Below are some rules on finding boundaries.

$$
a \leq x < b$$

$$
c \leq y < d$$

$$
a + c \leq x + y < b + d
$$

$$
ac \leq xy < bd
$$

$$
a - d \leq x - y < b - c
$$

$$
\frac{a}{d} \leq \frac{x}{y} < \frac{b}{c}
$$

## Intermediate rounding

Computers can only work with a limited amount of storage at once. Because of this, values are rounded as they are being used.

Intermediate rounding is where the numbers used in a calculation are rounded throughout the calculation instead of at the end.

If a computer can only store 2 significant figures at once, the same calculations may give different results if they are done in order.

$$
64 \times 2 \times 12 = (64 \times 2) \times 12
$$

$$
64 \times 2 = 128 = 130 \text{ (to 2 s.f.)}
$$

$$
130 \times 12 = 1560 = 1600 \text{ (to 2 s.f.)}
$$

$$
64 \times 2 \times 12 = 64 \times (2 \times 12)
$$

$$
2 \times 12 = 24 = 24 \text{ (to 2 s.f.)}
$$

$$
64 \times 24 = 1536 = 1500 \text{ (to 2 s.f.)}
$$

Most computers use many more significant figures or decimal places, but outputs still differ with different orders of operations. This often occurs in calculations involving decimals with many zeroes or irrational numbers.

## Propagation of relative error

$$
X \text{ is an approximation to } x \text{ with relative error r}$$

$$
Y \text{ is an approximation to } y \text{ with relative error s}$$

The below example shows the propagation of relative error when multiplying approximations.

$$
\frac{X - x}{x} = r$$

$$
\frac{Y - y}{y} = s$$

$$
X = xr + x = x(1 + r)$$

$$
Y = ys + y = y(1 + s)$$

$$
XY = xy(1 + r)(1 + s)$$

$$
XY = xy(1 + r + s + rs)$$

$$
r \text{ and } s \text{ are very small so } rs \approx 0
$$

$$
XY \approx xy(1 + r + s) \approx xy + xy(r + s)
$$

$$
\frac{XY - xy}{xy} \approx r + s
$$

The below example shows the propagation of relative error when dividing approximations.

$$
\frac{X}{Y} = \frac{x(1 + r)}{y(1 + s)}
$$

$$
\frac{Xy}{Yx} = \frac{1 + r}{1 + s}
$$

$$
\frac{Xy}{Yx} = \frac{(1 + r)(1 - s)}{(1 + s)(1 - s)}
$$

$$
\frac{Xy}{Yx} = \frac{1 + r - s - rs}{1 - s^2}
$$

$$
r \text{ and } s \text{ are very small so } rs \approx 0
$$

$$
s \text{ is very small so } s^2 \approx 0
$$

$$
\frac{Xy}{Yx} \approx 1 + r - s
$$

$$
\frac{Xy}{Yx} - 1\approx r - s
$$

$$
\frac{Xy}{Yx} - \frac{Yx}{Yx}\approx r - s
$$

$$
\frac{Xy - Yx}{Yx} \approx r - s
$$

$$
\frac{\frac{Xy - Yx}{Y}}{x} \approx r - s
$$

$$
\frac{y(\frac{Xy - Yx}{Yy})}{x} \approx r - s
$$

$$
\frac{y(\frac{X}{Y} - \frac{x}{y})}{x} \approx r - s
$$

$$
\frac{\frac{X}{Y} - \frac{x}{y}}{\frac{x}{y}} \approx r - s
$$

The above examples give the statement below:

$$
r + s \text{ and } r - s \leq \lvert r \rvert + \lvert s \rvert \therefore
$$

$$
\lvert r \rvert + \lvert s \rvert \text{ is an estimate of the maximum possible relative error when using } \\XY \text{ as an approximation to } xy \text{ or } \frac{X}{Y} \text{ as an approximation to } \frac{x}{y} \text{.}
$$

## Large changes in numerical processes

Sometimes, a small change in input will greatly change the output of a numerical process. For example,

$$
f(x) = 2x^2-4x+2 \text{ has one real root}
$$

$$
g(x) = 2x^2-4x+2.00001 \text{ has no real roots}
$$

The turning point of the curve with a y-intercept of 2 is at y = 0. If the y-intercept is increased, the turning point will be raised above the x-axis so curve will not have any roots.

Many of these problems involve coefficients changing to drastically change y-intercepts and gradients as well as the intersection of functions. In order to avoid problems occurring, perform calculations with a high accuracy in order to reduce rounding errors.
