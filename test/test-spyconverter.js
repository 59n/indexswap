// Test file for SpyConverter
const SpyConverter = require('./spyconverter');

async function runTests() {
    const converter = new SpyConverter();
    
    console.log('Starting SpyConverter tests...\n');
    
    const tests = [
        {
            name: 'Basic QQQ to NDX conversion',
            input: 100,
            method: 'convertQQQToNDX',
            expectError: false
        },
        {
            name: 'Different input value',
            input: 50,
            method: 'convertQQQToNDX',
            expectError: false
        },
        {
            name: 'Zero input',
            input: 0,
            method: 'convertQQQToNDX',
            expectError: false
        },
        {
            name: 'Large number',
            input: 1000,
            method: 'convertQQQToNDX',
            expectError: false
        },
        {
            name: 'Invalid string input',
            input: 'invalid',
            method: 'convertQQQToNDX',
            expectError: true,
            expectedError: 'Invalid input: Please provide a valid number'
        },
        {
            name: 'Negative number',
            input: -100,
            method: 'convertQQQToNDX',
            expectError: true,
            expectedError: 'Invalid input: Value cannot be negative'
        },
        {
            name: 'QQQ to NQ conversion',
            input: 100,
            method: 'convertQQQToNQ',
            expectError: false
        },
        {
            name: 'NQ to QQQ conversion',
            input: 4129.47,
            method: 'convertNQToQQQ',
            expectError: false
        },
        {
            name: 'NDX to QQQ conversion',
            input: 4110.24,
            method: 'convertNDXToQQQ',
            expectError: false
        },
        {
            name: 'ES to SPY conversion',
            input: 1000,
            method: 'convertESToSPY',
            expectError: false
        },
        {
            name: 'SPY to ES conversion',
            input: 100,
            method: 'convertSPYToES',
            expectError: false
        }
    ];

    let passedTests = 0;
    let failedTests = 0;

    for (const test of tests) {
        try {
            console.log(`Test: ${test.name}`);
            console.log(`Input: ${test.input}`);
            
            if (test.expectError) {
                try {
                    await converter[test.method](test.input);
                    console.log('❌ Test failed: Expected error but got success');
                    failedTests++;
                } catch (error) {
                    if (error.message === test.expectedError) {
                        console.log('✅ Test passed: Got expected error');
                        passedTests++;
                    } else {
                        console.log(`❌ Test failed: Expected "${test.expectedError}" but got "${error.message}"`);
                        failedTests++;
                    }
                }
            } else {
                const result = await converter[test.method](test.input);
                if (typeof result === 'number' && !isNaN(result)) {
                    console.log(`✅ Test passed: Output: ${result}`);
                    passedTests++;
                } else {
                    console.log(`❌ Test failed: Invalid output: ${result}`);
                    failedTests++;
                }
            }
        } catch (error) {
            console.error(`❌ Test failed with unexpected error: ${error.message}`);
            failedTests++;
        }
        console.log(''); // Empty line between tests
    }

    console.log(`Test Summary:`);
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
}

// Run the tests
runTests().catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
}); 