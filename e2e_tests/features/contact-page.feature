Feature: Contact Page
  Scenario: User visits the Contact page
    Given I have navigated to the "contact" page
    Then I should see the main page header, "Contact"
    And I should see page summary text that reads "Have a question for EVBP? You know what to do!"
    And I should see the "contact" form

  Scenario: User uses the Contact form (happy path)
    Given I am on the "contact" page
    And I see the contact form
    When I fill in the email field with "johndoe@exene.com"
    And I select "Feedback" from the subject menu
    And I enter the message "This is a really cool form"
    Then I should see an alert that says "Message sent!" after clicking "Send"

  Scenario: User uses the Contact form (unhappy path)
    Given I am on the "contact" page
    And I see the contact form
    When The send message API is unavailable
    And I fill in and submit the form
    Then I should see an alert that says "Failed to send message. Please try again later."
