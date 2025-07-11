const { Given, When, Then } = require('@cucumber/cucumber');
const OrderService = require('../../src/OrderService');


Given('the buy one get one promotion for cosmetics is active', function () {
  // 尚未實作，僅設旗標
  this.bogoCosmetics = true;
});


Given('the threshold discount promotion is configured:', function (dataTable) {
  // 尚未實作，僅存資料
  this.thresholdPromotion = dataTable.hashes();
});


Given('no promotions are applied', function () {
  this.promotions = [];
});


When('a customer places an order with:', function (dataTable) {
  this.orderItems = dataTable.hashes();
  this.orderService = new OrderService(this.promotions);
  this.orderResult = this.orderService.calculate(this.orderItems, this.thresholdPromotion, this.bogoCosmetics);
});


Then('the order summary should be:', function (dataTable) {
  const expected = dataTable.hashes();
  let actual = [];
  if ('originalAmount' in expected[0] || 'discount' in expected[0]) {
    actual.push({
      originalAmount: String(this.orderResult.originalAmount),
      discount: String(this.orderResult.discount),
      totalAmount: String(this.orderResult.totalAmount)
    });
  } else {
    actual.push({ totalAmount: String(this.orderResult.totalAmount) });
  }
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Order summary not match.\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
});


Then('the customer should receive:', function (dataTable) {
  const expected = dataTable.hashes();
  const actual = this.orderResult.items.map(({ productName, quantity }) => ({ productName, quantity: String(quantity) }));
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Customer receive not match.\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
});
