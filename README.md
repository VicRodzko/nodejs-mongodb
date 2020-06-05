CHECK WORK

`curl -X GET localhost:8001` --- Home Page (UI)
</br>

`curl -X GET localhost:8001/employees` --- Get employees
</br>

`curl --header "Content-Type: application/json" -d '{"name": "Oleg D.", "positions": "TL", "phone": "Web", "location": "Minsk", "email": "aa2"}' -X POST localhost:8001/employees` --- Create employee
</br>

`curl -XDELETE localhost:8001/employees/***********` --- Delete employee
</br>

\***\*\*\*\*\*\*** - id (string)
