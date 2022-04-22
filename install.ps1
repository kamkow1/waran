if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) { 

    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit 
}

$BUILD = $args[0]

if (Test-Path $BUILD -PathType Any) {
    $command = "cd " + $BUILD + "; " + "npm install express"
    echo $command
    iex $command
} else {
    echo "could not find path"
}