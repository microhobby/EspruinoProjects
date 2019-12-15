#clean up
try {
    rm index.js
} catch {
    Write-Warning 'No index.js file to remove, cleanup skip'
}

# args
$projectPath = $args[1];
$comport = $args[0]
$pathIndex = -join($PSScriptRoot, "\index.js")

if ($projectPath -eq $null -or $comport -eq $null) {
    throw [System.ArgumentException] 'use: .\send.ps1 COM4 ./blink/'
}

# first put all js together
Get-ChildItem -Path $projectPath -Filter *.js -Recurse -File -Name| ForEach-Object {
    $filename = [string]([System.IO.Path]::GetFileName($_))
    if ($filename -ne "index.js") {
        $path = -join($projectPath, $filename)
        cat $path >> index.js
    }
}

# now the index
Get-ChildItem -Path $projectPath -Filter index.js -Recurse -File -Name| ForEach-Object {
    $filename = [string]([System.IO.Path]::GetFileName($_))
    if ($filename -eq "index.js") {
        $path = -join($projectPath, $filename)
        cat $path >> index.js
    }
}

# remove comments
Set-Content -Path $pathIndex -Value (get-content -Path $pathIndex | Select-String -Pattern '//' -NotMatch)
Set-Content -Path $pathIndex -Value (get-content -Path $pathIndex | Select-String -Pattern '/\*' -NotMatch)

# Open and configure the serial port
Write-Host '🤔 Try to connect to '$comport

$port = New-Object System.IO.Ports.SerialPort $comport, 115200, none, 8, one
$port.DTREnable = $True
$port.Open()
Write-Host '😀 Connected to '$comport

# write the file content to the espruino
$port.WriteLine('reset();')
Start-Sleep -Milliseconds 500

$pathfile = $PSScriptRoot + '\index.js'
$content = [IO.File]::ReadAllText($pathfile)
$charWrite = 0
$charCount = $content.Length

Write-Host -NoNewLine '⏲ Writing .'

for ($i=0; $i -lt $charCount; $i++) {
    if (($content[$i] -ne "`n") -and ($content[$i] -ne "`t") -and ($content[$i] -ne "`r")) {
        $port.Write($content[$i])
        #Write-Host -NoNewLine $content[$i]
    } else {
        $port.Write(' ')
        #Write-Host -NoNewLine ' '
        Start-Sleep -Milliseconds 10
    }
    Write-Host -NoNewLine '.'
}
Write-Host ''
Write-Host '👌 Done'

# ask espruino to save
$port.WriteLine(' ')
$port.WriteLine('save();')

# sanity
Start-Sleep -Milliseconds 1000
$port.WriteLine('load();')

# all done close connection
$port.Close()
Write-Host '😎 Closed '$comport
