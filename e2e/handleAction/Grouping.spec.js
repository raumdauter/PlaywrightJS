import { test, expect } from '@playwright/test';
//test('Keyboard Actions', async ({ page }) => { 

test.beforeAll(async () => {
    console. log('this is before all Hook .... ')
})

test.afterAll(async () => {
    console. log('this is after all Hook .... ')
})

test.beforeEach(async ({page}) => {
    console. log('this is before each Hook .... ')
})

test.afterEach(async ({page}) => {
    console. log('this is after each Hook .... ')
})

test.describe('Group 1', () => {

    test('Test1', async({page})=>{
    console. log('this is test 1 .... ')
    })
    test('Test2', async({page})=>{
console. log('this is test 2 .... ')
    })
})

test.describe.skip('Group 2', () => {

    test('Test3', async({page})=>{
    console. log('this is test 3 .... ')
    })

    test('Test4', async({page})=>{
    console. log('this is test 4 .... ')
    })
})