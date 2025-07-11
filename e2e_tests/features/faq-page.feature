Feature: FAQ Page
  Scenario: Verify FAQ page basic layout
    Given I have navigated to the "faq" page
    Then I should see the main page header, "FAQ"
    And I should see page summary text that reads "Have questions? We've got answers!"
    And I should see the frequently asked questions

  Scenario: Verify FAQ page top navigation
    Given I am on the "faq" page
    Then I should see the main navigation menu

  Scenario: Verify FAQ #1 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #1 should have question "Who, or what is EVBP?"
    And faq #1 should have answer "EVBP is Adam Noveskey."

  Scenario: Verify FAQ #2 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #2 should have question "Why isn't your music on Spotify?"
    And faq #2 should have answer "Spotify has a poor artist compensation model."

  Scenario: Verify FAQ #3 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #3 should have question "But everyone uses it! You're depriving people from hearing your music."
    And faq #3 should have answer "No, I'm not."

  Scenario: Verify FAQ #4 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #4 should have question "This site looks really awful."
    And faq #4 should have answer "I know, right?! That's by design."

  Scenario: Verify FAQ #5 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #5 should have question "Why did you take so long to update the website?"
    And faq #5 should have answer "Because I had a full time job writing computer code and the idea of redesigning the site just didn't seem necessary to me."

  Scenario: Verify FAQ #6 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #6 should have question "All the images in the news posts are missing!"
    And faq #6 should have answer "Depending on when you read this, yes. Since I blew the old site away, the image paths in the original posts are no longer valid."

  Scenario: Verify FAQ #7 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #7 should have question "What's your issue with AI?"
    And faq #7 should have answer "Conceptually, nothing."

  Scenario: Verify FAQ #8 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #8 should have question "Didn't the Second EP used to have a different title?"
    And faq #8 should have answer "Yes, it did."

  Scenario: Verify FAQ #9 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #9 should have question "Your albums seem to be getting more cohesive and less... all over the place."
    And faq #9 should have answer "I still enjoy genre exploration, but I find I'm more satisfied with the quality of the results when I'm not rubbernecking between genres."

  Scenario: Verify FAQ #10 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #10 should have question "When's your next live performance?"
    And faq #10 should have answer "Probably not gonna happen anytime soon."

  Scenario: Verify FAQ #11 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #11 should have question "I ran one of your tracks through a spectrograph and saw some really scary images."
    And faq #11 should have answer "Yeah, spectrographic images are super neat."

  Scenario: Verify FAQ #12 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #12 should have question "What are your go-to instruments, effects, etc?"
    And faq #12 should have answer "As far as guitars go, I'm almost exclusively a Fender guy."

  Scenario: Verify FAQ #13 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #13 should have question "Can I give you money for your music?"
    And faq #13 should have answer "If you would like, but I would much rather that you give that money to a local mutual aid group, or a non-profit that you believe in."

  Scenario: Verify FAQ #14 content
    Given I am on the "faq" page
    And I see the list of 14 frequently asked questions
    Then faq #14 should have question "Then why do you sell merch on your bandcamp page?"
    And faq #14 should have answer "Because I paid to have it made."