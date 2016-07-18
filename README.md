# XSSValidator
Rough prototype of funcitonal validation/sanitization service. Not "middlewhere" but a small HTTP API for validating and sanitizing whatever is given to it for bad or unwanted HTML tags and attributes. The sanitize endpoint actually returns what is given to it in an HTML entity encoded format if the initial string is not valid.


###Usage: 
`node src/index.js`

It should listen on 8080 by default

##API
POST request to: 

* `/validate` endpoint simply returns json object of `true` or `false`. Depending if it is valid
* `/sanitize` endpoint returns the supplied string if valid. Else returns the HTML entity encoded string. 

Request json payload example:
```json
{ "val":"<script>alert('badsauce')</script>}
```
