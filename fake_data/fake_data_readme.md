To use fake_data functions...

Verify you ran NPM install after merge to add NPM Package - Faker

----------------------

* Adjust the for loop number to increase or decrease more entries. (only tested with 20) *

cd into ./fake_data

In terminal run the following in order:
  node fake_user.js
  node fake_item.js
  node fake_transactions.js
  node fake_review.js

Once console.log indicates it has finished Control C to stop each node process and continue to the next

After running all commands check Smokey's DB on local mongo client for matching number of entries for data functions just ran