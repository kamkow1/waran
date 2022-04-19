# waran
### about the project
<p>
Waran is a compiled language with it's target being javascript.
The waran compiler is implemented in typescript and required node.js to run. 
</p>

### credits
<p>
made by <a href="https://github.com/kamkow1">kamkow1</a> <br />
special thanks to <a href="https://github.com/londek">londek</a> for helping out ;)
</p>

### example waran program
```properties
## import built-in modules
import @io
import @math

add_five := func(number) -> {
    result := add(number 5)
    return result
}

counter := 0

main := func() -> {
    hello := "hello"
    waran := "waran!"

    ## calling custom function
    ## prints 9 to the console
    std_out(add_five(4)) 

    std_out(hello waran)

    ## arrays
    my_array := ["string value" 4738 -21.564 true]

    value_from_array1 = my_array[0]
    value_from_array2 = my_array[2]

    std_out("values from my_array: " value_from_array1 value_from_array2)

    ## for loop
    for(i := 0 | i <= 10 | i++) {

        ## skip the 5th iteration
        if (i == 5) {
            continue
        }

        std_out(i)
    }

    ## while loop
    while(true) {
        if (counter > 10) {
            break    
        }

        std_out(counter)
        counter++
    }
}

main()
```

### table of contents
1. [Installation](#installation)
2. [Project structure](#proj_struct)
3. [Compiling code](#compiling)
4. [Running code](#running)

#### Installation <a href="installation"></a>
<p>
in order to install the waran compiler run:

```properties
npm i -g waran
```

or

```properties
yarn add -g waran
```
</p>

#### Project structure
<p>
to initalize an empty waran project, run:

```properties
wrn init
```

this command will create a few folders / files: 

1. .waran folder
    * ast
        + <p>
            this folder contains the .ast files for the compiler. <br />
            in general you don't want to edit any files there.
        </p>
    * build
        + <p>
            this folder contains compiled files (.wr -> .js). <br />
        </p>
2. wrn_proj.json
    * describes the behaviour of the compiler.
        + project_info - contains general information about the waran project
        + dirs - contains paths to directories used by the compiler
            - ast_dir
                * location of abstract syntax tree (ast) files
            - wrn_proj_dir
                * location of the .waran directory (contains asts and build)
            - src_dir
                * location of the working direcotry (contains your source code)
            - build
                * location of the directory that contains built waran code
3. src folder
    * current working directory
        + location can be modified in wrn_proj.json configuration file
</p>

#### Compiling code
<p>
to compile waran code run:

```properties
wrn compile < .wr file location  >
```

this will produce a .js counterpart in the .waran/build directory
unless the behaviour was modified in wrn_proj.json
<p>

#### Running code
<p>
to run waran code use:

```properties
wrn exec < path to .js file >
```

.js files can be found in the .waran/build directory with the same name as their .wr counterparts
</p>