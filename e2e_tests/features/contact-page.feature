Feature: Contact Page
  Scenario: Verify Contact page basic layout
    Given I am on the "contact" page
    Then I should see the main page header, "Contact"
    And I should see page summary text that reads "Have a question for EVBP? You know what to do!"
    And I should see the contact form

  Scenario: Verify Contact form works (happy path)
    Given I am on the "contact" page
    And I see the contact form
    When I fill in the email field with "johndoe@exene.com"
    And I select "Feedback" from the subject menu
    And I enter the message "This is a really cool form"
    Then I should see an alert that says "Message sent!" after clicking "Send"

  Scenario: Verify Contact form returns an error (unhappy path)
    Given I am on the "contact" page
    And I see the contact form
    When The send message API is unavailable
    And I fill in and submit the form
    Then I should see an alert that says "Failed to send message. Please try again later."
