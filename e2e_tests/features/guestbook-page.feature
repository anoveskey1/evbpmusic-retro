Feature: Guestbook page
  Scenario: User visits the Guestbook page
    Given the guestbook API returns entries
    And I have navigated to the "guestbook" page
    Then I should see the main page header, "Guestbook"
    And I should see page summary text that reads "Welcome to the guestbook page! Immortalize yourself in internet history... at least until Adam gets the urge to redesign the site again. ;)"
    And I should see the "guestbook" form
    And I should see the guestbook entries

  Scenario: User visits the Guestbook page (unhappy path)
    Given the guestbook entries API is unavailable
    When I am on the "guestbook" page
    Then I should not see the guestbook entries

  Scenario: User signs the guestbook (happy path)
    Given I have filled in the "username" and "email" fields with the values "McNuggetKing97" and "john.mcnugget@gmail.com"
    And I have clicked the Get Validation Code button
    And I see an alert that says "Validation code sent to your email. Please check your inbox."
    And I have filled in the validation code field with "123456"
    And I click the Validate User button
    And I see an alert that says "Email validated successfully. You can now sign the guestbook!"
    When I fill in the "message" field with the value "I love McNuggets!"
    And I click the Sign The Guestbook button
    Then I should see an alert that says "Thanks for signing my guestbook. You rock!"

  Scenario: User tries to sign the guestbook with an email address that has already been used (unhappy path)
    Given I have filled in the "username" and "email" fields with the values "McNuggetKing2000" and "john.mcnugget@gmail.com"
    When I have clicked the Get Validation Code button again
    Then I should see an alert that says "Failed to send validation code: Everybody gets one. If you feel you have reached this message in error, please contact us - include your email and username - and we'll see what we can do to help!"

  Scenario: User tries to sign the guestbook with a username that has already been used (unhappy path)
    Given I have filled in the "username" and "email" fields with the values "McNuggetKing97" and "john.q.mcnugget123@gmail.com"
    When I have clicked the Get Validation Code button again
    Then I should see an alert that says "Failed to send validation code: Everybody gets one. If you feel you have reached this message in error, please contact us - include your email and username - and we'll see what we can do to help!"

  Scenario: User tries to sign the guestbook with an invalid validation code (unhappy path)
    Given I have filled in the "username" and "email" fields with the values "Teh Bored Hax0r" and "1337skllz@gmail.com"
    And I have clicked the Get Validation Code button
    And I see an alert that says "Validation code sent to your email. Please check your inbox."
    When I have provided an incorrect validation code and clicked the Validate User button
    Then I should see an alert that says "User entry not found. Please contact the site admin."
