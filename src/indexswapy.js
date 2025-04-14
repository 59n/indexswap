class IndexSwapy {
    constructor() {
        this.ratios = {
            ndx_qqq: 41.10241216829076,
            nq_qqq: 41.29471200210854,
            es_spy: 10.072138887159946
        };
        this.lastUpdated = null;
    }

    async updateRatios() {
        try {
            console.log('Fetching ratios from backend...');
            const response = await fetch('https://indexswapy-backend.netlify.app/.netlify/functions/indexswapy/api/ratios');
            const data = await response.json();
            console.log('Backend response:', data);
            
            // Check if the response has the expected data
            if (data.status === 'ok' && data.ratios) {
                this.ratios = {
                    ndx_qqq: data.ratios["NDX/QQQ Ratio"],
                    nq_qqq: data.ratios["NQ/QQQ Ratio"],
                    es_spy: data.ratios["ES/SPY Ratio"]
                };
                console.log('Updated ratios from backend:', this.ratios);
            } else {
                console.log('Using fallback ratios:', this.ratios);
            }
            
            this.lastUpdated = new Date();
            return true;
        } catch (error) {
            console.error('Error updating ratios:', error);
            console.log('Using fallback ratios:', this.ratios);
            return false;
        }
    }

    async convertQQQToNDX(qqqValue) {
        // Input validation
        const numValue = parseFloat(qqqValue);
        if (isNaN(numValue)) {
            throw new Error('Invalid input: Please provide a valid number');
        }
        if (numValue < 0) {
            throw new Error('Invalid input: Value cannot be negative');
        }

        // Try to update ratios if they're old or not set
        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > 60000)) {
            await this.updateRatios();
        }

        // Ensure we have valid ratios
        if (isNaN(this.ratios.ndx_qqq)) {
            throw new Error('Conversion ratio not available. Please try again later.');
        }

        console.log('Converting QQQ to NDX:', {
            input: numValue,
            ratio: this.ratios.ndx_qqq,
            result: numValue * this.ratios.ndx_qqq
        });

        // Perform the conversion
        const result = (numValue * this.ratios.ndx_qqq).toFixed(2);
        return parseFloat(result);
    }

    // Additional conversion methods
    async convertQQQToNQ(qqqValue) {
        const numValue = parseFloat(qqqValue);
        if (isNaN(numValue)) {
            throw new Error('Invalid input: Please provide a valid number');
        }
        if (numValue < 0) {
            throw new Error('Invalid input: Value cannot be negative');
        }

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > 60000)) {
            await this.updateRatios();
        }

        const result = (numValue * this.ratios.nq_qqq).toFixed(2);
        return parseFloat(result);
    }

    async convertNQToQQQ(nqValue) {
        const numValue = parseFloat(nqValue);
        if (isNaN(numValue)) {
            throw new Error('Invalid input: Please provide a valid number');
        }
        if (numValue < 0) {
            throw new Error('Invalid input: Value cannot be negative');
        }

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > 60000)) {
            await this.updateRatios();
        }

        const result = (numValue / this.ratios.nq_qqq).toFixed(2);
        return parseFloat(result);
    }

    async convertNDXToQQQ(ndxValue) {
        const numValue = parseFloat(ndxValue);
        if (isNaN(numValue)) {
            throw new Error('Invalid input: Please provide a valid number');
        }
        if (numValue < 0) {
            throw new Error('Invalid input: Value cannot be negative');
        }

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > 60000)) {
            await this.updateRatios();
        }

        const result = (numValue / this.ratios.ndx_qqq).toFixed(2);
        return parseFloat(result);
    }

    async convertESToSPY(esValue) {
        const numValue = parseFloat(esValue);
        if (isNaN(numValue)) {
            throw new Error('Invalid input: Please provide a valid number');
        }
        if (numValue < 0) {
            throw new Error('Invalid input: Value cannot be negative');
        }

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > 60000)) {
            await this.updateRatios();
        }

        const result = (numValue / this.ratios.es_spy).toFixed(2);
        return parseFloat(result);
    }

    async convertSPYToES(spyValue) {
        const numValue = parseFloat(spyValue);
        if (isNaN(numValue)) {
            throw new Error('Invalid input: Please provide a valid number');
        }
        if (numValue < 0) {
            throw new Error('Invalid input: Value cannot be negative');
        }

        if (!this.lastUpdated || (Date.now() - this.lastUpdated.getTime() > 60000)) {
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