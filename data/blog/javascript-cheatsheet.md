---
title: 'JavaScript cheatsheet'
date: '2023-6-25'
tags: ['javascript', 'cheatsheet']
draft: false
summary: 'Here is some JavaScript Cheatsheet to remember while codeing.'
---

# Here's a modern JavaScript cheatsheet with code snippets to help you understand and use some commonly used features and concepts:

### 1. Variable Declaration (let and const):

```js
let x = 10 // Mutable variable
const PI = 3.14 // Immutable constant
```

### 2. Arrow Functions:

```js
const sum = (a, b) => a + b
```

### 3. Template Literals:

```js
const name = 'John'
const greeting = `Hello, ${name}!`
```

### 4. Destructuring Assignment:

```js
const person = { name: 'John', age: 25 }
const { name, age } = person
```

### 5. Default Parameter Values:

```js
const greet = (name = 'Guest') => `Hello, ${name}!`
```

### 6. Spread Operator (Arrays and Objects):

```js
const arr = [1, 2, 3]
const newArr = [...arr, 4, 5]

const obj = { x: 1, y: 2 }
const newObj = { ...obj, z: 3 }
```

### 7. Rest Parameter:

```js
const sumAll = (...numbers) => numbers.reduce((acc, num) => acc + num, 0)
```

### 8. Array Methods (forEach, map, filter, find, reduce):

```js
const numbers = [1, 2, 3]
numbers.forEach((num) => console.log(num))
const doubled = numbers.map((num) => num * 2)
const evens = numbers.filter((num) => num % 2 === 0)
const firstEven = numbers.find((num) => num % 2 === 0)
const sum = numbers.reduce((acc, num) => acc + num, 0)
```

### 9. Object Methods (Object.keys, Object.values, Object.entries):

```js
const person = { name: 'John', age: 25 }
const keys = Object.keys(person)
const values = Object.values(person)
const entries = Object.entries(person)
```

## 10. Promises (Async/Await):

```js
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### 11. Classes (Constructor, Methods, Inheritance):

```js
class Animal {
  constructor(name) {
    this.name = name
  }

  eat() {
    console.log(`${this.name} is eating.`)
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} is barking.`)
  }
}

const dog = new Dog('Buddy')
dog.eat()
dog.bark()
```

### 12. Modules (Export and Import):

```js
// math.js
export const sum = (a, b) => a + b
export const subtract = (a, b) => a - b

// main.js
import { sum, subtract } from './math.js'
console.log(sum(5, 3))
console.log(subtract(5, 3))
```

### 13. Async/Await with Promise.all:

```js
const fetchUserData = async () => {
  const userIds = [1, 2, 3]
  const promises = userIds.map((id) => fetch(`https://api.example.com/users/${id}`))
  const responses = await Promise.all(promises)
  const users = await Promise.all(responses.map((response) => response.json()))
  console.log(users)
}
```

### 14. Array.includes:

```js
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.includes(3)) // true
console.log(numbers.includes(6)) // false
```

### 15. Object shorthand notation:

```js
const name = 'John'
const age = 25

const person = { name, age }
console.log(person) // { name: 'John', age: 25 }
```

### 16. Promisifying callback-based functions:

```js
const readFile = require('fs').readFile
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
readFileAsync('file.txt', 'utf8')
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
```

### 17. Array.from:

```js
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
const newArray = Array.from(arrayLike)
console.log(newArray) // ['a', 'b', 'c']
```

### 18. Object.entries and Object.fromEntries:

```js
const person = { name: 'John', age: 25 }
const entries = Object.entries(person)
console.log(entries) // [['name', 'John'], ['age', 25]]

const newPerson = Object.fromEntries(entries)
console.log(newPerson) // { name: 'John', age: 25 }
```

### 19. Array.some and Array.every:

```js
const numbers = [1, 2, 3, 4, 5]
const hasPositive = numbers.some((num) => num > 0)
console.log(hasPositive) // true

const allPositive = numbers.every((num) => num > 0)
console.log(allPositive) // true
```

### 20. Object.freeze:

```js
const obj = { name: 'John', age: 25 }
Object.freeze(obj)
obj.age = 30 // Won't modify the object
console.log(obj) // { name: 'John', age: 25 }
```

### 21. Array.find and Array.findIndex:

```js
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
  { id: 3, name: 'Bob' },
]

const user = users.find((user) => user.id === 2)
console.log(user) // { id: 2, name: 'Alice' }

const index = users.findIndex((user) => user.id === 3)
console.log(index) // 2
```
