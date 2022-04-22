# functions
## declare a function

```properties
my_function_name := func() -> {
    ## body
}
```

### with parameters

```properties
import @string

my_function_name := func(param1 param2 param3) -> {
    ## example usage

    concatinated_params = concat(param1 param2 param3)
    std_out(concatinated_params)
}
```

### return from a function

```properties
import @math

my_function_name := func(parameter) -> {
    return add(parameter 5)
}
```

## invoking a function

### without arguments

```properties
function_name()
```

### with arguments

```properties
function_name(param1 param2 param3)
```