// 所有優惠邏輯將實作於此
class OrderService {
  constructor(promotions = []) {
    this.promotions = promotions;
  }

  // Double 11 活動：每滿N件同商品打折
  calculateDouble11(orderItems, double11Discount) {
    const rule = double11Discount && double11Discount[0];
    if (!rule) return {};
    const n = Number(rule.quantity);
    const discountRate = Number(rule.discount);
    const calculation = [];
    const total = [];
    for (const item of orderItems) {
      const totalQty = Number(item.quantity);
      const unitPrice = Number(item.unitPrice);
      const discountQuantity = Math.floor(totalQty / n) * n;
      const notDiscountQuantity = totalQty % n;
      const discount = discountRate;
      const notDiscount = 1;
      const totalPrice = discountQuantity * unitPrice * discountRate + notDiscountQuantity * unitPrice * notDiscount;
      calculation.push({
        productName: item.productName,
        unitPrice: String(unitPrice),
        discountQuantity: String(discountQuantity),
        discount: String(discount),
        notDiscountQuantity: String(notDiscountQuantity),
        notDiscount: String(notDiscount)
      });
      total.push({
        productName: item.productName,
        totalPrice: String(totalPrice)
      });
    }
    return { calculation, total };
  }

  calculate(orderItems, thresholdPromotion, bogoCosmetics) {
    // Buy-one-get-one for cosmetics
    let items = orderItems.map(item => ({ ...item, quantity: Number(item.quantity) }));
    let calcItems = items;
    if (bogoCosmetics) {
      // 出貨數量加一，但計價數量不變
      items = items.map(item => {
        if (item.category && item.category === 'cosmetics') {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    }
    // 計算金額時不含贈品
    const originalAmount = calcItems.reduce((sum, item) => sum + Number(item.unitPrice) * Number(item.quantity), 0);
    let discount = 0;
    if (thresholdPromotion && thresholdPromotion.length > 0) {
      const { threshold, discount: d } = thresholdPromotion[0];
      if (originalAmount >= Number(threshold)) {
        discount = Number(d);
      }
    }
    const totalAmount = originalAmount - discount;
    return {
      originalAmount,
      discount,
      totalAmount,
      items: items.map(({ productName, quantity }) => ({ productName, quantity }))
    };
  }
}

module.exports = OrderService;
