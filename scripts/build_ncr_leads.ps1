$ErrorActionPreference = 'Stop'

$sourceFile = 'D:\important\heavy dataset\All INDIA 50+ Crore Database by iWhatsApp-info\0 - All INDIA 50+ Crore Database 13.4 GB\Chemical_and_Pharama\# Chemical_and_Pharama\Chemical_Mfg_Exp (8263).xls'
$outputFile = Join-Path $PSScriptRoot '..\data\Aarbutus_NCR_Industrial_Prospects.xlsx'
$ncrPattern = 'DELHI|NOIDA|GHAZIABAD|GURGAON|GURUGRAM|FARIDABAD|SAHIBABAD|MEERUT|SONIPAT|KUNDLI|MANESAR|BAHADURGARH|ROHTAK|BHIWADI|ALWAR|PALWAL|PANIPAT|REWARI|HAPUR|BULANDSHAHR|MUZAFFARNAGAR'

function Clean-Text([object]$value) {
  if ($null -eq $value) { return '' }
  return (($value.ToString() -replace '[\r\n]+', ' ' -replace '\s+', ' ').Trim())
}

function Get-Fit([string]$category, [string]$description) {
  $text = ("$category $description").ToUpperInvariant()
  if ($text -match 'EFFLUENT|WASTE.?WATER|WATER TREAT|SEWAGE|BOILER|COOLING WATER|REVERSE OSMOSIS|\bRO\b|ION EXCHANGE|DEM[II]NERAL') {
    return @{ Industry='Industrial water / ETP'; Product='PAC / Alum / Ferric, flocculants, activated carbon, ion-exchange resins'; Score=55 }
  }
  if ($text -match 'PHARMA|PHARMACEUTICAL|BULK DRUG|FORMULATION|API\b|BIOTECH|MEDICINE|ANTIBIOTIC|VETERINARY') {
    return @{ Industry='Pharma / biotech manufacturing'; Product='Activated carbon, process media, water-treatment chemicals'; Score=48 }
  }
  if ($text -match 'TEXTILE|DYE|DYES|GARMENT|LEATHER') {
    return @{ Industry='Textile / dyes / leather processing'; Product='Coagulants, flocculants, activated carbon for ETP'; Score=44 }
  }
  if ($text -match 'FOOD|BEVERAGE|DAIRY|DISTILL|BREW|SUGAR|EDIBLE|VEGETABLE OIL|BAKERY') {
    return @{ Industry='Food / beverage processing'; Product='Activated carbon, water-treatment chemicals, resins'; Score=44 }
  }
  if ($text -match 'PAPER|PULP') {
    return @{ Industry='Paper / pulp'; Product='Coagulants, flocculants, activated carbon for process water'; Score=44 }
  }
  if ($text -match 'PAINT|COATING|INK|LACQUER') {
    return @{ Industry='Paints / coatings / inks'; Product='Activated carbon and ETP-treatment chemicals'; Score=33 }
  }
  if ($text -match 'RUBBER|PLASTIC|POLYMER|ADHESIVE') {
    return @{ Industry='Rubber / plastics / polymers'; Product='Activated carbon, utility-water treatment chemicals'; Score=32 }
  }
  if ($text -match 'CHEMICAL|ACID|ALKALI|SOLVENT|OXIDE|SURFACTANT|MINERAL|FERTIL') {
    return @{ Industry='Chemical manufacturing'; Product='Activated carbon, process adsorbents, water-treatment chemicals'; Score=28 }
  }
  return @{ Industry='Industrial manufacturing (verify)'; Product='Qualify for utility-water and process-media requirement'; Score=18 }
}

function Get-LocationScore([string]$city) {
  switch -Regex ($city.ToUpperInvariant()) {
    'GHAZIABAD|SAHIBABAD' { return 30 }
    'NOIDA|GREATER NOIDA' { return 27 }
    'FARIDABAD' { return 24 }
    'DELHI' { return 21 }
    'GURGAON|GURUGRAM|MANESAR' { return 18 }
    default { return 12 }
  }
}

function Get-GenericEmail([string]$email) {
  $matches = [regex]::Matches($email, '(?i)[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}')
  foreach ($match in $matches) {
    $candidate = $match.Value.ToLowerInvariant()
    if ($candidate -match '^(info|sales|contact|enquiry|enquiries|admin|office|marketing|purchase|procurement|support)@') { return $candidate }
  }
  return ''
}

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
try {
  $book = $excel.Workbooks.Open($sourceFile, $null, $true)
  $sheet = $book.Worksheets.Item(1)
  $raw = $sheet.UsedRange.Value2
  $rowCount = $sheet.UsedRange.Rows.Count
  $book.Close($false)

  $candidates = New-Object System.Collections.Generic.List[object]
  for ($row = 2; $row -le $rowCount; $row++) {
    $category = Clean-Text $raw[$row, 1]
    $company = Clean-Text $raw[$row, 2]
    $address = (Clean-Text $raw[$row, 3]), (Clean-Text $raw[$row, 4]), (Clean-Text $raw[$row, 5]) -ne '' -join ', '
    $city = Clean-Text $raw[$row, 6]
    $pincode = Clean-Text $raw[$row, 7]
    $phone = Clean-Text $raw[$row, 8]
    $email = Clean-Text $raw[$row, 10]
    $website = Clean-Text $raw[$row, 12]
    $description = Clean-Text $raw[$row, 13]
    if ([string]::IsNullOrWhiteSpace($company) -or $city -notmatch $ncrPattern) { continue }
    $fit = Get-Fit $category $description
    $score = $fit.Score + (Get-LocationScore $city)
    if (("$category $description").ToUpperInvariant() -match 'TRADER|TRADING|DISTRIBUTOR|DEALER|STOCKIST|IMPORTER|EXPORTER') { $score -= 13 }
    if ($category -match 'Activated Carbon|Water Treatment Chemicals') { $score -= 18 }
    if ($phone) { $score += 4 }
    if ((Get-GenericEmail $email)) { $score += 3 }
    if ($website) { $score += 2 }
    $key = (($company.ToUpperInvariant() -replace '[^A-Z0-9]', '') + '|' + ($city.ToUpperInvariant() -replace '[^A-Z0-9]', ''))
    $candidates.Add([PSCustomObject]@{
      Key=$key; Company=$company; Industry=$fit.Industry; City=$city; Address=$address; Pincode=$pincode; OfficePhone=$phone; GenericEmail=(Get-GenericEmail $email); Website=$website; Category=$category; Description=$description; RecommendedProduct=$fit.Product; Score=$score
    })
  }

  $leads = $candidates | Group-Object Key | ForEach-Object {
    $_.Group | Sort-Object @{Expression='Score';Descending=$true}, @{Expression={ $_.OfficePhone.Length + $_.GenericEmail.Length + $_.Website.Length };Descending=$true} | Select-Object -First 1
  } | Where-Object { $_.Score -ge 45 } | Sort-Object Score -Descending, City, Company

  $rank = 0
  $final = foreach ($lead in $leads) {
    $rank++
    $priority = if ($lead.Score -ge 78) { 'A — call / visit first' } elseif ($lead.Score -ge 64) { 'B — call / email this month' } else { 'C — qualify by phone first' }
    $channel = if ($lead.OfficePhone -and $lead.GenericEmail) { 'Call, then company email; visit if qualified' } elseif ($lead.OfficePhone) { 'Call; ask for purchase / ETP / plant head' } else { 'Research official number before outreach' }
    [PSCustomObject][ordered]@{
      Rank=$rank; Priority=$priority; FitScore=$lead.Score; Company=$lead.Company; LikelyIndustry=$lead.Industry; City=$lead.City; Address=$lead.Address; Pincode=$lead.Pincode; OfficePhone=$lead.OfficePhone; GenericBusinessEmail=$lead.GenericEmail; Website=$lead.Website; RecommendedOpening=$lead.RecommendedProduct; FirstContactChannel=$channel; AskFor='Purchase / Plant / ETP / Utility / Production manager'; SourceCategory=$lead.Category; SourceDescription=$lead.Description; VerificationStatus='Unverified historical business-directory record — confirm current company and contact through official website/Google Maps before outreach'; Source='Chemical_Mfg_Exp directory (provided locally)'
    }
  }

  if ($final.Count -lt 200) { throw "Only $($final.Count) qualified leads were found; expected at least 200." }

  if (Test-Path $outputFile) { Remove-Item -LiteralPath $outputFile -Force }
  $outBook = $excel.Workbooks.Add()
  $leadSheet = $outBook.Worksheets.Item(1)
  $leadSheet.Name = 'Prioritized Leads'
  $headers = @('Rank','Priority','Fit Score','Company','Likely Industry','City','Address','Pincode','Office Phone','Generic Business Email','Website','Recommended Opening','First Contact Channel','Ask For','Source Category','Source Description','Verification Status','Source')
  for ($c=1; $c -le $headers.Count; $c++) { $leadSheet.Cells.Item(1,$c).Value2 = $headers[$c-1] }
  $r=2
  foreach ($lead in $final) {
    $values = @($lead.Rank,$lead.Priority,$lead.FitScore,$lead.Company,$lead.LikelyIndustry,$lead.City,$lead.Address,$lead.Pincode,$lead.OfficePhone,$lead.GenericBusinessEmail,$lead.Website,$lead.RecommendedOpening,$lead.FirstContactChannel,$lead.AskFor,$lead.SourceCategory,$lead.SourceDescription,$lead.VerificationStatus,$lead.Source)
    for ($c=1; $c -le $values.Count; $c++) { $leadSheet.Cells.Item($r,$c).Value2 = [string]$values[$c-1] }
    $r++
  }
  $headerRange = $leadSheet.Range($leadSheet.Cells.Item(1,1),$leadSheet.Cells.Item(1,$headers.Count))
  $headerRange.Font.Bold = $true
  $headerRange.Interior.Color = 15773696
  $leadSheet.Range('A1:R1').AutoFilter() | Out-Null
  $leadSheet.Columns.Item(1).ColumnWidth = 8
  $leadSheet.Columns.Item(2).ColumnWidth = 24
  $leadSheet.Columns.Item(3).ColumnWidth = 10
  $leadSheet.Columns.Item(4).ColumnWidth = 36
  $leadSheet.Columns.Item(5).ColumnWidth = 30
  $leadSheet.Columns.Item(6).ColumnWidth = 18
  $leadSheet.Columns.Item(7).ColumnWidth = 55
  $leadSheet.Columns.Item(8).ColumnWidth = 11
  $leadSheet.Columns.Item(9).ColumnWidth = 20
  $leadSheet.Columns.Item(10).ColumnWidth = 30
  $leadSheet.Columns.Item(11).ColumnWidth = 36
  $leadSheet.Columns.Item(12).ColumnWidth = 52
  $leadSheet.Columns.Item(13).ColumnWidth = 44
  $leadSheet.Columns.Item(14).ColumnWidth = 35
  $leadSheet.Columns.Item(15).ColumnWidth = 26
  $leadSheet.Columns.Item(16).ColumnWidth = 70
  $leadSheet.Columns.Item(17).ColumnWidth = 72
  $leadSheet.Columns.Item(18).ColumnWidth = 34
  $leadSheet.Rows.Item(1).WrapText = $true
  $leadSheet.UsedRange.VerticalAlignment = -4160

  $guide = $outBook.Worksheets.Add()
  $guide.Name = 'Use Guide'
  $guideRows = @(
    @('Aarbutus Technologies — NCR Industrial Prospect List', ''),
    @('Purpose', 'A first-wave B2B prospect list for adsorbents, activated carbon, water-treatment chemicals, coagulants/flocculants and ion-exchange media.'),
    @('Coverage', 'Delhi NCR, Ghaziabad, Noida, Faridabad, Gurgaon and nearby industrial cities. Sorted by fit and travel practicality.'),
    @('Important data note', 'This is a historical local business directory. Every lead must be live-verified before contact. Individual names and non-generic personal emails were deliberately excluded.'),
    @('Suggested workflow', 'Start with Priority A. Call the main office and ask for Purchase, Plant, ETP, Utility or Production. Qualify current water treatment / process-media requirement, consumption, vendor approval and next purchase date.'),
    @('Do not use', 'Do not mass-call, scrape, or treat the information as consent. Respect opt-outs, do-not-call rules, and each company’s communication preferences.'),
    @('Fit scoring', 'Industry fit, local proximity and availability of an office phone, generic business email or website. It is a prioritization aid, not a confirmation that the firm currently buys these products.'),
    @('Primary target segments', 'ETP and industrial-water users; pharma/biotech; textile/dyes/leather; food and beverage; paper/pulp; paint/coatings; rubber/plastics; chemical manufacturers.'),
    @('Recommended next step', 'Verify the top 50 through the company website/Google Maps, enrich only role-based corporate contacts, and log each outcome in your CRM.' )
  )
  for ($r=1; $r -le $guideRows.Count; $r++) { $guide.Cells.Item($r,1).Value2=$guideRows[$r-1][0]; $guide.Cells.Item($r,2).Value2=$guideRows[$r-1][1] }
  $guide.Range('A1:B1').Font.Bold=$true
  $guide.Range('A1:B1').Interior.Color=15773696
  $guide.Columns.Item(1).ColumnWidth=28
  $guide.Columns.Item(2).ColumnWidth=120
  $guide.UsedRange.WrapText=$true
  $guide.UsedRange.VerticalAlignment=-4160
  $guide.UsedRange.Rows.AutoFit() | Out-Null

  $outBook.Worksheets.Item('Prioritized Leads').Activate()
  $outBook.SaveAs($outputFile, 51)
  $outBook.Close($true)
  "CREATED: $outputFile"
  "LEADS: $($final.Count)"
}
finally {
  $excel.Quit()
  [void][Runtime.InteropServices.Marshal]::ReleaseComObject($excel)
}
