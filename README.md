# IndexSwapy

A powerful financial instrument converter for NDX, QQQ, NQ, SPY, and ES values. Convert between different index products with real-time ratios.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

* Convert between multiple financial instruments:
  * QQQ ↔ NDX
  * QQQ ↔ NQ
  * SPY ↔ ES
* Real-time conversion ratios
* Multiple input formats (comma, space, or dash separated)
* Clean, responsive interface
* Automatic ratio updates
* Input validation and error handling
* Results caching for better performance

## Live Demo

Visit: [indexswapy.netlify.app](https://indexswapy.netlify.app)

## Input Formats

The converter accepts various input formats:

```
450, 449, 448           # Comma separated
450 449 448             # Space separated
450-449-448             # Dash separated
450, 449 - 448         # Mixed format
```

## Development

### Prerequisites

* Node.js (v14 or higher)
* npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/59n/indexswapy.git
cd indexswapy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
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
│   └── indexswapy.js  # Main converter logic
├── test/              # Test files
│   └── test-indexswapy.js
├── index.html         # Main application
├── netlify.toml       # Netlify configuration
├── package.json       # Project configuration
└── README.md         # Project documentation
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
