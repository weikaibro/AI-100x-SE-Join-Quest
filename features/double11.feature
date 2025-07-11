@order_pricing
Feature: E-commerce Order Pricing Promotions With Double 11 Activity
  As a shopper
  I want the system to calculate my order total with applicable promotions with double 11 activity
  So that I can understand how much to pay and what items I will receive

  Scenario: For every same kind of 10 products with 20% off discount
    Given the customer buy the same kind of product will get the discount
      | kindOfProduct | quantity | discount | 
      | 1             | 10       | 0.8      | 
    When the double11 customer places an order with:
      | productName | quantity | unitPrice |
      | sock        | 12       | 100       |
    Then the order calculation should be:
      | productName | unitPrice | discountQuantity | discount | notDiscountQuantity | notDiscount
      | sock        | 100       | 10               | 0.8      | 2                   | 1          
    And the order total price should be:
      | productName | totalPrice |
      | sock        | 1000       |

  @ignore
  Scenario: For every same kind of 10 products with 20% off discount
    Given the customer buy the same kind of product will get the discount
      | kindOfProduct | quantity | discount | 
      | 1             | 10       | 0.8      | 
    When the double11 customer places an order with:
      | productName | quantity | unitPrice |
      | sock        | 27       | 100       |
    Then the order calculation should be:
      | productName | unitPrice | discountQuantity | discount | notDiscountQuantity | notDiscount
      | sock        | 100       | 20               | 0.8      | 7                   | 1          
    And the order total price should be:
      | productName | totalPrice |
      | sock        | 2300       |

  @ignore
  Scenario: For every same kind of 10 products with 20% off discount
    Given the customer buy the same kind of product will get the discount
      | kindOfProduct | quantity | discount | 
      | 1             | 10       | 0.8      | 
    When the double11 customer places an order with:
      | productName | quantity | unitPrice |
      | A           | 1        | 100       |
      | B           | 1        | 100       |
      | C           | 1        | 100       |
      | D           | 1        | 100       |
      | E           | 1        | 100       |
      | F           | 1        | 100       |
      | G           | 1        | 100       |
      | H           | 1        | 100       |
      | I           | 1        | 100       |
      | J           | 1        | 100       |
    Then the order calculation should be:
      | productName | unitPrice | discountQuantity | discount | notDiscountQuantity | notDiscount
      | A           | 100       | 0                | 0.8      | 1                   | 1          
      | B           | 100       | 0                | 0.8      | 1                   | 1          
      | C           | 100       | 0                | 0.8      | 1                   | 1        
      | D           | 100       | 0                | 0.8      | 1                   | 1        
      | E           | 100       | 0                | 0.8      | 1                   | 1        
      | F           | 100       | 0                | 0.8      | 1                   | 1        
      | G           | 100       | 0                | 0.8      | 1                   | 1        
      | H           | 100       | 0                | 0.8      | 1                   | 1        
      | I           | 100       | 0                | 0.8      | 1                   | 1      
      | J           | 100       | 0                | 0.8      | 1                   | 1          
    And the order total price should be:
      | productName | totalPrice |
      | A           | 100        |
      | B           | 100        |
      | C           | 100        |
      | D           | 100        |
      | E           | 100        |
      | F           | 100        |
      | G           | 100        |
      | H           | 100        |
      | I           | 100        |
      | J           | 100        |
