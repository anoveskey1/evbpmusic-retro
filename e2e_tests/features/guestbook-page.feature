Feature: Guestbook page
  Scenario: User visits the Guestbook page
    Given I have navigated to the "guestbook" page
    Then I should see the main page header, "Guestbook"
    And I should see page summary text that reads "Welcome to the guestbook page! Immortalize yourself in internet history... at least until Adam gets the urge to redesign the site again. ;)"
    And I should see the "guestbook" form
    And I should see the guestbook entries

  Scenario: User visits the Guestbook page (unhappy path)
    Given I am on the "guestbook" page
    When The get guestbook entries API is unavailable
    Then I should not see the guestbook entries

  Scenario: User signs the guestbook (happy path)
    Given I am on the "guestbook" page
    When I fill in the "username" field with "McNuggetKing97"
    And I fill in the "email" field with "john.mcnugget@gmail.com"
    And I click the "Get Validation Code" button
    Then I should see an alert that says "Validation code sent to your email. Please check your inbox."
    # TODO: next step - enter validation code in code input