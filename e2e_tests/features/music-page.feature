Feature: Music page
  Scenario: Verify music page layout
    Given I have navigated to the "music" page
    Then I should see the main navigation menu
    And I should see the main page header, "Music"
    And I should see page summary text that reads "Here, you will find information about EVBP's entire discography, including summaries behind each release, interesting tidbits, and possibly clues about other things..."
    And the "first" release tile will be "Only Criminals Get Caught I (EP)"
    And the "second" release tile will be "The X of Art (Deluxe) (LP)"
    And the "third" release tile will be "Faux Pleasure (LP)"
    And the "fourth" release tile will be "パラメータの特定のセット (A Certain Set of Parameters) (EP)"
    And the "fifth" release tile will be "The Mechanical Essence of Whiskers (MEOW) (LP)"
    And the "sixth" release tile will be "The X of Art (EP)"
    And the "seventh" release tile will be "The Second EP (EP)"
    And the "eighth" release tile will be "Lo-Fi Mouth (LP)"

  Scenario: Verify content and behavior of the "Only Criminals Get Caught" album tile
    Given I am on the "music" page
    When I see the "Only Criminals Get Caught I (EP)" release tile
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
    When I click on the Bandcamp link
    Then I should be redirected to the Bandcamp release page for "Only Criminals Get Caught I"

  Scenario: Verify content and behavior of the "The X of Art Deluxe Edition" album tile
    Given I am on the "music" page
    When I see the "The X of Art (Deluxe) (LP)" release tile
    Then I should see the cover image for "The X of Art (Deluxe)"
    And I should see the release date as "March 19, 2022"
    And I should see the album credits "Produced, mixed and mastered by EVBP."
    And I should see the track list
    And the "first" track should be "Lisa Simpson"
    And the "second" track should be "Chickenz"
    And the "third" track should be "Train (Like a Choo-Choo)"
    And the "fourth" track should be "The X of Art"
    And the "fifth" track should be "Jolt"
    And the "sixth" track should be "Alright, Awesomeness!"
    And the "seventh" track should be "Poopface"
    And the "eighth" track should be "Free Parking"
    And the "ninth" track should be "Party Cannon In Tow"
    And the "tenth" track should be "Cash Up Front"
    And the "eleventh" track should be "Chickenz (Unofficial Klaus Larsen Remix)"
    When the browser window is in "mobile" mode
    Then I should see the view summary button
    When I click the view summary button
    Then I should see the summary text that reads "\"TXoA was originally released as a limited edition CD, with no digital download available. If you wanted to get it, you had to get a copy from me at a show (once upon a time, I performed in public). While I enjoyed the boutique-like nature of a limited release, I also found it frustrating that my most well known material was not widely available. So in 2022, I remixed and remastered the original EP along with some songs that were released on evbpmusic.com around the same time. Revisiting [the album] gave me the opportunity to makes additional improvements. 'Free Parking' in my opinion sounds so much better with an actual 12-string guitar.\""
    When I click the hide summary button
    Then I should no longer see the summary text
    When the browser window is in "desktop" mode
    Then I should not see the view summary button
    And I should see the summary text that reads "\"TXoA was originally released as a limited edition CD, with no digital download available. If you wanted to get it, you had to get a copy from me at a show (once upon a time, I performed in public). While I enjoyed the boutique-like nature of a limited release, I also found it frustrating that my most well known material was not widely available. So in 2022, I remixed and remastered the original EP along with some songs that were released on evbpmusic.com around the same time. Revisiting [the album] gave me the opportunity to makes additional improvements. 'Free Parking' in my opinion sounds so much better with an actual 12-string guitar.\""
    When I click on the Bandcamp link
    Then I should be redirected to the Bandcamp release page for "The X of Art Deluxe Edition"

  Scenario: Verify content and behavior of the "Faux Pleasure" album tile
    Given I am on the "music" page
    When I see the "Faux Pleasure (LP)" release tile
    Then I should see the cover image for "Faux Pleasure"
    And I should see the release date as "October 31, 2021"
    And I should see the album credits "Produced, mixed and mastered by EVBP."
    And I should see the track list
    And the "first" track should be "そう感じる ~คɭ๏ภє~"
    And the "second" track should be "Ｔｈｅ░Ｃｒａｎｅ░Ｇａｍｅ"
    And the "third" track should be "カーニバルでの期待の夜"
    And the "fourth" track should be "Ｌｉｑｕｉｄａｔｉｏｎ (廃業)"
    And the "fifth" track should be "L8est + Gr8est"
    And the "sixth" track should be "店先の気まぐれ"
    And the "seventh" track should be "一晩配達"
    And the "eighth" track should be "全ての Best Stuff"
    And the "ninth" track should be "ペイデー ($$$.. $$.. $...)"
    And the "tenth" track should be "【ＨｅａｖｙＲｏｔａｔｉｏｎ】"
    And the "eleventh" track should be "アンビオリオット (Ｓｐａｃｅ░♢ｕｔ)"
    And the "twelfth" track should be "学科EᑎᒍOYᗰEᑎT"
    And the "thirteenth" track should be "【Ｂｏｎｕｓ　Ｔｒａｃｋ】"
    And the "fourteenth" track should be "WE TRIED STAYING HAPPY"
    When the browser window is in "mobile" mode
    Then I should see the view summary button
    When I click the view summary button
    Then I should see the summary text that reads "\"What do you do when you've spent close to a year fine tuning a small handful of songs, only to realize how far away you are from completing the album they will be on? You release a completely different album, of course! This was inspired by my discovery of vaporwave in the previous year. I wanted to do something similar, while also using the material as an effort to clean my gears. The whole thing came together pretty quickly and it still remains one of my favorites out of my discography.\""
    When I click the hide summary button
    Then I should no longer see the summary text
    When the browser window is in "desktop" mode
    Then I should not see the view summary button
    And I should see the summary text that reads "\"What do you do when you've spent close to a year fine tuning a small handful of songs, only to realize how far away you are from completing the album they will be on? You release a completely different album, of course! This was inspired by my discovery of vaporwave in the previous year. I wanted to do something similar, while also using the material as an effort to clean my gears. The whole thing came together pretty quickly and it still remains one of my favorites out of my discography.\""
    When I click on the Bandcamp link
    Then I should be redirected to the Bandcamp release page for "Faux Pleasure"

  Scenario: Verify content and behavior of the "パラメータの特定のセット (A Certain Set of Parameters)" album tile
    Given I am on the "music" page
    When I see the "パラメータの特定のセット (A Certain Set of Parameters) (EP)" release tile
    Then I should see the cover image for "パラメータの特定のセット (A Certain Set of Parameters)"
    And I should see the release date as "October 2, 2020"
    And I should see the album credits "Produced, mixed and mastered by EVBP."
    And I should see the track list
    And the "first" track should be "時計1： 自由への降伏"
    And the "second" track should be "時計2： フォールアウトの新世代"
    And the "third" track should be "時計3： かつては私たちの仲間入り"
    And the "fourth" track should be "時計4： ドローン、グリッチ、ハートビート"
    And the "fifth" track should be "時計5： アイドルギルドの購読"
    And the "sixth" track should be "時計6： （私たちは）私たちを破壊するためにここに送られました"
    When the browser window is in "mobile" mode
    Then I should see the view summary button
    When I click the view summary button
    Then I should see the summary text that reads "\"This was my attempt to break several years of inactivity. It is also the first release where I dropped the full band name in favor of the easier to write and remember 'EVBP'. I decided to try a new direction musically as I discovered just how much I was able to do with synthesizers. It is an EP conceived in the isolation of the first year of the Covid-19 pandemic and at the closing of the first Trump term. As such, it is a maelstrom of negative emotions, with a few rays of hope sprinkled here and there. Track 5 (roughly translated as 'The Idol Guild') is sung entirely in Vulcan. As in Spock. Live long and prosper.\""
    When I click the hide summary button
    Then I should no longer see the summary text
    When the browser window is in "desktop" mode
    Then I should not see the view summary button
    And I should see the summary text that reads "\"This was my attempt to break several years of inactivity. It is also the first release where I dropped the full band name in favor of the easier to write and remember 'EVBP'. I decided to try a new direction musically as I discovered just how much I was able to do with synthesizers. It is an EP conceived in the isolation of the first year of the Covid-19 pandemic and at the closing of the first Trump term. As such, it is a maelstrom of negative emotions, with a few rays of hope sprinkled here and there. Track 5 (roughly translated as 'The Idol Guild') is sung entirely in Vulcan. As in Spock. Live long and prosper.\""
    When I click on the Bandcamp link
    Then I should be redirected to the Bandcamp release page for "パラメータの特定のセット"
    When I go back to the previous page
    And I see the "パラメータの特定のセット (A Certain Set of Parameters) (EP)" release tile
    When I click on the Apple Music link
    Then I should be redirected to the Apple Music release page for "パラメータの特定のセット"
    When I go back to the previous page
    And I see the "パラメータの特定のセット (A Certain Set of Parameters) (EP)" release tile
    And I click on the Youtube link
    Then I should be redirected to the Youtube release page for "パラメータの特定のセット"

  Scenario: Verify content and behavior of the "The Mechanical Essence of Whiskers" album tile
    Given I am on the "music" page
    When I see the "The Mechanical Essence of Whiskers (MEOW) (LP)" release tile
    Then I should see the cover image for "The Mechanical Essence of Whiskers (MEOW)"
    And I should see the release date as "February 21, 2016"
    And I should see the album credits "Produced by EVBP. Mixed by EVBP and Peter Bishop. Mastered by Adam Boose at Cauliflower Audio."
    And I should see the track list
    And the "first" track should be "There's No Write Way"
    And the "second" track should be "DJ-STFU-PLZ!!"
    And the "third" track should be "Candytosis (Sweet Tooth II)"
    And the "fourth" track should be "Kittens and Warm Cocoa"
    And the "fifth" track should be "Washington Wives"
    And the "sixth" track should be "Pixel Fix"
    And the "seventh" track should be "Super Coffee"
    And the "eighth" track should be "Leaf of Forgiveness"
    And the "ninth" track should be "Pepperidge Farm"
    And the "tenth" track should be "Decipher This Song"
    When the browser window is in "mobile" mode
    Then I should see the view summary button
    When I click the view summary button
    Then I should see the summary text that reads "\"My comfort level with a DAW had improved significantly by the time work on this album began. It's still weird, a bit tongue in cheek and stylistically all over the place, but I think it works. It also features the largest number of guest appearances of anything I've released. Fun fact, 'Kittens and Warm Cocoa' was my first and only foray into Cookie Monster voice. Tony Raines made it sound so much better than the original demo. Also, 'Decipher This Song' is not just a catchy title!\""
    When I click the hide summary button
    Then I should no longer see the summary text
    When the browser window is in "desktop" mode
    Then I should not see the view summary button
    And I should see the summary text that reads "\"My comfort level with a DAW had improved significantly by the time work on this album began. It's still weird, a bit tongue in cheek and stylistically all over the place, but I think it works. It also features the largest number of guest appearances of anything I've released. Fun fact, 'Kittens and Warm Cocoa' was my first and only foray into Cookie Monster voice. Tony Raines made it sound so much better than the original demo. Also, 'Decipher This Song' is not just a catchy title!\""
    When I click on the Bandcamp link
    Then I should be redirected to the Bandcamp release page for "The Mechanical Essence of Whiskers"
    When I go back to the previous page
    And I see the "The Mechanical Essence of Whiskers" release tile
    When I click on the Apple Music link
    Then I should be redirected to the Apple Music release page for "The Mechanical Essence of Whiskers"
    When I go back to the previous page
    And I see the "The Mechanical Essence of Whiskers" release tile
    And I click on the Youtube link
    Then I should be redirected to the Youtube release page for "The Mechanical Essence of Whiskers"

  Scenario: Verify content and behavior of the "The X of Art" album tile
    Given I am on the "music" page
    When I see the "The X of Art (EP)" release tile
    Then I should see the cover image for "The X of Art"
    And I should see the release date as "November 10, 2010"
    And I should see the album credits "Produced, mixed and (poorly) mastered by EVBP."
    And I should see the track list
    And the "first" track should be "Lisa Simpson"
    And the "second" track should be "Chickenz"
    And the "third" track should be "Train (Like a Choo-Choo)"
    And the "fourth" track should be "The X of Art"
    And the "fifth" track should be "Jolt"
    When the browser window is in "mobile" mode
    Then I should see the view summary button
    When I click the view summary button
    Then I should see the summary text that reads "\"The first foray into computer recording, and it shows. While the songs are much more accessible, the production quality was still lacking. Despite having access to a software drum machine, I still opted to use a hardware one, and didn't sync it with the MIDI clock in the DAW as I did not know how. Ultimately, this made the remixing and remastering process for the deluxe edition years later... challenging. More than likely, you have heard the song 'Chickenz' from this one as it is a famously stupid song.\""
    When I click the hide summary button
    Then I should no longer see the summary text
    When the browser window is in "desktop" mode
    Then I should not see the view summary button
    And I should see the summary text that reads "\"The first foray into computer recording, and it shows. While the songs are much more accessible, the production quality was still lacking. Despite having access to a software drum machine, I still opted to use a hardware one, and didn't sync it with the MIDI clock in the DAW as I did not know how. Ultimately, this made the remixing and remastering process for the deluxe edition years later... challenging. More than likely, you have heard the song 'Chickenz' from this one as it is a famously stupid song.\""
    When I click on the Bandcamp link
    Then I should be redirected to the Bandcamp release page for "The X of Art Deluxe Edition"

  Scenario: Verify content and behavior of the "The Second EP" album tile
    Given I am on the "music" page
    When I see the "The Second EP (EP)" release tile
    Then I should see the cover image for "The Second EP"
    And I should see the release date as "October 31, 2005"
    And I should see the album credits "Produced and (hardly) mixed by EVBP."
    And I should see the track list
    And the "first" track should be "It Only Sounds Sad"
    And the "second" track should be "Silverfish"
    And the "third" track should be "Morse Code - The Creation"
    And the "fourth" track should be "Baldwin's Bald Spot"
    And the "fifth" track should be "Intermission"
    And the "sixth" track should be "Morse Code - The Transmission"
    And the "seventh" track should be "...Which Hand Fills Up Faster"
    And the "eighth" track should be "Morse Code()"
    When the browser window is in "mobile" mode
    Then I should see the view summary button
    When I click the view summary button
    Then I should see the summary text that reads "\"Even more experimental than LFM. This was mostly written and recorded during a week when my college gf was out of town with friends. It's not as cohesive as LFM, but there were some worthwhile moments - 'Which Hand', for example.\""
    When I click the hide summary button
    Then I should no longer see the summary text
    When the browser window is in "desktop" mode
    Then I should not see the view summary button
    And I should see the summary text that reads "\"Even more experimental than LFM. This was mostly written and recorded during a week when my college gf was out of town with friends. It's not as cohesive as LFM, but there were some worthwhile moments - 'Which Hand', for example.\""
    When I click on the Bandcamp link
    Then I should be redirected to the Bandcamp release page for "Second EP"

  Scenario: Verify content and behavior of the "Lo-Fi Mouth" album tile
    Given I am on the "music" page
    When I see the "Lo-Fi Mouth (LP)" release tile
    Then I should see the cover image for "Lo-Fi Mouth"
    And I should see the release date as "January 1, 2004"
    And I should see the album credits "Produced and mixed (sorta) by EVBP."
    And I should see the track list
    And the "first" track should be "Skinned-Knee Mercy"
    And the "second" track should be "Poems About Dreams"
    And the "third" track should be "The 'I Ain't Got The Blues' Blues"
    And the "fourth" track should be "Sweet Tooth"
    And the "fifth" track should be "Lo-Fi Mouth"
    And the "sixth" track should be "Check Yo' Self"
    And the "seventh" track should be "Seggasem Lanimilbus"
    And the "eighth" track should be "I Can't Quit"
    And the "ninth" track should be "Lazy Sunday Sun"
    And the "tenth" track should be "Dirty"
    And the "eleventh" track should be "Psionic Radio"
    And the "twelfth" track should be "Misguided Universe; Gone For Good"
    When the browser window is in "mobile" mode
    Then I should see the view summary button
    When I click the view summary button
    Then I should see the summary text that reads "\"This is where it all started. Recorded on a Tascam Porta02 4-track, using a variety of unconventional instruments, song structures, and effects. At times really exciting, and also really cringey. Fans of lo-fi, alternative bands like Guided By Voices and Ween will probably like this one.\""
    When I click the hide summary button
    Then I should no longer see the summary text
    When the browser window is in "desktop" mode
    Then I should not see the view summary button
    And I should see the summary text that reads "\"This is where it all started. Recorded on a Tascam Porta02 4-track, using a variety of unconventional instruments, song structures, and effects. At times really exciting, and also really cringey. Fans of lo-fi, alternative bands like Guided By Voices and Ween will probably like this one.\""
    When I click on the Bandcamp link
    Then I should be redirected to the Bandcamp release page for "Lo-Fi Mouth"