Feature: Music page
  Scenario: Verify music page layout
    Given I have navigated to the "music" page
    Then I should see the main navigation menu
    And I should see the main page header, "Music"
    And I should see page summary text that reads "Here, you will find information about EVBP's entire discography, including summaries behind each release, interesting tidbits, and possibly clues about other things..."
    And the "first" release tile will be "Only Criminals Get Caught I"
    And the "second" release tile will be "The X of Art (Deluxe)"
    And the "third" release tile will be "Faux Pleasure"
    And the "fourth" release tile will be "A Certain Set of Parameters"
    And the "fifth" release tile will be "Mechanical Essence of Whiskers"
    And the "sixth" release tile will be "The X of Art"
    And the "seventh" release tile will be "The Second EP"
    And the "eighth" release tile will be "Lo-Fi Mouth"

  Scenario: Verify content and behavior of the "Only Criminals Get Caught" album tile
    Given I am on the "music" page
    When I see the "Only Criminals Get Caught I" release tile
    Then I should see the cover image for "Only Criminals Get Caught I"
    And I should see the release date as "January 20, 2025"
    And I should see the album credits "Produced & mixed by EVBP. Mastered by Peter Bishop. Art by Jevena Nevetic."
    And I should see the track list
    And the "first" track should be "The Edge of Society"
    And the "second" track should be "#LifeHack"
    And the "third" track should be "Are You Afraid?"
    And the "fourth" track should be "Thoughts & Prayers [Interlude]"
    And the "fifth" track should be "Only Criminals Get Caught"
    When the browser window is in "mobile" mode
    Then I should see the view summary button
    When I click the view summary button
    Then I should see the summary text that reads "\"Part one of two. As of writing this, Part two is in the works and approximately 60% done. Originally, I intended this to be a full album, but given the heavy subject matter as well as how much time it was taking me to complete, I made the decision to break it up into smaller more digestible chunks. Not completely synthwave, but cut from the same cloth. It is my most political record by a long shot.\""
    When I click the hide summary button
    Then I should no longer see the summary text
    When the browser window is in "desktop" mode
    Then I should not see the view summary button
    And the summary should read "\"Part one of two. As of writing this, Part two is in the works and approximately 60% done. Originally, I intended this to be a full album, but given the heavy subject matter as well as how much time it was taking me to complete, I made the decision to break it up into smaller more digestible chunks. Not completely synthwave, but cut from the same cloth. It is my most political record by a long shot.\""
    When I click on the bandcamp link
    Then I should be redirected to the bandcamp release page for "Only Criminals Get Caught I"