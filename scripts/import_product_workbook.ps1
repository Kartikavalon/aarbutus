param(
  [Parameter(Mandatory = $true)]
  [string]$Source,
  [switch]$IncludePhase2
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

if (-not (Test-Path -LiteralPath $Source)) {
  throw "Workbook not found: $Source"
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputPaths = @(
  (Join-Path $projectRoot 'public\data\products.csv'),
  (Join-Path $projectRoot 'data\products.csv')
)

$zip = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $Source))
try {
  $entry = $zip.GetEntry('xl/worksheets/sheet1.xml')
  if (-not $entry) { throw 'The expected "Final Product Range" worksheet was not found.' }
  $reader = [System.IO.StreamReader]::new($entry.Open())
  try { [xml]$sheet = $reader.ReadToEnd() } finally { $reader.Dispose() }
} finally {
  $zip.Dispose()
}

$namespace = [System.Xml.XmlNamespaceManager]::new($sheet.NameTable)
$namespace.AddNamespace('x', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main')

function Get-CellText($cell) {
  if ($cell.t -eq 'inlineStr') {
    return [string]$cell.SelectSingleNode('x:is/x:t', $namespace).'#text'
  }
  return [string]$cell.SelectSingleNode('x:v', $namespace).'#text'
}

function To-Slug([string]$Value) {
  $value = $Value.ToLowerInvariant() -replace '[^a-z0-9]+', '-'
  return $value.Trim('-')
}

function Get-Family([string]$MainCategory) {
  switch ($MainCategory) {
    'Filter & Support Media' { return 'Filter & Specialty Media' }
    'Specialty Media (Iron/Mn/H2S)' { return 'Filter & Specialty Media' }
    'Specialty Media' { return 'Filter & Specialty Media' }
    'Filter Media' { return 'Filter & Specialty Media' }
    'Gas Treatment Media & Catalysts' { return 'Gas Treatment Media' }
    default { return $MainCategory }
  }
}

function Get-Image([string]$Product) {
  $name = $Product.ToLowerInvariant()
  if ($name -match 'activated carbon|centaur') { return '/assets/images/activated-carbon.svg' }
  if ($name -match 'activated alumina') { return '/assets/images/activated-alumina.svg' }
  if ($name -match 'molecular sieve') { return '/assets/images/molecular-sieve-13x.svg' }
  if ($name -match 'silica gel') { return '/assets/images/silica-gel.svg' }
  if ($name -match 'bleaching earth|bentonite|organoclay') { return '/assets/images/bleaching-earth.svg' }
  if ($name -match 'ion exchange|resin') { return '/assets/images/ion-exchange.svg' }
  if ($name -match 'coagulant|polyacrylamide|polydadmac|polyamine|ferric|aluminium') { return '/assets/images/coagulants-flocculants.svg' }
  if ($name -match 'catalyst|hopcalite|ozone') { return '/assets/images/catalyst-support.svg' }
  return '/assets/images/product-placeholder.svg'
}

$rows = @()
foreach ($row in $sheet.SelectNodes('//x:sheetData/x:row', $namespace)) {
  $cells = @($row.SelectNodes('x:c', $namespace) | ForEach-Object { Get-CellText $_ })
  if ($cells.Count -ge 10 -and $cells[0] -in @('CORE', 'SECONDARY', 'PHASE-2')) {
    if ($cells[0] -eq 'PHASE-2' -and -not $IncludePhase2) { continue }
    $product = $cells[2].Trim()
    $family = Get-Family $cells[1].Trim()
    $overview = "$product is supplied for $($cells[4].Trim().TrimEnd('.').ToLowerInvariant())."
    $rows += [pscustomobject][ordered]@{
      'Family' = $family
      'Subcategory' = $product
      'Product' = $product
      'Slug' = To-Slug $product
      'Applications' = $cells[4].Trim()
      'Typical Spec' = $cells[3].Trim()
      'Grades / Forms' = $cells[7].Trim()
      'Overview' = $overview
      'Technical Notes' = "Target industries: $($cells[5].Trim()). $($cells[6].Trim())"
      'Documentation' = 'CoA, TDS and MSDS available on request.'
      'Datasheet' = ''
      'Image File' = Get-Image $product
      'Company Image' = ''
      'SEO Title' = "$product | Aarbutus Technologies"
      'Meta Description' = "$product for $($cells[4].Trim().ToLowerInvariant()). Request technical documentation and a quote from Aarbutus Technologies."
      'Image Alt' = "$product for industrial applications"
    }
  }
}

if ($rows.Count -eq 0) { throw 'No eligible product rows were found in the workbook.' }
if (($rows.Slug | Sort-Object -Unique).Count -ne $rows.Count) { throw 'The workbook produces duplicate product slugs. Rename the affected product families before importing.' }

$csv = $rows | ConvertTo-Csv -NoTypeInformation -Delimiter '|'
$encoding = [System.Text.UTF8Encoding]::new($false)
foreach ($outputPath in $outputPaths) {
  [System.IO.File]::WriteAllLines($outputPath, $csv, $encoding)
}

Write-Host "Imported $($rows.Count) products into public/data/products.csv and data/products.csv."
