Feature: FAQ Page
  Scenario: Verify FAQ page title and subtext
    Given I am on the "faq" page
    Then I should see the main page header, "FAQ"
    And I should see page summary text that reads "Have questions? We've got answers!"

  Scenario: Verify the FAQs are present on the page
    Given I am on the "faq" page
    Then I should see the entire list of frequently asked questions