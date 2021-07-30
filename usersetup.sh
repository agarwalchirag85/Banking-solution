mongo banking --eval "db.dropDatabase()" 
mongoimport -d banking -c users --file data/user-data.json
mongoimport -d banking -c transactions --file data/transaction-data.json