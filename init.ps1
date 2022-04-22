$BUILD = $args[0]

if (Test-Path $BUILD -PathType Any) {
    $command = "cd " + $BUILD + "; " + "npm init -y"
    echo $command
    iex $command
} else {
    echo "could not find path"
}