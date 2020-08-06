---
title: Calculator guide
order: 7
---

This website has several calculators for numerical methods can be found on the menu under the calculators section.

## Parameters

Each numerical method has several parameters which change how they work. Common parameters are described below:

* $\text{Accuracy}$ - In each iteration of a numerical method, the approximation to the exact value will be compared to the last iteration's approximation. If they agree to the number of decimal places given by this parameter, the process will end. Each numerical method will last for no longer than 51 iterations.

* $a$ - This parameter usually refers to the left boundary of a numerical method.

* $b$ - This parameter usually refers to the right boundary of a numerical method.

* $x_0$ - This parameter usually refers to the starting value of a numerical method that uses a recurrence relation. It is also the equivalent of parameter $a$ for the secant method.

* $\text{Relaxation }(λ)$ - This parameter refers the value that is used in the relaxation of fixed point iteration. If you do not want to apply relaxation, leave this value at 1.

* $f'(x)$ - This parameter refers to the derivative of the inputted function. This should be set automatically when you input the function. If this does not work or is incorrect, you can input a different formula for it.

* $x_1$ - This parameter is the equivalent of parameter $b$ for the secant method.

## Function inputs

The calculators on this website use math.js to evaluate and differentiate equations. Some useful functions that can be used in the function inputs are shown below:

| Function | Equivalent |
| - | - |
| ceil(x) | $\left \lceil{x}\right \rceil$ |
| floor(x) | $\left \lfloor{x}\right \rfloor$ |
| round(x) | $\left \lfloor{x}\right \rceil$ |
| log(x, base) | $\log_{base} x$ |
| log(x) | $\ln x$ |
| sign(x) | $-1 \text{ for } x < 0, 0 \text{ for } x = 0, 1 \text{ for } x > 0$ |

The trigonometric functions sin, cos, tan, sec, csc and cot are provided. Their hyperbolic equivalents can be found by adding the letter h to the end of each function to form sinh, cosh, etc. Inverses of these functions can be found by adding the letter a to the front to form asin, acosh, etc.

[More functions can be found here.](https://mathjs.org/docs/reference/functions.html)
