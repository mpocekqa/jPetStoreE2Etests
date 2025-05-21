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