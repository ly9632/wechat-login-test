import { test, expect } from '@playwright/test';

test.use({ baseURL: 'http://localhost:55762' });

test.describe('WeChatLoginTests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload(); 
  });

  test('TC-01 successful login', async ({ page }) => {
    await page.fill('#account', '13800000001');
    await page.fill('#password', 'Test@123'); 
    await page.click('#loginBtn');
    // 🚨 修改了这里：兼容带或不带 .html 的网址
    await expect(page).toHaveURL(/verify(\.html)?/, { timeout: 10000 });
  });

  test('TC-03 banned account login', async ({ page }) => {
    await page.fill('#account', '13700000003'); 
    await page.fill('#password', 'Test@123');   
    await page.click('#loginBtn');
    await expect(page.locator('#pwdError')).not.toBeEmpty();
  });

  test('TC-02 wrong password', async ({ page }) => {
    await page.fill('#account', '13800000001');
    await page.fill('#password', 'Tast@123'); 
    await page.click('#loginBtn');
    await expect(page.locator('#pwdError')).not.toBeEmpty();
  });
});