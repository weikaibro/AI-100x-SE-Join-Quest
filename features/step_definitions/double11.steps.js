const { Given, When, Then } = require('@cucumber/cucumber');
const OrderService = require('../../src/OrderService');


Given('the customer buy the same kind of product will get the discount', function (dataTable) {
  this.double11Discount = dataTable.hashes();
});



When('the double11 customer places an order with:', function (dataTable) {
  this.orderItems = dataTable.hashes();
  const OrderService = require('../../src/OrderService');
  this.orderService = new OrderService();
  this.orderResult = this.orderService.calculateDouble11(this.orderItems, this.double11Discount);
});



Then('the order calculation should be:', function (dataTable) {
  const expected = dataTable.hashes();
  // 移除 notDiscount 欄位
  const actual = this.orderResult.calculation.map(row => {
    const { notDiscount, ...rest } = row;
    return rest;
  });
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Order calculation not match.\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
});


Then('the order total price should be:', function (dataTable) {
  const expected = dataTable.hashes();
  const actual = this.orderResult.total;
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Order total price not match.\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
});
