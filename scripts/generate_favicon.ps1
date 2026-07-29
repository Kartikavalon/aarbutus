$ErrorActionPreference = 'Stop'

# Generates a conventional 48x48 32-bit ICO fallback from the Aarbutus mark.
$size = 48
$pixels = New-Object byte[] ($size * $size * 4)

function Set-Pixel([int]$x, [int]$y, [byte]$r, [byte]$g, [byte]$b, [byte]$a = 255) {
  if ($x -lt 0 -or $x -ge $size -or $y -lt 0 -or $y -ge $size) { return }
  $offset = (($size - 1 - $y) * $size + $x) * 4
  $pixels[$offset] = $b; $pixels[$offset + 1] = $g; $pixels[$offset + 2] = $r; $pixels[$offset + 3] = $a
}

for ($y = 0; $y -lt $size; $y++) { for ($x = 0; $x -lt $size; $x++) { Set-Pixel $x $y 15 47 109 } }
for ($y = 6; $y -lt 42; $y++) { for ($x = 6; $x -lt 12; $x++) { Set-Pixel $x $y 215 38 61 } }
for ($x = 18; $x -le 28; $x++) {
  $distance = [math]::Abs($x - 23)
  for ($thickness = -1; $thickness -le 1; $thickness++) {
    Set-Pixel $x (14 + $distance + $thickness) 255 255 255
    Set-Pixel $x (34 - $distance + $thickness) 255 255 255
  }
}

$maskBytes = New-Object byte[] ($size * 8)
$imageSize = 40 + $pixels.Length + $maskBytes.Length
$stream = [IO.File]::Create((Join-Path (Split-Path -Parent $PSScriptRoot) 'public\favicon.ico'))
$writer = [IO.BinaryWriter]::new($stream)
try {
  $writer.Write([UInt16]0); $writer.Write([UInt16]1); $writer.Write([UInt16]1)
  $writer.Write([byte]$size); $writer.Write([byte]$size); $writer.Write([byte]0); $writer.Write([byte]0)
  $writer.Write([UInt16]1); $writer.Write([UInt16]32); $writer.Write([UInt32]$imageSize); $writer.Write([UInt32]22)
  $writer.Write([UInt32]40); $writer.Write([Int32]$size); $writer.Write([Int32]($size * 2)); $writer.Write([UInt16]1); $writer.Write([UInt16]32)
  $writer.Write([UInt32]0); $writer.Write([UInt32]($pixels.Length)); $writer.Write([Int32]0); $writer.Write([Int32]0); $writer.Write([UInt32]0); $writer.Write([UInt32]0)
  $writer.Write($pixels); $writer.Write($maskBytes)
} finally { $writer.Dispose() }

Write-Host 'Generated public/favicon.ico (48x48).'
