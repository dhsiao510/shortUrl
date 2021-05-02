# shortUrl
Approach:
My understanding on the main requirement of this assignment is to take in a URL of any length and create a shorter and fixed length(domain + hash) URL. Using a database to map the original length URL to the shorter version. And if an already-shortened URL is inputted again, to return the same short URL and not genereate a new shorten URL. I have chosen to use MongoDB, a NonSQL database, as this assignment only requires to store/read simple key-value data. 

To Run:
1. If first time, please run npm install to install the dependencies
2. Run npm start
3. Go to localhost:9000

Made Assumption: 
The length of hash. From research, to support enterprise level traffic, it is ideal to have a length of at least 7 characters with cap/uncap alphabets and numbers(base 62). For this mvp, I have used npm's shortid package, which genereates a randomized 9 characters base 62 id by default. Without trimming the length, it is extremely unlikely to ever run out of the unique combinations; However, the length of the shortened URL can be shorter in exchagne. 

Improvements:
1. Basic web security can be added, especially ones involving user input.
2. Input validations, i.e. check if the provided URL leads to a valid site. 
3. As mentioned previously, can shorten the length of Shorten Url by shortening the hash. And register for a shorter domain.

Comments: 
From the first point of the list of Expectations, I try to complete this assignemnt with the least amount of frameworks and libraries possible. Without React, the part I had to research most was to dynamically display the result to users. I used the Node File System library, to do file read to swap between two html files. 