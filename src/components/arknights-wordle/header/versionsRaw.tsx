export const versions = [
  {
    version: "2.2.0",
    date: "27th August 2024",
    content:
    `- There is now a ghost icon of the operators on mobile to make it easier for users to keep track of the rows and attributes
    - UI changes to make it clearer that the share string can be changed
    - Reduced the hint breakpoints to 4 (Sort by rarity) and 6 (Sort by class)
    - Further smaller changes in UI. I refactored some old code, please report any visual bugs you come across in the dropdown menu
    - I've found a new repo for operator information. 
    - Thank you to NikitaZero and the resources at the Arknights Terra Wiki.gg Discord server
    - Since I haven't been caught up in the story past the Reunion/Talulah arc, please submit some suggestions for nicknames/easter eggs you'd like to see
    - Added operators up to and including Shu's banner (+10)
    `,
    added: [["char_4114_harold", 5], ["char_194_leto", 5], ["char_4116_blkkgt", 6], ["char_4081_warmy", 5], ["char_4117_ray", 6], ["char_4119_wanqin", 5], ["char_4122_grabds", 5], ["char_4121_zuole", 6], ["char_2025_shu", 6], ["char_4023_rfalcn", 5]],
    link: { href: "https://forms.gle/AA8HpWwMxZEjE7ut8", text: "Nicknames suggestion form"}
  },
  {
    version: "2.1.0",
    date: "24th August 2024",
    content:
    `- Added high contrast mode
    - Added customisable share formats for Discord and Reddit. These preferences will save on browser cache
    - Changed UI to move non-game elements into a dropdown menu
    - Added hints for Endless Mode. You could cheat the hints by switching to endless while playing the daily, but you could also just use the game client too. Play however you want!
    - Changed operator list UI to make it less visually cramped. This is unchanged in mobile since the icons are relatively larger anyways
    - Added Next Wordle timer. Placement to be changed
    - (Bug Report) Fixed a bug where sharing a result would cause the guesses to reverse
    - (Bug Report) Added Siesta to subregion list. The subregion list, operator list and pop-up text is actually done manually, I plan on reworking all this in the future
    - Please continue to submit bugs and suggestions! More improvements are incoming. Thank you for playing

    - Fixed the next wordle thing because I forgot to set the timezone...
    `,
    other:
    `The job grind is a pain
    `
  },
  {
    version: "2.0.2",
    date: "17th July 2024",
    content: 
    `- Fixed edge case where operators without a nation would have their groups be half correct if the correct operator also didn't belong to a nation
    - *This does not retroactively fix guesses
    - Fixed endless mode being softlocked due to Angelina/Suzuran bug
    
    Thanks for reporting the bugs, you know who you are :))
    `
  },
  {
    version: "2.0.1",
    date: "16th July 2024",
    content:
    `- Thank you everyone who responded on the survey and thank you for the kind words, feedback and suggestions. I had a fun time reading all of the responses

    *** IMPORTANT ***
    There was confusion over a recent game where Suzuran was picked as the answer. However, Angelina completely overlaps with her in EVERY category, leading to players thinking that the game was bugged.

    For now, I have removed the morsel of code that prevents both operators for being correct. But until I figure out an elegant solution to prevent overlapping operators from being chosen, Angelina might be chosen again.
    
    - Forgot to add the new nicknames to the database, they are ACTUALLY added now (sorry)
    - Fixed refresh button formatting for endless mode

    I will need some time to decide on, research and implement certain feedback, thanks for being patient!
    - Changed and fixed the bug report/suggestions button. It's very ironic that the bug report button was bugged i cant believe i forgot to put the link
    - Changed wording from Cost (E2) -> DP Cost (E2) due to ambiguity
    - Slightly increased guess reveal speed
    - More in Yapping`,
    link: {href: "https://forms.gle/uYKsrUcXH6yErWUL6", text: "Please let me know your opinions if you have a minute or two to spare <3"},
    other:
    `- I do have this guilty concience and so with a heavy heart, I have to self report that I haven't actually opened up Arknights ever since Typhon banner (insert skull emoji) I will come back for Ascalon tho
    - Initially I had added in the overlapping operator edge case as I thought that it wouldn't make sense to be correct as you didn't guess *the* operator.
    However, it is definitely unfair to think of a matching operator, guess it and then be wrong based on a coinflip as a player.

    In rough priority and with no forecasted date:
    - I will add hints for Endless mode
    - I will research and implement a high contrast mode
    - I will implement light mode specific and general UI changes/improvements
    - I will think of a way to hint/reveal easter eggs or have a global list
    - I will look into an alternative to Aceship, preferably one I can download/scrape from. Though it seems like some of the CN files have all the necessary stuff translated
    - I will tentatively research how to do localisation (to CN (default lang) and then JP) but I have 0 experience in this field
    
    - As this is just *supposed* to be a smaller personal project, I'm not sure if I can follow through with a group commitment at the time of writing
    - However, if you reached out to me thank you, I really appreciate it and I still may reach out in the future`
  },
  {
    version: "2.0",
    date: "14th July 2024",
    content: 
    `- This pop up on a new version
    - Bug submission button at top right of Help section
    - New domain name (yay, shouldn't need to change again). Paying money to host (noo). Learning experience and increased employability? (copium)
    - Added more operator nicknames and a fully matched ultra-super \"nickname\". The hint is \"CC\"
    - Font is now local to the site, therefore there shouldn't be any missing fonts going forward
    - Started tracking stats for play history from game #163 (coincidentally 361 backwards)
    - Re-enabled tooltips for mobile after tweaking the positioning
    - Made the letter tracking (spacing) bigger for all bold text to improve readability (especially in dark mode)
    - Minor changes including font-weight, sizes and text breaking for answer rows
    - Ops up to Degenbrecher banner will be added as soon as Aceship translates their profiles. This means CN ops will never be added early
    - If you have a bit of free time feel free to fill out this short survey with 9 questions, 3 required (all multiple choice)`,
    link: {href: "https://forms.gle/cweyGtFiTQEn5DHd8", text:"Player satisfaction survey ( 0 (zero) Orundums will be mailed to your inbox after completion )"},
    other:
    `If this site ever gets super popular in the far future I may need to implement ads. My goal is to cover server costs, not to make a profit.

    I promise they will be non-intrusive, though I can probably just set up a Ko-fi.
    
    I've been job hunting even before this popped off, therefore from now I will only maintain operator updates and bug fixes until I have the time.
    I also have other projects I want to get started on.
    
    Thanks for playing!`
  },
  {
    version: "1.4",
    date: "6th July 2024",
    content: 
    `- Fixed bug where recent chosen operators are chosen again
    - Keep in mind that the database did get nuked so there will be overlaps with the previous month of operators
    - I manually reset the operator, so reset your cache for the operator today if you've already guessed
    - Added Endless mode. I did not add the share functionality as I didn't find a reason as to why you'll share endless. It's easy enough to add it in the future though
    - Code base refactoring and cleaning up. Me from 6 months ago would be proud`,
    
    other:
    `- This will be the last update ON THIS DOMAIN. I will start porting over this project off of Vercel
    - No promises as to when it will happen but everyone will have a weeks notice and I'll have a popup when you visit the site
    `
  },
  {
    version: "1.3.1",
    content: "- i mispelled wordle in the discord linking text and forgot to add the <> to remove the embed im very sorry"
  },
  {
    version: "1.3",
    date: "2nd July 2024",
    content: 
    `- Had to reset the database
    - Added share with markdown feature to reduce text length by hyperlinking url (Mainly for Discord)
    - Added metadata and icon to the site. Wordle and Arknights Rhodes Island icons were used and edited
    - Added alias searching for cases such as Kirin Yato and Rathalos Noir Corne
    - Added a bunch of joke aliases/nicknames. I hope everyone has as much fun discovering them as I did adding them
    - For example, try searching for \"Doggo\" (sorry namie) :^)
    - I plan on adding an endless mode (Client side)
    - Till next time, Wdance`
  },
  {
    version: "1.2",
    content: 
    `- Moved all the compare logic to the client side to reduce function invocation limits
    - There was an earlier caching oversight causing the client to not rollover to the new operator, apologies for that. Feel free to abuse local storage to refresh/mess around with the guesses`,
    other:
    `- Website might be migrated to another host in the near future therefore the URL will change. Vercel charges $30AUD per month (insert sobbing emoji)`
  },
  {
    version: "1.1",
    date: "30th June 2024",
    content: 
    `- Removed world map to save server costs
    - Deleted IS exclusive 5* operators
    - Added this update log
    - Added operators up to and including Viviana's banner. Previously only up to Executor-Alter banner (+20)
    - Added missing operators Friston-3 and U-Official (+2)`,
    added: [["char_2012_typhon", 6], ["char_1034_jesca2", 6], ["char_4088_hodrer", 6],["char_4098_vvana", 6],["char_245_cello", 6], ["char_4093_frston", 1], ["char_4091_ulika", 1]],
  },
  {
    version: "1.0",
    date: "March 2024",
    content: 
    `Hello Dokutahs, this is just a personal project of mine that I wanted to make for fun. Don't expect consistent updates since I will definitely fall behind on content eventually.
    \nUntil I figure out a way to get suggestions from the community, I will keep on adding features that I think are appropriate.
    \nThe database of this project depends on the Aceship github icons and gamedata repo, so my thanks goes out for the maintainers of that site.
    \nAnd lastly, thank you for playing - Three6ty1`
  }
]