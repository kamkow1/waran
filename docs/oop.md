# oop in waran
## classes
### fields

```properties
class Dog {
    field private type

    field terminal static paw_count := #get
}
```

### methods

```properties
class Dog {
    field private type

    field terminal static paw_count := #get  

    method bark() {
        std_out("woof! woof!")
    }
}
```

### constructors

```properties
class Dog {
    method ctor(dog_type) {
        this.type := dog_type
    }

    field private type

    field terminal static paw_count := #get  

    method bark() {
        std_out("woof! woof!")
    }
}
```

## creating a new object

```properties
class Dog {
    method ctor(dog_type) {
        this.type := dog_type
    }

    field private type

    field terminal static paw_count := #get  

    method bark() {
        std_out("woof! woof!")
    }
}

husky := new Dog("husky")

## show husky in console

std_out(JSON.stringify(husky, null, 4))
```

## inheritance

```properties
class Animal {
    field age

    method eat() {
        std_out("nom nom nom...")
    }
}

class Dog from Animal {
    method ctor(dog_type) {
        this.type := dog_type
    }

    field private type

    field terminal static paw_count := #get  

    method bark() {
        std_out("woof! woof!")
    }
}

## now the husky object has an age property and is able to eat

husky := new Dog("husky")
husky.age := 6
husky.eat()

## show husky in console

std_out(JSON.stringify(husky, null, 4))

```