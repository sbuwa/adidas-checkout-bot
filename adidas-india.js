const puppeteer = require('puppeteer-core')

const url =
	'https://www.adidas.co.in/running-adi-classic-sneakers/EY2911.html?pr=product_rr&slot=2&rec=mt'

async function initBrowser() {
	let launchOptions = {
		headless: false,
		executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // because we are using puppeteer-core so we must define this option
		args: ['--start-maximized'],
	}

	const browser = await puppeteer.launch(launchOptions)
	const page = await browser.newPage()
	await page.goto(url)
	return page
}

async function addToCart(page) {
	try {
		await page.waitForSelector(
			'#app > div > div:nth-child(1) > div > div > div > div.content-wrapper___3AhOy > div > div.fixed-width-content___1wHJi > section.buy-section___yYtjH.gl-vspace-bpall-medium.mobile___zHy6J > div.size-selector___2htsB > div.sizes___3Stmf.gl-vspace > button:nth-child(1)'
		)
		await page.$eval(
			'#app > div > div:nth-child(1) > div > div > div > div.content-wrapper___3AhOy > div > div.fixed-width-content___1wHJi > section.buy-section___yYtjH.gl-vspace-bpall-medium.mobile___zHy6J > div.size-selector___2htsB > div.sizes___3Stmf.gl-vspace > button:nth-child(1)',
			(elem) => elem.click()
		)

		await page.waitFor(1000)

		await page.waitForSelector("button[data-auto-id = 'add-to-bag']")
		await page.$eval("button[data-auto-id = 'add-to-bag']", (elem) =>
			elem.click()
		)

		// await page.waitFor(30000)

		await page.waitForSelector("button[data-auto-id = 'add-to-bag']")
		await page.$eval("button[data-auto-id = 'add-to-bag']", (elem) =>
			elem.click()
		)

		await page.waitForSelector("a[href = '/cart']")
		await page.$eval("a[href = '/cart']", (elem) => elem.click())
	} catch (error) {
		console.log('We found an error:', error)
	}
}

async function connecting_page(page) {
	await page.waitForSelector(
		"button[class = 'gl-cta gl-cta--primary gl-cta--full-width']"
	)
	await page.$eval(
		"button[class = 'gl-cta gl-cta--primary gl-cta--full-width']",
		(elem) => elem.click()
	)
}

async function shipping_address(page) {
	await page.waitForSelector("input[id='shippingAddress-firstName']")
	await page.type("input[id='shippingAddress-firstName']", 'John')

	await page.waitForSelector("input[id='shippingAddress-lastName']")
	await page.type("input[id='shippingAddress-lastName']", 'Doe')

	await page.waitForSelector("input[id='shippingAddress-address1']")
	await page.type(
		"input[id='shippingAddress-address1']",
		'221, Baker Street,'
	)

	await page.waitForSelector("input[id='shippingAddress-address2']")
	await page.type(
		"input[id='shippingAddress-address2']",
		"Speedy's Sandwich Bar and Cafe"
	)

	await page.waitForSelector("input[id='shippingAddress-city']")
	await page.type("input[id='shippingAddress-city']", 'Mumbai')

	await page.waitForSelector("input[id='shippingAddress-zipcode']")
	await page.type("input[id='shippingAddress-zipcode']", '400069')

	await page.waitForSelector(
		"select[class='gl-dropdown-native__select-element']"
	)
	await page.select(
		"select[class='gl-dropdown-native__select-element']",
		'Maharashtra'
	)

	await page.waitForSelector("input[id='contact-emailAddress']")
	await page.type("input[id='contact-emailAddress']", 'someone@gmail.com')

	await page.waitForSelector("input[id='contact-phoneNumber']")
	await page.type("input[id='contact-phoneNumber']", '9999988888')

	await page.waitForSelector("input[data-auto-id='consent-checkbox']")
	await page.$eval("input[data-auto-id='consent-checkbox']", (elem) =>
		elem.click()
	)

	await page.waitForSelector(
		"input[data-auto-id='explicit-consent-checkbox']"
	)
	await page.$eval(
		"input[data-auto-id='explicit-consent-checkbox']",
		(elem) => elem.click()
	)

	await page.waitForSelector("button[data-auto-id='review-and-pay-button']")
	await page.$eval("button[data-auto-id='review-and-pay-button']", (elem) =>
		elem.click()
	)
}

async function payment_details(page) {
	await page.waitForSelector("input[id='card-number']")
	await page.type("input[id='card-number']", '374245455400126')

	await page.waitForSelector("input[id='name']")
	await page.type("input[id='name']", 'Lane Pryce')

	await page.waitForSelector("input[id='expiryDate']")
	await page.type("input[id='expiryDate']", '0523')

	await page.waitForSelector("input[id='security-number-field']")
	await page.type("input[id='security-number-field']", '867')
}

async function checkout() {
	const page = await initBrowser()
	await addToCart(page)
	await connecting_page(page)
	await shipping_address(page)
	await payment_details(page)
}

checkout()
