param(
    [string]$jsonPath
)

# Resolve script root and default temp folder
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition

if (-not $jsonPath -or -not (Test-Path $jsonPath)) {
    $tempCandidate = Join-Path $scriptRoot "..\..\temp"
    try {
        $tempDir = (Resolve-Path $tempCandidate -ErrorAction Stop).ProviderPath
    } catch {
        $tempDir = $null
    }
    if ($tempDir) {
        $files = Get-ChildItem -Path $tempDir -Filter '*.json' -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
        if ($files -and $files.Count -gt 0) { $jsonPath = $files[0].FullName }
    }
}

if (-not $jsonPath -or -not (Test-Path $jsonPath)) {
    Write-Output "No temp JSON found; skipping formatter."
    exit 0
}

try {
    $content = Get-Content -Raw -Path $jsonPath | ConvertFrom-Json
} catch {
    Write-Output "Failed to read or parse JSON: $jsonPath"
    exit 0
}

$tool = $content.toolName
if ($tool -in @('create','edit')) {
    $repoRoot = Resolve-Path (Join-Path $scriptRoot "..\..")
    Push-Location $repoRoot
    try {
        Write-Output "Running prettier because toolName='$tool'"
        npx prettier --write .
        $exit = $LASTEXITCODE
    } catch {
        Write-Output "Formatter failed: $_"
        $exit = 1
    } finally {
        Pop-Location
    }
    exit $exit
} else {
    Write-Output "toolName='$tool' - skipping formatter."
    exit 0
}
