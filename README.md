# IndexSwapy

A powerful financial instrument converter for NDX, QQQ, NQ, SPY, and ES values. Convert between different index products with real-time ratios.

## Features

- Convert between multiple financial instruments:
  - QQQ ↔ NDX
  - QQQ ↔ NQ
  - SPY ↔ ES
- Real-time conversion ratios
- Multiple input formats (comma, space, or dash separated)
- Clean, responsive interface
- Automatic ratio updates

## Usage

Visit: [indexswapy.netlify.app](https://indexswapy.netlify.app)

### Input Formats

The converter accepts various input formats:
```
450, 449, 448           # Comma separated
450 449 448             # Space separated
450-449-448             # Dash separated
450, 449 - 448         # Mixed format
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/indexswapy.git
cd indexswapy
```

2. Install dependencies:
```bash
npm install
```

3. Start local server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

## Project Structure

```
indexswapy/
├── src/               # Source files
│   └── spyconverter.js
├── test/              # Test files
│   └── test-spyconverter.js
├── index.html         # Main application
├── netlify.toml       # Netlify configuration
└── package.json       # Project configuration
```

## License

MIT License 