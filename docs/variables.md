# variables
## assign a value

### strings

```properties
v1 := "string value"
```

### numbers

```properties
v2 := 634
```

```properties
v3 := 345.35
```

```properties
v4 := -453.534
```

### booleans

```properties
v5 := true
v6 := false
```

### objects

```properties
v7 := %{
    property1: "hello",
    method1: () -> {
        std_out("hello from method")
    }
}

std_out(v7.property1)

v7.method1()
```

### use the value

```properties
some_value := "text"

std_out(some_value)
```