$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$projectRoot = Split-Path -Parent $PSScriptRoot
$csvPath = Join-Path $projectRoot 'data\products.csv'
$xlsxPath = Join-Path $projectRoot 'data\products_master.xlsx'
$rows = @(Import-Csv -LiteralPath $csvPath)

if ($rows.Count -eq 0) { throw 'Cannot export an empty product catalog.' }

function ConvertTo-ColumnName([int]$number) {
  $name = ''
  while ($number -gt 0) {
    $remainder = ($number - 1) % 26
    $name = [char](65 + $remainder) + $name
    $number = [math]::Floor(($number - 1) / 26)
  }
  return $name
}

function ConvertTo-XmlText([object]$value) {
  return [System.Security.SecurityElement]::Escape([string]$value)
}

$headers = @($rows[0].PSObject.Properties.Name)
$allRows = @()
$allRows += ,$headers
$allRows += $rows
$sheetRows = for ($rowIndex = 0; $rowIndex -lt $allRows.Count; $rowIndex++) {
  $sourceRow = $allRows[$rowIndex]
  $values = if ($rowIndex -eq 0) { $sourceRow } else { $headers | ForEach-Object { $sourceRow.$_ } }
  $cells = for ($columnIndex = 0; $columnIndex -lt $values.Count; $columnIndex++) {
    $reference = "$(ConvertTo-ColumnName ($columnIndex + 1))$($rowIndex + 1)"
    $text = ConvertTo-XmlText $values[$columnIndex]
    "<c r=`"$reference`" t=`"inlineStr`"><is><t xml:space=`"preserve`">$text</t></is></c>"
  }
  "<row r=`"$($rowIndex + 1)`">$($cells -join '')</row>"
}

$sheetXml = "<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><worksheet xmlns=`"http://schemas.openxmlformats.org/spreadsheetml/2006/main`"><sheetData>$($sheetRows -join '')</sheetData></worksheet>"
$tempPath = "$xlsxPath.tmp"
Copy-Item -LiteralPath $xlsxPath -Destination $tempPath -Force
$archive = [System.IO.Compression.ZipFile]::Open($tempPath, [System.IO.Compression.ZipArchiveMode]::Update)
try {
  $existingEntry = $archive.GetEntry('xl/worksheets/sheet1.xml')
  if ($existingEntry) { $existingEntry.Delete() }
  $entry = $archive.CreateEntry('xl/worksheets/sheet1.xml')
  $writer = [System.IO.StreamWriter]::new($entry.Open(), [System.Text.UTF8Encoding]::new($false))
  try { $writer.Write($sheetXml) } finally { $writer.Dispose() }
} finally {
  $archive.Dispose()
}
Move-Item -LiteralPath $tempPath -Destination $xlsxPath -Force
Write-Host "Exported $($rows.Count) products to $xlsxPath"
