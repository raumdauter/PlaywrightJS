const logger = require('../utils/logger'); // Import logger using CommonJS syntax
const { expect } = require('@playwright/test');
const {ultimateBasePage} = require('../utils/ultimateBasePage'); // Import ultimateBasePage using CommonJS syntax'

class DashboardPage extends ultimateBasePage {

    constructor(page) {
        super(page);  
        this.page = page;
    // 1. Định nghĩa các Selectors (Locators)
    
    }

}