class IndexSwapy {
    static VERSION = '1.0.0';
    
    constructor() {
        this.ratios = {
            ndx_qqq: 41.10241216829076,
            nq_qqq: 41.29471200210854,
            es_spy: 10.072138887159946
        };
        this.lastUpdated = null;
        this.lastApiCall = null;
        this.rateLimit = 1000; // Minimum time between API calls in milliseconds
        this.maxValue = 1000000; // Maximum allowed input value
        this.cacheDuration = 60000; // Cache duration in milliseconds (1 minute)
        this.resultsCache = new Map(); // Cache for conversion results
        this.debounceTimeout = null;
        this.debounceDelay = 500; // Debounce delay in milliseconds
    }

    async updateRatios() {
        // Rate limiting check
        const now = Date.now();
        if (this.lastApiCall && (now - this.lastApiCall < this.rateLimit)) {
            console.log('Using cached ratios (rate limit)');
            return true;
        }

        try {
            console.log('Fetching ratios from backend...');
            const response = await fetch('https://indexswapy-backend.netlify.app/.netlify/functions/indexswapy/api/ratios');
            const data = await response.json();
            
            // Check if the response has the expected data
            if (data.status === 'ok' && data.ratios) {
                this.ratios = {
                    ndx_qqq: data.ratios["NDX/QQQ Ratio"],
                    nq_qqq: data.ratios["NQ/QQQ Ratio"],
                    es_spy: data.ratios["ES/SPY Ratio"]
                };
                console.log('Ratios updated:', this.ratios);
            } else {
                console.log('Using fallback ratios');
            }
            
            this.lastUpdated = new Date();
            this.lastApiCall = now;
            return true;
        } catch (error) {
            console.error('Error updating ratios:', error);
            console.log('Using fallback ratios');
            return false;
        }
    }

    validateInput(value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            throw new Error('Invalid input: Please provide a valid number');
        }
        if (numValue < 0) {
            throw new Error('Invalid input: Value cannot be negative');
        }
        if (numValue > this.maxValue) {
            throw new Error(`Invalid input: Value cannot exceed ${this.maxValue.toLocaleString()}`);
        }
        return numValue;
    }

    getCacheKey(method, value) {
        return `${method}:${value}`;
    }

    async convertWithCache(method, value) {
        const cacheKey = this.getCacheKey(method, value);
        
        // Check cache first
        if (this.resultsCache.has(cacheKey)) {
            console.log(`Using cached result for ${method}(${value})`);
            return this.resultsCache.get(cacheKey);
        }

        // Clear any existing debounce timeout
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }

        // Return a promise that resolves after debounce delay
        return new Promise((resolve) => {
            this.debounceTimeout = setTimeout(async () => {
                const result = await this[method](value);
                this.resultsCache.set(cacheKey, result);
                resolve(result);
            }, this.debounceDelay);
        });
    }

    async convertQQQToNDX(qqqValue) {
        return this.convertWithCache('_convertQQQToNDX', qqqValue);
    }

    async _convertQQQToNDX(qqqValue) {
        // Input validation
        const numValue = this.validateInput(qqqValue);

        // Try to update ratios if they're old or not set
        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > this.cacheDuration)) {
            await this.updateRatios();
        }

        // Ensure we have valid ratios
        if (isNaN(this.ratios.ndx_qqq)) {
            throw new Error('Conversion ratio not available. Please try again later.');
        }

        // Perform the conversion
        const result = (numValue * this.ratios.ndx_qqq).toFixed(2);
        return parseFloat(result);
    }

    // Additional conversion methods with caching
    async convertQQQToNQ(qqqValue) {
        return this.convertWithCache('_convertQQQToNQ', qqqValue);
    }

    async _convertQQQToNQ(qqqValue) {
        const numValue = this.validateInput(qqqValue);

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > this.cacheDuration)) {
            await this.updateRatios();
        }

        const result = (numValue * this.ratios.nq_qqq).toFixed(2);
        return parseFloat(result);
    }

    async convertNQToQQQ(nqValue) {
        return this.convertWithCache('_convertNQToQQQ', nqValue);
    }

    async _convertNQToQQQ(nqValue) {
        const numValue = this.validateInput(nqValue);

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > this.cacheDuration)) {
            await this.updateRatios();
        }

        const result = (numValue / this.ratios.nq_qqq).toFixed(2);
        return parseFloat(result);
    }

    async convertNDXToQQQ(ndxValue) {
        return this.convertWithCache('_convertNDXToQQQ', ndxValue);
    }

    async _convertNDXToQQQ(ndxValue) {
        const numValue = this.validateInput(ndxValue);

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > this.cacheDuration)) {
            await this.updateRatios();
        }

        const result = (numValue / this.ratios.ndx_qqq).toFixed(2);
        return parseFloat(result);
    }

    async convertESToSPY(esValue) {
        return this.convertWithCache('_convertESToSPY', esValue);
    }

    async _convertESToSPY(esValue) {
        const numValue = this.validateInput(esValue);

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > this.cacheDuration)) {
            await this.updateRatios();
        }

        const result = (numValue / this.ratios.es_spy).toFixed(2);
        return parseFloat(result);
    }

    async convertSPYToES(spyValue) {
        return this.convertWithCache('_convertSPYToES', spyValue);
    }

    async _convertSPYToES(spyValue) {
        const numValue = this.validateInput(spyValue);

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > this.cacheDuration)) {
            await this.updateRatios();
        }

        const result = (numValue * this.ratios.es_spy).toFixed(2);
        return parseFloat(result);
    }
}

// Export the module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IndexSwapy;
} else {
    window.IndexSwapy = IndexSwapy;
} 