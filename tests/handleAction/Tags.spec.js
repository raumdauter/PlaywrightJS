import { test, expect } from '@playwright/test';

test('Tag 1@sanity', async ({ page }) => {
   console.log('This is Tag 1');
});

test('Tag 2@sanity', async ({ page }) => {
    console.log('This is Tag 2');           
});

test('Tag 3@regression', async ({ page }) => {
    console.log('This is Tag 3');
});

test('Tag 4@smoke', async ({ page }) => {
    console.log('This is Tag 4');
});

test('Tag 5', { tag: '@smoke' }, async ({ page }) => {
    console.log('This is Tag 5');
});
