Feature: Links page
    Scenario: User visits the Links page
        Given I have navigated to the "links" page
        Then I should see the main page header, "Links"
        And I should see page summary text that reads "The internet is a wonderful place. Full of hyperlinks, memes, and other things to waste your afternoon with. Here are some internet things that I thought were worth your attention."
        And I should see the EVBP Related links
        And I should see the links not related to EVBP

    Scenario: User clicks a link on the links page
        Given I am on the "links" page
        And I click a random link
        Then I should remain on the links page
        And The link I clicked should open in a new tab