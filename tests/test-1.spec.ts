import { test, expect } from '@playwright/test';

// Test data
const TEST_USER = {
  username: 'testUser',
  password: '123',
  firstName: 'Marko',
  lastName: 'Pesic',
  email: 'marp@fakemail.com',
  phone: '07635231',
  address1: 'ssdfsf',
  address2: 'dfsdfsdfs',
  city: 'Novi Sad',
  state: 'Serbia',
  zip: '21000',
  country: 'RS'
};

test('should register a new user successfully', async ({ page }) => {
  // Navigate to the registration page
  await page.goto('https://petstore.octoperf.com/actions/Catalog.action');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Register Now!' }).click();
  
  // Fill in registration form
  await page.locator('input[name="username"]').fill(TEST_USER.username);
  await page.locator('input[name="password"]').fill(TEST_USER.password);
  await page.locator('input[name="repeatedPassword"]').fill(TEST_USER.password);
  await page.locator('input[name="account\\.firstName"]').fill(TEST_USER.firstName);
  await page.locator('input[name="account\\.lastName"]').fill(TEST_USER.lastName);
  await page.locator('input[name="account\\.email"]').fill(TEST_USER.email);
  await page.locator('input[name="account\\.phone"]').fill(TEST_USER.phone);
  await page.locator('input[name="account\\.address1"]').fill(TEST_USER.address1);
  await page.locator('input[name="account\\.address2"]').fill(TEST_USER.address2);
  await page.locator('input[name="account\\.city"]').fill(TEST_USER.city);
  await page.locator('input[name="account\\.state"]').fill(TEST_USER.state);
  await page.locator('input[name="account\\.zip"]').fill(TEST_USER.zip);
  await page.locator('input[name="account\\.country"]').fill(TEST_USER.country);

  // Submit the form
  await page.getByRole('button', { name: 'Save Account Information' }).click();
});

test('should login with registered user', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://petstore.octoperf.com/actions/Catalog.action');
  await page.getByRole('link', { name: 'Sign In' }).click();
  
  // Fill in login form
  await page.locator('input[name="username"]').fill(TEST_USER.username);
  await page.locator('input[name="password"]').fill(TEST_USER.password);
  
  // Submit login form
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Verify successful login
  await expect(page.getByText(`Welcome ${TEST_USER.firstName}`)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign Out' })).toBeVisible();
});

test('should add fish to shopping cart', async ({ page }) => {
  // Login first
  await page.goto('https://petstore.octoperf.com/actions/Catalog.action');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('input[name="username"]').fill(TEST_USER.username);
  await page.locator('input[name="password"]').fill(TEST_USER.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify login success before proceeding
  await expect(page.getByText(`Welcome ${TEST_USER.firstName}`)).toBeVisible();

  // Navigate to Fish category
  await page.locator('a[href*="categoryId=FISH"]').first().click();
  
  // Wait for product list to load
  await page.waitForSelector('div#Catalog');

  // Click on Angel Fish product ID
  await page.getByRole('link', { name: 'FI-SW-01' }).click();
  
  // Wait for product details to load
  await page.waitForSelector('div#Catalog table');
  
  // Add first item to cart with better selector
  await page.locator('a:has-text("Add to Cart")').first().click();

  // Wait for cart to update
  await page.waitForSelector('#Cart');

  // More specific cart verifications
  const cartTable = page.locator('#Cart');
  await expect(cartTable).toBeVisible();
  
  // Verify specific item details
  const angelFishRow = cartTable.locator('tr', { hasText: 'Large Angelfish' });
  await expect(angelFishRow).toBeVisible();
  
  // Verify price (may need adjustment based on actual price)
  const subTotal = page.locator('#Cart tr:last-child');
  await expect(subTotal).toContainText('Sub Total:');
});