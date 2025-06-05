Feature: Homepage Functionality
  Scenario: Verify homepage title
    Given I am on the homepage
    Then the header should be "Welcome to theHome Page"

  Scenario: Check for main navigation links
    Given I am on the homepage
    Then I should see a link to the "faq" page
    And I should see a link to the "bio" page
    And I should see a link to the "music" page
    And I should see a link to the "pics" page
    And I should see a link to the "news" page
    And I should see a link to the "links" page
    And I should see a link to the "guestbook" page
    And I should see a link to the "contact" page

  Scenario: Verify footer content
    Given I am on the homepage
    Then the footer should contain the text "You are visitor #"
    And the footer should contain the text "to the site. Welcome!"

  Scenario: Verify navigation links go to the appropriate page
    Given I am on the homepage
    When I click on the "faq" link
    Then I should be redirected to the "faq" page