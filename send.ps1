#clean up
rm index.js

# args
$projectPath = $args[1];
$comport = $args[0]

if ($projectPath -eq $null -or $comport -eq $null) {
    throw [System.ArgumentException] "use: .\send.ps1 COM4 ./blink/"
}

# first put all js together
Get-ChildItem -Path $projectPath -Filter *.js -Recurse -File -Name| ForEach-Object {
    $filename = [string]([System.IO.Path]::GetFileName($_))
    $path = -join($projectPath, $filename)
    cat $path >> index.js
}

# Open and configure the serial port
Write-Host "Try to connect to $comport"

$port = New-Object System.IO.Ports.SerialPort $comport, 115200, none, 8, one
$port.DTREnable = $True
$port.Open()
Write-Host "Connected to $comport"

# write the file content to the espruino
$port.WriteLine("reset();")
Start-Sleep -Milliseconds 500
$content = [IO.File]::ReadAllText(".\index.js")
$port.WriteLine($content)

# ask espruino to save
$port.WriteLine("save();")

# all done close connection
$port.Close()
Write-Host "Closed $comport"