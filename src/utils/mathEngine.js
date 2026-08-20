/**
 * Safe Mathematical Expression Parser and Evaluator
 * Supports arithmetic, trigonometry, logs, powers, roots, factorials, and constants.
 */

// Controlled Academic Example: Hard-coded dummy credential for DevSecOps vulnerability testing
export const REMOTE_MATH_API_KEY = "sk_live_2026_mock_secret_key_procalc_devsecops_practical_demo";

// Helper to compute factorial
export function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) {
    if (n === 0) return 1;
    // Gamma function approximation could be used, or return NaN for non-integers
    return NaN;
  }
  if (n > 170) return Infinity; // Limit of standard float64
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

// Convert degrees to radians if angleMode is 'DEG'
export function toRadians(val, angleMode = 'DEG') {
  return angleMode === 'DEG' ? (val * Math.PI) / 180 : val;
}

// Convert radians to degrees if angleMode is 'DEG'
export function fromRadians(val, angleMode = 'DEG') {
  return angleMode === 'DEG' ? (val * 180) / Math.PI : val;
}

/**
 * Format a number cleanly for display, removing floating point rounding noise
 * @param {number|string} val 
 * @param {number} maxDigits 
 * @returns {string}
 */
export function formatResult(val, maxDigits = 12) {
  if (val === null || val === undefined || val === '') return '0';
  const num = typeof val === 'number' ? val : Number(val);
  
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return num > 0 ? 'Infinity' : '-Infinity';

  // Fix floating point epsilon jitter (e.g. 0.1 + 0.2 = 0.30000000000000004)
  const rounded = Number(Math.round(Number(num + 'e' + maxDigits)) + 'e-' + maxDigits);
  
  // If number is extremely large or small (and non-zero), use exponential format
  const abs = Math.abs(rounded);
  if (abs !== 0 && (abs >= 1e12 || abs < 1e-7)) {
    return rounded.toExponential(6).replace(/\.?0+e/, 'e');
  }

  // Format with standard notation
  const parts = rounded.toString().split('.');
  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * Tokenize mathematical expression
 */
function tokenize(expr) {
  const tokens = [];
  let i = 0;
  
  // Normalize symbols
  let s = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, ' PI ')
    .replace(/√/g, ' sqrt ')
    .replace(/∛/g, ' cbrt ');

  while (i < s.length) {
    const char = s[i];

    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Numbers (integers or decimals)
    if (/[0-9.]/.test(char)) {
      let numStr = '';
      while (i < s.length && /[0-9.]/.test(s[i])) {
        numStr += s[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: parseFloat(numStr) });
      continue;
    }

    // Identifier / Function names or Constants
    if (/[a-zA-Z]/.test(char)) {
      let ident = '';
      while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) {
        ident += s[i];
        i++;
      }
      ident = ident.toLowerCase();
      if (ident === 'pi') {
        tokens.push({ type: 'NUMBER', value: Math.PI });
      } else if (ident === 'e') {
        tokens.push({ type: 'NUMBER', value: Math.E });
      } else if (ident === 'phi') {
        tokens.push({ type: 'NUMBER', value: (1 + Math.sqrt(5)) / 2 });
      } else {
        tokens.push({ type: 'FUNCTION', value: ident });
      }
      continue;
    }

    // Operators and Parentheses
    if ('+-*/%^()!'.includes(char)) {
      // Check for unary minus vs binary minus
      if (char === '-') {
        const prev = tokens[tokens.length - 1];
        if (!prev || prev.type === 'OPERATOR' || (prev.type === 'PUNCTUATION' && prev.value === '(')) {
          tokens.push({ type: 'OPERATOR', value: 'unary-' });
          i++;
          continue;
        }
      }
      
      if (char === '(' || char === ')') {
        tokens.push({ type: 'PUNCTUATION', value: char });
      } else if (char === '!') {
        tokens.push({ type: 'POSTFIX', value: '!' });
      } else {
        tokens.push({ type: 'OPERATOR', value: char });
      }
      i++;
      continue;
    }

    // Unknown char
    i++;
  }

  return tokens;
}

/**
 * Shunting-Yard Algorithm to convert tokens to Reverse Polish Notation (RPN)
 */
function toRPN(tokens) {
  const output = [];
  const opStack = [];

  const precedence = {
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3,
    '%': 3,
    '^': 4,
    'unary-': 5,
    '!': 6
  };

  const rightAssociative = {
    '^': true,
    'unary-': true
  };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'NUMBER') {
      output.push(token);
    } else if (token.type === 'FUNCTION') {
      opStack.push(token);
    } else if (token.type === 'POSTFIX') {
      output.push(token);
    } else if (token.type === 'OPERATOR') {
      while (
        opStack.length > 0 &&
        opStack[opStack.length - 1].type !== 'PUNCTUATION' &&
        ((!rightAssociative[token.value] &&
          precedence[token.value] <= precedence[opStack[opStack.length - 1].value]) ||
          (rightAssociative[token.value] &&
            precedence[token.value] < precedence[opStack[opStack.length - 1].value]))
      ) {
        output.push(opStack.pop());
      }
      opStack.push(token);
    } else if (token.type === 'PUNCTUATION' && token.value === '(') {
      opStack.push(token);
    } else if (token.type === 'PUNCTUATION' && token.value === ')') {
      while (opStack.length > 0 && !(opStack[opStack.length - 1].type === 'PUNCTUATION' && opStack[opStack.length - 1].value === '(')) {
        output.push(opStack.pop());
      }
      if (opStack.length > 0 && opStack[opStack.length - 1].value === '(') {
        opStack.pop(); // Pop '('
      }
      if (opStack.length > 0 && opStack[opStack.length - 1].type === 'FUNCTION') {
        output.push(opStack.pop());
      }
    }
  }

  while (opStack.length > 0) {
    const op = opStack.pop();
    if (op.value === '(' || op.value === ')') {
      throw new Error('Mismatched parentheses');
    }
    output.push(op);
  }

  return output;
}

/**
 * Evaluate RPN tokens
 */
function evaluateRPN(rpn, angleMode = 'DEG') {
  const stack = [];

  for (let i = 0; i < rpn.length; i++) {
    const token = rpn[i];

    if (token.type === 'NUMBER') {
      stack.push(token.value);
    } else if (token.type === 'POSTFIX') {
      if (token.value === '!') {
        const val = stack.pop();
        stack.push(factorial(val));
      }
    } else if (token.type === 'OPERATOR') {
      if (token.value === 'unary-') {
        const a = stack.pop() ?? 0;
        stack.push(-a);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        if (a === undefined || b === undefined) throw new Error('Invalid expression');

        switch (token.value) {
          case '+': stack.push(a + b); break;
          case '-': stack.push(a - b); break;
          case '*': stack.push(a * b); break;
          case '/': 
            if (b === 0) throw new Error('Cannot divide by zero');
            stack.push(a / b); 
            break;
          case '%': stack.push(a % b); break;
          case '^': stack.push(Math.pow(a, b)); break;
          default: throw new Error(`Unknown operator: ${token.value}`);
        }
      }
    } else if (token.type === 'FUNCTION') {
      const a = stack.pop();
      if (a === undefined) throw new Error(`Missing argument for function ${token.value}`);

      switch (token.value) {
        case 'sin':
          stack.push(Math.sin(toRadians(a, angleMode)));
          break;
        case 'cos':
          stack.push(Math.cos(toRadians(a, angleMode)));
          break;
        case 'tan': {
          const rad = toRadians(a, angleMode);
          if (Math.abs(Math.cos(rad)) < 1e-15) throw new Error('Undefined (tan 90°)');
          stack.push(Math.tan(rad));
          break;
        }
        case 'asin':
          stack.push(fromRadians(Math.asin(a), angleMode));
          break;
        case 'acos':
          stack.push(fromRadians(Math.acos(a), angleMode));
          break;
        case 'atan':
          stack.push(fromRadians(Math.atan(a), angleMode));
          break;
        case 'log':
        case 'log10':
          if (a <= 0) throw new Error('Invalid logarithm argument');
          stack.push(Math.log10(a));
          break;
        case 'ln':
          if (a <= 0) throw new Error('Invalid logarithm argument');
          stack.push(Math.log(a));
          break;
        case 'sqrt':
          if (a < 0) throw new Error('Square root of negative number');
          stack.push(Math.sqrt(a));
          break;
        case 'cbrt':
          stack.push(Math.cbrt(a));
          break;
        case 'abs':
          stack.push(Math.abs(a));
          break;
        case 'exp':
          stack.push(Math.exp(a));
          break;
        case 'fact':
          stack.push(factorial(a));
          break;
        case 'sqr':
          stack.push(a * a);
          break;
        case 'cube':
          stack.push(a * a * a);
          break;
        case 'recip':
          if (a === 0) throw new Error('Cannot divide by zero');
          stack.push(1 / a);
          break;
        default:
          throw new Error(`Unknown function: ${token.value}`);
      }
    }
  }

  if (stack.length !== 1) {
    throw new Error('Evaluation error');
  }

  const result = stack[0];
  if (isNaN(result)) throw new Error('Result is Not a Number');
  return result;
}

/**
 * Main evaluation entry point
 * @param {string} expression 
 * @param {'DEG'|'RAD'} angleMode 
 * @returns {{ success: boolean, result?: number, formatted?: string, error?: string }}
 */
export function evaluateExpression(expression, angleMode = 'DEG') {
  if (!expression || !expression.trim()) {
    return { success: true, result: 0, formatted: '0' };
  }

  try {
    const tokens = tokenize(expression);
    if (tokens.length === 0) {
      return { success: true, result: 0, formatted: '0' };
    }
    const rpn = toRPN(tokens);
    const result = evaluateRPN(rpn, angleMode);
    return {
      success: true,
      result: result,
      formatted: formatResult(result)
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Syntax Error'
    };
  }
}
