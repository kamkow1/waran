# add()
## syntax
### adding predefined values

```properties
num1 = 3
num2 = 5
add(num1 num2)
```

### adding values inside of arguments

```properties
add(1 6)
```

### using the returned value

```properties
std_out(add(6 8))
```

### assigning the return value

```properties
variable_name = add(1 6)

std_out(variable_name)
```