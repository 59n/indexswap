class SpyConverter {
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
            const response = await fetch('https://utility-trees-399601.wl.r.appspot.com/');
            const data = await response.json();
            
            this.ratios = {
                ndx_qqq: data["NDX/QQQ Ratio"],
                nq_qqq: data["NQ/QQQ Ratio"],
                es_spy: data["ES/SPY Ratio"]
            };
            
            this.lastUpdated = new Date();
            return true;
        } catch (error) {
            console.error('Error updating ratios:', error);
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
    module.exports = SpyConverter;
} else {
    window.SpyConverter = SpyConverter;
} 