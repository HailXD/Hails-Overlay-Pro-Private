# Hail's OP (Private)

Source: https://greasyfork.org/en/scripts/545041-wplace-overlay-pro

## Overlay Modes

- **Overlay Behind** - Shows overlay only on unpainted pixels (hidden if pixel already has color)
- **Overlay Above** - Shows overlay on all pixels regardless of paint status
- **Original** - Original overlay mode
- **Minified** - Displays overlay with smaller pixels (Blue Earth)
- **Smart** - Shows pixels that need correction (wrong color or unpainted)
- **Diff** - Shows only painted pixels with wrong colors

## Features

### Color Toggle
Toggle specific colors to display instead of showing all colors

### Color Statistics
Each color displays three counts:
- **UnpaintedCount** - Empty tiles that should be this color (use Overlay Behind to fill)
- **DiffCount** - Painted tiles with wrong color (use Diff mode to fix)
- **TotalCount** - Total tiles for this color

### Pink Mode
Toggle to make all visible pixels pink for easier color identification (works best with single color toggled)

## Usage Tips
- Use **Overlay Behind** for filling unpainted areas
- Use **Diff** mode for correcting wrongly painted pixels
- Use **Smart** mode for lazy filling of all errors